import { NextResponse } from "next/server";
import { assessmentApiFetch } from "@/lib/assessment-api";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const response = await assessmentApiFetch("/assessment/sessions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const session = await response.json();

  return NextResponse.json(session, { status: 201 });
}
