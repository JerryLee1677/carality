-- CreateTable
CREATE TABLE "PersonalityProfileRule" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "targetKey" TEXT NOT NULL,
    "traitOperator" "RuleOperator" NOT NULL,
    "traitThreshold" DECIMAL(8,2) NOT NULL,
    "weight" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "PersonalityProfileRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PersonalityProfileRule_profileId_idx" ON "PersonalityProfileRule"("profileId");

-- AddForeignKey
ALTER TABLE "PersonalityProfileRule" ADD CONSTRAINT "PersonalityProfileRule_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "PersonalityProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
