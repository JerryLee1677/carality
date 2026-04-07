import { emptyScores, type DimensionScores } from "./types";

export function scoreAnswers(
  answers: Array<{ weights: Partial<DimensionScores> }>,
): DimensionScores {
  return answers.reduce((scores, answer) => {
    for (const [key, value] of Object.entries(answer.weights)) {
      scores[key as keyof DimensionScores] += value ?? 0;
    }

    return scores;
  }, emptyScores());
}
