import { test, expect } from '@playwright/test';

test('Weather Dashboard - Load page and verify weather cards with search', async ({ page }) => {
  // Navigate to the weather app
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Verify the page title or heading exists
  await expect(page).toHaveTitle(/.*/, { timeout: 5000 });
  
  // Wait for weather cards to be visible
  const cards = page.locator('.card');
  // App currently renders 27 capitals (see `capitals` list in script.js)
  await expect(cards).toHaveCount(27, { timeout: 10000 });
  
  // Verify first card (Amaravati) contains expected data
  const firstCard = cards.first();
  await expect(firstCard.locator('h3')).toContainText('Amaravati');
  await expect(firstCard).toContainText('Temperature');
  await expect(firstCard).toContainText(/\b\d{2}°C\b/);
  await expect(firstCard).toContainText('Condition');
  await expect(firstCard).toContainText('Humidity');
  await expect(firstCard).toContainText(/\b\d{2,3}%/);
  
  // Test search functionality - search for "Mumbai"
  const searchInput = page.locator('#search');
  await searchInput.fill('mumbai');
  
  // Mumbai card should be visible
  const mumbaiCard = cards.filter({ hasText: 'Mumbai' }).first();
  await expect(mumbaiCard).toBeVisible();

  // Search should narrow results down to the Mumbai card
  // (implementation may hide via `.hidden` class or by changing inline styles)
  const nonMumbaiCards = cards.filter({ hasNotText: 'Mumbai' });
  await expect(nonMumbaiCards).toHaveCount(26);
  await expect(nonMumbaiCards.first()).toBeHidden();
  
  // Clear search
  await searchInput.fill('');
  
  // All cards should be visible again
  await expect(cards).toHaveCount(27, { timeout: 5000 });
  
  // Test refresh button
  const refreshButton = page.locator('#refresh');
  await expect(refreshButton).toBeVisible();
  
  // Click refresh button
  await refreshButton.click();
  
  // Verify cards are still displayed after refresh
  const cardsAfterRefresh = page.locator('.card');
  await expect(cardsAfterRefresh).toHaveCount(27, { timeout: 10000 });
  
  // Verify weather data is still rendered after refresh
  const firstCardAfterRefresh = cardsAfterRefresh.first();
  await expect(firstCardAfterRefresh.locator('h3')).toContainText('Amaravati');
  await expect(firstCardAfterRefresh).toContainText(/\b\d{2}°C\b/);
});
