import { NextRequest, NextResponse } from "next/server";
import {
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  checkRateLimit,
} from "@/lib/security";
import {
  getAllLeads,
  saveLead,
  clearLeads,
  updateLeadStatus,
  StoredLead,
} from "@/lib/leads-store";
import { getD1Database } from "@/lib/cloudflare-context";

export const runtime = "edge";

const duplicateSubmissionSet = new Set<string>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS_PER_WINDOW = 30;
const MIN_SUBMISSION_TIME_MS = 500; // 0.5s bot deterrence

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/contact  — Fetch all leads (admin dashboard)
// ─────────────────────────────────────────────────────────────────────────────
export async function GET() {
  const db = getD1Database();
  const leads = await getAllLeads(db);
  return NextResponse.json({
    success: true,
    count: leads.length,
    leads,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/contact  — Update lead status (C1 fix)
// Body: { id: string, status: "New" | "Contacted" | "Qualified" | "In Pipeline" }
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const leadId = typeof body.id === "string" ? body.id.trim() : "";
    const status = body.status as StoredLead["status"];

    const VALID_STATUSES: StoredLead["status"][] = [
      "New",
      "Contacted",
      "Qualified",
      "In Pipeline",
    ];

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required." },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const db = getD1Database();
    const result = await updateLeadStatus(leadId, status, db);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Status update failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead ${leadId} status updated to "${status}".`,
    });
  } catch (err) {
    console.error("[PATCH /api/contact] Error:", err);
    return NextResponse.json(
      { success: false, error: "Unexpected error updating lead status." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/contact  — Clear all leads (admin purge)
// ─────────────────────────────────────────────────────────────────────────────
export async function DELETE() {
  const db = getD1Database();
  await clearLeads(db);
  return NextResponse.json({
    success: true,
    message: "All leads cleared successfully.",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contact  — Submit a new contact/lead form (C2 fix: D1 wired)
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const isLocalDev =
      process.env.NODE_ENV === "development" ||
      clientIp === "127.0.0.1" ||
      clientIp === "::1" ||
      clientIp === "localhost";

    // 1. Rate Limiting (relaxed on localhost)
    if (!isLocalDev) {
      const rateCheck = checkRateLimit(
        `contact_ip_${clientIp}`,
        MAX_REQUESTS_PER_WINDOW,
        RATE_LIMIT_WINDOW_MS
      );
      if (!rateCheck.allowed) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Too many submissions from this connection. Please wait a few minutes before trying again.",
          },
          { status: 429 }
        );
      }
    }

    // 2. Parse Payload
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // 3. Honeypot check
    if (body._hp && typeof body._hp === "string" && body._hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        requestId: `req_bot_${Math.random().toString(36).substring(2, 9)}`,
        message: "Thanks — your request has been received.",
      });
    }

    // 4. Min submission time check
    if (body._ts && typeof body._ts === "number") {
      const elapsed = now - body._ts;
      if (elapsed < MIN_SUBMISSION_TIME_MS) {
        return NextResponse.json(
          {
            success: false,
            error: "Form submitted unusually quickly. Please review and resubmit.",
          },
          { status: 400 }
        );
      }
    }

    // 5. Server-side Input Sanitization
    const name = sanitizeString(body.name, 100);
    const { valid: isEmailValid, email } = sanitizeEmail(body.email);
    const { valid: isPhoneValid, phone } = sanitizePhone(body.phone);
    const company = sanitizeString(body.company || "Not specified", 120);
    const teamSize = sanitizeString(body.teamSize || "5-20 Closers", 50);
    const requirement = sanitizeString(body.requirement || body.message || "", 2000, true);
    const inquiryType = sanitizeString(body.inquiryType || body.industry || "Book a Demo", 80);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (!isEmailValid) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid corporate or professional email address." },
        { status: 400 }
      );
    }
    if (!isPhoneValid) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone or WhatsApp number (7 to 16 digits)." },
        { status: 400 }
      );
    }

    // 6. Deduplication (same email within 2 minutes)
    const dedupeKey = `${email}:${Math.floor(now / 120000)}`;
    if (duplicateSubmissionSet.has(dedupeKey)) {
      return NextResponse.json(
        {
          success: true,
          requestId: `req_dup_${Math.random().toString(36).substring(2, 9)}`,
          message: "Thanks — your request was already received and is being processed.",
        },
        { status: 200 }
      );
    }
    duplicateSubmissionSet.add(dedupeKey);
    if (duplicateSubmissionSet.size > 1000) duplicateSubmissionSet.clear();

    const requestId = `req_sy_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

    // 7. Build Canonical Lead Record
    const storedLead: StoredLead = {
      id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      requestId,
      submittedAt: new Date().toISOString(),
      name,
      email,
      phone,
      company,
      teamSize,
      requirement,
      inquiryType,
      status: "New",
      ip: clientIp,
    };

    // 8. Persist to D1 + edge memory (C2: D1 binding now wired)
    const db = getD1Database();
    await saveLead(storedLead, db);

    // 9. CRM Canonical Payload
    const crmPayload = {
      source: "WEBSITE",
      sourceType: "CONTACT_FORM",
      requestId,
      submittedAt: storedLead.submittedAt,
      lead: { name, email, phone, company, teamSize, requirement, inquiryType },
    };

    // 10. Dispatch to server-side CRM webhook if configured
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    const crmApiKey = process.env.CRM_API_KEY;

    if (crmWebhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const response = await fetch(crmWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(crmApiKey ? { Authorization: `Bearer ${crmApiKey}` } : {}),
            "X-Sahyak-Request-Id": requestId,
          },
          body: JSON.stringify(crmPayload),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
          console.error(`CRM Webhook returned ${response.status} for ${requestId}`);
        }
      } catch (webhookErr) {
        console.error("CRM Webhook dispatch failed:", webhookErr);
      }
    } else {
      console.log(`[Sahyak CRM] Lead Captured [${requestId}]:`, { name, email, company, inquiryType });
    }

    return NextResponse.json({
      success: true,
      requestId,
      message: "Thanks — your request has been received. Our solutions team will be in touch shortly.",
      lead: storedLead,
    });
  } catch (err) {
    console.error("Unhandled error in /api/contact:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again or reach out to support@sahyak.com.",
      },
      { status: 500 }
    );
  }
}
