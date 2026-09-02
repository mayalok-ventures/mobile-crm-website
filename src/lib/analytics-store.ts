/**
 * Sahyak Production Analytics Engine
 *
 * Full lifecycle visitor, session, pageview, section dwell, live heartbeat,
 * and lead attribution store powered by Cloudflare D1.
 */

import { executeD1Query, executeD1Run, D1Database } from "@/lib/d1-database";

export interface IngestEvent {
  type: "pageview" | "page_duration" | "section_engagement" | "heartbeat";
  visitorId: string;
  sessionId: string;
  path: string;
  title?: string;
  referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  landingPage?: string;
  durationSec?: number;
  sectionId?: string;
  isEntry?: boolean;
  isExit?: boolean;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  ts: number;
}

export interface TrafficDataPoint {
  date: string;
  visitors: number;
  pageviews: number;
  leads: number;
}

export interface ChannelMetrics {
  channel: string;
  visitors: number;
  leads: number;
  conversionRate: string;
  share: string;
}

export interface PageMetrics {
  page: string;
  views: number;
  uniqueVisitors: number;
  avgTimeSec: number;
}

export interface SectionMetrics {
  section: string;
  visitors: number;
  avgDwellSec: number;
}

export interface GeoMetrics {
  name: string;
  visitors: number;
  percentage: number;
}

export interface DeviceMetrics {
  name: string;
  count: number;
  percentage: number;
}

export interface AdminAnalyticsData {
  range: "7d" | "30d" | "1y";
  overview: {
    uniqueVisitors: number;
    newVisitors: number;
    returningVisitors: number;
    returningRate: string;
    liveVisitors: number;
    totalPageviews: number;
    todayVisitors: number;
    todayPageviews: number;
    totalLeads: number;
    overallConversionRate: string;
  };
  trafficSeries: TrafficDataPoint[];
  topChannels: ChannelMetrics[];
  topReferrers: { referrer: string; count: number }[];
  topCampaigns: { campaign: string; visitors: number; leads: number }[];
  topPages: PageMetrics[];
  sectionEngagement: SectionMetrics[];
  topCountries: GeoMetrics[];
  topCities: GeoMetrics[];
  deviceBreakdown: DeviceMetrics[];
  browserBreakdown: DeviceMetrics[];
}

// ── In-Memory Ring Buffer for Local Dev ─────────────────────────────────────────
const MAX_MEM_EVENTS = 1000;
const memPageViews: IngestEvent[] = [];
const memLiveVisitors = new Map<string, { visitorId: string; path: string; lastSeen: number; country: string }>();

// ── Normalise Traffic Source from Referrer & UTM ───────────────────────────────
export function normalizeTrafficChannel(referrer: string, utmSource?: string, utmMedium?: string): string {
  const src = (utmSource || "").toLowerCase();
  const med = (utmMedium || "").toLowerCase();
  const ref = (referrer || "").toLowerCase();

  if (src === "facebook" || src === "meta" || src === "instagram" || ref.includes("facebook.com") || ref.includes("instagram.com") || ref.includes("fb.com")) {
    return "Meta Ads";
  }
  if (src === "google" && (med === "cpc" || med === "ppc" || med === "adwords" || med === "paid")) {
    return "Google Ads";
  }
  if (src === "google" || ref.includes("google.com") || ref.includes("google.co.in")) {
    return "Organic Search";
  }
  if (src === "linkedin" || ref.includes("linkedin.com") || ref.includes("lnkd.in")) {
    return "LinkedIn";
  }
  if (src === "whatsapp" || ref.includes("whatsapp.com") || ref.includes("api.whatsapp.com") || ref.includes("wa.me")) {
    return "WhatsApp Direct";
  }
  if (src === "youtube" || ref.includes("youtube.com") || ref.includes("youtu.be")) {
    return "YouTube";
  }
  if (src === "twitter" || src === "x" || ref.includes("t.co") || ref.includes("twitter.com") || ref.includes("x.com")) {
    return "X / Twitter";
  }
  if (ref && !ref.includes("sahyak.com")) {
    try {
      const url = new URL(ref);
      return url.hostname.replace(/^www\./, "");
    } catch {
      return "Referral";
    }
  }
  return "Direct / Organic";
}

