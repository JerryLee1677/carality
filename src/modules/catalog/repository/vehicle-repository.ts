import { AssessmentApiError, assessmentApiFetch } from "@/lib/assessment-api";

export type CatalogVehicle = {
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
  heroImage?: string | null;
};

export const vehicleRepository = {
  async getAll() {
    const response = await assessmentApiFetch("/vehicles");
    const payload = (await response.json()) as { vehicles: CatalogVehicle[] };

    return payload.vehicles;
  },

  async getBySlug(slug: string) {
    try {
      const response = await assessmentApiFetch(`/vehicles/${encodeURIComponent(slug)}`);
      const payload = (await response.json()) as { vehicle?: CatalogVehicle | null };

      return payload.vehicle ?? null;
    } catch (error) {
      // 上游用 404 表示车型不存在，这里转换成 null 交给页面走 notFound()。
      if (error instanceof AssessmentApiError && error.status === 404) {
        return null;
      }

      throw error;
    }
  },
};
