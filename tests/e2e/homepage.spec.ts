import { expect, test } from "@playwright/test";

test("homepage CTA leads to the quiz landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "找到最适合你的汽车人格与选车方案",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "开始测试" }).click();

  await expect(page).toHaveURL(/\/quiz$/);
  await expect(
    page.getByRole("heading", { name: "汽车人格测试" }),
  ).toBeVisible();
});
