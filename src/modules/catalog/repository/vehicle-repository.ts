import { vehicles } from "@/data/vehicles/vehicles";

export const vehicleRepository = {
  getAll() {
    return vehicles;
  },

  getBySlug(slug: string) {
    return vehicles.find((vehicle) => vehicle.slug === slug) ?? null;
  },
};
