import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SessionAuthService } from "../../common/auth/session-auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionAuth: SessionAuthService,
  ) {}

  @Get("public-key")
  getPublicKey() {
    return {
      publicKeyPem: this.authService.getPublicKeyPem(),
    };
  }

  @Post("register")
  async register(@Body() payload: RegisterDto) {
    const user = await this.authService.register(payload.email, payload.encryptedPassword);
    return {
      userId: user.id,
    };
  }

  @Post("login")
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload.email, payload.encryptedPassword);
  }

  @Get("me")
  async me(@Headers("x-session-token") sessionToken: string | undefined) {
    const user = await this.sessionAuth.requireUser(sessionToken);
    return {
      user,
    };
  }

  @Post("logout")
  async logout(@Headers("x-session-token") sessionToken: string | undefined) {
    await this.sessionAuth.revokeSession(sessionToken);
    return {
      ok: true,
    };
  }
}

