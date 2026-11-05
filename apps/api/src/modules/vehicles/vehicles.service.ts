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
  dataConfidence?: number | { toString(): string } | null;
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

type VehicleDbClient = Pick<PrismaService, "vehicle">;

const DEFAULT_CATALOG_CACHE_TTL_MS = 60_000;

const ACTIVE_VEHICLE_INCLUDE = {
  traitWeights: true,
  constraintRules: true,
} as const;

const ACTIVE_VEHICLE_WHERE = {
  status: "active",
  recommendationStatus: "ACTIVE",
} as const;

function resolveCatalogCacheTtlMs() {
  const raw = Number.parseInt(process.env.VEHICLE_CATALOG_CACHE_TTL_MS ?? "", 10);

  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_CATALOG_CACHE_TTL_MS;
}

@Injectable()
export class VehiclesService {
  private cachedVehicles: RecommendationVehicle[] | null = null;
  private cachedAt = 0;
  private pendingCatalog: Promise<RecommendationVehicle[]> | null = null;

  /**
   * 完成测评与结果页都要读车型池，这里在进程内做短暂缓存，避免同一实例反复全表扫描。
   * 设 VEHICLE_CATALOG_CACHE_TTL_MS=0 可关闭缓存。
   */
  async findActiveRecommendationVehicles(
    db: VehicleDbClient,
  ): Promise<RecommendationVehicle[]> {
    const ttlMs = resolveCatalogCacheTtlMs();

    if (this.cachedVehicles && ttlMs > 0 && Date.now() - this.cachedAt < ttlMs) {
      return this.cachedVehicles;
    }

    if (this.pendingCatalog) {
      return this.pendingCatalog;
    }

    this.pendingCatalog = db.vehicle.findMany({
      include: ACTIVE_VEHICLE_INCLUDE,
      where: ACTIVE_VEHICLE_WHERE,
    }) as Promise<RecommendationVehicle[]>;

    try {
      const vehicles = await this.pendingCatalog;
      this.cachedVehicles = vehicles;
      this.cachedAt = Date.now();

      return vehicles;
    } finally {
      this.pendingCatalog = null;
    }
  }

  /**
   * 车型详情按 slug 定向读取，避免为了单台车加载整个车型池。
   */
  async findVehicleBySlug(
    db: VehicleDbClient,
    slug: string,
  ): Promise<RecommendationVehicle | null> {
    return db.vehicle.findFirst({
      include: ACTIVE_VEHICLE_INCLUDE,
      where: {
        ...ACTIVE_VEHICLE_WHERE,
        slug,
      },
    }) as Promise<RecommendationVehicle | null>;
  }

  clearCatalogCache() {
    this.cachedVehicles = null;
    this.cachedAt = 0;
  }
}
