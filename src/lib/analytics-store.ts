/**
 * Analytics Store — Real Visitor Tracking
 *
 * Stores page view events in Cloudflare D1 when available,
 * with an edge in-memory fallback ring buffer for local dev.
 *
 * D1 Table: page_views
 * Schema:
 *   id TEXT PRIMARY KEY,
 *   page TEXT NOT NULL,
 *   referrer TEXT,
 *   country TEXT,
 *   city TEXT,
 *   device TEXT,
 *   browser TEXT,
 *   visitor_hash TEXT,
 *   session_hash TEXT,
 *   ts INTEGER NOT NULL,        -- Unix timestamp (ms)
 *   created_at TEXT NOT NULL    -- ISO string
 */

import { executeD1Query, D1Database } from "@/lib/d1-database";

export interface PageViewEvent {
  id: string;
  page: string;
  referrer: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  visitor_hash: string;
  session_hash: string;
  ts: number;
  created_at: string;
}

// ─── Edge in-memory ring buffer (attached to globalThis for local dev) ─────────────
const MAX_EDGE_EVENTS = 2000;
const globalForAnalytics = globalThis as unknown as { __edgePageViews?: PageViewEvent[] };
if (!globalForAnalytics.__edgePageViews) {
  globalForAnalytics.__edgePageViews = [];
}
const edgePageViews = globalForAnalytics.__edgePageViews;

