import { NextRequest, NextResponse } from "next/server";
import { AssessmentApiError, assessmentApiFetch } from "@/lib/assessment-api";

const SESSION_COOKIE_NAME = "carality_session";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await assessmentApiFetch("/history", {
      method: "GET",
      headers: {
        "x-session-token": sessionToken,
      },
    });
    const payload = await response.json();
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load history";
    const status = error instanceof AssessmentApiError ? error.status : 502;
    return NextResponse.json({ message }, { status });
  }
}
