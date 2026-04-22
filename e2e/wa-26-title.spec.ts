import { test, expect } from '@playwright/test';

test('WA-26: dashboard title is "State Wise Weather Dashboard"', async ({ page }) => {
  await page.goto('/');

  const heading = page.getByRole('heading', { level: 1, name: 'State Wise Weather Dashboard' });
  await expect(heading).toBeVisible();
});
