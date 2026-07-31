export type DongchediSeriesRecord = {
  source: "dongchedi";
  sourceSeriesId: number;
  sourceBrandId: number | null;
  brandName: string;
  seriesName: string;
  coverUrl: string | null;
  carIds: number[];
  businessStatus: number | null;
  concernId: number | null;
  dcarScore: number | null;
  newCarTag: number | null;
  dealerPriceText: string | null;
  hasDealerPrice: boolean;
  officialPriceText: string | null;
  hasOfficialPrice: boolean;
  prePriceText: string | null;
  hasPrePrice: boolean;
  subsidyPriceText: string | null;
  hasSubsidyPrice: boolean;
  rankInfo: unknown;
  topTag: unknown;
  categoryPic: unknown;
  seriesPicCount: number | null;
  rawPayload: Record<string, unknown>;
};

export type DongchediRequestConfig = {
  endpoint: string;
  queryString?: string | null;
  cookie: string;
  cityName?: string;
  page: number;
  limit: number;
  sortNew?: string;
  seriesType?: number | null;
  userAgent?: string | null;
  referer?: string | null;
  origin?: string | null;
};

type SyncPagesOptions = Omit<DongchediRequestConfig, "page"> & {
  startPage: number;
  maxPages: number;
  dryRun?: boolean;
  delayMs?: number;
  fetchJson: (request: ReturnType<typeof buildDongchediSeriesRequest>, page: number) => Promise<unknown>;
  upsertRecord: (record: DongchediSeriesRecord) => Promise<void>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function optionalNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function optionalBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function requireNumber(value: unknown, fieldName: string) {
  const numberValue = optionalNumber(value);
  if (numberValue === null) {
    throw new Error(`Dongchedi series field ${fieldName} must be a number`);
  }
  return numberValue;
}

function requireString(value: unknown, fieldName: string) {
  const stringValue = optionalString(value);
  if (stringValue === null) {
    throw new Error(`Dongchedi series field ${fieldName} must be a string`);
  }
  return stringValue;
}

function parseCarIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is number => typeof item === "number" && Number.isFinite(item));
}

function parseSeriesItem(item: unknown): DongchediSeriesRecord {
  if (!isRecord(item)) {
    throw new Error("Dongchedi series item must be an object");
  }

  return {
    source: "dongchedi",
    sourceSeriesId: requireNumber(item.id, "id"),
    sourceBrandId: optionalNumber(item.brand_id),
    brandName: requireString(item.brand_name, "brand_name"),
    seriesName: requireString(item.outter_name, "outter_name"),
    coverUrl: optionalString(item.cover_url),
    carIds: parseCarIds(item.car_ids),
    businessStatus: optionalNumber(item.business_status),
    concernId: optionalNumber(item.concern_id),
    dcarScore: optionalNumber(item.dcar_score),
    newCarTag: optionalNumber(item.new_car_tag),
    dealerPriceText: optionalString(item.dealer_price),
    hasDealerPrice: optionalBoolean(item.has_dealer_price),
    officialPriceText: optionalString(item.official_price),
    hasOfficialPrice: optionalBoolean(item.has_official_price),
    prePriceText: optionalString(item.pre_price),
    hasPrePrice: optionalBoolean(item.has_pre_price),
    subsidyPriceText: optionalString(item.subsidy_price),
    hasSubsidyPrice: optionalBoolean(item.has_subsidy_price),
    rankInfo: item.rank_info ?? null,
    topTag: item.top_tag ?? null,
    categoryPic: item.category_pic ?? null,
    seriesPicCount: optionalNumber(item.series_pic_count),
    rawPayload: item,
  };
}

export function parseDongchediSeriesResponse(payload: unknown): DongchediSeriesRecord[] {
  if (!isRecord(payload)) {
    throw new Error("Dongchedi API payload must be an object");
  }

  if (payload.status !== 0) {
    const message = typeof payload.message === "string" ? payload.message : "unknown error";
    throw new Error(`Dongchedi API failed: ${message}`);
  }

  if (!isRecord(payload.data)) {
    throw new Error("Dongchedi API payload is missing data");
  }

  const series = payload.data.series;
  if (!Array.isArray(series)) {
    throw new Error("Dongchedi API payload data.series must be an array");
  }

  return series.map(parseSeriesItem);
}

export function buildDongchediSeriesRequest(config: DongchediRequestConfig) {
  const queryString = (config.queryString ?? "").replace(/^\?/, "");
  const url = queryString ? `${config.endpoint}?${queryString}` : config.endpoint;
  const body = new URLSearchParams();

  if (config.seriesType !== null) {
    body.set("series_type", String(config.seriesType ?? 0));
  }
  body.set("sort_new", config.sortNew ?? "hot_desc");
  body.set("city_name", config.cityName ?? "杭州");
  body.set("limit", String(config.limit));
  body.set("page", String(config.page));
  const headers: Record<string, string> = {
    accept: "*/*",
    "content-type": "application/x-www-form-urlencoded",
    cookie: config.cookie,
  };

  if (config.userAgent) {
    headers["user-agent"] = config.userAgent;
  }
  if (config.referer) {
    headers.referer = config.referer;
  }
  if (config.origin) {
    headers.origin = config.origin;
  }

  return {
    url,
    init: {
      method: "POST",
      headers,
      body: body.toString(),
    } satisfies RequestInit,
  };
}

export function shouldStopDongchediPagination(input: { fetchedCount: number; limit: number }) {
  return input.fetchedCount < input.limit;
}

async function sleep(delayMs: number) {
  if (delayMs <= 0) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, delayMs));
}

export async function syncDongchediSeriesPages(options: SyncPagesOptions) {
  let fetchedPages = 0;
  let fetchedRecords = 0;
  let upsertedRecords = 0;

  for (let offset = 0; offset < options.maxPages; offset += 1) {
    const page = options.startPage + offset;
    const request = buildDongchediSeriesRequest({
      ...options,
      page,
    });
    const payload = await options.fetchJson(request, page);
    const records = parseDongchediSeriesResponse(payload);

    fetchedPages += 1;
    fetchedRecords += records.length;

    if (!options.dryRun) {
      for (const record of records) {
        await options.upsertRecord(record);
        upsertedRecords += 1;
      }
    }

    if (shouldStopDongchediPagination({ fetchedCount: records.length, limit: options.limit })) {
      break;
    }

    await sleep(options.delayMs ?? 0);
  }

  return {
    fetchedPages,
    fetchedRecords,
    upsertedRecords,
    dryRun: Boolean(options.dryRun),
  };
}
