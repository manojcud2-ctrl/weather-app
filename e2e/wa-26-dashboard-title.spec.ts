import { test, expect } from "@playwright/test";

// WA-26
// Requirement: Change dashboard title to "State Wise Weather Dashboard"

test.describe("WA-26: Dashboard title", () => {
  test("shows the updated dashboard title", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "State Wise Weather Dashboard",
      })
    ).toBeVisible();
  });

  test("does not show the old dashboard title", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "IND Weather Dashboard" })
    ).toBeHidden();
  });
});
