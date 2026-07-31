import { assessmentApiFetch } from "@/lib/assessment-api";

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
    const response = await assessmentApiFetch(`/vehicles/${encodeURIComponent(slug)}`);
    const payload = (await response.json()) as { vehicle: CatalogVehicle };

    return payload.vehicle ?? null;
  },
};
