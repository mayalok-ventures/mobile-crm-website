import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  timingSafeCompare,
  generateAdminSessionToken,
} from "@/lib/security";

export const runtime = "edge";

const EXPECTED_ADMIN_TOKEN =
  process.env.ADMIN_ACCESS_TOKEN || "Kunalxca2026@";

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // Rate limiting: max 5 login attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`admin_login_${ip}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many failed authentication attempts. Access locked for 15 minutes.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const token = typeof body.token === "string" ? body.token.trim() : "";

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Access token is required." },
        { status: 400 }
      );
    }

    // Timing-safe comparison to mitigate side-channel timing attacks
    const isValid = timingSafeCompare(token, EXPECTED_ADMIN_TOKEN);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid enterprise access token. Unauthorized access logged.",
        },
        { status: 401 }
      );
    }

    // Issue cryptographic signed session token
    const sessionToken = await generateAdminSessionToken("admin_master");

    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully.",
    });

    // Set secure, HTTP-only, SameSite=Strict cookie
    response.cookies.set({
      name: "sahyak_admin_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (err) {
    console.error("[Admin Auth Error]:", err);
    return NextResponse.json(
      { success: false, error: "Authentication service error." },
      { status: 500 }
    );
  }
}
