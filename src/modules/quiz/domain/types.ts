export type DimensionKey =
  | "practical"
  | "emotional"
  | "saving"
  | "quality"
  | "comfort"
  | "driving"
  | "brand"
  | "value";

export type DimensionScores = Record<DimensionKey, number>;

export const emptyScores = (): DimensionScores => ({
  practical: 0,
  emotional: 0,
  saving: 0,
  quality: 0,
  comfort: 0,
  driving: 0,
  brand: 0,
  value: 0,
});
