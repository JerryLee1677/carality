-- This table was created manually during external vehicle model development.
-- This migration records that schema change for environments initialized from migrations.

CREATE TABLE IF NOT EXISTS "ExternalVehicleModel" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceModelId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "seriesName" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "energyType" TEXT NOT NULL,
    "bodyType" TEXT,
    "priceMin" INTEGER,
    "priceMax" INTEGER,
    "rawPayload" JSONB NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalVehicleModel_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ExternalVehicleModel_source_sourceModelId_key" ON "ExternalVehicleModel"("source", "sourceModelId");
