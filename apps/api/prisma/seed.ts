import "dotenv/config";
import { personalityProfiles } from "./seed-data/personality-profiles";
import { questions } from "./seed-data/questions";
import { vehicles } from "./seed-data/vehicles";

function requireDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is required to run apps/api/prisma/seed.ts. Create apps/api/.env or export DATABASE_URL first.",
    );
  }
}

async function resetDatabase() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  await prisma.sessionVehicleRecommendation.deleteMany();
  await prisma.sessionResult.deleteMany();
  await prisma.sessionQuestionCandidate.deleteMany();
  await prisma.sessionTraitSnapshot.deleteMany();
  await prisma.assessmentAnswer.deleteMany();
  await prisma.assessmentSession.deleteMany();
  await prisma.questionBranchRule.deleteMany();
  await prisma.optionEffect.deleteMany();
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.vehicleTagMapping.deleteMany();
  await prisma.vehicleConstraintRule.deleteMany();
  await prisma.vehicleTraitWeight.deleteMany();
  await prisma.vehicleTag.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.personalityProfileRule.deleteMany();
  await prisma.personalityProfile.deleteMany();

  return prisma;
}

async function seedPersonalityProfiles(prisma: Awaited<ReturnType<typeof resetDatabase>>) {
  for (const profile of personalityProfiles) {
    await prisma.personalityProfile.create({
      data: {
        code: profile.code,
        name: profile.name,
        summary: profile.summary,
        detail: profile.detail,
        rules: {
          create: profile.rules.map((rule) => ({
            targetKey: rule.targetKey,
            traitOperator: rule.traitOperator,
            traitThreshold: rule.traitThreshold,
            weight: rule.weight,
          })),
        },
      },
    });
  }
}

async function seedQuestions(prisma: Awaited<ReturnType<typeof resetDatabase>>) {
  for (const question of questions) {
    const createdQuestion = await prisma.question.create({
      data: {
        slug: question.slug,
        title: question.title,
        description: question.description,
        type: question.type,
        branchKey: question.branchKey,
        isAnchor: question.isAnchor,
        priority: question.priority,
        discrimination: question.discrimination,
        status: question.status,
        options: {
          create: question.options.map((option) => ({
            label: option.label,
            order: option.order,
            effects: {
              create: option.effects.map((effect) => ({
                targetType: effect.targetType,
                targetKey: effect.targetKey,
                weightDelta: effect.weightDelta,
              })),
            },
          })),
        },
      },
      include: {
        options: true,
      },
    });

    if ("branchRules" in question && Array.isArray(question.branchRules)) {
      await prisma.questionBranchRule.createMany({
        data: question.branchRules.map((rule) => ({
          sourceQuestionId: createdQuestion.id,
          sourceOptionId:
            createdQuestion.options.find((option) => option.order === rule.sourceOptionOrder)?.id ??
            null,
          targetBranchKey: rule.targetBranchKey,
          priority: rule.priority,
        })),
      });
    }
  }
}

async function seedVehicles(prisma: Awaited<ReturnType<typeof resetDatabase>>) {
  const allTags = [...new Set(vehicles.flatMap((vehicle) => vehicle.tags))];

  for (const tag of allTags) {
    await prisma.vehicleTag.create({
      data: {
        slug: tag,
        label: tag,
      },
    });
  }

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: {
        slug: vehicle.slug,
        brand: vehicle.brand,
        series: vehicle.series,
        modelName: vehicle.modelName,
        priceMin: vehicle.priceMin,
        priceMax: vehicle.priceMax,
        energyType: vehicle.energyType,
        bodyType: vehicle.bodyType,
        summary: vehicle.summary,
        recommendation: vehicle.recommendation,
        traitWeights: {
          create: vehicle.traitWeights.map((weight) => ({
            targetType: weight.targetType,
            targetKey: weight.targetKey,
            weight: weight.weight,
          })),
        },
        constraintRules: {
          create: vehicle.constraintRules.map((rule) => ({
            targetType: rule.targetType,
            targetKey: rule.targetKey,
            traitOperator: rule.traitOperator,
            traitThreshold: rule.traitThreshold,
          })),
        },
        tagMappings: {
          create: vehicle.tags.map((tag) => ({
            tag: {
              connect: {
                slug: tag,
              },
            },
          })),
        },
      },
    });
  }
}

async function main() {
  requireDatabaseUrl();
  const prisma = await resetDatabase();
  await seedPersonalityProfiles(prisma);
  await seedQuestions(prisma);
  await seedVehicles(prisma);
  await prisma.$disconnect();
}

void main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
