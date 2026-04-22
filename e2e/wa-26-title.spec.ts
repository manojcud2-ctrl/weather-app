import { test, expect } from '@playwright/test';

test.describe('WA-26: Dashboard title', () => {
  test('shows updated title "State Wise Weather Dashboard"', async ({ page }) => {
    await page.goto('https://manojcud2-ctrl.github.io/weather-app/');

    await expect(
      page.getByRole('heading', { name: 'State Wise Weather Dashboard', level: 1 })
    ).toBeVisible();
  });

  test('does not show old title "IND Weather Dashboard"', async ({ page }) => {
    await page.goto('https://manojcud2-ctrl.github.io/weather-app/');

    await expect(page.getByRole('heading', { name: 'IND Weather Dashboard', level: 1 })).toHaveCount(0);
  });
});
