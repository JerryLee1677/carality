import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number.parseInt(process.env.PORT ?? "4010", 10);
  await app.listen(port);
}

void bootstrap();
