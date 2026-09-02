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
import { normalizeTrafficChannel } from "@/lib/analytics-store";
import { getD1Database } from "@/lib/cloudflare-context";

export const runtime = "edge";

const duplicateSubmissionSet = new Set<string>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS_PER_WINDOW = 30;
const MIN_SUBMISSION_TIME_MS = 400; // 0.4s bot deterrence

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

// ─────────────────────────────────────────────────────────────
// GET /api/contact  — Fetch all leads (Admin Dashboard)
// ─────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const db = getD1Database();
    const leads = await getAllLeads(db);
    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (err) {
    console.error("[GET /api/contact Error]:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve leads from database." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// PATCH /api/contact  — Update Lead Status in D1 (C1 Fix)
// ─────────────────────────────────────────────────────────────
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
        { success: false, error: result.error || "Status update failed in database." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead ${leadId} status updated to "${status}".`,
    });
  } catch (err) {
    console.error("[PATCH /api/contact Error]:", err);
    return NextResponse.json(
      { success: false, error: "Unexpected error updating lead status." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/contact  — Clear All Leads (Admin Reset)
// ─────────────────────────────────────────────────────────────
export async function DELETE() {
  try {
    const db = getD1Database();
    await clearLeads(db);
    return NextResponse.json({
      success: true,
      message: "All leads cleared successfully.",
    });
  } catch (err) {
    console.error("[DELETE /api/contact Error]:", err);
    return NextResponse.json(
      { success: false, error: "Failed to purge database records." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/contact  — Submit a New Contact Lead (D1 Authoritative)
// ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const isLocalDev =
      process.env.NODE_ENV === "development" ||
      clientIp === "127.0.0.1" ||
      clientIp === "::1" ||
      clientIp === "localhost";

    // 1. Rate Limiting Check
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
            error: "Too many submissions from this connection. Please wait a few minutes before trying again.",
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

    // 4. Minimum submission time check
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
    const teamSize = sanitizeString(body.teamSize || "1-5", 50);
    const requirement = sanitizeString(body.requirement || body.message || "", 2000, true);
    const inquiryType = sanitizeString(body.inquiryType || body.industry || "Book a Demo", 80);

    // Attribution fields
    const utmSource = sanitizeString(body.utm_source, 60);
    const utmMedium = sanitizeString(body.utm_medium, 60);
    const utmCampaign = sanitizeString(body.utm_campaign, 80);
    const utmTerm = sanitizeString(body.utm_term, 80);
    const utmContent = sanitizeString(body.utm_content, 80);
    const landingPage = sanitizeString(body.landing_page, 200) || "/";
    const referrer = sanitizeString(body.referrer, 300) || "";
    const visitorId = sanitizeString(body.vid || body.visitor_id, 64) || "";
    const sessionId = sanitizeString(body.sid || body.session_id, 64) || "";

    const normalizedSource = normalizeTrafficChannel(referrer, utmSource, utmMedium);

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

    // 6. Deduplication Check (same email within 2 minutes)
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

    // 7. Canonical Stored Lead Record
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
      source: normalizedSource,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      landingPage,
      referrer,
      visitorId,
      sessionId,
      status: "New",
      ip: clientIp,
    };

    // 8. Authoritative D1 Insertion
    const db = getD1Database();
    const saveResult = await saveLead(storedLead, db);

    if (!saveResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Database error: Could not record your inquiry. Please try again or email support@sahyak.com.",
        },
        { status: 500 }
      );
    }

    // 9. Optional Webhook Dispatch
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    const crmApiKey = process.env.CRM_API_KEY;

    if (crmWebhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        fetch(crmWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(crmApiKey ? { Authorization: `Bearer ${crmApiKey}` } : {}),
            "X-Sahyak-Request-Id": requestId,
          },
          body: JSON.stringify({
            source: "WEBSITE",
            sourceType: "CONTACT_FORM",
            requestId,
            lead: storedLead,
          }),
          signal: controller.signal,
        }).catch((e) => console.error("[CRM Webhook Failed]:", e));
        clearTimeout(timeoutId);
      } catch (webhookErr) {
        console.error("CRM Webhook dispatch error:", webhookErr);
      }
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
