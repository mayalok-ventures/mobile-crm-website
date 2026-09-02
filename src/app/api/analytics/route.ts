/**
 * POST /api/analytics
 *
 * Production First-Party Telemetry Ingestion Endpoint.
 * Ingests:
 * - Page views (with UTM attribution & entry flag)
 * - Time on page & exit duration
 * - Section engagement (IntersectionObserver dwell time)
 * - Live visitor heartbeats (every 25s)
 *
 * Privacy & GDPR:
 * - Zero third-party scripts.
 * - Anonymous visitor UUID stored only in visitor's localStorage.
 * - IP addresses are NOT stored in analytics tables.
 * - Coarse geo derived from Cloudflare Edge metadata headers.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sanitizeString } from "@/lib/security";
import { recordAnalyticsEvent, IngestEvent } from "@/lib/analytics-store";
import { getD1Database } from "@/lib/cloudflare-context";

export const runtime = "edge";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

function detectDevice(ua: string): string {
  if (/iPad|tablet/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "Mobile";
  return "Desktop";
}

function detectBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\//i.test(ua)) return "Opera";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  if (/Firefox/i.test(ua)) return "Firefox";
  return "Other";
}

function detectOS(ua: string): string {
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const ua = req.headers.get("user-agent") || "";
    const cfCountry = req.headers.get("cf-ipcountry") || "";
    const cfCity = req.headers.get("cf-ipcity") || "";

    // 1. Bot Filter
    if (/bot|crawl|spider|slurp|facebookexternalhit|Twitterbot|BingPreview|Googlebot/i.test(ua)) {
      return NextResponse.json({ ok: true, filtered: true });
    }

    // 2. Sliding Window Rate Limit (120 pings / hour per IP)
    const isLocalDev = process.env.NODE_ENV === "development";
    if (!isLocalDev) {
      const rateCheck = checkRateLimit(`analytics_${ip}`, 120, 60 * 60 * 1000);
      if (!rateCheck.allowed) {
        return NextResponse.json({ ok: true, rateLimited: true });
      }
    }

    // 3. Parse and Validate Payload
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const type = typeof body.type === "string" ? body.type : "pageview";
    const visitorId = sanitizeString(body.vid, 64) || `v_anon_${Date.now().toString(36)}`;
    const sessionId = sanitizeString(body.sid, 64) || `s_anon_${Date.now().toString(36)}`;
    const path = sanitizeString(body.page || body.path || "/", 200);

    // Skip admin pages from public visitor analytics
    if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const event: IngestEvent = {
      type: (["pageview", "page_duration", "section_engagement", "heartbeat"].includes(type)
        ? type
        : "pageview") as IngestEvent["type"],
      visitorId,
      sessionId,
      path,
      title: sanitizeString(body.title, 120),
      referrer: sanitizeString(body.referrer, 300),
      source: sanitizeString(body.utm_source, 60),
      medium: sanitizeString(body.utm_medium, 60),
      campaign: sanitizeString(body.utm_campaign, 80),
      term: sanitizeString(body.utm_term, 80),
      content: sanitizeString(body.utm_content, 80),
      landingPage: sanitizeString(body.landing_page, 200),
      durationSec: typeof body.duration === "number" ? Math.round(body.duration) : undefined,
      sectionId: sanitizeString(body.sectionId, 50),
      isEntry: Boolean(body.isEntry),
      isExit: Boolean(body.isExit),
      country: cfCountry,
      city: cfCity,
      device: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
      ts: Date.now(),
    };

    const db = getD1Database();
    await recordAnalyticsEvent(event, db);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/analytics Error]:", err);
    return NextResponse.json({ ok: true }); // Always 200 to keep beacon non-blocking
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "analytics-beacon" });
}
