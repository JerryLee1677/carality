import { Module } from "@nestjs/common";
import { AssessmentController } from "./assessment.controller";
import { AssessmentService } from "./assessment.service";
import { QuestionsModule } from "../questions/questions.module";
import { AuthModule } from "../auth/auth.module";
import { VehiclesModule } from "../vehicles/vehicles.module";

@Module({
  imports: [QuestionsModule, AuthModule, VehiclesModule],
  controllers: [AssessmentController],
  providers: [AssessmentService],
  exports: [AssessmentService],
})
export class AssessmentModule {}
