import { expect, test } from "@playwright/test";

test.describe("WA-40: Search empty-state", () => {
  test("shows empty-state and allows clearing search when query matches no cities", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "State Wise Weather Dashboard" })
    ).toBeVisible();
    await expect(page.locator(".card")).toHaveCount(27);
    await expect(page.locator("#no-results")).toHaveClass(/hidden/);

    await page.locator("#search").fill("zzzz-not-a-city");

    await expect(page.locator("#no-results")).not.toHaveClass(/hidden/);
    await expect(page.locator(".card:not(.hidden)")).toHaveCount(0);

    await page.locator("#clear-search").click();

    await expect(page.locator("#search")).toHaveValue("");
    await expect(page.locator("#no-results")).toHaveClass(/hidden/);
    await expect(page.locator(".card:not(.hidden)")).toHaveCount(27);
  });

  test("keeps empty-state hidden when query matches one or more cities", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator(".card")).toHaveCount(27);

    await page.locator("#search").fill("mum");

    await expect(page.locator("#no-results")).toHaveClass(/hidden/);
    await expect(page.locator(".card:not(.hidden)")).toHaveCount(1);
    await expect(
      page.locator(".card:not(.hidden)").first().locator("h3")
    ).toHaveText("Mumbai");
  });
});
