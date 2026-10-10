import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/index.js";

const TRANSACTION_MAX_WAIT_MS = 10_000;
const TRANSACTION_TIMEOUT_MS = 20_000;

function resolveDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("pgbouncer=") || !url.includes("-pooler.")) {
    return undefined;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}pgbouncer=true`;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const datasourceUrl = resolveDatabaseUrl();
    super({
      transactionOptions: {
        maxWait: TRANSACTION_MAX_WAIT_MS,
        timeout: TRANSACTION_TIMEOUT_MS,
      },
      ...(datasourceUrl ? { datasources: { db: { url: datasourceUrl } } } : {}),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
