import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AssessmentApiError, assessmentApiFetch } from "@/lib/assessment-api";

const registerSchema = z.object({
  email: z.string().email(),
  encryptedPassword: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = registerSchema.parse(await request.json());
    const response = await assessmentApiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    return NextResponse.json(payload, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to register";
    const status = error instanceof AssessmentApiError ? error.status : 400;
    return NextResponse.json({ message }, { status });
  }
}
