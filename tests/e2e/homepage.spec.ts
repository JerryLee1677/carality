import { expect, test } from "@playwright/test";

test("homepage CTA leads to the quiz landing page", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(
    page.getByRole("heading", {
      name: "人格，遇见性能。",
    }),
  ).toBeVisible();
  await expect(page.getByText("比亚迪 宋 PLUS DM-i")).toHaveCount(0);

  await page.getByRole("link", { name: "开始测试" }).click();

  await expect(page).toHaveURL(/\/quiz$/);
  await expect(
    page.getByRole("heading", { name: "选择你的模式。" }),
  ).toBeVisible();
});

test("switching to the English fallback updates the copy and the html lang", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "EN" }).click();

  await expect(
    page.getByRole("heading", { name: "Personality. Meets Performance." }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => document.cookie)).toContain("carality_lang=en");

  await page.reload();

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", { name: "Personality. Meets Performance." }),
  ).toBeVisible();
});
