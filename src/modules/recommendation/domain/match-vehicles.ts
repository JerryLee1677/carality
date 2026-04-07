import type { DimensionScores } from "@/modules/quiz/domain/types";

type VehicleCandidate = {
  slug: string;
  brand?: string;
  series?: string;
  modelName: string;
  dimensionWeights: Record<keyof DimensionScores, number>;
};

export function matchVehicles(
  userScores: DimensionScores,
  vehicles: VehicleCandidate[],
) {
  return vehicles
    .map((vehicle) => {
      const matchScore = Object.entries(userScores).reduce((total, [key, value]) => {
        const weight = vehicle.dimensionWeights[key as keyof DimensionScores];
        return total + value * weight;
      }, 0);

      return {
        ...vehicle,
        matchScore,
      };
    })
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, 4);
}
