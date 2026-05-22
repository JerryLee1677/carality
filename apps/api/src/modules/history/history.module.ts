import { Module } from "@nestjs/common";
import { PrismaModule } from "../../common/prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}

