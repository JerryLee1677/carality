import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

type SessionUser = {
  id: string;
  email: string;
};

type SessionLookupResult = {
  user: SessionUser;
  sessionId: string;
};

const DEFAULT_SESSION_TTL_DAYS = 7;

function sha256Base64(value: string) {
  return createHash("sha256").update(value, "utf8").digest("base64");
}

function getTtlSeconds() {
  const ttlDays = Number.parseInt(process.env.AUTH_SESSION_TTL_DAYS ?? "", 10);
  const days = Number.isFinite(ttlDays) && ttlDays > 0 ? ttlDays : DEFAULT_SESSION_TTL_DAYS;
  return days * 24 * 60 * 60;
}

function generateSessionToken() {
  // 32 bytes -> 256-bit random token
  return randomBytes(32).toString("base64url");
}

@Injectable()
export class SessionAuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: string) {
    const sessionToken = generateSessionToken();
    const tokenHash = sha256Base64(sessionToken);
    const ttlSeconds = getTtlSeconds();
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    const session = await this.prisma.authSession.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
      select: {
        id: true,
      },
    });

    return {
      sessionId: session.id,
      sessionToken,
      expiresAt,
    };
  }

  async lookupSession(sessionToken: string | undefined): Promise<SessionLookupResult | null> {
    if (!sessionToken) {
      return null;
    }

    const tokenHash = sha256Base64(sessionToken);
    const session = await this.prisma.authSession.findUnique({
      where: {
        tokenHash,
      },
      select: {
        id: true,
        revokedAt: true,
        expiresAt: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!session) {
      return null;
    }

    if (session.revokedAt) {
      return null;
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      return null;
    }

    // Best-effort lastSeen update, but never block auth.
    void this.prisma.authSession
      .update({
        where: {
          tokenHash,
        },
        data: {
          lastSeenAt: new Date(),
        },
        select: {
          id: true,
        },
      })
      .catch(() => null);

    return {
      sessionId: session.id,
      user: session.user,
    };
  }

  async requireUser(sessionToken: string | undefined): Promise<SessionUser> {
    const result = await this.lookupSession(sessionToken);
    if (!result) {
      throw new UnauthorizedException("Unauthorized");
    }

    return result.user;
  }

  async revokeSession(sessionToken: string | undefined) {
    if (!sessionToken) {
      return;
    }

    const tokenHash = sha256Base64(sessionToken);
    await this.prisma.authSession.updateMany({
      where: {
        tokenHash,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  timingSafeEquals(a: string, b: string) {
    const aBytes = Buffer.from(a, "utf8");
    const bBytes = Buffer.from(b, "utf8");
    if (aBytes.length !== bBytes.length) {
      return false;
    }

    return timingSafeEqual(aBytes, bBytes);
  }
}

