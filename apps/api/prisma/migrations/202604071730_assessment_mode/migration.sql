CREATE TYPE "AssessmentMode" AS ENUM ('QUICK', 'STANDARD');

ALTER TABLE "AssessmentSession"
  ADD COLUMN "mode" "AssessmentMode" NOT NULL DEFAULT 'STANDARD',
  ADD COLUMN "targetQuestionCount" INTEGER NOT NULL DEFAULT 56;
