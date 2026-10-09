CREATE TABLE "ExternalVehicleCandidate" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceSeriesId" INTEGER NOT NULL,
    "sourceCarId" INTEGER NOT NULL,
    "brandName" TEXT NOT NULL,
    "seriesName" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "saleStatus" INTEGER,
    "energyType" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "priceMin" INTEGER,
    "priceMax" INTEGER,
    "parsedParams" JSONB NOT NULL,
    "coreScores" JSONB NOT NULL,
    "traitWeights" JSONB NOT NULL,
    "constraintRules" JSONB NOT NULL,
    "dataConfidence" DECIMAL(4,2) NOT NULL DEFAULT 1,
    "qualityStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectReason" TEXT,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastCheckedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalVehicleCandidate_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ExternalVehicleCandidate_source_sourceSeriesId_sourceCarId_key" ON "ExternalVehicleCandidate"("source", "sourceSeriesId", "sourceCarId");
CREATE INDEX "ExternalVehicleCandidate_source_qualityStatus_idx" ON "ExternalVehicleCandidate"("source", "qualityStatus");
CREATE INDEX "ExternalVehicleCandidate_source_sourceSeriesId_idx" ON "ExternalVehicleCandidate"("source", "sourceSeriesId");
