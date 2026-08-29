import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "@/lib/security";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("sahyak_admin_session");
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false });
    }

    const { valid } = await verifyAdminSessionToken(sessionCookie.value);
    if (!valid) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
