/**
 * GET /api/admin/analytics
 *
 * Authenticated Admin Analytics API.
 * Returns real D1 aggregated metrics for 7D, 30D, and 1Y ranges.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/lib/security";
import { getAdminAnalyticsSummary } from "@/lib/analytics-store";
import { getD1Database } from "@/lib/cloudflare-context";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    // 1. Session Authentication
    const sessionCookie = req.cookies.get("sahyak_admin_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    const verification = await verifyAdminSessionToken(sessionCookie);
    if (!verification.valid) {
      return NextResponse.json({ success: false, error: "Invalid or expired session." }, { status: 401 });
    }

    // 2. Parse Date Range Parameter
    const url = new URL(req.url);
    const rawRange = url.searchParams.get("range") || "7d";
    const range = (["7d", "30d", "1y"].includes(rawRange) ? rawRange : "7d") as "7d" | "30d" | "1y";

    // 3. Query Database Aggregation
    const db = getD1Database();
    const summary = await getAdminAnalyticsSummary(range, db);

    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (err) {
    console.error("[GET /api/admin/analytics Error]:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve analytics telemetry." },
      { status: 500 }
    );
  }
}
