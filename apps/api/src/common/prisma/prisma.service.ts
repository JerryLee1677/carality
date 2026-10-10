import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/index.js";

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
    super(datasourceUrl ? { datasources: { db: { url: datasourceUrl } } } : undefined);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
