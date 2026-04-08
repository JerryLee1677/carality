import { QuizSessionClient } from "@/components/quiz/quiz-session-client";

export default async function QuizSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <QuizSessionClient sessionId={sessionId} />;
}
