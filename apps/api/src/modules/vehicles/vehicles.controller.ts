import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { VehiclesService } from "./vehicles.service";

@Controller("vehicles")
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async listVehicles() {
    const vehicles = await this.vehiclesService.findActiveRecommendationVehicles(this.prisma);

    return {
      vehicles,
    };
  }

  @Get(":slug")
  async getVehicle(@Param("slug") slug: string) {
    const vehicle = await this.vehiclesService.findVehicleBySlug(this.prisma, slug);

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    return {
      vehicle,
    };
  }
}
