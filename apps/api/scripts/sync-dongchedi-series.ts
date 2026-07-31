import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/index.js";
import {
  type DongchediSeriesRecord,
  buildDongchediSeriesRequest,
  syncDongchediSeriesPages,
} from "../src/modules/vehicles/dongchedi-series-importer";

type CliArgs = {
  startPage: number;
  maxPages: number;
  limit: number;
  dryRun: boolean;
  cityName: string;
  delayMs: number;
};

function readEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : null;
}

function parseNumberArg(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseOptionalSeriesType(value: string | null) {
  if (!value) {
    return 0;
  }

  if (value === "omit") {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
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

  return {
    startPage: parseNumberArg(String(args.get("start-page") ?? ""), 1),
    maxPages: parseNumberArg(String(args.get("max-pages") ?? ""), 1),
    limit: parseNumberArg(String(args.get("limit") ?? ""), 30),
    dryRun: args.has("dry-run"),
    cityName: String(args.get("city") ?? readEnv("DONGCHEDI_CITY_NAME") ?? "杭州"),
    delayMs: parseNumberArg(String(args.get("delay-ms") ?? ""), 1000),
  };
}

function requireEnv(name: string) {
  const value = readEnv(name);
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

async function fetchDongchediJson(
  request: ReturnType<typeof buildDongchediSeriesRequest>,
  page: number,
) {
  const response = await fetch(request.url, request.init);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Dongchedi request failed on page ${page}: HTTP ${response.status}`);
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error(`Dongchedi request failed on page ${page}: response was not JSON`);
  }
}

function buildUpsertInput(record: DongchediSeriesRecord) {
  return {
    sourceBrandId: record.sourceBrandId,
    brandName: record.brandName,
    seriesName: record.seriesName,
    coverUrl: record.coverUrl,
    carIds: record.carIds,
    businessStatus: record.businessStatus,
    concernId: record.concernId,
    dcarScore: record.dcarScore,
    newCarTag: record.newCarTag,
    dealerPriceText: record.dealerPriceText,
    hasDealerPrice: record.hasDealerPrice,
    officialPriceText: record.officialPriceText,
    hasOfficialPrice: record.hasOfficialPrice,
    prePriceText: record.prePriceText,
    hasPrePrice: record.hasPrePrice,
    subsidyPriceText: record.subsidyPriceText,
    hasSubsidyPrice: record.hasSubsidyPrice,
    rankInfo: record.rankInfo,
    topTag: record.topTag,
    categoryPic: record.categoryPic,
    seriesPicCount: record.seriesPicCount,
    rawPayload: record.rawPayload,
    lastSyncedAt: new Date(),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const endpoint = requireEnv("DONGCHEDI_SERIES_ENDPOINT");
  const cookie = requireEnv("DONGCHEDI_COOKIE");
  const prisma = new PrismaClient();
  const externalVehicleSeries = (prisma as unknown as {
    externalVehicleSeries: {
      upsert(input: {
        where: {
          source_sourceSeriesId: {
            source: string;
            sourceSeriesId: number;
          };
        };
        create: ReturnType<typeof buildUpsertInput> & {
          source: string;
          sourceSeriesId: number;
        };
        update: ReturnType<typeof buildUpsertInput>;
      }): Promise<unknown>;
    };
  }).externalVehicleSeries;

  try {
    const summary = await syncDongchediSeriesPages({
      endpoint,
      queryString: readEnv("DONGCHEDI_QUERY_STRING"),
      cookie,
      cityName: args.cityName,
      seriesType: parseOptionalSeriesType(readEnv("DONGCHEDI_SERIES_TYPE")),
      startPage: args.startPage,
      maxPages: args.maxPages,
      limit: args.limit,
      dryRun: args.dryRun,
      delayMs: args.delayMs,
      userAgent: readEnv("DONGCHEDI_USER_AGENT"),
      referer: readEnv("DONGCHEDI_REFERER"),
      origin: readEnv("DONGCHEDI_ORIGIN"),
      fetchJson: fetchDongchediJson,
      upsertRecord: async (record) => {
        const input = buildUpsertInput(record);
        await externalVehicleSeries.upsert({
          where: {
            source_sourceSeriesId: {
              source: record.source,
              sourceSeriesId: record.sourceSeriesId,
            },
          },
          create: {
            source: record.source,
            sourceSeriesId: record.sourceSeriesId,
            ...input,
          },
          update: input,
        });
      },
    });

    console.log(
      JSON.stringify(
        {
          ok: true,
          ...summary,
          startPage: args.startPage,
          maxPages: args.maxPages,
          limit: args.limit,
          cityName: args.cityName,
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
