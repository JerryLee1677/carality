import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/index.js";
import {
  buildDongchediCarDetailsRequest,
  parseDongchediCarDetailsHtml,
} from "../src/modules/vehicles/dongchedi-car-details-importer";
import {
  isLikelyDongchediBlock,
  nextHumanDelayMs,
  nextHumanRestMs,
  shouldTakeHumanRest,
} from "../src/modules/vehicles/dongchedi-pacing";
import { buildVehicleCandidate } from "../src/modules/vehicles/vehicle-candidate";

class DongchediLikelyBlockError extends Error {}

type CliArgs = {
  limit: number;
  skip: number;
  businessStatus: number;
  includeMissingPrice: boolean;
  dryRun: boolean;
  refresh: boolean;
  carId: number | null;
  delayMs: number;
  maxDelayMs: number;
  restEvery: number;
  restMs: number;
  blockCooldownMs: number;
  timeoutMs: number;
};

function readEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : null;
}

function parsePositiveNumberArg(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNonNegativeNumberArg(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
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

  const requestedCarId = Number.parseInt(String(args.get("car-id") ?? ""), 10);
  const delayMs = parseNonNegativeNumberArg(String(args.get("delay-ms") ?? ""), 2500);

  return {
    limit: parsePositiveNumberArg(String(args.get("limit") ?? ""), 10),
    skip: parseNonNegativeNumberArg(String(args.get("skip") ?? ""), 0),
    businessStatus: parseNonNegativeNumberArg(String(args.get("business-status") ?? ""), 0),
    includeMissingPrice: args.has("include-missing-price"),
    dryRun: args.has("dry-run"),
    refresh: args.has("refresh"),
    carId: Number.isFinite(requestedCarId) ? requestedCarId : null,
    delayMs,
    maxDelayMs: parseNonNegativeNumberArg(String(args.get("max-delay-ms") ?? ""), delayMs * 3),
    restEvery: parseNonNegativeNumberArg(String(args.get("rest-every") ?? ""), 25),
    restMs: parseNonNegativeNumberArg(String(args.get("rest-ms") ?? ""), 120_000),
    blockCooldownMs: parseNonNegativeNumberArg(String(args.get("block-cooldown-ms") ?? ""), 120_000),
    timeoutMs: parsePositiveNumberArg(String(args.get("timeout-ms") ?? ""), 15000),
  };
}

function requireEnv(name: string) {
  const value = readEnv(name);
  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

async function fetchHtml(carId: number, timeoutMs: number) {
  const request = buildDongchediCarDetailsRequest({
    baseUrl: readEnv("DONGCHEDI_PARAMS_BASE_URL"),
    carId,
    cookie: requireEnv("DONGCHEDI_COOKIE"),
    userAgent: readEnv("DONGCHEDI_USER_AGENT"),
    referer: readEnv("DONGCHEDI_REFERER"),
    origin: readEnv("DONGCHEDI_ORIGIN"),
  });
  const response = await fetch(request.url, {
    ...request.init,
    signal: AbortSignal.timeout(timeoutMs),
  });
  const html = await response.text();

  if (isLikelyDongchediBlock({ status: response.status, html })) {
    throw new DongchediLikelyBlockError(
      `Likely Dongchedi block for ${carId}: HTTP ${response.status}, body length ${html.length}`,
    );
  }

  if (!response.ok) {
    throw new Error(`Dongchedi details request failed for ${carId}: HTTP ${response.status}`);
  }

  return html;
}

function parseCarIds(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is number => typeof item === "number" && Number.isFinite(item))
    : [];
}

function selectRepresentativeCarId(carIds: number[], requestedCarId: number | null) {
  if (requestedCarId !== null) {
    return carIds.includes(requestedCarId) ? requestedCarId : null;
  }

  return carIds.length > 0 ? carIds[Math.floor((carIds.length - 1) / 2)] : null;
}

async function sleep(delayMs: number) {
  if (delayMs <= 0) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const prisma = new PrismaClient();
  const seriesRows = await prisma.externalVehicleSeries.findMany({
    where: {
      source: "dongchedi",
      businessStatus: args.businessStatus,
      OR: args.includeMissingPrice
        ? undefined
        : [{ hasOfficialPrice: true }, { hasDealerPrice: true }],
    },
    orderBy: {
      sourceSeriesId: "asc",
    },
    select: {
      sourceSeriesId: true,
      brandName: true,
      seriesName: true,
      officialPriceText: true,
      dealerPriceText: true,
      carIds: true,
    },
  });
  const filteredRows =
    args.carId === null
      ? seriesRows
      : seriesRows.filter((row) => parseCarIds(row.carIds).includes(args.carId));
  const selectedRows = filteredRows.slice(args.skip, args.skip + args.limit);

  console.log(
    `[sync] matched series=${seriesRows.length}, selected=${selectedRows.length}, skip=${args.skip}, limit=${args.limit}, priceRequired=${!args.includeMissingPrice}, delay=${args.delayMs}-${args.maxDelayMs}ms, restEvery=${args.restEvery}, restMs=${args.restMs}`,
  );

  let checkedSeries = 0;
  let fetchedDetails = 0;
  let skippedExisting = 0;
  let upsertedCandidates = 0;
  let rejectedCandidates = 0;
  let blockedRequests = 0;
  let humanRests = 0;
  let consecutiveBlocks = 0;
  const errors: Array<{ carId: number | null; message: string }> = [];

  try {
    for (const series of selectedRows) {
      checkedSeries += 1;
      const carId = selectRepresentativeCarId(parseCarIds(series.carIds), args.carId);

      if (checkedSeries % 10 === 0 || checkedSeries === selectedRows.length) {
        console.log(
          `[sync] progress ${checkedSeries}/${selectedRows.length} - ${series.brandName} ${series.seriesName} (series ${series.sourceSeriesId})`,
        );
      }

      if (carId === null) {
        errors.push({
          carId: null,
          message: `series ${series.sourceSeriesId} has no matching car id`,
        });
        continue;
      }

      const existingCandidate = args.refresh
        ? null
        : await prisma.externalVehicleCandidate.findUnique({
            where: {
              source_sourceSeriesId_sourceCarId: {
                source: "dongchedi",
                sourceSeriesId: series.sourceSeriesId,
                sourceCarId: carId,
              },
            },
          });

      if (existingCandidate) {
        skippedExisting += 1;
        continue;
      }

      try {
        const record = parseDongchediCarDetailsHtml(await fetchHtml(carId, args.timeoutMs));
        consecutiveBlocks = 0;
        const candidate = buildVehicleCandidate(
          record,
          series.officialPriceText,
          series.dealerPriceText,
        );
        fetchedDetails += 1;

        if (!args.dryRun) {
          await prisma.externalVehicleCandidate.upsert({
            where: {
              source_sourceSeriesId_sourceCarId: {
                source: candidate.source,
                sourceSeriesId: candidate.sourceSeriesId,
                sourceCarId: candidate.sourceCarId,
              },
            },
            create: {
              source: candidate.source,
              sourceSeriesId: candidate.sourceSeriesId,
              sourceCarId: candidate.sourceCarId,
              brandName: candidate.brandName,
              seriesName: candidate.seriesName,
              carName: candidate.carName,
              saleStatus: record.saleStatus,
              energyType: candidate.energyType,
              bodyType: candidate.bodyType,
              priceMin: candidate.priceMin,
              priceMax: candidate.priceMax,
              parsedParams: record.rawParams,
              coreScores: candidate.coreScores,
              traitWeights: candidate.traitWeights,
              constraintRules: candidate.constraintRules,
              dataConfidence: candidate.dataConfidence,
              qualityStatus: candidate.qualityStatus,
              rejectReason: candidate.rejectReason,
              lastCheckedAt: new Date(),
            },
            update: {
              brandName: candidate.brandName,
              seriesName: candidate.seriesName,
              carName: candidate.carName,
              saleStatus: record.saleStatus,
              energyType: candidate.energyType,
              bodyType: candidate.bodyType,
              priceMin: candidate.priceMin,
              priceMax: candidate.priceMax,
              parsedParams: record.rawParams,
              coreScores: candidate.coreScores,
              traitWeights: candidate.traitWeights,
              constraintRules: candidate.constraintRules,
              dataConfidence: candidate.dataConfidence,
              qualityStatus: candidate.qualityStatus,
              rejectReason: candidate.rejectReason,
              lastCheckedAt: new Date(),
            },
          });
          upsertedCandidates += 1;
        }

        if (candidate.qualityStatus === "REJECTED") {
          rejectedCandidates += 1;
        }
      } catch (error) {
        if (error instanceof DongchediLikelyBlockError) {
          blockedRequests += 1;
          consecutiveBlocks += 1;
          errors.push({ carId, message: error.message });

          if (consecutiveBlocks >= 3) {
            throw new Error(
              `Stopped after ${consecutiveBlocks} consecutive likely Dongchedi blocks: ${error.message}`,
            );
          }

          console.warn(`[sync] ${error.message}; cooling down for ${args.blockCooldownMs}ms`);
          await sleep(args.blockCooldownMs);
          continue;
        }

        errors.push({
          carId,
          message: error instanceof Error ? error.message : String(error),
        });
      }

      if (shouldTakeHumanRest(fetchedDetails, args)) {
        humanRests += 1;
        const restMs = nextHumanRestMs(args);
        console.log(
          `[sync] taking a human-like rest for ${restMs}ms after ${fetchedDetails} pages`,
        );
        await sleep(restMs);
        continue;
      }

      const nextDelayMs = nextHumanDelayMs(args);
      console.log(`[sync] next page in ${nextDelayMs}ms`);
      await sleep(nextDelayMs);
    }

    console.log(
      JSON.stringify(
        {
          ok: errors.length === 0,
          checkedSeries,
          fetchedDetails,
          skippedExisting,
          upsertedCandidates,
          rejectedCandidates,
          blockedRequests,
          humanRests,
          dryRun: args.dryRun,
          errors,
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
