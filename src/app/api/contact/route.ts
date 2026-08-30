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
  StoredLead,
} from "@/lib/leads-store";

export const runtime = "nodejs";

const duplicateSubmissionSet = new Set<string>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS_PER_WINDOW = 30; // Generous window
const MIN_SUBMISSION_TIME_MS = 500; // 0.5s bot deterrence

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function GET() {
  const leads = await getAllLeads();
  return NextResponse.json({
    success: true,
    count: leads.length,
    leads,
  });
}

export async function DELETE() {
  await clearLeads();
  return NextResponse.json({
    success: true,
    message: "All leads cleared successfully.",
  });
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const isLocalDev =
      process.env.NODE_ENV === "development" ||
      clientIp === "127.0.0.1" ||
      clientIp === "::1" ||
      clientIp === "localhost";

    // 1. Rate Limiting Check (Relaxed on localhost for smooth developer testing)
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

    // 2. Parse and Validate Payload Type
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // 3. Honeypot check (hidden field bots usually fill)
    if (body._hp && typeof body._hp === "string" && body._hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        requestId: `req_bot_${Math.random().toString(36).substring(2, 9)}`,
        message: "Thanks — your request has been received.",
      });
    }

    // 4. Minimum submission duration check (only if _ts is passed)
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

    // 5. Server-side Strict Input Sanitization
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

    // 7. Canonical Stored Lead Record (Persisted to disk and D1)
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

    await saveLead(storedLead);

    // 8. Canonical Sahyak CRM Lead Payload
    const crmPayload = {
      source: "WEBSITE",
      sourceType: "CONTACT_FORM",
      requestId,
      submittedAt: storedLead.submittedAt,
      lead: {
        name,
        email,
        phone,
        company,
        teamSize,
        requirement,
        inquiryType,
      },
    };

    // 9. Dispatch to Server-Side CRM Webhook if configured
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
          console.error(`CRM Webhook returned status ${response.status} for ${requestId}`);
        }
      } catch (webhookErr) {
        console.error("CRM Webhook dispatch failed:", webhookErr);
      }
    } else {
      console.log(`[Sahyak CRM] Hardened Lead Captured [${requestId}]:`, {
        name,
        email,
        company,
        inquiryType,
      });
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
