import { test, expect } from '@playwright/test';

test.describe('WA-26: Dashboard title', () => {
  test('shows updated title "State Wise Weather Dashboard"', async ({ page }) => {
    await page.goto('/');

    const title = page.getByRole('heading', { level: 1, name: 'State Wise Weather Dashboard' });
    await expect(title).toBeVisible();

    // Negative check: old title should not exist
    await expect(page.getByRole('heading', { level: 1, name: 'IND Weather Dashboard' })).toHaveCount(0);
  });
});
