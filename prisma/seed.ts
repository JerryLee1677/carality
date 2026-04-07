import { prisma } from "../src/lib/prisma";
import { questions } from "../src/data/quiz/questions";
import { vehicles } from "../src/data/vehicles/vehicles";
import { buyingGuides } from "../src/data/content/buying-guides";

async function main() {
  await prisma.vehicleRecommendation.deleteMany();
  await prisma.personalityResult.deleteMany();
  await prisma.quizAnswer.deleteMany();
  await prisma.quizSession.deleteMany();
  await prisma.quizOption.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.vehicleDimensionWeight.deleteMany();
  await prisma.buyingGuide.deleteMany();
  await prisma.vehicle.deleteMany();

  for (const question of questions) {
    await prisma.quizQuestion.create({
      data: {
        slug: question.slug,
        title: question.title,
        description: question.description,
        order: question.order,
        options: {
          create: question.options.map((option) => ({
            label: option.label,
            order: option.order,
            weights: option.weights,
          })),
        },
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
        heroImage: vehicle.heroImage,
        summary: vehicle.summary,
        recommendation: vehicle.recommendation,
        dimensionWeights: {
          create: vehicle.dimensionWeights,
        },
      },
    });
  }

  for (const guide of buyingGuides) {
    await prisma.buyingGuide.create({
      data: guide,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
