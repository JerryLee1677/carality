import { expect, test } from "@playwright/test";

test("homepage CTA leads to the quiz landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "识别你的汽车人格",
    }),
  ).toBeVisible();
  await expect(page.getByText("比亚迪 宋 PLUS DM-i")).toHaveCount(0);

  await page.getByRole("link", { name: "开始测试" }).click();

  await expect(page).toHaveURL(/\/quiz$/);
  await expect(
    page.getByRole("heading", { name: "汽车人格测试" }),
  ).toBeVisible();
});
