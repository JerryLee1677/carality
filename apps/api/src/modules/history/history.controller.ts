import { Controller, Get, Headers } from "@nestjs/common";
import { SessionAuthService } from "../../common/auth/session-auth.service";
import { HistoryService } from "./history.service";

@Controller("history")
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly sessionAuth: SessionAuthService,
  ) {}

  @Get()
  async list(@Headers("x-session-token") sessionToken: string | undefined) {
    const user = await this.sessionAuth.requireUser(sessionToken);
    return this.historyService.listHistory(user.id);
  }
}

