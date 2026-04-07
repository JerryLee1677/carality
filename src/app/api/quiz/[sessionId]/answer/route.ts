import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { quizRepository } from "@/modules/quiz/repository/quiz-repository";

const answerSchema = z.object({
  questionId: z.string(),
  optionId: z.string(),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  const body = answerSchema.parse(await request.json());
  const { sessionId } = await context.params;

  await quizRepository.saveAnswer(sessionId, body.questionId, body.optionId);

  return NextResponse.json({ ok: true }, { status: 201 });
}
