import { test, expect } from '@playwright/test';

test('WA-26: dashboard title is updated', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'State Wise Weather Dashboard' }),
  ).toBeVisible();
});
