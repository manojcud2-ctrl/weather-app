import { test, expect } from '@playwright/test';

test.describe('WA-26: Dashboard title', () => {
  test('should display updated dashboard title', async ({ page }) => {
    await page.goto('https://manojcud2-ctrl.github.io/weather-app/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'State Wise Weather Dashboard' }),
    ).toBeVisible();
  });

  test('should not display old dashboard title', async ({ page }) => {
    await page.goto('https://manojcud2-ctrl.github.io/weather-app/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'IND Weather Dashboard' }),
    ).toHaveCount(0);
  });
});
