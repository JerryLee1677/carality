ALTER TABLE "Vehicle" ADD COLUMN "source" TEXT NOT NULL DEFAULT 'internal';
ALTER TABLE "Vehicle" ADD COLUMN "sourceSeriesId" INTEGER;
ALTER TABLE "Vehicle" ADD COLUMN "sourceCarId" INTEGER;
ALTER TABLE "Vehicle" ADD COLUMN "dataConfidence" DECIMAL(4,2);
ALTER TABLE "Vehicle" ADD COLUMN "recommendationStatus" TEXT NOT NULL DEFAULT 'ACTIVE';

CREATE INDEX "Vehicle_source_sourceSeriesId_sourceCarId_idx" ON "Vehicle"("source", "sourceSeriesId", "sourceCarId");
CREATE INDEX "Vehicle_recommendationStatus_idx" ON "Vehicle"("recommendationStatus");
