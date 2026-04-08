CREATE TABLE IF NOT EXISTS "VehicleConstraintRule" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "targetType" "EffectTargetType" NOT NULL,
    "targetKey" TEXT NOT NULL,
    "traitOperator" "RuleOperator" NOT NULL,
    "traitThreshold" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "VehicleConstraintRule_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "VehicleConstraintRule_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE "VehicleConstraintRule"
  ADD COLUMN IF NOT EXISTS "targetType" "EffectTargetType";

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM "VehicleConstraintRule"
        WHERE "traitOperator" IS NULL OR "traitThreshold" IS NULL
    ) THEN
        RAISE EXCEPTION
            'VehicleConstraintRule contains rows with null traitOperator/traitThreshold; backfill or clean them before applying this migration.';
    END IF;
END $$;

UPDATE "VehicleConstraintRule"
SET "targetType" = 'PERSONALITY_TRAIT'
WHERE "targetType" IS NULL;

ALTER TABLE "VehicleConstraintRule"
  ALTER COLUMN "targetType" SET NOT NULL,
  ALTER COLUMN "traitOperator" SET NOT NULL,
  ALTER COLUMN "traitThreshold" SET NOT NULL;

ALTER TABLE "VehicleConstraintRule"
  DROP COLUMN IF EXISTS "mode",
  DROP COLUMN IF EXISTS "priority";

DROP INDEX IF EXISTS "VehicleConstraintRule_vehicleId_mode_priority_idx";
CREATE INDEX IF NOT EXISTS "VehicleConstraintRule_vehicleId_targetType_targetKey_idx"
  ON "VehicleConstraintRule"("vehicleId", "targetType", "targetKey");
