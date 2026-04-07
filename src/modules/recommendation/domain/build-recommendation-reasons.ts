import type { DimensionScores } from "@/modules/quiz/domain/types";

const dimensionLabels: Record<keyof DimensionScores, string> = {
  practical: "实用",
  emotional: "情绪价值",
  saving: "省钱",
  quality: "品质",
  comfort: "舒适",
  driving: "驾控",
  brand: "品牌",
  value: "性价比",
};

export function buildRecommendationReasons(
  userScores: DimensionScores,
  vehicleWeights: Record<keyof DimensionScores, number>,
) {
  const topDimensions = Object.entries(userScores)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 2)
    .map(([key]) => key as keyof DimensionScores);

  return topDimensions
    .filter((key) => vehicleWeights[key] > 0)
    .map(
      (key) =>
        `你更重视${dimensionLabels[key]}，而这台车在${dimensionLabels[key]}维度上的表现也更突出`,
    )
    .join("；");
}
