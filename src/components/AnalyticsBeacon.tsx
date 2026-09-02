"use client";

/**
 * Sahyak Production Analytics Beacon
 *
 * Full client-side telemetry:
 * 1. Anonymous First-Party Identity (localStorage visitor_id, sessionStorage session_id)
 * 2. Route Change & Page View Telemetry with UTM attribution
 * 3. Accurate Active Time on Page (Visibility API aware, sendBeacon on exit)
 * 4. Section Engagement Dwell Tracking (IntersectionObserver on data-analytics-section)
 * 5. Live Telemetry Heartbeat (every 25s while tab is visible)
 *
 * Excludes /admin and /api routes.
 * Zero third-party cookies or scripts.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function generateSecureId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID().replace(/-/g, "").substring(0, 16)}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}`;
}

function getOrCreateStorageId(key: string, storage: Storage, prefix: string): string {
  try {
    const existing = storage.getItem(key);
    if (existing && existing.length > 5) return existing;
    const newId = generateSecureId(prefix);
    storage.setItem(key, newId);
    return newId;
  } catch {
    return generateSecureId(prefix);
  }
}

function parseUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    };
  } catch {
    return {};
  }
}

function sendTelemetry(payload: Record<string, unknown>): void {
  try {
    const data = JSON.stringify(payload);
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([data], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/analytics", blob);
      if (sent) return;
    }
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Non-blocking
  }
}

export function AnalyticsBeacon() {
  const pathname = usePathname();
  const pageStartTimeRef = useRef<number>(Date.now());
  const activeDurationRef = useRef<number>(0);
  const isTabVisibleRef = useRef<boolean>(true);
  const lastVisibilityChangeRef = useRef<number>(Date.now());
  const currentPathRef = useRef<string>(pathname);
  const isFirstPageRef = useRef<boolean>(true);

  // Section dwell tracking refs
  const sectionDwellMapRef = useRef<Map<string, { startTime: number; totalDwell: number }>>(new Map());

  currentPathRef.current = pathname;

  // ── 1. Page View & Active Duration on Navigation ─────────────────────────────
  useEffect(() => {
    // Exclude admin pages
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    const vid = getOrCreateStorageId("_sahyak_vid", window.localStorage, "v");
    const sid = getOrCreateStorageId("_sahyak_sid", window.sessionStorage, "s");
    const landingPage = getOrCreateStorageId("_sahyak_landing", window.sessionStorage, "lp") === "lp"
      ? pathname
      : window.sessionStorage.getItem("_sahyak_landing") || pathname;

    if (!window.sessionStorage.getItem("_sahyak_landing")) {
      try {
        window.sessionStorage.setItem("_sahyak_landing", pathname);
      } catch {}
    }

    const utm = parseUtmParams();
    const referrer = document.referrer || "";

    // 1. Send Page View event
    sendTelemetry({
      type: "pageview",
      vid,
      sid,
      page: pathname,
      title: document.title || "",
      referrer,
      landing_page: landingPage,
      isEntry: isFirstPageRef.current,
      ...utm,
    });

    isFirstPageRef.current = false;
    pageStartTimeRef.current = Date.now();
    activeDurationRef.current = 0;
    lastVisibilityChangeRef.current = Date.now();
    isTabVisibleRef.current = !document.hidden;

    // Flush previous page duration on unmount / route change
    return () => {
      let duration = activeDurationRef.current;
      if (isTabVisibleRef.current) {
        duration += Math.round((Date.now() - lastVisibilityChangeRef.current) / 1000);
      }

      if (duration >= 1) {
        sendTelemetry({
          type: "page_duration",
          vid,
          sid,
          page: pathname,
          duration,
          isExit: false,
        });
      }
    };
  }, [pathname]);

  // ── 2. Visibility Change & Unload Handlers ────────────────────────────────────
  useEffect(() => {
    const handleVisibilityChange = () => {
      const vid = getOrCreateStorageId("_sahyak_vid", window.localStorage, "v");
      const sid = getOrCreateStorageId("_sahyak_sid", window.sessionStorage, "s");
      const currentPath = currentPathRef.current;

      if (document.hidden) {
        // Tab became hidden — tally active time
        if (isTabVisibleRef.current) {
          activeDurationRef.current += Math.round((Date.now() - lastVisibilityChangeRef.current) / 1000);
          isTabVisibleRef.current = false;
        }
      } else {
        // Tab became visible again — reset clock and send heartbeat
        isTabVisibleRef.current = true;
        lastVisibilityChangeRef.current = Date.now();

        if (!currentPath.startsWith("/admin")) {
          sendTelemetry({
            type: "heartbeat",
            vid,
            sid,
            page: currentPath,
          });
        }
      }
    };

    const handlePageHide = () => {
      const currentPath = currentPathRef.current;
      if (currentPath.startsWith("/admin")) return;

      const vid = getOrCreateStorageId("_sahyak_vid", window.localStorage, "v");
      const sid = getOrCreateStorageId("_sahyak_sid", window.sessionStorage, "s");

      let totalSec = activeDurationRef.current;
      if (isTabVisibleRef.current) {
        totalSec += Math.round((Date.now() - lastVisibilityChangeRef.current) / 1000);
      }

      if (totalSec >= 1) {
        sendTelemetry({
          type: "page_duration",
          vid,
          sid,
          page: currentPath,
          duration: totalSec,
          isExit: true,
        });
      }

      // Flush any active section dwells
      sectionDwellMapRef.current.forEach((val, sectionId) => {
        const dwell = val.totalDwell + (val.startTime > 0 ? Math.round((Date.now() - val.startTime) / 1000) : 0);
        if (dwell >= 2) {
          sendTelemetry({
            type: "section_engagement",
            vid,
            sid,
            page: currentPath,
            sectionId,
            duration: dwell,
          });
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
    };
  }, []);

  // ── 3. Live Heartbeat Interval (Every 25s while visible) ──────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      const currentPath = currentPathRef.current;
      if (document.hidden || currentPath.startsWith("/admin")) return;

      const vid = getOrCreateStorageId("_sahyak_vid", window.localStorage, "v");
      const sid = getOrCreateStorageId("_sahyak_sid", window.sessionStorage, "s");

      sendTelemetry({
        type: "heartbeat",
        vid,
        sid,
        page: currentPath,
      });
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  // ── 4. Section Engagement Observer (IntersectionObserver) ────────────────────
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    if (typeof IntersectionObserver === "undefined") return;

    const vid = getOrCreateStorageId("_sahyak_vid", window.localStorage, "v");
    const sid = getOrCreateStorageId("_sahyak_sid", window.sessionStorage, "s");

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const sectionId = target.dataset.analyticsSection;
          if (!sectionId) return;

          let data = sectionDwellMapRef.current.get(sectionId);
          if (!data) {
            data = { startTime: 0, totalDwell: 0 };
            sectionDwellMapRef.current.set(sectionId, data);
          }

          if (entry.isIntersecting) {
            // Entered view (>= 35% visible)
            if (data.startTime === 0) {
              data.startTime = now;
            }
          } else {
            // Left view
            if (data.startTime > 0) {
              const elapsed = Math.round((now - data.startTime) / 1000);
              data.totalDwell += elapsed;
              data.startTime = 0;

              // If dwelled for >= 2 seconds, record section engagement
              if (data.totalDwell >= 2) {
                sendTelemetry({
                  type: "section_engagement",
                  vid,
                  sid,
                  page: pathname,
                  sectionId,
                  duration: data.totalDwell,
                });
                data.totalDwell = 0; // Reset after sending
              }
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    // Observe all sections with data-analytics-section attribute
    const elements = document.querySelectorAll("[data-analytics-section]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
