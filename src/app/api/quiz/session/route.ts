import { NextResponse } from "next/server";
import { quizRepository } from "@/modules/quiz/repository/quiz-repository";

export async function POST() {
  const session = await quizRepository.createSession();

  return NextResponse.json(
    {
      sessionId: session.id,
      status: session.status,
    },
    { status: 201 },
  );
}
