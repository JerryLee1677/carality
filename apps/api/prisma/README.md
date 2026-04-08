# API Prisma Schema

This schema is the first backend-specific data model for the adaptive assessment service.

Model groups:

- `Question`, `QuestionOption`, `OptionEffect`, `QuestionBranchRule`: content and routing rules
- `AssessmentSession`, `AssessmentAnswer`, `SessionTraitSnapshot`, `SessionQuestionCandidate`: runtime assessment state
- `PersonalityProfile`, `SessionResult`, `SessionVehicleRecommendation`: final result output
- `Vehicle`, `VehicleTraitWeight`, `VehicleTag`, `VehicleTagMapping`: recommendation catalog

The schema lives under `apps/api/prisma` so the new backend can evolve without breaking the current frontend's legacy Prisma client.
