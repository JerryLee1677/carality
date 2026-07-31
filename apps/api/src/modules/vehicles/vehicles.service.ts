import { Injectable } from "@nestjs/common";
import type { PrismaService } from "../../common/prisma/prisma.service";

type TraitTargetType =
  | "HARD_CONSTRAINT"
  | "PERSONALITY_TRAIT"
  | "VEHICLE_PREFERENCE"
  | "BRANCH_SIGNAL";

type RuleOperator = "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";

export type RecommendationVehicle = {
  id: string;
  slug: string;
  brand: string;
  series: string;
  modelName: string;
  priceMin: number;
  priceMax: number;
  energyType: string;
  bodyType: string;
  summary: string;
  recommendation: string;
  status: string;
  handlingScore: number;
  comfortScore: number;
  spaceScore: number;
  smartScore: number;
  powerScore: number;
  economyScore: number;
  brandScore: number;
  designScore: number;
  reliabilityScore: number;
  familyScore: number;
  tags?: string[];
  traitWeights: Array<{
    targetType: TraitTargetType;
    targetKey: string;
    weight: number | { toString(): string };
  }>;
  constraintRules: Array<{
    targetType: TraitTargetType;
    targetKey: string;
    traitOperator: RuleOperator;
    traitThreshold: number | { toString(): string };
  }>;
};

@Injectable()
export class VehiclesService {
  async findActiveRecommendationVehicles(
    db: Pick<PrismaService, "vehicle">,
  ): Promise<RecommendationVehicle[]> {
    const config = this.readFeishuConfig();

    if (!config) {
      return db.vehicle.findMany({
        include: {
          traitWeights: true,
          constraintRules: true,
        },
        where: {
          status: "active",
        },
      }) as Promise<RecommendationVehicle[]>;
    }

    const token = await this.getTenantAccessToken(config);
    const [vehicleRecords, tagRecords, weightRecords, ruleRecords] = await Promise.all([
      this.listRecords(config, config.vehiclesTableId, token),
      this.listRecords(config, config.tagsTableId, token),
      this.listRecords(config, config.weightsTableId, token),
      this.listRecords(config, config.rulesTableId, token),
    ]);

    const tagsByVehicle = this.groupRows(tagRecords, "vehicleSlug");
    const weightsByVehicle = this.groupRows(weightRecords, "vehicleSlug");
    const rulesByVehicle = this.groupRows(ruleRecords, "vehicleSlug");

    return vehicleRecords
      .map((record) => record.fields)
      .filter((fields) => this.getText(fields.status, "active") === "active")
      .map((fields) => {
        const slug = this.requireText(fields.slug, "slug");

        return {
          id: slug,
          slug,
          brand: this.requireText(fields.brand, "brand"),
          series: this.requireText(fields.series, "series"),
          modelName: this.getText(fields.modelName),
          priceMin: this.getNumber(fields.priceMin),
          priceMax: this.getNumber(fields.priceMax),
          energyType: this.getText(fields.energyType, "ICE"),
          bodyType: this.getText(fields.bodyType),
          summary: this.getText(fields.summary),
          recommendation: this.getText(fields.recommendation),
          status: "active",
          handlingScore: this.getNumber(fields.handlingScore),
          comfortScore: this.getNumber(fields.comfortScore),
          spaceScore: this.getNumber(fields.spaceScore),
          smartScore: this.getNumber(fields.smartScore),
          powerScore: this.getNumber(fields.powerScore),
          economyScore: this.getNumber(fields.economyScore),
          brandScore: this.getNumber(fields.brandScore),
          designScore: this.getNumber(fields.designScore),
          reliabilityScore: this.getNumber(fields.reliabilityScore),
          familyScore: this.getNumber(fields.familyScore),
          tags: (tagsByVehicle.get(slug) ?? [])
            .map((row) => this.getText(row.fields.tag))
            .filter(Boolean),
          traitWeights: (weightsByVehicle.get(slug) ?? []).map((row) => ({
            targetType: this.getTraitTargetType(row.fields.targetType),
            targetKey: this.requireText(row.fields.targetKey, "targetKey"),
            weight: this.getNumber(row.fields.weight),
          })),
          constraintRules: (rulesByVehicle.get(slug) ?? []).map((row) => ({
            targetType: this.getTraitTargetType(row.fields.targetType),
            targetKey: this.requireText(row.fields.targetKey, "targetKey"),
            traitOperator: this.getRuleOperator(row.fields.traitOperator),
            traitThreshold: this.getNumber(row.fields.traitThreshold),
          })),
        };
      });
  }

  usesExternalVehicleSource() {
    return Boolean(this.readFeishuConfig());
  }

