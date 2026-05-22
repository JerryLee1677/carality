import { NextResponse } from "next/server";
import { assessmentApiFetch } from "@/lib/assessment-api";

const SESSION_COOKIE_NAME = "carality_session";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const sessionToken = (request as { cookies?: { get?: (name: string) => { value?: string } } })
    .cookies?.get?.(SESSION_COOKIE_NAME)?.value;
  const response = await assessmentApiFetch("/assessment/sessions", {
    method: "POST",
    headers: sessionToken
      ? {
          "x-session-token": sessionToken,
        }
      : undefined,
    body: JSON.stringify(payload),
  });
  const session = await response.json();

  return NextResponse.json(session, { status: 201 });
}
