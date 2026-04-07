import { vehicles } from "@/data/vehicles/vehicles";
import { buildRecommendationReasons } from "@/modules/recommendation/domain/build-recommendation-reasons";
import { matchVehicles } from "@/modules/recommendation/domain/match-vehicles";
import type { DimensionScores } from "@/modules/quiz/domain/types";

export const recommendationRepository = {
  getRankedRecommendations(scores: DimensionScores) {
    return matchVehicles(scores, vehicles).map((vehicle, index) => ({
      ...vehicle,
      rank: index + 1,
      reason: buildRecommendationReasons(scores, vehicle.dimensionWeights),
    }));
  },
};