  private readFeishuConfig() {
    const appId = this.readEnv("FEISHU_APP_ID");
    const appSecret = this.readEnv("FEISHU_APP_SECRET");
    const baseToken = this.readEnv("FEISHU_BASE_TOKEN");
    const vehiclesTableId = this.readEnv("FEISHU_VEHICLES_TABLE_ID");
    const tagsTableId = this.readEnv("FEISHU_VEHICLE_TAGS_TABLE_ID");
    const weightsTableId = this.readEnv("FEISHU_VEHICLE_WEIGHTS_TABLE_ID");
    const rulesTableId = this.readEnv("FEISHU_VEHICLE_RULES_TABLE_ID");

    if (
      !appId ||
      !appSecret ||
      !baseToken ||
      !vehiclesTableId ||
      !tagsTableId ||
      !weightsTableId ||
      !rulesTableId
    ) {
      return null;
    }

    return {
      appId,
      appSecret,
      baseToken,
      vehiclesTableId,
      tagsTableId,
      weightsTableId,
      rulesTableId,
    };
  }

  private readEnv(name: string) {
    const value = process.env[name];
    return value && value.trim().length > 0 ? value.trim() : null;
  }

  private async getTenantAccessToken(config: {
    appId: string;
    appSecret: string;
  }) {
    const response = await fetch(
      "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          app_id: config.appId,
          app_secret: config.appSecret,
        }),
      },
    );

    const payload = await response.json();

    if (!response.ok || payload.code !== 0 || !payload.tenant_access_token) {
      throw new Error(`Failed to get Feishu tenant_access_token: ${payload.msg ?? response.status}`);
    }

    return payload.tenant_access_token as string;
  }

  private async listRecords(
    config: {
      baseToken: string;
    },
    tableId: string,
    tenantAccessToken: string,
  ): Promise<Array<{ record_id?: string; fields: Record<string, unknown> }>> {
    const records: Array<{ record_id?: string; fields: Record<string, unknown> }> = [];
    let pageToken: string | null = null;

    do {
      const searchParams = new URLSearchParams({
        page_size: "500",
      });

      if (pageToken) {
        searchParams.set("page_token", pageToken);
      }

      const response = await fetch(
        `https://open.feishu.cn/open-apis/bitable/v1/apps/${config.baseToken}/tables/${tableId}/records?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tenantAccessToken}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );

      const payload = await response.json();

      if (!response.ok || payload.code !== 0) {
        throw new Error(
          `Failed to list Feishu Base records for ${tableId}: ${payload.msg ?? response.status}`,
        );
      }

      records.push(...(payload.data?.items ?? []));
      pageToken = payload.data?.has_more ? (payload.data?.page_token ?? null) : null;
    } while (pageToken);

    return records;
  }

  private groupRows(
    rows: Array<{ fields: Record<string, unknown> }>,
    fieldName: string,
  ) {
    const grouped = new Map<string, Array<{ fields: Record<string, unknown> }>>();

    for (const row of rows) {
      const key = this.getText(row.fields[fieldName]);
      if (!key) {
        continue;
      }

      grouped.set(key, [...(grouped.get(key) ?? []), row]);
    }

    return grouped;
  }

  private requireText(value: unknown, fieldName: string): string {
    const text = this.getText(value);

    if (!text) {
      throw new Error(`Missing required Feishu vehicle field: ${fieldName}`);
    }

    return text;
  }

  private getTraitTargetType(value: unknown): TraitTargetType {
    const text = this.requireText(value, "targetType");
    if (
      text === "HARD_CONSTRAINT" ||
      text === "PERSONALITY_TRAIT" ||
      text === "VEHICLE_PREFERENCE" ||
      text === "BRANCH_SIGNAL"
    ) {
      return text;
    }

    throw new Error(`Unsupported Feishu vehicle targetType: ${text}`);
  }

  private getRuleOperator(value: unknown): RuleOperator {
    const text = this.requireText(value, "traitOperator");
    if (
      text === "EQ" ||
      text === "NEQ" ||
      text === "GT" ||
      text === "GTE" ||
      text === "LT" ||
      text === "LTE"
    ) {
      return text;
    }

    throw new Error(`Unsupported Feishu vehicle rule operator: ${text}`);
  }

  private getText(value: unknown, fallback = ""): string {
    if (Array.isArray(value)) {
      return value.map((item) => this.getText(item)).find(Boolean) ?? fallback;
    }

    if (typeof value === "string") {
      return value.trim();
    }

    if (typeof value === "number") {
      return String(value);
    }

    if (value && typeof value === "object") {
      const objectValue = value as Record<string, unknown>;
      return this.getText(
        objectValue.text ??
          objectValue.name ??
          objectValue.value ??
          objectValue.link ??
          objectValue.url,
        fallback,
      );
    }

    return fallback;
  }

  private getNumber(value: unknown, fallback = 0): number {
    if (Array.isArray(value)) {
      return this.getNumber(value[0], fallback);
    }

    const numericValue = typeof value === "number" ? value : Number.parseFloat(this.getText(value));
    return Number.isFinite(numericValue) ? numericValue : fallback;
  }
}
