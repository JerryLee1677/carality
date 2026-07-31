import {
  buildDongchediSeriesRequest,
  parseDongchediSeriesResponse,
  shouldStopDongchediPagination,
  syncDongchediSeriesPages,
} from "./dongchedi-series-importer";

const sampleSeries = {
  count: 16,
  outter_name: "极狐 阿尔法S5",
  cover_url: "http://p9-dcd.byteimg.com/sample.png",
  brand_id: 176,
  brand_name: "ARCFOX极狐",
  car_ids: [247641, 247642],
  business_status: 0,
  id: 9179,
  concern_id: 9179,
  dcar_score: 3.92,
  new_car_tag: 0,
  dealer_price: "9.98-16.88万",
  has_dealer_price: true,
  official_price: "10.48万",
  has_official_price: true,
  pre_price: "11.78-17.88万",
  has_pre_price: true,
  subsidy_price: "暂无报价",
  has_subsidy_price: false,
  rank_info: [],
  top_tag: {
    type: 3,
    text: "中型轿车销量NO.16",
    color: "#606370",
    bg_color: "#f2f4fa",
  },
  category_pic: null,
  series_pic_count: 13018,
};

describe("parseDongchediSeriesResponse", () => {
  it("maps successful series payloads into external vehicle series records", () => {
    const records = parseDongchediSeriesResponse({
      status: 0,
      message: "success",
      data: {
        series: [sampleSeries],
        series_count: 1,
      },
    });

    expect(records).toEqual([
      {
        source: "dongchedi",
        sourceSeriesId: 9179,
        sourceBrandId: 176,
        brandName: "ARCFOX极狐",
        seriesName: "极狐 阿尔法S5",
        coverUrl: "http://p9-dcd.byteimg.com/sample.png",
        carIds: [247641, 247642],
        businessStatus: 0,
        concernId: 9179,
        dcarScore: 3.92,
        newCarTag: 0,
        dealerPriceText: "9.98-16.88万",
        hasDealerPrice: true,
        officialPriceText: "10.48万",
        hasOfficialPrice: true,
        prePriceText: "11.78-17.88万",
        hasPrePrice: true,
        subsidyPriceText: "暂无报价",
        hasSubsidyPrice: false,
        rankInfo: [],
        topTag: sampleSeries.top_tag,
        categoryPic: null,
        seriesPicCount: 13018,
        rawPayload: sampleSeries,
      },
    ]);
  });

  it("rejects failed api payloads with the source message", () => {
    expect(() =>
      parseDongchediSeriesResponse({
        status: 1001,
        message: "signature expired",
        data: {
          series: [],
        },
      }),
    ).toThrow("Dongchedi API failed: signature expired");
  });
});

describe("buildDongchediSeriesRequest", () => {
  it("builds a paginated url and form body without leaking cookies into query params", () => {
    const request = buildDongchediSeriesRequest({
      endpoint: "https://www.dongchedi.com/motor/pc/car/brand/select_series_v2",
      queryString: "aid=1839&app_name=auto_web_pc&msToken=abc",
      cookie: "sessionid=secret",
      cityName: "杭州",
      page: 3,
      limit: 30,
      sortNew: "hot_desc",
      seriesType: 0,
    });

    expect(request.url).toBe(
      "https://www.dongchedi.com/motor/pc/car/brand/select_series_v2?aid=1839&app_name=auto_web_pc&msToken=abc",
    );
    expect(request.init.method).toBe("POST");
    expect(request.init.body).toBe(
      "series_type=0&sort_new=hot_desc&city_name=%E6%9D%AD%E5%B7%9E&limit=30&page=3",
    );
    expect(request.init.headers).toMatchObject({
      cookie: "sessionid=secret",
      "content-type": "application/x-www-form-urlencoded",
    });
  });

  it("omits series_type when the caller wants to mirror an unrestricted request body", () => {
    const request = buildDongchediSeriesRequest({
      endpoint: "https://www.dongchedi.com/motor/pc/car/brand/select_series_v2",
      queryString: "aid=1839&app_name=auto_web_pc&msToken=abc",
      cookie: "sessionid=secret",
      cityName: "杭州",
      page: 3,
      limit: 30,
      sortNew: "hot_desc",
      seriesType: null,
    });

    expect(request.init.body).toBe(
      "sort_new=hot_desc&city_name=%E6%9D%AD%E5%B7%9E&limit=30&page=3",
    );
  });
});

describe("shouldStopDongchediPagination", () => {
  it("stops when the returned page is shorter than the requested limit", () => {
    expect(shouldStopDongchediPagination({ fetchedCount: 29, limit: 30 })).toBe(true);
    expect(shouldStopDongchediPagination({ fetchedCount: 30, limit: 30 })).toBe(false);
  });
});

describe("syncDongchediSeriesPages", () => {
  it("fetches pages until the final page is shorter than the limit and upserts parsed records", async () => {
    const fetchedPages: number[] = [];
    const upsertedSeriesIds: number[] = [];
    const makePayload = (page: number, count: number) => ({
      status: 0,
      message: "success",
      data: {
        series: Array.from({ length: count }, (_, index) => ({
          ...sampleSeries,
          id: page * 100 + index,
          outter_name: `车系 ${page}-${index}`,
        })),
      },
    });

    const summary = await syncDongchediSeriesPages({
      endpoint: "https://www.dongchedi.com/motor/pc/car/brand/select_series_v2",
      cookie: "sessionid=secret",
      cityName: "杭州",
      startPage: 1,
      maxPages: 5,
      limit: 2,
      fetchJson: async (_request, page) => {
        fetchedPages.push(page);
        return makePayload(page, page === 3 ? 1 : 2);
      },
      upsertRecord: async (record) => {
        upsertedSeriesIds.push(record.sourceSeriesId);
      },
    });

    expect(fetchedPages).toEqual([1, 2, 3]);
    expect(upsertedSeriesIds).toEqual([100, 101, 200, 201, 300]);
    expect(summary).toEqual({
      fetchedPages: 3,
      fetchedRecords: 5,
      upsertedRecords: 5,
      dryRun: false,
    });
  });
});
