import { NextRequest, NextResponse } from "next/server";
import { assessmentApiFetch } from "@/lib/assessment-api";

const SESSION_COOKIE_NAME = "carality_session";

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await assessmentApiFetch("/auth/logout", {
      method: "POST",
      headers: {
        "x-session-token": sessionToken,
      },
    }).catch(() => null);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
