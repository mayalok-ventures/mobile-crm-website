import crypto from "crypto";

/**
 * Enterprise Application Hardening & Input Sanitization
 */

// HTML escaping to prevent XSS payloads in lead fields
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Strict string sanitizer
export function sanitizeString(
  input: unknown,
  maxLength = 500,
  allowNewlines = false
): string {
  if (typeof input !== "string") return "";
  let clean = input.trim().slice(0, maxLength);
  if (!allowNewlines) {
    clean = clean.replace(/[\r\n]+/g, " ");
  }
  // Strip control characters
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return escapeHtml(clean);
}

// RFC 5322 compliant email validator & normalizer
export function sanitizeEmail(input: unknown): { valid: boolean; email: string } {
  if (typeof input !== "string") return { valid: false, email: "" };
  const clean = input.trim().toLowerCase().slice(0, 254);
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return {
    valid: emailRegex.test(clean),
    email: clean,
  };
}

// International E.164 & standard phone sanitizer
export function sanitizePhone(input: unknown): { valid: boolean; phone: string } {
  if (typeof input !== "string") return { valid: false, phone: "" };
  const clean = input.trim().replace(/[^\d+]/g, "").slice(0, 20);
  const phoneRegex = /^\+?[0-9]{7,16}$/;
  return {
    valid: phoneRegex.test(clean),
    phone: clean,
  };
}

// Timing-safe constant-time string comparison (mitigates timing attacks)
export function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) {
    // Hash them both to equalize length and preserve constant time
    const hashA = crypto.createHash("sha256").update(bufA).digest();
    const hashB = crypto.createHash("sha256").update(bufB).digest();
    return crypto.timingSafeEqual(hashA, hashB) && false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

// Sliding-window IP Rate Limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    // Garbage collection if store grows large
    if (rateLimitStore.size > 2000) {
      for (const [k, v] of rateLimitStore.entries()) {
        if (now > v.resetAt) rateLimitStore.delete(k);
      }
    }
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.resetAt,
  };
}

// Session Token Generation for Admin Authentication
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "sahyak_crm_enterprise_sec_vault_2026_kunal_secure";

export function generateAdminSessionToken(adminId: string): string {
  const issuedAt = Date.now();
  const payload = `${adminId}:${issuedAt}`;
  const hmac = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64url");
}

export function verifyAdminSessionToken(token: string): { valid: boolean; adminId?: string } {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const [adminId, issuedAtStr, hmac] = raw.split(":");
    if (!adminId || !issuedAtStr || !hmac) return { valid: false };

    const issuedAt = parseInt(issuedAtStr, 10);
    // 24 hour session expiration
    if (Date.now() - issuedAt > 24 * 60 * 60 * 1000) return { valid: false };

    const payload = `${adminId}:${issuedAt}`;
    const expectedHmac = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payload)
      .digest("hex");

    if (timingSafeCompare(hmac, expectedHmac)) {
      return { valid: true, adminId };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}
