import { NextResponse } from "next/server";
import { quizRepository } from "@/modules/quiz/repository/quiz-repository";

export async function POST(
  _request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  const result = await quizRepository.completeSession(sessionId);

  return NextResponse.json(
    {
      sessionId,
      personalityCode: result.personalityCode,
    },
    { status: 201 },
  );
}
