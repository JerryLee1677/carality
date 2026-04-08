import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AssessmentService } from "./assessment.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { SubmitAnswerDto } from "./dto/submit-answer.dto";

@Controller("assessment/sessions")
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  createSession(@Body() payload: CreateSessionDto) {
    return this.assessmentService.createSession(payload);
  }

  @Post(":sessionId/answers")
  submitAnswer(
    @Param("sessionId") sessionId: string,
    @Body() payload: SubmitAnswerDto,
  ) {
    return this.assessmentService.submitAnswer(sessionId, payload);
  }

  @Post(":sessionId/complete")
  completeSession(@Param("sessionId") sessionId: string) {
    return this.assessmentService.completeSession(sessionId);
  }

  @Get(":sessionId/current")
  getCurrentSession(@Param("sessionId") sessionId: string) {
    return this.assessmentService.getCurrentSession(sessionId);
  }

  @Get(":sessionId/result")
  getSessionResult(@Param("sessionId") sessionId: string) {
    return this.assessmentService.getSessionResult(sessionId);
  }
}
