import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { AssessmentService } from "./assessment.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { SubmitAnswerDto } from "./dto/submit-answer.dto";
import { SessionAuthService } from "../../common/auth/session-auth.service";

@Controller("assessment/sessions")
export class AssessmentController {
  constructor(
    private readonly assessmentService: AssessmentService,
    private readonly sessionAuth: SessionAuthService,
  ) {}

  @Post()
  async createSession(
    @Body() payload: CreateSessionDto,
    @Headers("x-session-token") sessionToken: string | undefined,
  ) {
    const auth = await this.sessionAuth.lookupSession(sessionToken);
    return this.assessmentService.createSession(payload, auth?.user.id);
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
