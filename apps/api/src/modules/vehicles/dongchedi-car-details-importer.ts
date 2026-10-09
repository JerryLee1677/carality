export type DongchediCarDetailsRecord = {
  source: "dongchedi";
  sourceCarId: number;
  sourceSeriesId: number;
  brandName: string;
  seriesName: string;
  carName: string;
  saleStatus: number | null;
  officialPriceText: string | null;
  dealerPriceText: string | null;
  bodyType: string;
  seriesType: string;
  energyType: "EV" | "PHEV" | "EREV" | "HEV" | "ICE";
  driveForm: string | null;
  lengthMm: number | null;
  widthMm: number | null;
  heightMm: number | null;
  wheelbaseMm: number | null;
  seatCount: number | null;
  curbWeightKg: number | null;
  maxPowerKw: number | null;
  maxTorqueNm: number | null;
  acceleration100: number | null;
  wltcFuelL100km: number | null;
  batteryCapacityKwh: number | null;
  rangeKm: number | null;
  batteryType: string | null;
  centerScreenSize: number | null;
  hasOtaUpgrade: boolean;
  hasNavigationAssistedDriving: boolean;
  hasVoiceRecognition: boolean;
  rawParams: Record<string, unknown>;
};

export type DongchediCarDetailsRequestConfig = {
  baseUrl?: string | null;
  carId: number;
  cookie: string;
  userAgent?: string | null;
  referer?: string | null;
  origin?: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function optionalNumber(value: unknown) {
  const stringValue = optionalString(value);
  const numericValue = typeof value === "number" ? value : stringValue === null ? null : Number(stringValue);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function firstNumber(value: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function requireNumber(value: unknown, fieldName: string) {
  const numberValue = optionalNumber(value);
  if (numberValue === null) {
    throw new Error(`Dongchedi car details field ${fieldName} must be a number`);
  }

  return numberValue;
}

function requireString(value: unknown, fieldName: string) {
  const stringValue = optionalString(value);
  if (stringValue === null) {
    throw new Error(`Dongchedi car details field ${fieldName} must be a non-empty string`);
  }

  return stringValue;
}

function paramValue(params: Record<string, unknown>, key: string) {
  const value = params[key];
  return isRecord(value) ? optionalString(value.value) : null;
}

function parseEnergyType(fuelForm: string | null, electricDescription: string | null) {
  const text = `${fuelForm ?? ""}${electricDescription ?? ""}`;

  if (text.includes("纯电动")) {
    return "EV" as const;
  }
  if (text.includes("插电式混合")) {
    return "PHEV" as const;
  }
  if (text.includes("增程")) {
    return "EREV" as const;
  }
  if (text.includes("混合") || text.includes("轻混")) {
    return "HEV" as const;
  }

  return "ICE" as const;
}

function parsePower(params: Record<string, unknown>, energyType: string) {
  const preferredKeys =
    energyType === "EV"
      ? ["total_electric_power", "energy_elect_max_power"]
      : ["max_engine_net_power", "engine_max_power", "energy_elect_max_power"];

  for (const key of preferredKeys) {
    const value = firstNumber(paramValue(params, key));
    if (value !== null && value > 0) {
      return Math.round(value);
    }
  }

  return null;
}

function parseRange(params: Record<string, unknown>) {
  const rangeKeys = [
    "cltc_pure_electric_range",
    "nedc_pure_electric_range",
    "wltc_pure_electric_range",
    "pure_electric_range",
    "cltc_range",
    "nedc_range",
    "wltc_range",
  ];

  for (const key of rangeKeys) {
    const value = firstNumber(paramValue(params, key));
    if (value !== null && value > 0) {
      return Math.round(value);
    }
  }

  return null;
}

function extractNextDataScript(html: string) {
  const match = html.match(
    /<script\b[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i,
  );

  if (!match) {
    throw new Error("Dongchedi car details HTML is missing __NEXT_DATA__");
  }

  return JSON.parse(match[1]) as unknown;
}

function parseCarInfo(payload: unknown) {
  if (!isRecord(payload)) {
    throw new Error("Dongchedi __NEXT_DATA__ must be an object");
  }

  const props = payload.props;
  const pageProps = isRecord(props) ? props.pageProps : null;
  const rawData = isRecord(pageProps) ? pageProps.rawData : null;
  const carInfo = isRecord(rawData) ? rawData.car_info : null;
  const firstCar = Array.isArray(carInfo) ? carInfo[0] : null;

  if (!isRecord(firstCar)) {
    throw new Error("Dongchedi car details payload is missing rawData.car_info[0]");
  }

  return firstCar;
}

export function parseDongchediCarDetailsHtml(html: string): DongchediCarDetailsRecord {
  const car = parseCarInfo(extractNextDataScript(html));
  const params = isRecord(car.info) ? car.info : {};
  const fuelForm = paramValue(params, "fuel_form");
  const electricDescription = paramValue(params, "electric_description");
  const energyType = parseEnergyType(fuelForm, electricDescription);
  const bodyType = paramValue(params, "body_struct") ?? paramValue(params, "car_body_struct");
  const seriesType = requireString(car.series_type, "series_type");

  return {
    source: "dongchedi",
    sourceCarId: requireNumber(car.car_id, "car_id"),
    sourceSeriesId: requireNumber(car.series_id, "series_id"),
    brandName: requireString(car.brand_name, "brand_name"),
    seriesName: requireString(car.series_name, "series_name"),
    carName: requireString(car.car_name, "car_name"),
    saleStatus: optionalNumber(car.sale_status),
    officialPriceText: optionalString(car.official_price),
    dealerPriceText: optionalString(car.dealer_price),
    bodyType: bodyType ?? seriesType,
    seriesType,
    energyType,
    driveForm: paramValue(params, "driver_form"),
    lengthMm: optionalNumber(paramValue(params, "length")),
    widthMm: optionalNumber(paramValue(params, "width")),
    heightMm: optionalNumber(paramValue(params, "height")),
    wheelbaseMm: optionalNumber(paramValue(params, "wheelbase")),
    seatCount: optionalNumber(paramValue(params, "seat_count")),
    curbWeightKg: optionalNumber(paramValue(params, "curb_weight")),
    maxPowerKw: parsePower(params, energyType),
    maxTorqueNm: optionalNumber(paramValue(params, "energy_elect_max_torque"))
      ?? optionalNumber(paramValue(params, "engine_max_torque")),
    acceleration100: optionalNumber(paramValue(params, "acceleration_time")),
    wltcFuelL100km: optionalNumber(paramValue(params, "wltc_fuel_comprehensive")),
    batteryCapacityKwh: optionalNumber(paramValue(params, "battery_capacity")),
    rangeKm: parseRange(params),
    batteryType: paramValue(params, "battery_type"),
    centerScreenSize: optionalNumber(paramValue(params, "center_screen_size")),
    hasOtaUpgrade: paramValue(params, "ota_upgrade") === "标配",
    hasNavigationAssistedDriving: paramValue(params, "navigation_assisted_driving") === "标配",
    hasVoiceRecognition: Boolean(paramValue(params, "voice_recognition")),
    rawParams: params,
  };
}

export function buildDongchediCarDetailsRequest(config: DongchediCarDetailsRequestConfig) {
  const baseUrl = (config.baseUrl ?? "https://www.dongchedi.com/auto/params-carIds").replace(
    /\/$/,
    "",
  );
  const headers: Record<string, string> = {
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "accept-language": "zh-CN,zh;q=0.9",
    cookie: config.cookie,
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
  };

  headers["user-agent"] = config.userAgent
    ?? "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
  if (config.referer) {
    headers.referer = config.referer;
  }
  if (config.origin) {
    headers.origin = config.origin;
  }

  return {
    url: `${baseUrl}-${config.carId}`,
    init: {
      method: "GET",
      headers,
    } satisfies RequestInit,
  };
}
