/**
 * Cloudflare D1 Context Accessor
 *
 * Safely retrieves the D1 database binding from Cloudflare Pages runtime
 * using @cloudflare/next-on-pages getRequestContext().
 *
 * Falls back to null gracefully in local Next.js dev (no binding available),
 * so all callers must handle db === null with in-memory fallback.
 */

import type { D1Database } from "@/lib/d1-database";

/**
 * Retrieves the Cloudflare D1 database binding from the request context.
 * Returns null in local dev or when the binding is unavailable.
 */
export function getD1Database(): D1Database | null {
  try {
    // Dynamically require to avoid breaking local Next.js dev build
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getRequestContext } = require("@cloudflare/next-on-pages");
    const ctx = getRequestContext();
    const db = ctx?.env?.DB as D1Database | undefined;
    return db ?? null;
  } catch {
    // Not running on Cloudflare Pages — local dev fallback
    return null;
  }
}
