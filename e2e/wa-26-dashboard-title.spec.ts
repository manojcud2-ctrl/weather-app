import { test, expect } from '@playwright/test';

test('WA-26: dashboard title is "Indian Weather Dashboard"', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Indian Weather Dashboard' })).toBeVisible();
});
