/**
 * POST /api/analytics
 *
 * Lightweight real-time visitor tracking beacon.
 * Called from the client on every page view with a tiny JSON payload.
 *
 * Stores events in Cloudflare D1 (production) or edge memory (dev).
 *
 * Rate limit: 60 pings per visitor per hour to prevent abuse.
 * No cookies, no third-party scripts — all first-party, GDPR-compatible.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/security";
import { savePageView, PageViewEvent } from "@/lib/analytics-store";
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

/** One-way hash a string — no personal data stored */
async function hashVisitorId(raw: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16); // 8 bytes = enough for uniqueness, not enough to identify
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const ua = req.headers.get("user-agent") || "";
    const cfCountry = req.headers.get("cf-ipcountry") || "";
    const cfCity = req.headers.get("cf-ipcity") || "";

    // Skip bots
    if (/bot|crawl|spider|slurp|facebookexternalhit|Twitterbot/i.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    // Rate limit per visitor IP: 60 pageviews / hour
    const isLocalDev = process.env.NODE_ENV === "development";
    if (!isLocalDev) {
      const rateCheck = checkRateLimit(`analytics_${ip}`, 60, 60 * 60 * 1000);
      if (!rateCheck.allowed) {
        return NextResponse.json({ ok: true }); // Silent accept to avoid breaking beacon
      }
    }

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const page = typeof body.page === "string" ? body.page.slice(0, 200) : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 300) : "";
    const visitorSeed = typeof body.vid === "string" ? body.vid : ip;
    const sessionSeed = typeof body.sid === "string" ? body.sid : `${ip}:${Date.now()}`;

    const [visitor_hash, session_hash] = await Promise.all([
      hashVisitorId(visitorSeed),
      hashVisitorId(sessionSeed),
    ]);

    const event: PageViewEvent = {
      id: `pv_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`,
      page,
      referrer,
      country: cfCountry,
      city: cfCity,
      device: detectDevice(ua),
      browser: detectBrowser(ua),
      visitor_hash,
      session_hash,
      ts: Date.now(),
      created_at: new Date().toISOString(),
    };

    const db = getD1Database();
    await savePageView(event, db);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/analytics] Error:", err);
    return NextResponse.json({ ok: true }); // Always return 200 to not break beacon
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ ok: true, service: "analytics-beacon" });
}
