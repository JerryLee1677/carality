import { expect, test } from "@playwright/test";

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`concrete choices remain readable and submit the sixth option at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript(() => localStorage.setItem("carality:language", "zh"));
    const labels = ["10 万元以内", "10–16 万元", "16–22 万元", "22–30 万元", "30–50 万元", "50 万元以上"];
    const question = {
      id: "budget", slug: "budget-range", title: "你的购车预算是多少？", description: null,
      branchKey: null, type: "CAR_USAGE",
      options: labels.map((label, index) => ({ id: `budget_${index + 1}`, label, order: index + 1 })),
    };
    await page.route("**/api/quiz/layout-preview", (route) => route.fulfill({ json: {
      sessionId: "layout-preview", status: "in_progress", mode: "quick", targetQuestionCount: 24,
      stepIndex: 0, nextQuestion: question,
    } }));
    let submittedAnswer: unknown;
    await page.route("**/api/quiz/layout-preview/answer", async (route) => {
      submittedAnswer = route.request().postDataJSON();
      await route.fulfill({ json: { accepted: true, nextQuestion: {
        ...question, id: "next", slug: "daily-reliability-priority", title: "接下来的题目",
        options: [{ id: "next_1", order: 1, label: "强烈不认同" }],
      } } });
    });
    await page.goto("/quiz/layout-preview");
    const choices = page.getByRole("radiogroup");
    await expect(choices).toHaveCSS("display", "grid");
    await expect(page.getByRole("radio")).toHaveCount(6);
    for (const label of labels) await expect(choices.getByText(label, { exact: true }).filter({ visible: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
    await page.locator(".quiz-session__option").nth(5).click();
    await expect(page.getByRole("heading", { name: "接下来的题目" })).toBeVisible();
    expect(submittedAnswer).toEqual({ questionId: "budget", optionId: "budget_6" });
  });
}
