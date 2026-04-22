import { test, expect } from '@playwright/test';

test('WA-26: dashboard title is updated', async ({ page }) => {
  await page.goto('/');

  // Validate document title (per PR change)
  await expect(page).toHaveTitle('Indian State Capitals Weather Dashboard');

});
