/**
 * Cloudflare D1 Context Accessor
 *
 * Safely retrieves the D1 database binding from Cloudflare Pages / Workers runtime.
 *
 * Checks:
 * 1. Global binding `globalThis.DB` (standard Cloudflare Workers/Pages global scope)
 * 2. `process.env.DB` (Next.js environment binding)
 * 3. `globalThis.__env__?.DB` or `globalThis.env?.DB`
 * 4. `getRequestContext().env.DB` from `@cloudflare/next-on-pages`
 *
 * Falls back to null gracefully in local Next.js dev (in-memory fallback).
 */

import type { D1Database } from "@/lib/d1-database";

export function getD1Database(): D1Database | null {
  // 1. Check direct global binding (Cloudflare Workers native global scope)
  try {
    const g = globalThis as unknown as Record<string, unknown>;
    if (g.DB && typeof (g.DB as D1Database).prepare === "function") {
      return g.DB as D1Database;
    }
  } catch {
    // Ignore
  }

  // 2. Check process.env.DB
  try {
    const penv = process.env as unknown as Record<string, unknown>;
    if (penv.DB && typeof (penv.DB as D1Database).prepare === "function") {
      return penv.DB as D1Database;
    }
  } catch {
    // Ignore
  }

  // 3. Check globalThis.env?.DB or globalThis.__env__?.DB
  try {
    const g = globalThis as unknown as {
      env?: { DB?: D1Database };
      __env__?: { DB?: D1Database };
    };
    if (g.env?.DB && typeof g.env.DB.prepare === "function") {
      return g.env.DB;
    }
    if (g.__env__?.DB && typeof g.__env__.DB.prepare === "function") {
      return g.__env__.DB;
    }
  } catch {
    // Ignore
  }

  // 4. Try @cloudflare/next-on-pages getRequestContext
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nextOnPages = require("@cloudflare/next-on-pages");
    if (typeof nextOnPages.getRequestContext === "function") {
      const ctx = nextOnPages.getRequestContext();
      const db = ctx?.env?.DB as D1Database | undefined;
      if (db && typeof db.prepare === "function") {
        return db;
      }
    }
  } catch {
    // Not running under next-on-pages context
  }

  return null;
}
