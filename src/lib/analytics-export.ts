/**
 * Sahyak Production Analytics Export Generator
 *
 * Produces structured CSV and JSON exports from real D1 aggregated analytics telemetry.
 * Safe CSV escaping with formula injection prevention (=, +, -, @ prefix protection).
 */

import { AdminAnalyticsData } from "@/lib/analytics-store";

/**
 * Escapes a cell for CSV formatting.
 * - Wraps in quotes if contains comma, quote, or newline
 * - Escapes internal quotes as double-quotes ("")
 * - Sanitizes against spreadsheet formula injection (=, +, -, @)
 */
export function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return "";
  let str = String(val);

  // Prevent spreadsheet formula injection
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function createCsvRow(cells: unknown[]): string {
  return cells.map(escapeCsvCell).join(",");
}

/**
 * Generates structured, multi-dataset business CSV from D1 analytics summary.
 */
export function generateAnalyticsCsv(data: AdminAnalyticsData): string {
  const lines: string[] = [];
  const exportDate = new Date().toISOString();

  // Header Metadata
  lines.push(createCsvRow(["# SAHYAK CRM - WEBSITE INTELLIGENCE & TELEMETRY EXPORT"]));
  lines.push(createCsvRow(["# Report Range", data.range.toUpperCase()]));
  lines.push(createCsvRow(["# Export Timestamp (UTC)", exportDate]));
  lines.push(createCsvRow(["# Production Host", "https://sahyak.com"]));
  lines.push("");

  // 1. Overview KPIs
  lines.push(createCsvRow(["--- 1. OVERVIEW KPIS ---"]));
  lines.push(createCsvRow(["Metric", "Value"]));
  lines.push(createCsvRow(["Unique Visitors", data.overview.uniqueVisitors]));
  lines.push(createCsvRow(["New Visitors", data.overview.newVisitors]));
  lines.push(createCsvRow(["Returning Visitors", data.overview.returningVisitors]));
  lines.push(createCsvRow(["Returning Visitor Percentage", data.overview.returningRate]));
  lines.push(createCsvRow(["Live Visitors (Last 2.5m)", data.overview.liveVisitors]));
  lines.push(createCsvRow(["Total Pageviews", data.overview.totalPageviews]));
  lines.push(createCsvRow(["Average Time On Page (Seconds)", data.overview.avgTimeOnPageSec]));
  lines.push(createCsvRow(["Total Leads Captured", data.overview.totalLeads]));
  lines.push(createCsvRow(["Overall Conversion Rate", data.overview.overallConversionRate]));
  lines.push("");

  // 2. Traffic Trends
  lines.push(createCsvRow(["--- 2. TRAFFIC TRENDS ---"]));
  lines.push(createCsvRow(["Date / Period", "Visitors", "Pageviews", "Leads"]));
  if (data.trafficSeries && data.trafficSeries.length > 0) {
    for (const point of data.trafficSeries) {
      lines.push(createCsvRow([point.date, point.visitors, point.pageviews, point.leads]));
    }
  } else {
    lines.push(createCsvRow(["No trend data recorded"]));
  }
  lines.push("");

  // 3. Acquisition Channels
  lines.push(createCsvRow(["--- 3. ACQUISITION CHANNELS ---"]));
  lines.push(createCsvRow(["Channel / Source", "Visitors", "Traffic Share", "Leads", "Conversion Rate"]));
  if (data.topChannels && data.topChannels.length > 0) {
    for (const ch of data.topChannels) {
      lines.push(createCsvRow([ch.channel, ch.visitors, ch.share, ch.leads, ch.conversionRate]));
    }
  } else {
    lines.push(createCsvRow(["No channel telemetry recorded"]));
  }
  lines.push("");

  // 4. UTM Attribution
  lines.push(createCsvRow(["--- 4. UTM ATTRIBUTION ---"]));
  lines.push(createCsvRow(["UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term", "Visitors", "Leads", "Conversion Rate"]));
  if (data.utmBreakdown && data.utmBreakdown.length > 0) {
    for (const u of data.utmBreakdown) {
      lines.push(createCsvRow([u.source, u.medium, u.campaign, u.content, u.term, u.visitors, u.leads, u.conversionRate]));
    }
  } else {
    lines.push(createCsvRow(["No UTM campaigns captured", "-", "-", "-", "-", 0, 0, "0.0%"]));
  }
  lines.push("");

  // 5. Referrers
  lines.push(createCsvRow(["--- 5. REFERRERS ---"]));
  lines.push(createCsvRow(["Referrer URL / Domain", "Visitors", "Pageviews", "Leads"]));
  if (data.referrerBreakdown && data.referrerBreakdown.length > 0) {
    for (const ref of data.referrerBreakdown) {
      lines.push(createCsvRow([ref.referrer, ref.visitors, ref.pageviews, ref.leads]));
    }
  } else {
    lines.push(createCsvRow(["No external referrers captured", 0, 0, 0]));
  }
  lines.push("");

  // 6. Top Pages
  lines.push(createCsvRow(["--- 6. TOP PAGES ---"]));
  lines.push(createCsvRow(["Route Path", "Pageviews", "Unique Visitors", "Average Dwell Seconds"]));
  if (data.topPages && data.topPages.length > 0) {
    for (const page of data.topPages) {
      lines.push(createCsvRow([page.page, page.views, page.uniqueVisitors, page.avgTimeSec]));
    }
  } else {
    lines.push(createCsvRow(["No page telemetry recorded"]));
  }
  lines.push("");

  // 7. Geography
  lines.push(createCsvRow(["--- 7. GEOGRAPHY ---"]));
  lines.push(createCsvRow(["Country", "Visitors", "Share %"]));
  if (data.topCountries && data.topCountries.length > 0) {
    for (const c of data.topCountries) {
      lines.push(createCsvRow([c.name, c.visitors, `${c.percentage}%`]));
    }
  }
  lines.push(createCsvRow(["City", "Visitors", "Share %"]));
  if (data.topCities && data.topCities.length > 0) {
    for (const city of data.topCities) {
      lines.push(createCsvRow([city.name, city.visitors, `${city.percentage}%`]));
    }
  }
  lines.push("");

  // 8. Technology
  lines.push(createCsvRow(["--- 8. TECHNOLOGY & CLIENT ENVIRONMENT ---"]));
  lines.push(createCsvRow(["Category", "Name", "Visitors", "Share %"]));
  if (data.deviceBreakdown) {
    for (const d of data.deviceBreakdown) {
      lines.push(createCsvRow(["Device", d.name, d.count, `${d.percentage}%`]));
    }
  }
  if (data.browserBreakdown) {
    for (const b of data.browserBreakdown) {
      lines.push(createCsvRow(["Browser", b.name, b.count, `${b.percentage}%`]));
    }
  }
  if (data.osBreakdown) {
    for (const o of data.osBreakdown) {
      lines.push(createCsvRow(["Operating System", o.name, o.count, `${o.percentage}%`]));
    }
  }
  lines.push("");

  // 9. Section Engagement
  lines.push(createCsvRow(["--- 9. SECTION ENGAGEMENT ---"]));
  lines.push(createCsvRow(["Section Identifier", "Engaged Visitors", "Average Dwell (Seconds)"]));
  if (data.sectionEngagement && data.sectionEngagement.length > 0) {
    for (const s of data.sectionEngagement) {
      lines.push(createCsvRow([s.section, s.visitors, s.avgDwellSec]));
    }
  } else {
    lines.push(createCsvRow(["No section dwell events recorded"]));
  }
  lines.push("");

  // 10. Conversion Attribution
  lines.push(createCsvRow(["--- 10. CONVERSION ATTRIBUTION ---"]));
  lines.push(createCsvRow(["Acquisition Channel", "Visitors", "Total Leads", "Qualified Leads", "In-Pipeline Leads", "Conversion Rate"]));
  if (data.conversionAttribution && data.conversionAttribution.length > 0) {
    for (const ca of data.conversionAttribution) {
      lines.push(createCsvRow([ca.source, ca.visitors, ca.totalLeads, ca.qualifiedLeads, ca.inPipelineLeads, ca.conversionRate]));
    }
  } else {
    lines.push(createCsvRow(["No lead conversions recorded for this period"]));
  }

  return lines.join("\r\n");
}

/**
 * Generates structured JSON export payload.
 */
export function generateAnalyticsJson(data: AdminAnalyticsData): string {
  return JSON.stringify(
    {
      meta: {
        system: "Sahyak CRM Website Intelligence",
        target: "https://sahyak.com",
        exportedAt: new Date().toISOString(),
        range: data.range,
      },
      ...data,
    },
    null,
    2
  );
}
