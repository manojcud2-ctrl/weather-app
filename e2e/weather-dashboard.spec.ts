import { test, expect } from "@playwright/test";

test("Weather Dashboard - Load page and verify weather cards with search", async ({
  page,
}) => {
  // Navigate to the weather app
  await page.goto("/");

  await expect(page).toHaveTitle(/IND State Capitals Weather Dashboard/);

  // Avoid `networkidle` (flaky for long-lived requests); wait for deterministic UI signals instead.
  await expect(
    page.getByRole("heading", { level: 1, name: "Indian Weather Dashboard" })
  ).toBeVisible();

  // Wait for weather cards to be visible
  const cards = page.locator(".card");
  await expect(cards).toHaveCount(27, { timeout: 10000 });

  // Verify first card (Amaravati) contains expected data
  const firstCard = cards.first();
  await expect(firstCard.locator("h3")).toContainText("Amaravati");
  await expect(firstCard).toContainText("Temperature");
  await expect(firstCard).toContainText(/Temperature:\s*\d+°C/);
  await expect(firstCard).toContainText(/Condition:\s*\w+/);
  await expect(firstCard).toContainText(/Humidity:\s*\d+%/);

  // Test search functionality - search for "Mumbai"
  const searchInput = page.locator("#search");
  await searchInput.fill("mumbai");

  // After searching, the Mumbai card should be shown (not hidden)
  const mumbaiCard = cards.filter({ hasText: "Mumbai" }).first();
  await expect(mumbaiCard).toBeVisible();

  // Clear search
  await searchInput.fill("");

  // All cards should be visible again
  await expect(cards).toHaveCount(27, { timeout: 5000 });

  // Test refresh button
  const refreshButton = page.locator("#refresh");
  await expect(refreshButton).toBeVisible();

  // Click refresh button
  await refreshButton.click();

  // Wait for refresh to complete (loader should appear then disappear)
  const loading = page.locator("#loading");
  await expect(loading).toBeVisible();
  await expect(loading).toBeHidden();

  // Verify cards are still displayed after refresh
  const cardsAfterRefresh = page.locator(".card");
  await expect(cardsAfterRefresh).toHaveCount(27, { timeout: 10000 });

  // Verify weather data is still correct
  const firstCardAfterRefresh = cardsAfterRefresh.first();
  await expect(firstCardAfterRefresh.locator("h3")).toContainText("Amaravati");
  await expect(firstCardAfterRefresh).toContainText(/Temperature:\s*\d+°C/);
});
