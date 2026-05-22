import { NextResponse } from "next/server";
import { assessmentApiFetch } from "@/lib/assessment-api";

export async function GET() {
  const response = await assessmentApiFetch("/auth/public-key", {
    method: "GET",
  });
  const payload = await response.json();
  return NextResponse.json(payload);
}

