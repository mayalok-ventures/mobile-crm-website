/**
 * GET /api/admin/analytics
 *
 * Returns real aggregated analytics for the admin dashboard.
 * Protected — requires valid admin session cookie.
 *
 * Returns:
 *   - traffic7d / traffic30d chart data
 *   - unique visitors, total pageviews, today's stats
 *   - top pages, referrers, devices, countries
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/lib/security";
import { getAnalyticsSummary } from "@/lib/analytics-store";
import { getAllLeads } from "@/lib/leads-store";
import { getD1Database } from "@/lib/cloudflare-context";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    // Auth check
    const sessionCookie = req.cookies.get("sahyak_admin_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const verification = await verifyAdminSessionToken(sessionCookie);
    if (!verification.valid) {
      return NextResponse.json({ success: false, error: "Invalid session" }, { status: 401 });
    }

    const db = getD1Database();
    const leads = await getAllLeads(db);
    const summary = await getAnalyticsSummary(leads.length, db);

    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (err) {
    console.error("[/api/admin/analytics] Error:", err);
    return NextResponse.json(
      { success: false, error: "Analytics service error." },
      { status: 500 }
    );
  }
}
