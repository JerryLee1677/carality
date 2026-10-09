import {
  buildDongchediCarDetailsRequest,
  parseDongchediCarDetailsHtml,
  type DongchediCarDetailsRecord,
} from "./dongchedi-car-details-importer";
import { buildVehicleCandidate } from "./vehicle-candidate";

function buildHtml(carInfo: Record<string, unknown>) {
  return `<html><body><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
    props: {
      pageProps: {
        rawData: {
          car_info: [carInfo],
        },
      },
    },
  })}</script></body></html>`;
}

function buildIceRecord() {
  return {
    car_name: "300TSI 尊享版",
    dealer_text: "",
    series_type: "中型车",
    series_name: "迈腾",
    official_price: "17.99万",
    series_id: 415,
    dealer_price: "暂无报价",
    has_dealer_price: false,
    sale_status: 3,
    car_page_enable: true,
    car_year: "2026",
    car_id: 253447,
    brand_name: "大众",
    brand_id: 1,
    info: {
      body_struct: { value: "三厢车" },
      length: { value: "4990" },
      width: { value: "1854" },
      height: { value: "1487" },
      wheelbase: { value: "2871" },
      seat_count: { value: "5" },
      curb_weight: { value: "1500" },
      engine_max_power: { value: "118" },
      engine_max_torque: { value: "250" },
      acceleration_time: { value: "9.1" },
      wltc_fuel_comprehensive: { value: "5.8" },
      fuel_form: { value: "汽油" },
      driver_form: { value: "前置前驱" },
    },
  };
}

function buildEvRecord() {
  return {
    car_name: "Ultra",
    dealer_text: "询底价",
    series_type: "轿车",
    series_name: "星愿",
    official_price: "暂无报价",
    series_id: 7494,
    dealer_price: "暂无报价",
    has_dealer_price: false,
    sale_status: 5,
    car_page_enable: true,
    car_year: "2026",
    car_id: 258751,
    brand_name: "吉利银河",
    brand_id: 109,
    info: {
      body_struct: { value: "轿车" },
      length: { value: "4240" },
      width: { value: "1805" },
      height: { value: "1570" },
      wheelbase: { value: "2650" },
      seat_count: { value: "5" },
      curb_weight: { value: "1330" },
      energy_elect_max_power: { value: "85kW(116Ps)" },
      energy_elect_max_torque: { value: "150" },
      max_speed: { value: "140" },
      fuel_form: { value: "纯电动" },
      electric_description: { value: "纯电动 116马力" },
      driver_form: { value: "后置后驱" },
      battery_type: { value: "磷酸铁锂电池" },
    },
  };
}

describe("parseDongchediCarDetailsHtml", () => {
  it("parses server-rendered ICE car details", () => {
    const record = parseDongchediCarDetailsHtml(buildHtml(buildIceRecord()));

    expect(record).toMatchObject({
      source: "dongchedi",
      sourceCarId: 253447,
      sourceSeriesId: 415,
      brandName: "大众",
      seriesName: "迈腾",
      energyType: "ICE",
      bodyType: "三厢车",
      wheelbaseMm: 2871,
      seatCount: 5,
      maxPowerKw: 118,
      maxTorqueNm: 250,
      acceleration100: 9.1,
      wltcFuelL100km: 5.8,
    });
  });

  it("parses server-rendered EV car details", () => {
    const record = parseDongchediCarDetailsHtml(buildHtml(buildEvRecord()));

    expect(record).toMatchObject({
      source: "dongchedi",
      sourceCarId: 258751,
      sourceSeriesId: 7494,
      brandName: "吉利银河",
      seriesName: "星愿",
      energyType: "EV",
      bodyType: "轿车",
      wheelbaseMm: 2650,
      maxPowerKw: 85,
      maxTorqueNm: 150,
      driveForm: "后置后驱",
      batteryType: "磷酸铁锂电池",
    });
  });

  it("builds a browser GET request without putting the cookie in the URL", () => {
    const request = buildDongchediCarDetailsRequest({
      carId: 253447,
      cookie: "sessionid=secret",
      userAgent: "test-agent",
    });

    expect(request.url).toBe("https://www.dongchedi.com/auto/params-carIds-253447");
    expect(request.init.method).toBe("GET");
    expect(request.init.headers).toMatchObject({
      cookie: "sessionid=secret",
      "user-agent": "test-agent",
      "accept-language": "zh-CN,zh;q=0.9",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    });
    expect(request.url).not.toContain("secret");
  });

  it("uses a modern Chrome user agent when one is not configured", () => {
    const request = buildDongchediCarDetailsRequest({
      carId: 253447,
      cookie: "sessionid=secret",
    });

    expect(request.init.headers).toMatchObject({
      "user-agent": expect.stringContaining("Mozilla/5.0"),
    });
  });
});

describe("buildVehicleCandidate", () => {
  it("generates pending candidate data for an ICE car with complete pricing", () => {
    const candidate = buildVehicleCandidate(
      parseDongchediCarDetailsHtml(buildHtml(buildIceRecord())),
    );

    expect(candidate).toMatchObject({
      source: "dongchedi",
      sourceCarId: 253447,
      energyType: "ICE",
      priceMin: 179_900,
      priceMax: 179_900,
      qualityStatus: "PENDING",
      rejectReason: null,
    });
    expect(Object.values(candidate.coreScores)).toHaveLength(10);
    expect(candidate.traitWeights).toHaveLength(5);
    expect(candidate.traitWeights.every((weight) => weight.weight >= 5 && weight.weight <= 10)).toBe(true);
  });

  it("falls back to series pricing and marks incomplete EV data as rejected", () => {
    const parsed = parseDongchediCarDetailsHtml(
      buildHtml(buildEvRecord()),
    ) as DongchediCarDetailsRecord;
    const candidate = buildVehicleCandidate(parsed, "7.28-9.28万", null);

    expect(candidate).toMatchObject({
      energyType: "EV",
      priceMin: 72_800,
      priceMax: 92_800,
      qualityStatus: "PENDING",
      rejectReason: null,
    });
    expect(candidate.constraintRules).toEqual(
      expect.arrayContaining([
        { targetType: "HARD_CONSTRAINT", targetKey: "charging_access", traitOperator: "GTE", traitThreshold: 3 },
        { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ev", traitOperator: "GTE", traitThreshold: 3 },
      ]),
    );
    expect(candidate.dataConfidence).toBeLessThan(1);
  });
});
