"use client";

/**
 * AnalyticsBeacon
 *
 * Fires a lightweight POST to /api/analytics on every page view.
 * No cookies, no third-party scripts, GDPR-safe.
 *
 * Generates a persistent visitor ID in localStorage (first-party only).
 * Generates a session ID in sessionStorage (per-tab).
 *
 * Mount this once in the root layout.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 10)}`;
}

function getOrCreateId(storageKey: string, storage: Storage): string {
  try {
    const existing = storage.getItem(storageKey);
    if (existing) return existing;
    const newId = generateId("v");
    storage.setItem(storageKey, newId);
    return newId;
  } catch {
    return generateId("v");
  }
}

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip admin pages — no self-inflation of analytics
    if (pathname.startsWith("/admin")) return;

    let vid = generateId("v");
    let sid = generateId("s");

    try {
      vid = getOrCreateId("_sahyak_vid", window.localStorage);
      sid = getOrCreateId("_sahyak_sid", window.sessionStorage);
    } catch {
      // Private browsing / storage blocked — use transient IDs
    }

    const referrer = document.referrer || "";

    // Fire and forget — never block rendering
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        referrer,
        vid,
        sid,
      }),
      // Use keepalive so beacon survives page unload
      keepalive: true,
    }).catch(() => {
      // Silent — analytics must never break the page
    });
  }, [pathname]);

  return null; // Renders nothing
}
