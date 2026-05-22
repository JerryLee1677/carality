import { Module } from "@nestjs/common";
import { AssessmentController } from "./assessment.controller";
import { AssessmentService } from "./assessment.service";
import { QuestionsModule } from "../questions/questions.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [QuestionsModule, AuthModule],
  controllers: [AssessmentController],
  providers: [AssessmentService],
  exports: [AssessmentService],
})
export class AssessmentModule {}
