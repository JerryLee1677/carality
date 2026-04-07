export function createQuizSession() {
  return {
    status: "draft",
    currentQuestion: 0,
  } as const;
}
