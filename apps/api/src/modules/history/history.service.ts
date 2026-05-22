import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async listHistory(userId: string) {
    const sessions = await this.prisma.assessmentSession.findMany({
      where: {
        userId,
        status: "COMPLETED",
      },
      orderBy: {
        startedAt: "desc",
      },
      select: {
        id: true,
        startedAt: true,
        completedAt: true,
        result: {
          select: {
            summary: true,
            personalityProfile: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return sessions.map((session) => ({
      sessionId: session.id,
      startedAt: session.startedAt,
      completedAt: session.completedAt,
      profileCode: session.result?.personalityProfile.code ?? null,
      profileName: session.result?.personalityProfile.name ?? null,
      summary: session.result?.summary ?? null,
    }));
  }
}

