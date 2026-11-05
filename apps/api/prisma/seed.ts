import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/index.js";
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

const DESTRUCTIVE_CONFIRM_VALUE = "YES";

function describeDatabaseTarget() {
  try {
    const parsed = new URL(process.env.DATABASE_URL ?? "");

    return `${parsed.host}${parsed.pathname}`;
  } catch {
    return "（DATABASE_URL 无法解析）";
  }
}

/**
 * 本脚本会删除全部测评会话、结果和车型数据，先确认目标库可以清，避免误指向生产库。
 *
 * 注意：本文件在导入时会自动执行 main()，因此单元测试请传入 mock 客户端，不要 import 本文件。
 */
export async function assertSeedAllowed(prisma: PrismaClient) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.SEED_ALLOW_PRODUCTION !== DESTRUCTIVE_CONFIRM_VALUE
  ) {
    throw new Error(
      `NODE_ENV=production，拒绝执行会清空全部数据的种子脚本（目标库：${describeDatabaseTarget()}）。` +
        "确认无误请显式设置 SEED_ALLOW_PRODUCTION=YES。",
    );
  }

  const [users, sessions] = await Promise.all([
    prisma.user.count(),
    prisma.assessmentSession.count(),
  ]);

  if (
    (users > 0 || sessions > 0) &&
    process.env.SEED_CONFIRM_DESTRUCTIVE !== DESTRUCTIVE_CONFIRM_VALUE
  ) {
    throw new Error(
      `目标库 ${describeDatabaseTarget()} 已有 ${users} 个用户、${sessions} 条测评会话，` +
        "本脚本会连同题目、车型一起删除。确认这是开发库后，加 SEED_CONFIRM_DESTRUCTIVE=YES 重新执行。",
    );
  }
}

async function resetDatabase() {
  const prisma = new PrismaClient();

  await assertSeedAllowed(prisma);

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
        handlingScore: vehicle.handlingScore,
        comfortScore: vehicle.comfortScore,
        spaceScore: vehicle.spaceScore,
        smartScore: vehicle.smartScore,
        powerScore: vehicle.powerScore,
        economyScore: vehicle.economyScore,
        brandScore: vehicle.brandScore,
        designScore: vehicle.designScore,
        reliabilityScore: vehicle.reliabilityScore,
        familyScore: vehicle.familyScore,
        summary: vehicle.summary,
        recommendation: vehicle.recommendation,
        source: "internal",
        recommendationStatus: "ACTIVE",
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
