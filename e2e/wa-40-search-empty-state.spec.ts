import { expect, test } from "@playwright/test";

test.describe("WA-40: Search empty-state", () => {
  test("should show empty-state and allow clearing search when no cities match", async ({
    page,
  }) => {
    await test.step("Setup", async () => {
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const cards = page.locator("#weather-container .card");
      await expect(cards).toHaveCount(27);
    });

    await test.step("Test Execution", async () => {
      await page.locator("#search").fill("zzzz-no-match");
    });

    await test.step("Validation", async () => {
      const noResults = page.locator("#no-results");
      await expect(noResults).toBeVisible();
      await expect(noResults).toContainText("No results found");

      await expect(
        page.locator("#weather-container .card:not(.hidden)")
      ).toHaveCount(0);

      await page.locator("#clear-search").click();
      await expect(page.locator("#search")).toHaveValue("");
      await expect(noResults).toBeHidden();
      await expect(
        page.locator("#weather-container .card:not(.hidden)")
      ).toHaveCount(27);
    });
  });

  test("should keep empty-state hidden when at least one city matches", async ({
    page,
  }) => {
    await test.step("Setup", async () => {
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const cards = page.locator("#weather-container .card");
      await expect(cards).toHaveCount(27);
    });

    await test.step("Test Execution", async () => {
      await page.locator("#search").fill("mum");
    });

    await test.step("Validation", async () => {
      await expect(page.locator("#no-results")).toBeHidden();
      await expect(
        page.locator("#weather-container .card:not(.hidden)")
      ).toHaveCount(1);
      await expect(
        page
          .locator("#weather-container .card:not(.hidden)")
          .first()
          .locator("h3")
      ).toHaveText("Mumbai");
    });
  });
});
