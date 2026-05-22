import { NextRequest, NextResponse } from "next/server";
import { AssessmentApiError, assessmentApiFetch } from "@/lib/assessment-api";

const SESSION_COOKIE_NAME = "carality_session";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const response = await assessmentApiFetch("/auth/me", {
      method: "GET",
      headers: {
        "x-session-token": sessionToken,
      },
    });
    const payload = await response.json();
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    if (error instanceof AssessmentApiError && error.status === 401) {
      const response = NextResponse.json({ user: null }, { status: 200 });
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

    const message = error instanceof Error ? error.message : "Failed to load user";
    return NextResponse.json({ message }, { status: 502 });
  }
}
