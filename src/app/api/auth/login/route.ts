import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AssessmentApiError, assessmentApiFetch } from "@/lib/assessment-api";

const loginSchema = z.object({
  email: z.string().email(),
  encryptedPassword: z.string().min(1),
});

const SESSION_COOKIE_NAME = "carality_session";

export async function POST(request: NextRequest) {
  try {
    const body = loginSchema.parse(await request.json());
    const response = await assessmentApiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const payload = await response.json();

    const sessionToken = (payload as { sessionToken?: string }).sessionToken;
    if (!sessionToken) {
      return NextResponse.json({ message: "Login failed" }, { status: 502 });
    }

    const nextResponse = NextResponse.json(
      {
        user: (payload as { user?: unknown }).user ?? null,
      },
      { status: 200 },
    );

    nextResponse.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to login";
    const status = error instanceof AssessmentApiError ? error.status : 400;
    return NextResponse.json({ message }, { status });
  }
}
