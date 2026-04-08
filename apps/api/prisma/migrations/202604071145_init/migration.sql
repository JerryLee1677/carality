-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('LIFE_STYLE', 'CAR_USAGE');

-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "EffectTargetType" AS ENUM ('PERSONALITY_TRAIT', 'VEHICLE_PREFERENCE', 'BRANCH_SIGNAL');

-- CreateEnum
CREATE TYPE "RuleOperator" AS ENUM ('EQ', 'NEQ', 'GT', 'GTE', 'LT', 'LTE');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "QuestionType" NOT NULL,
    "branchKey" TEXT,
    "isAnchor" BOOLEAN NOT NULL DEFAULT false,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "discrimination" INTEGER NOT NULL DEFAULT 0,
    "status" "QuestionStatus" NOT NULL DEFAULT 'DRAFT',
    "minSessionStep" INTEGER,
    "maxSessionStep" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "isTerminal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionEffect" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "targetType" "EffectTargetType" NOT NULL,
    "targetKey" TEXT NOT NULL,
    "weightDelta" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "OptionEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionBranchRule" (
    "id" TEXT NOT NULL,
    "sourceQuestionId" TEXT NOT NULL,
    "sourceOptionId" TEXT,
    "targetBranchKey" TEXT NOT NULL,
    "candidateQuestionId" TEXT,
    "traitKey" TEXT,
    "traitOperator" "RuleOperator",
    "traitThreshold" DECIMAL(8,2),
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuestionBranchRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentSession" (
    "id" TEXT NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'DRAFT',
    "currentBranchKey" TEXT,
    "currentQuestionId" TEXT,
    "stepIndex" INTEGER NOT NULL DEFAULT 0,
    "lifeQuestionCount" INTEGER NOT NULL DEFAULT 0,
    "carQuestionCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "AssessmentSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentAnswer" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "stepIndex" INTEGER NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssessmentAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionTraitSnapshot" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "stepIndex" INTEGER NOT NULL,
    "traitKey" TEXT NOT NULL,
    "traitValue" DECIMAL(8,2) NOT NULL,
    "targetType" "EffectTargetType" NOT NULL,

    CONSTRAINT "SessionTraitSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionQuestionCandidate" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "stepIndex" INTEGER NOT NULL,
    "questionId" TEXT NOT NULL,
    "branchFit" DECIMAL(8,2),
    "infoGain" DECIMAL(8,2),
    "rankingScore" DECIMAL(8,2),
    "wasSelected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SessionQuestionCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalityProfile" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalityProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "priceMin" INTEGER NOT NULL,
    "priceMax" INTEGER NOT NULL,
    "energyType" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleTraitWeight" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "targetType" "EffectTargetType" NOT NULL,
    "targetKey" TEXT NOT NULL,
    "weight" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "VehicleTraitWeight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleTag" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "VehicleTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleTagMapping" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "VehicleTagMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionResult" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "personalityProfileId" TEXT NOT NULL,
    "confidenceScore" DECIMAL(8,2),
    "summary" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionVehicleRecommendation" (
    "id" TEXT NOT NULL,
    "resultId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" DECIMAL(10,2) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "SessionVehicleRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_slug_key" ON "Question"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionOption_questionId_order_key" ON "QuestionOption"("questionId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentAnswer_sessionId_questionId_key" ON "AssessmentAnswer"("sessionId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentAnswer_sessionId_stepIndex_key" ON "AssessmentAnswer"("sessionId", "stepIndex");

-- CreateIndex
CREATE INDEX "SessionTraitSnapshot_sessionId_stepIndex_idx" ON "SessionTraitSnapshot"("sessionId", "stepIndex");

-- CreateIndex
CREATE INDEX "SessionQuestionCandidate_sessionId_stepIndex_idx" ON "SessionQuestionCandidate"("sessionId", "stepIndex");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalityProfile_code_key" ON "PersonalityProfile"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleTraitWeight_vehicleId_targetType_targetKey_key" ON "VehicleTraitWeight"("vehicleId", "targetType", "targetKey");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleTag_slug_key" ON "VehicleTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleTagMapping_vehicleId_tagId_key" ON "VehicleTagMapping"("vehicleId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionResult_sessionId_key" ON "SessionResult"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionVehicleRecommendation_resultId_rank_key" ON "SessionVehicleRecommendation"("resultId", "rank");

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionEffect" ADD CONSTRAINT "OptionEffect_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "QuestionOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionBranchRule" ADD CONSTRAINT "QuestionBranchRule_sourceQuestionId_fkey" FOREIGN KEY ("sourceQuestionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionBranchRule" ADD CONSTRAINT "QuestionBranchRule_sourceOptionId_fkey" FOREIGN KEY ("sourceOptionId") REFERENCES "QuestionOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionBranchRule" ADD CONSTRAINT "QuestionBranchRule_candidateQuestionId_fkey" FOREIGN KEY ("candidateQuestionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAnswer" ADD CONSTRAINT "AssessmentAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssessmentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAnswer" ADD CONSTRAINT "AssessmentAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAnswer" ADD CONSTRAINT "AssessmentAnswer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "QuestionOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTraitSnapshot" ADD CONSTRAINT "SessionTraitSnapshot_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssessmentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionQuestionCandidate" ADD CONSTRAINT "SessionQuestionCandidate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssessmentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionQuestionCandidate" ADD CONSTRAINT "SessionQuestionCandidate_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleTraitWeight" ADD CONSTRAINT "VehicleTraitWeight_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleTagMapping" ADD CONSTRAINT "VehicleTagMapping_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleTagMapping" ADD CONSTRAINT "VehicleTagMapping_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "VehicleTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionResult" ADD CONSTRAINT "SessionResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssessmentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionResult" ADD CONSTRAINT "SessionResult_personalityProfileId_fkey" FOREIGN KEY ("personalityProfileId") REFERENCES "PersonalityProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionVehicleRecommendation" ADD CONSTRAINT "SessionVehicleRecommendation_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "SessionResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionVehicleRecommendation" ADD CONSTRAINT "SessionVehicleRecommendation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
