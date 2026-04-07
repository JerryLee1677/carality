import type { DimensionScores } from "./types";

export function buildPersonalityCode(scores: DimensionScores) {
  const letter1 = scores.practical >= scores.emotional ? "P" : "E";
  const letter2 = scores.saving >= scores.quality ? "S" : "Q";
  const letter3 = scores.comfort >= scores.driving ? "C" : "D";
  const letter4 = scores.brand > scores.value ? "B" : "V";

  return `${letter1}${letter2}${letter3}${letter4}`;
}
