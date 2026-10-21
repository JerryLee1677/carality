import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/index.js";
import { VehiclesService } from "../src/modules/vehicles/vehicles.service";
import { normalizeVehicleSeries, resolveVehiclePoolPolicy, VEHICLE_POOL_VERSION } from "../src/modules/vehicles/mainstream-vehicle-pool";

async function main() {
  const prisma = new PrismaClient();
  try {
    const vehicles = await new VehiclesService().findActiveRecommendationVehicles(prisma as never);
    const buckets = ["PRIMARY", "SUPPLEMENTAL", "EXCLUDED"] as const;
    console.log(JSON.stringify({ version: VEHICLE_POOL_VERSION, source: "editorial whitelist, not live sales ranking",
      total: vehicles.length,
      tiers: Object.fromEntries(buckets.map((tier) => {
        const rows = vehicles.filter((vehicle) => resolveVehiclePoolPolicy(vehicle).tier === tier);
        return [tier, { vehicles: rows.length, series: new Set(rows.map(normalizeVehicleSeries)).size,
          under100k: rows.filter((vehicle) => vehicle.priceMin > 0 && vehicle.priceMin <= 100_000).length,
          energyTypes: [...new Set(rows.map((vehicle) => vehicle.energyType))],
          examples: rows.slice(0, 10).map((vehicle) => `${vehicle.brand} ${vehicle.series}`) }];
      })),
    }, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
