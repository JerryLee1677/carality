import { Controller, Get, NotFoundException, Optional, Param } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { VehiclesService } from "./vehicles.service";

@Controller("vehicles")
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    @Optional() private readonly prisma?: PrismaService,
  ) {}

  @Get()
  async listVehicles() {
    const vehicles = await this.vehiclesService.findActiveRecommendationVehicles(this.prisma as PrismaService);

    return {
      vehicles,
    };
  }

  @Get(":slug")
  async getVehicle(@Param("slug") slug: string) {
    const vehicles = await this.vehiclesService.findActiveRecommendationVehicles(this.prisma as PrismaService);
    const vehicle = vehicles.find((item) => item.slug === slug);

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    return {
      vehicle,
    };
  }
}
