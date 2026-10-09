import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/index.js";
import { importVehicleCandidates } from "../src/modules/vehicles/vehicle-candidate-importer";

function parseNonNegativeNumberArg(value: string | undefined) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseArgs(argv: string[]) {
  const args = new Map<string, string | boolean>();

  for (const rawArg of argv) {
    if (!rawArg.startsWith("--")) {
      continue;
    }

    const [key, value] = rawArg.slice(2).split("=", 2);
    args.set(key, value ?? true);
  }

  return {
    limit: parseNonNegativeNumberArg(String(args.get("limit") ?? "")),
    dryRun: args.has("dry-run"),
    source: String(args.get("source") ?? "dongchedi"),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const prisma = new PrismaClient();

  try {
    const summary = await importVehicleCandidates(prisma, args);
    console.log(JSON.stringify(summary, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
