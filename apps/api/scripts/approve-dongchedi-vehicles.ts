import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/index.js";

type CliArgs = {
  source: string;
  brand?: string;
  energyTypes: string[];
  minPrice?: number;
  maxPrice?: number;
  minConfidence?: number;
  limit?: number;
  dryRun: boolean;
};

function parseNonNegativeNumberArg(value: string | undefined) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseArgs(argv: string[]): CliArgs {
  const args = new Map<string, string | boolean>();

  for (const rawArg of argv) {
    if (!rawArg.startsWith("--")) {
      continue;
    }

    const [key, value] = rawArg.slice(2).split("=", 2);
    args.set(key, value ?? true);
  }

  const energyTypes = String(args.get("energy") ?? "")
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean);

  return {
    source: String(args.get("source") ?? "dongchedi"),
    brand: typeof args.get("brand") === "string" ? String(args.get("brand")) : undefined,
    energyTypes,
    minPrice: parseNonNegativeNumberArg(String(args.get("min-price") ?? "")),
    maxPrice: parseNonNegativeNumberArg(String(args.get("max-price") ?? "")),
    minConfidence: parseNonNegativeNumberArg(String(args.get("min-confidence") ?? "")),
    limit: parseNonNegativeNumberArg(String(args.get("limit") ?? "")),
    dryRun: args.has("dry-run"),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const prisma = new PrismaClient();

  try {
    const where = {
      source: args.source,
      status: "active",
      recommendationStatus: "PENDING",
      ...(args.brand ? { brand: args.brand } : {}),
      ...(args.energyTypes.length > 0 ? { energyType: { in: args.energyTypes } } : {}),
      ...(args.minPrice !== undefined || args.maxPrice !== undefined
        ? {
            priceMin: {
              ...(args.minPrice !== undefined ? { gte: args.minPrice } : {}),
              ...(args.maxPrice !== undefined ? { lte: args.maxPrice } : {}),
            },
          }
        : {}),
      ...(args.minConfidence !== undefined
        ? { dataConfidence: { gte: args.minConfidence / 100 } }
        : {}),
    };

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: [{ dataConfidence: "desc" }, { sourceCarId: "asc" }],
      ...(args.limit !== undefined ? { take: args.limit } : {}),
      select: {
        id: true,
        brand: true,
        series: true,
        modelName: true,
        energyType: true,
        priceMin: true,
        priceMax: true,
        dataConfidence: true,
      },
    });

    let updated = 0;
    if (!args.dryRun && vehicles.length > 0) {
      const result = await prisma.vehicle.updateMany({
        where: { id: { in: vehicles.map((vehicle) => vehicle.id) } },
        data: { recommendationStatus: "ACTIVE" },
      });
      updated = result.count;
    }

    console.log(
      JSON.stringify(
        {
          matched: vehicles.length,
          activated: args.dryRun ? 0 : updated,
          dryRun: args.dryRun,
          filters: {
            source: args.source,
            brand: args.brand ?? null,
            energyTypes: args.energyTypes,
            minPrice: args.minPrice ?? null,
            maxPrice: args.maxPrice ?? null,
            minConfidence: args.minConfidence ?? null,
            limit: args.limit ?? null,
          },
          sample: vehicles.slice(0, 10),
        },
        null,
        2,
      ),
    );
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
