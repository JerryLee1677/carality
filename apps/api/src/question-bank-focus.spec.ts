import { describe, expect, it } from "vitest";
import { questions } from "../prisma/seed-data/questions";

describe("question bank automotive focus", () => {
  it("does not keep obvious non-automotive personality scenario prompts", () => {
    const combinedCopy = questions
      .flatMap((question) => [question.title, question.description ?? "", ...question.options.map((option) => option.label)])
      .join("\n");

    expect(combinedCopy).not.toMatch(/聚会/);
    expect(combinedCopy).not.toMatch(/陌生朋友/);
    expect(combinedCopy).not.toMatch(/组织一场活动/);
    expect(combinedCopy).not.toMatch(/家里添置/);
    expect(combinedCopy).not.toMatch(/买到一件自己很喜欢的东西/);
    expect(combinedCopy).not.toMatch(/生活中的变化/);
  });
});
