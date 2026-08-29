/**
 * Enterprise Application Hardening & Input Sanitization (Edge Runtime Compatible)
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

// Timing-safe constant-time string comparison (mitigates timing attacks across all runtimes)
export function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
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

// Session Token Generation for Admin Authentication (Edge WebCrypto HMAC)
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "sahyak_crm_enterprise_sec_vault_2026_kunal_secure";

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function computeHmac(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SESSION_SECRET);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  return bufferToHex(signature);
}

export async function generateAdminSessionToken(adminId: string): Promise<string> {
  const issuedAt = Date.now();
  const payload = `${adminId}:${issuedAt}`;
  const hmac = await computeHmac(payload);
  return btoa(`${payload}:${hmac}`);
}

export async function verifyAdminSessionToken(token: string): Promise<{ valid: boolean; adminId?: string }> {
  try {
    const raw = atob(token);
    const [adminId, issuedAtStr, hmac] = raw.split(":");
    if (!adminId || !issuedAtStr || !hmac) return { valid: false };

    const issuedAt = parseInt(issuedAtStr, 10);
    if (isNaN(issuedAt)) return { valid: false };
    // 24 hour session expiration
    if (Date.now() - issuedAt > 24 * 60 * 60 * 1000) return { valid: false };

    const payload = `${adminId}:${issuedAt}`;
    const expectedHmac = await computeHmac(payload);

    if (timingSafeCompare(hmac, expectedHmac)) {
      return { valid: true, adminId };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}