// ─── Save a page view event ───────────────────────────────────────────────────
export async function savePageView(event: PageViewEvent, db?: D1Database | null): Promise<void> {
  if (db) {
    try {
      await executeD1Query(
        db,
        `INSERT OR IGNORE INTO page_views
           (id, page, referrer, country, city, device, browser, visitor_hash, session_hash, ts, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          event.id,
          event.page,
          event.referrer,
          event.country,
          event.city,
          event.device,
          event.browser,
          event.visitor_hash,
          event.session_hash,
          event.ts,
          event.created_at,
        ]
      );
    } catch (err) {
      console.error("[Analytics] D1 insert error:", err);
    }
  }

  // Always add to edge buffer
  edgePageViews.unshift(event);
  if (edgePageViews.length > MAX_EDGE_EVENTS) edgePageViews.pop();
}

// ─── Query helpers ─────────────────────────────────────────────────────────────

export interface TrafficDay {
  date: string;       // "Sep 01"
  visitors: number;   // unique visitor_hash count
  pageviews: number;  // total events
  leads: number;      // derived from lead count
}

export interface AnalyticsSummary {
  totalPageviews: number;
  uniqueVisitors: number;
  todayPageviews: number;
  todayVisitors: number;
  topPages: { page: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  deviceBreakdown: { device: string; count: number }[];
  countryBreakdown: { country: string; count: number }[];
  traffic7d: TrafficDay[];
  traffic30d: TrafficDay[];
}

/**
 * Build analytics summary from D1 or edge buffer
 */
export async function getAnalyticsSummary(
  leadCount: number,
  db?: D1Database | null
): Promise<AnalyticsSummary> {
  if (db) {
    try {
      return await buildFromD1(leadCount, db);
    } catch (err) {
      console.error("[Analytics] D1 summary error:", err);
    }
  }
  return buildFromEdgeBuffer(leadCount);
}

// ─── D1-backed analytics ──────────────────────────────────────────────────────
async function buildFromD1(leadCount: number, db: D1Database): Promise<AnalyticsSummary> {
  const now = Date.now();
  const day7Ago = now - 7 * 24 * 60 * 60 * 1000;
  const day30Ago = now - 30 * 24 * 60 * 60 * 1000;
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const [totalRes, todayRes, topPagesRes, topReferrersRes, devicesRes, countriesRes] =
    await Promise.all([
      executeD1Query<{ total: number; unique_visitors: number }>(
        db,
        "SELECT COUNT(*) as total, COUNT(DISTINCT visitor_hash) as unique_visitors FROM page_views",
        []
      ),
      executeD1Query<{ total: number; unique_visitors: number }>(
        db,
        "SELECT COUNT(*) as total, COUNT(DISTINCT visitor_hash) as unique_visitors FROM page_views WHERE ts >= ?",
        [dayStart.getTime()]
      ),
      executeD1Query<{ page: string; views: number }>(
        db,
        "SELECT page, COUNT(*) as views FROM page_views GROUP BY page ORDER BY views DESC LIMIT 8",
        []
      ),
      executeD1Query<{ referrer: string; views: number }>(
        db,
        "SELECT CASE WHEN referrer = '' OR referrer IS NULL THEN 'Direct / Organic' ELSE referrer END as referrer, COUNT(*) as views FROM page_views GROUP BY referrer ORDER BY views DESC LIMIT 6",
        []
      ),
      executeD1Query<{ device: string; count: number }>(
        db,
        "SELECT device, COUNT(*) as count FROM page_views GROUP BY device ORDER BY count DESC",
        []
      ),
      executeD1Query<{ country: string; count: number }>(
        db,
        "SELECT country, COUNT(*) as count FROM page_views WHERE country != '' GROUP BY country ORDER BY count DESC LIMIT 6",
        []
      ),
    ]);

  // 7-day traffic chart
  const traffic7d = await buildDailyBuckets(db, day7Ago, 7, leadCount);
  // 30-day traffic chart
  const traffic30d = await buildWeeklyBuckets(db, day30Ago, leadCount);

  const totalRow = totalRes.data[0] || { total: 0, unique_visitors: 0 };
  const todayRow = todayRes.data[0] || { total: 0, unique_visitors: 0 };

  return {
    totalPageviews: totalRow.total,
    uniqueVisitors: totalRow.unique_visitors,
    todayPageviews: todayRow.total,
    todayVisitors: todayRow.unique_visitors,
    topPages: topPagesRes.data,
    topReferrers: topReferrersRes.data,
    deviceBreakdown: devicesRes.data,
    countryBreakdown: countriesRes.data,
    traffic7d,
    traffic30d,
  };
}

async function buildDailyBuckets(
  db: D1Database,
  fromTs: number,
  days: number,
  leadCount: number
): Promise<TrafficDay[]> {
  const buckets: TrafficDay[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const bucketStart = new Date();
    bucketStart.setHours(0, 0, 0, 0);
    bucketStart.setDate(bucketStart.getDate() - i);
    const bucketEnd = new Date(bucketStart);
    bucketEnd.setDate(bucketEnd.getDate() + 1);

    const res = await executeD1Query<{ pageviews: number; visitors: number }>(
      db,
      "SELECT COUNT(*) as pageviews, COUNT(DISTINCT visitor_hash) as visitors FROM page_views WHERE ts >= ? AND ts < ?",
      [bucketStart.getTime(), bucketEnd.getTime()]
    );

    const row = res.data[0] || { pageviews: 0, visitors: 0 };
    const label = i === 0 ? "Today" : bucketStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    buckets.push({
      date: label,
      visitors: row.visitors,
      pageviews: row.pageviews,
      leads: i === 0 ? leadCount : 0,
    });
  }

  // Sprinkle lead count across last 7 days proportionally (rough)
  if (leadCount > 0) {
    const totalViews = buckets.reduce((s, b) => s + b.pageviews, 0);
    if (totalViews > 0) {
      buckets.forEach((b) => {
        b.leads = Math.round((b.pageviews / totalViews) * leadCount);
      });
    }
  }

  return buckets;
}

async function buildWeeklyBuckets(db: D1Database, fromTs: number, leadCount: number): Promise<TrafficDay[]> {
  const buckets: TrafficDay[] = [];

  for (let w = 3; w >= 0; w--) {
    const weekStart = new Date();
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() - w * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const res = await executeD1Query<{ pageviews: number; visitors: number }>(
      db,
      "SELECT COUNT(*) as pageviews, COUNT(DISTINCT visitor_hash) as visitors FROM page_views WHERE ts >= ? AND ts < ?",
      [weekStart.getTime(), weekEnd.getTime()]
    );

    const row = res.data[0] || { pageviews: 0, visitors: 0 };
    buckets.push({
      date: `Week ${4 - w}`,
      visitors: row.visitors,
      pageviews: row.pageviews,
      leads: 0,
    });
  }

  if (leadCount > 0) {
    const total = buckets.reduce((s, b) => s + b.pageviews, 0);
    if (total > 0) {
      buckets.forEach((b) => {
        b.leads = Math.round((b.pageviews / total) * leadCount);
      });
    }
  }

  return buckets;
}

// ─── Edge buffer fallback ────────────────────────────────────────────────────
function buildFromEdgeBuffer(leadCount: number): AnalyticsSummary {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const todayViews = edgePageViews.filter((e) => e.ts >= dayStart.getTime());
  const uniqueVisitors = new Set(edgePageViews.map((e) => e.visitor_hash)).size;
  const todayVisitors = new Set(todayViews.map((e) => e.visitor_hash)).size;

  // Top pages
  const pageCounts: Record<string, number> = {};
  edgePageViews.forEach((e) => { pageCounts[e.page] = (pageCounts[e.page] || 0) + 1; });
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([page, views]) => ({ page, views }));

  // Top referrers
  const refCounts: Record<string, number> = {};
  edgePageViews.forEach((e) => {
    const ref = e.referrer || "Direct / Organic";
    refCounts[ref] = (refCounts[ref] || 0) + 1;
  });
  const topReferrers = Object.entries(refCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([referrer, views]) => ({ referrer, views }));

  // Device breakdown
  const deviceCounts: Record<string, number> = {};
  edgePageViews.forEach((e) => { deviceCounts[e.device] = (deviceCounts[e.device] || 0) + 1; });
  const deviceBreakdown = Object.entries(deviceCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([device, count]) => ({ device, count }));

  // Country breakdown
  const countryCounts: Record<string, number> = {};
  edgePageViews.forEach((e) => {
    if (e.country) countryCounts[e.country] = (countryCounts[e.country] || 0) + 1;
  });
  const countryBreakdown = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([country, count]) => ({ country, count }));

  // 7-day chart from edge buffer
  const traffic7d: TrafficDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const dEnd = new Date(d);
    dEnd.setDate(dEnd.getDate() + 1);
    const dayViews = edgePageViews.filter((e) => e.ts >= d.getTime() && e.ts < dEnd.getTime());
    const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    traffic7d.push({
      date: label,
      visitors: new Set(dayViews.map((e) => e.visitor_hash)).size,
      pageviews: dayViews.length,
      leads: 0,
    });
  }

  // Sprinkle leads proportionally
  if (leadCount > 0) {
    const total = traffic7d.reduce((s, b) => s + b.pageviews, 0);
    if (total > 0) {
      traffic7d.forEach((b) => { b.leads = Math.round((b.pageviews / total) * leadCount); });
    } else {
      traffic7d[traffic7d.length - 1].leads = leadCount;
    }
  }

  // 30-day (weekly buckets)
  const traffic30d: TrafficDay[] = [
    { date: "Week 1", visitors: 0, pageviews: 0, leads: 0 },
    { date: "Week 2", visitors: 0, pageviews: 0, leads: 0 },
    { date: "Week 3", visitors: 0, pageviews: 0, leads: 0 },
    { date: "Week 4", visitors: 0, pageviews: 0, leads: 0 },
  ];

  edgePageViews.forEach((e) => {
    const weeksAgo = Math.floor((Date.now() - e.ts) / (7 * 24 * 60 * 60 * 1000));
    const idx = 3 - Math.min(weeksAgo, 3);
    traffic30d[idx].pageviews++;
    // unique visitors approximation
    traffic30d[idx].visitors = Math.ceil(traffic30d[idx].pageviews * 0.7);
  });

  return {
    totalPageviews: edgePageViews.length,
    uniqueVisitors,
    todayPageviews: todayViews.length,
    todayVisitors,
    topPages,
    topReferrers,
    deviceBreakdown,
    countryBreakdown,
    traffic7d,
    traffic30d,
  };
}
