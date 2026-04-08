import { Module } from "@nestjs/common";
import { AssessmentController } from "./assessment.controller";
import { AssessmentService } from "./assessment.service";
import { QuestionsModule } from "../questions/questions.module";

@Module({
  imports: [QuestionsModule],
  controllers: [AssessmentController],
  providers: [AssessmentService],
  exports: [AssessmentService],
})
export class AssessmentModule {}