// ── Record Telemetry Event in D1 ──────────────────────────────────────────────
export async function recordAnalyticsEvent(event: IngestEvent, db?: D1Database | null): Promise<void> {
  const channel = normalizeTrafficChannel(event.referrer || "", event.source, event.medium);
  const nowIso = new Date().toISOString();

  if (db) {
    try {
      if (event.type === "pageview") {
        const pvId = `pv_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

        // 1. Upsert visitor
        await executeD1Run(
          db,
          `INSERT INTO visitors (
             visitor_id, first_seen, last_seen, total_sessions, total_pageviews,
             first_source, first_referrer, first_landing_page, country, city, device, browser, os, created_at, updated_at
           ) VALUES (?, ?, ?, 1, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(visitor_id) DO UPDATE SET
             last_seen = ?,
             total_pageviews = total_pageviews + 1,
             country = CASE WHEN country = '' THEN excluded.country ELSE country END,
             city = CASE WHEN city = '' THEN excluded.city ELSE city END,
             updated_at = ?`,
          [
            event.visitorId, event.ts, event.ts, channel, event.referrer || "", event.path,
            event.country || "", event.city || "", event.device || "Desktop", event.browser || "Other", event.os || "Other",
            nowIso, nowIso,
            event.ts, nowIso,
          ]
        );

        // 2. Upsert session
        await executeD1Run(
          db,
          `INSERT INTO sessions (
             session_id, visitor_id, start_time, last_active, page_count, duration_sec,
             entry_page, exit_page, referrer, source, medium, campaign, term, content,
             country, city, device, browser, os, is_bounce, created_at
           ) VALUES (?, ?, ?, ?, 1, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
           ON CONFLICT(session_id) DO UPDATE SET
             last_active = ?,
             page_count = page_count + 1,
             exit_page = ?,
             is_bounce = 0`,
          [
            event.sessionId, event.visitorId, event.ts, event.ts,
            event.path, event.path, event.referrer || "", channel, event.medium || "", event.campaign || "",
            event.term || "", event.content || "", event.country || "", event.city || "",
            event.device || "Desktop", event.browser || "Other", event.os || "Other",
            nowIso,
            event.ts, event.path,
          ]
        );

        // 3. Insert pageview
        await executeD1Run(
          db,
          `INSERT INTO page_views (
             id, visitor_id, session_id, path, title, referrer, source, utm_campaign,
             duration_sec, entry_page, country, city, device, browser, os, is_entry, is_exit, ts, created_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
          [
            pvId, event.visitorId, event.sessionId, event.path, event.title || "",
            event.referrer || "", channel, event.campaign || "", event.landingPage || event.path,
            event.country || "", event.city || "", event.device || "Desktop", event.browser || "Other", event.os || "Other",
            event.isEntry ? 1 : 0, event.ts, nowIso,
          ]
        );

        // 4. Update live visitor table
        await executeD1Run(
          db,
          `INSERT INTO live_visitors (session_id, visitor_id, current_path, last_seen, country, city, device, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(session_id) DO UPDATE SET
             current_path = excluded.current_path,
             last_seen = excluded.last_seen`,
          [
            event.sessionId, event.visitorId, event.path, event.ts,
            event.country || "", event.city || "", event.device || "Desktop", nowIso,
          ]
        );
      } else if (event.type === "page_duration") {
        const sec = Math.min(Math.max(event.durationSec || 0, 1), 7200); // 1s to 2 hours
        // Update pageview duration
        await executeD1Run(
          db,
          `UPDATE page_views SET duration_sec = duration_sec + ?, is_exit = ?
           WHERE session_id = ? AND path = ? AND ts = (
             SELECT MAX(ts) FROM page_views WHERE session_id = ? AND path = ?
           )`,
          [sec, event.isExit ? 1 : 0, event.sessionId, event.path, event.sessionId, event.path]
        );

        // Update session duration
        await executeD1Run(
          db,
          `UPDATE sessions SET duration_sec = duration_sec + ?, last_active = ? WHERE session_id = ?`,
          [sec, event.ts, event.sessionId]
        );
      } else if (event.type === "section_engagement" && event.sectionId) {
        const sec = Math.min(Math.max(event.durationSec || 0, 1), 600);
        const seId = `se_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
        await executeD1Run(
          db,
          `INSERT INTO section_engagements (id, visitor_id, session_id, page_path, section_id, duration_sec, ts, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [seId, event.visitorId, event.sessionId, event.path, event.sectionId, sec, event.ts, nowIso]
        );
      } else if (event.type === "heartbeat") {
        await executeD1Run(
          db,
          `INSERT INTO live_visitors (session_id, visitor_id, current_path, last_seen, country, city, device, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(session_id) DO UPDATE SET
             current_path = excluded.current_path,
             last_seen = excluded.last_seen`,
          [
            event.sessionId, event.visitorId, event.path, event.ts,
            event.country || "", event.city || "", event.device || "Desktop", nowIso,
          ]
        );
      }
    } catch (d1Err) {
      console.error("[AnalyticsStore] D1 write failed:", d1Err);
    }
  }

  // Memory fallback for local dev
  if (event.type === "pageview") {
    memPageViews.unshift(event);
    if (memPageViews.length > MAX_MEM_EVENTS) memPageViews.pop();
    memLiveVisitors.set(event.sessionId, {
      visitorId: event.visitorId,
      path: event.path,
      lastSeen: event.ts,
      country: event.country || "IN",
    });
  } else if (event.type === "heartbeat") {
    const existing = memLiveVisitors.get(event.sessionId);
    if (existing) {
      existing.lastSeen = event.ts;
      existing.path = event.path;
    } else {
      memLiveVisitors.set(event.sessionId, {
        visitorId: event.visitorId,
        path: event.path,
        lastSeen: event.ts,
        country: event.country || "IN",
      });
    }
  }
}

// ── Build Full Admin Analytics Aggregation ────────────────────────────────────
export async function getAdminAnalyticsSummary(
  range: "7d" | "30d" | "1y",
  db?: D1Database | null
): Promise<AdminAnalyticsData> {
  const now = Date.now();
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  let fromTs = now - 7 * 24 * 60 * 60 * 1000;
  if (range === "30d") fromTs = now - 30 * 24 * 60 * 60 * 1000;
  if (range === "1y") fromTs = now - 365 * 24 * 60 * 60 * 1000;

  // Live threshold: last 2.5 minutes (150 seconds)
  const liveThresholdTs = now - 150 * 1000;

  if (db) {
    try {
      // 1. Overview KPIs
      const [
        uniqueVisitorsRes,
        newVisitorsRes,
        pageviewsRes,
        todayPvRes,
        todayVisRes,
        liveVisitorsRes,
        leadsRes,
      ] = await Promise.all([
        executeD1Query<{ count: number }>(
          db,
          "SELECT COUNT(DISTINCT visitor_id) as count FROM page_views WHERE ts >= ?",
          [fromTs]
        ),
        executeD1Query<{ count: number }>(
          db,
          "SELECT COUNT(*) as count FROM visitors WHERE first_seen >= ?",
          [fromTs]
        ),
        executeD1Query<{ count: number }>(
          db,
          "SELECT COUNT(*) as count FROM page_views WHERE ts >= ?",
          [fromTs]
        ),
        executeD1Query<{ count: number }>(
          db,
          "SELECT COUNT(*) as count FROM page_views WHERE ts >= ?",
          [dayStart.getTime()]
        ),
        executeD1Query<{ count: number }>(
          db,
          "SELECT COUNT(DISTINCT visitor_id) as count FROM page_views WHERE ts >= ?",
          [dayStart.getTime()]
        ),
        executeD1Query<{ count: number }>(
          db,
          "SELECT COUNT(DISTINCT session_id) as count FROM live_visitors WHERE last_seen >= ?",
          [liveThresholdTs]
        ),
        executeD1Query<{ count: number }>(
          db,
          "SELECT COUNT(*) as count FROM leads",
          []
        ),
      ]);

      const uniqueVisitors = uniqueVisitorsRes.data[0]?.count || 0;
      const newVisitors = newVisitorsRes.data[0]?.count || 0;
      const returningVisitors = Math.max(0, uniqueVisitors - newVisitors);
      const returningRate = uniqueVisitors > 0
        ? `${Math.round((returningVisitors / uniqueVisitors) * 100)}%`
        : "0%";
      const totalPageviews = pageviewsRes.data[0]?.count || 0;
      const todayPageviews = todayPvRes.data[0]?.count || 0;
      const todayVisitors = todayVisRes.data[0]?.count || 0;
      const liveVisitors = liveVisitorsRes.data[0]?.count || 0;
      const totalLeads = leadsRes.data[0]?.count || 0;
      const overallConversionRate = uniqueVisitors > 0
        ? `${((totalLeads / uniqueVisitors) * 100).toFixed(1)}%`
        : "0.0%";

      // 2. Top Channels with Lead Attributions
      const channelsRes = await executeD1Query<{
        source: string;
        visitors: number;
      }>(
        db,
        `SELECT source, COUNT(DISTINCT visitor_id) as visitors 
         FROM page_views 
         WHERE ts >= ? 
         GROUP BY source 
         ORDER BY visitors DESC 
         LIMIT 8`,
        [fromTs]
      );

      const leadsBySourceRes = await executeD1Query<{
        source: string;
        lead_count: number;
      }>(
        db,
        "SELECT source, COUNT(*) as lead_count FROM leads GROUP BY source",
        []
      );

      const leadSourceMap: Record<string, number> = {};
      leadsBySourceRes.data.forEach((r) => {
        leadSourceMap[r.source] = r.lead_count;
      });

      const topChannels: ChannelMetrics[] = channelsRes.data.map((c) => {
        const vCount = c.visitors || 1;
        const lCount = leadSourceMap[c.source] || 0;
        const conv = ((lCount / vCount) * 100).toFixed(1);
        const share = uniqueVisitors > 0 ? `${Math.round((vCount / uniqueVisitors) * 100)}%` : "0%";
        return {
          channel: c.source || "Direct / Organic",
          visitors: vCount,
          leads: lCount,
          conversionRate: `${conv}%`,
          share,
        };
      });

      // 3. Top Pages
      const pagesRes = await executeD1Query<{
        path: string;
        views: number;
        unique_visitors: number;
        avg_time: number;
      }>(
        db,
        `SELECT path, COUNT(*) as views, COUNT(DISTINCT visitor_id) as unique_visitors, AVG(duration_sec) as avg_time
         FROM page_views
         WHERE ts >= ?
         GROUP BY path
         ORDER BY views DESC
         LIMIT 8`,
        [fromTs]
      );

      const topPages: PageMetrics[] = pagesRes.data.map((p) => ({
        page: p.path,
        views: p.views,
        uniqueVisitors: p.unique_visitors,
        avgTimeSec: Math.round(p.avg_time || 0),
      }));

      // 4. Section Engagement
      const sectionsRes = await executeD1Query<{
        section_id: string;
        visitors: number;
        avg_dwell: number;
      }>(
        db,
        `SELECT section_id, COUNT(DISTINCT visitor_id) as visitors, AVG(duration_sec) as avg_dwell
         FROM section_engagements
         WHERE ts >= ?
         GROUP BY section_id
         ORDER BY avg_dwell DESC
         LIMIT 8`,
        [fromTs]
      );

      const sectionEngagement: SectionMetrics[] = sectionsRes.data.map((s) => ({
        section: s.section_id,
        visitors: s.visitors,
        avgDwellSec: Math.round(s.avg_dwell || 0),
      }));

      // 5. Geo (Countries & Cities)
      const [countriesRes, citiesRes] = await Promise.all([
        executeD1Query<{ country: string; count: number }>(
          db,
          `SELECT country, COUNT(DISTINCT visitor_id) as count
           FROM page_views
           WHERE ts >= ? AND country != ''
           GROUP BY country
           ORDER BY count DESC
           LIMIT 6`,
          [fromTs]
        ),
        executeD1Query<{ city: string; count: number }>(
          db,
          `SELECT city, COUNT(DISTINCT visitor_id) as count
           FROM page_views
           WHERE ts >= ? AND city != ''
           GROUP BY city
           ORDER BY count DESC
           LIMIT 6`,
          [fromTs]
        ),
      ]);

      const topCountries: GeoMetrics[] = countriesRes.data.map((c) => ({
        name: c.country === "IN" ? "India (IN)" : c.country,
        visitors: c.count,
        percentage: uniqueVisitors > 0 ? Math.round((c.count / uniqueVisitors) * 100) : 0,
      }));

      const topCities: GeoMetrics[] = citiesRes.data.map((c) => ({
        name: c.city || "Unknown City",
        visitors: c.count,
        percentage: uniqueVisitors > 0 ? Math.round((c.count / uniqueVisitors) * 100) : 0,
      }));

      // 6. Devices & Browsers
      const [devicesRes, browsersRes] = await Promise.all([
        executeD1Query<{ device: string; count: number }>(
          db,
          `SELECT device, COUNT(DISTINCT visitor_id) as count
           FROM page_views
           WHERE ts >= ?
           GROUP BY device
           ORDER BY count DESC`,
          [fromTs]
        ),
        executeD1Query<{ browser: string; count: number }>(
          db,
          `SELECT browser, COUNT(DISTINCT visitor_id) as count
           FROM page_views
           WHERE ts >= ?
           GROUP BY browser
           ORDER BY count DESC`,
          [fromTs]
        ),
      ]);

      const deviceBreakdown: DeviceMetrics[] = devicesRes.data.map((d) => ({
        name: d.device || "Desktop",
        count: d.count,
        percentage: uniqueVisitors > 0 ? Math.round((d.count / uniqueVisitors) * 100) : 0,
      }));

      const browserBreakdown: DeviceMetrics[] = browsersRes.data.map((b) => ({
        name: b.browser || "Other",
        count: b.count,
        percentage: uniqueVisitors > 0 ? Math.round((b.count / uniqueVisitors) * 100) : 0,
      }));

      // 7. Historical Traffic Series (7D, 30D, 1Y)
      const trafficSeries = await buildTrafficSeries(db, range, totalLeads);

      return {
        range,
        overview: {
          uniqueVisitors,
          newVisitors,
          returningVisitors,
          returningRate,
          liveVisitors,
          totalPageviews,
          todayVisitors,
          todayPageviews,
          totalLeads,
          overallConversionRate,
        },
        trafficSeries,
        topChannels,
        topReferrers: [],
        topCampaigns: [],
        topPages,
        sectionEngagement,
        topCountries,
        topCities,
        deviceBreakdown,
        browserBreakdown,
      };
    } catch (d1Err) {
      console.error("[AnalyticsStore] D1 summary aggregation failed:", d1Err);
    }
  }

  // Fallback for empty/dev environment
  return buildEmptyDevSummary(range);
}

// ── Build Traffic Series with Discrete Date Buckets ────────────────────────────
async function buildTrafficSeries(
  db: D1Database,
  range: "7d" | "30d" | "1y",
  totalLeads: number
): Promise<TrafficDataPoint[]> {
  const buckets: TrafficDataPoint[] = [];
  const daysCount = range === "7d" ? 7 : range === "30d" ? 30 : 12;

  if (range === "1y") {
    // 12 monthly buckets
    for (let m = 11; m >= 0; m--) {
      const start = new Date();
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      start.setMonth(start.getMonth() - m);

      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      const res = await executeD1Query<{ visitors: number; pageviews: number }>(
        db,
        "SELECT COUNT(DISTINCT visitor_id) as visitors, COUNT(*) as pageviews FROM page_views WHERE ts >= ? AND ts < ?",
        [start.getTime(), end.getTime()]
      );

      const row = res.data[0] || { visitors: 0, pageviews: 0 };
      buckets.push({
        date: start.toLocaleDateString("en-US", { month: "short" }),
        visitors: row.visitors,
        pageviews: row.pageviews,
        leads: 0,
      });
    }
  } else {
    // Daily buckets
    for (let d = daysCount - 1; d >= 0; d--) {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - d);

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const res = await executeD1Query<{ visitors: number; pageviews: number }>(
        db,
        "SELECT COUNT(DISTINCT visitor_id) as visitors, COUNT(*) as pageviews FROM page_views WHERE ts >= ? AND ts < ?",
        [start.getTime(), end.getTime()]
      );

      const row = res.data[0] || { visitors: 0, pageviews: 0 };
      const label = d === 0 ? "Today" : start.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      buckets.push({
        date: label,
        visitors: row.visitors,
        pageviews: row.pageviews,
        leads: 0,
      });
    }
  }

  // Populate leads in current bucket
  if (totalLeads > 0 && buckets.length > 0) {
    buckets[buckets.length - 1].leads = totalLeads;
  }

  return buckets;
}

// ── Empty / Zero Dev Baseline ──────────────────────────────────────────────────
function buildEmptyDevSummary(range: "7d" | "30d" | "1y"): AdminAnalyticsData {
  const points: TrafficDataPoint[] = [];
  const count = range === "7d" ? 7 : range === "30d" ? 30 : 12;

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    points.push({ date: label, visitors: 0, pageviews: 0, leads: 0 });
  }

  return {
    range,
    overview: {
      uniqueVisitors: 0,
      newVisitors: 0,
      returningVisitors: 0,
      returningRate: "0%",
      liveVisitors: 0,
      totalPageviews: 0,
      todayVisitors: 0,
      todayPageviews: 0,
      totalLeads: 0,
      overallConversionRate: "0.0%",
    },
    trafficSeries: points,
    topChannels: [],
    topReferrers: [],
    topCampaigns: [],
    topPages: [],
    sectionEngagement: [],
    topCountries: [],
    topCities: [],
    deviceBreakdown: [],
    browserBreakdown: [],
  };
}
