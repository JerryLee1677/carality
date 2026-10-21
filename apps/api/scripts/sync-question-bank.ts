import "dotenv/config";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PrismaClient } from "../src/generated/prisma/index.js";
import { questions } from "../prisma/seed-data/questions";
import { syncQuestionBank } from "../prisma/sync-questions";

async function main() {
  const argumentsList = process.argv.slice(2);
  if (argumentsList.some((argument) => !["--apply", "--dry-run"].includes(argument)) ||
      (argumentsList.includes("--apply") && argumentsList.includes("--dry-run"))) {
    throw new Error("Usage: pnpm sync:questions [--dry-run | --apply]");
  }
  const apply = argumentsList.includes("--apply");
  const prisma = new PrismaClient();
  try {
    const result = await prisma.$transaction(async (transaction) => {
      const before = {
        sessions: await transaction.assessmentSession.count(),
        answers: await transaction.assessmentAnswer.count(),
        results: await transaction.sessionResult.count(),
        vehicles: await transaction.vehicle.count(),
      };
      let backupPath: string | null = null;
      if (apply) {
        const directory = await mkdtemp(join(tmpdir(), "carality-question-bank-"));
        backupPath = join(directory, "questions-before.json");
        const snapshot = await transaction.question.findMany({ include: { options: { include: { effects: true } }, outgoingRules: true } });
        await writeFile(backupPath, JSON.stringify(snapshot, null, 2), { mode: 0o600 });
      }
      const changes = await syncQuestionBank(transaction, questions, apply);
      const after = {
        sessions: await transaction.assessmentSession.count(),
        answers: await transaction.assessmentAnswer.count(),
        results: await transaction.sessionResult.count(),
        vehicles: await transaction.vehicle.count(),
      };
      if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error("Protected record counts changed; rolling back question sync");
      return { apply, ...changes, backupPath, before, after };
    }, { timeout: 60_000, isolationLevel: "Serializable" });
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
