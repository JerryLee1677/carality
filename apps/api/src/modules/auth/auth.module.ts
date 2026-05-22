import { Module } from "@nestjs/common";
import { PrismaModule } from "../../common/prisma/prisma.module";
import { SessionAuthService } from "../../common/auth/session-auth.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, SessionAuthService],
  exports: [AuthService, SessionAuthService],
})
export class AuthModule {}

