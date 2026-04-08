import { NextResponse } from "next/server";
import { assessmentApiFetch } from "@/lib/assessment-api";

export async function GET(
  _request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  const response = await assessmentApiFetch(`/assessment/sessions/${sessionId}/current`, {
    method: "GET",
  });
  const result = await response.json();

  return NextResponse.json(result);
}
