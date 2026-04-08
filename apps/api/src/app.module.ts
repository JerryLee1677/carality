import { Module } from "@nestjs/common";
import { HealthController } from "./common/health/health.controller";
import { PrismaModule } from "./common/prisma/prisma.module";
import { AssessmentModule } from "./modules/assessment/assessment.module";
import { QuestionsModule } from "./modules/questions/questions.module";
import { EngineModule } from "./modules/engine/engine.module";
import { PersonalityModule } from "./modules/personality/personality.module";
import { RecommendationModule } from "./modules/recommendation/recommendation.module";
import { VehiclesModule } from "./modules/vehicles/vehicles.module";

@Module({
  imports: [
    PrismaModule,
    AssessmentModule,
    QuestionsModule,
    EngineModule,
    PersonalityModule,
    RecommendationModule,
    VehiclesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
