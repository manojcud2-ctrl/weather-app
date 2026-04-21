import { test, expect } from '@playwright/test';

test('Weather Dashboard - loads and shows \"Indian Weather Dashboard\" title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Indian Weather Dashboard' })).toBeVisible();
});

test('Weather Dashboard - verify weather cards with search', async ({ page }) => {
  // Navigate to the weather app
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Wait for weather cards to be visible
  const cards = page.locator('.card');
  await expect(cards).toHaveCount(28, { timeout: 10000 });
  
  // Verify first card (Amaravati) contains expected data
  const firstCard = cards.first();
  await expect(firstCard.locator('h3')).toContainText('Amaravati');
  await expect(firstCard).toContainText('Temperature');
  await expect(firstCard).toContainText('32°C');
  await expect(firstCard).toContainText('Sunny');
  await expect(firstCard).toContainText('Humidity');
  await expect(firstCard).toContainText('45%');
  
  // Test search functionality - search for \"Mumbai\"
  const searchInput = page.locator('#search');
  await searchInput.fill('mumbai');
  
  // After searching, only cards matching \"mumbai\" should be visible (not hidden)
  const visibleCards = page.locator('.card:not(.hidden)');
  const hiddenCards = page.locator('.card.hidden');
  
  // Mumbai card should be visible
  const mumbaiCard = cards.filter({ hasText: 'Mumbai' }).first();
  await expect(mumbaiCard).toBeVisible();
  
  // Some other cards should be hidden after search
  await expect(hiddenCards).toHaveCount(27, { timeout: 5000 });
  
  // Clear search
  await searchInput.fill('');
  
  // All cards should be visible again
  await expect(visibleCards).toHaveCount(28, { timeout: 5000 });
  
  // Test refresh button
  const refreshButton = page.locator('#refresh');
  await expect(refreshButton).toBeVisible();
  
  // Click refresh button
  await refreshButton.click();
  
  // Verify cards are still displayed after refresh
  const cardsAfterRefresh = page.locator('.card');
  await expect(cardsAfterRefresh).toHaveCount(28, { timeout: 10000 });
  
  // Verify weather data is still correct
  const firstCardAfterRefresh = cardsAfterRefresh.first();
  await expect(firstCardAfterRefresh.locator('h3')).toContainText('Amaravati');
  await expect(firstCardAfterRefresh).toContainText('32°C');
});
