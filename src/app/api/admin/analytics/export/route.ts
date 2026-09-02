/**
 * GET /api/admin/analytics/export
 *
 * Authenticated Endpoint for Production Analytics Export (CSV & JSON).
 * Generates structured business intelligence datasets from D1 aggregations.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/lib/security";
import { getAdminAnalyticsSummary } from "@/lib/analytics-store";
import { generateAnalyticsCsv, generateAnalyticsJson } from "@/lib/analytics-export";
import { getD1Database } from "@/lib/cloudflare-context";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    // 1. Session Authentication Gate
    const sessionCookie = req.cookies.get("sahyak_admin_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
    }

    const verification = await verifyAdminSessionToken(sessionCookie);
    if (!verification.valid) {
      return NextResponse.json({ success: false, error: "Invalid or expired admin session." }, { status: 401 });
    }

    // 2. Validate Query Parameters
    const url = new URL(req.url);
    const rawRange = url.searchParams.get("range") || "7d";
    const range = (["7d", "30d", "1y"].includes(rawRange) ? rawRange : "7d") as "7d" | "30d" | "1y";

    const rawFormat = (url.searchParams.get("format") || "csv").toLowerCase();
    const format = rawFormat === "json" ? "json" : "csv";

    // 3. Query Real D1 Aggregated Analytics Data
    const db = getD1Database();
    const summary = await getAdminAnalyticsSummary(range, db);

    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `sahyak-analytics-${range}-${dateStr}.${format}`;

    // 4. Generate Response based on Format
    if (format === "json") {
      const jsonContent = generateAnalyticsJson(summary);
      return new NextResponse(jsonContent, {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    // Default CSV
    const csvContent = generateAnalyticsCsv(summary);
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/analytics/export Error]:", err);
    return NextResponse.json(
      { success: false, error: "Failed to generate analytics export." },
      { status: 500 }
    );
  }
}
