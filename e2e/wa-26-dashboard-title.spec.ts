import { test, expect } from '@playwright/test';

/**
 * WA-26
 * Acceptance Criteria:
 * - Change the dashboard title to “State Wise Weather Dashboard“
 */

test.describe('WA-26 - Dashboard title', () => {
  test('Verify dashboard title', async ({ page }) => {
    await page.goto('/');

    // Deterministic assertion of the primary page heading.
    await expect(
      page.getByRole('heading', { level: 1, name: 'State Wise Weather Dashboard' })
    ).toBeVisible();
  });
});
