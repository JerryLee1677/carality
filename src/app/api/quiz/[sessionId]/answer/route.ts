import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assessmentApiFetch } from "@/lib/assessment-api";

const answerSchema = z.object({
  questionId: z.string(),
  optionId: z.string(),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  try {
    const body = answerSchema.parse(await request.json());
    const { sessionId } = await context.params;

    const response = await assessmentApiFetch(`/assessment/sessions/${sessionId}/answers`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const payload = await response.json();

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit answer";

    return NextResponse.json(
      {
        message,
      },
      { status: 502 },
    );
  }
}
