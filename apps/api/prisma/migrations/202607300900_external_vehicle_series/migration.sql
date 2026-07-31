CREATE TABLE "ExternalVehicleSeries" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourceSeriesId" INTEGER NOT NULL,
    "sourceBrandId" INTEGER,
    "brandName" TEXT NOT NULL,
    "seriesName" TEXT NOT NULL,
    "coverUrl" TEXT,
    "carIds" JSONB NOT NULL,
    "businessStatus" INTEGER,
    "concernId" INTEGER,
    "dcarScore" DECIMAL(6,2),
    "newCarTag" INTEGER,
    "dealerPriceText" TEXT,
    "hasDealerPrice" BOOLEAN NOT NULL DEFAULT false,
    "officialPriceText" TEXT,
    "hasOfficialPrice" BOOLEAN NOT NULL DEFAULT false,
    "prePriceText" TEXT,
    "hasPrePrice" BOOLEAN NOT NULL DEFAULT false,
    "subsidyPriceText" TEXT,
    "hasSubsidyPrice" BOOLEAN NOT NULL DEFAULT false,
    "rankInfo" JSONB,
    "topTag" JSONB,
    "categoryPic" JSONB,
    "seriesPicCount" INTEGER,
    "rawPayload" JSONB NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalVehicleSeries_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ExternalVehicleSeries_source_sourceSeriesId_key" ON "ExternalVehicleSeries"("source", "sourceSeriesId");

CREATE INDEX "ExternalVehicleSeries_source_brandName_idx" ON "ExternalVehicleSeries"("source", "brandName");

CREATE INDEX "ExternalVehicleSeries_source_lastSyncedAt_idx" ON "ExternalVehicleSeries"("source", "lastSyncedAt");
