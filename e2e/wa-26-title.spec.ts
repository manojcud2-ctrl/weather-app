import { test, expect } from '@playwright/test';

test('WA-26: dashboard title is updated', async ({ page }) => {
  await page.goto('/');

  // AC (Jira WA-26): dashboard is titled "IND Weather Dashboard"
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('IND Weather Dashboard');
});
