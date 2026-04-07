import type { VehicleSeed } from "@/data/vehicles/vehicles";

export type VehicleFilterInput = {
  budgetMin?: number;
  budgetMax?: number;
  bodyType?: string;
  energyType?: string;
};

export function filterVehicles(
  vehicles: VehicleSeed[],
  filters: VehicleFilterInput,
) {
  return vehicles.filter((vehicle) => {
    if (filters.bodyType && vehicle.bodyType !== filters.bodyType) {
      return false;
    }

    if (filters.energyType && vehicle.energyType !== filters.energyType) {
      return false;
    }

    if (filters.budgetMin && vehicle.priceMax < filters.budgetMin) {
      return false;
    }

    if (filters.budgetMax && vehicle.priceMin > filters.budgetMax) {
      return false;
    }

    return true;
  });
}
