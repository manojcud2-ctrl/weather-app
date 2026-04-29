import { expect, test } from '@playwright/test';

// TODO: Should be grouped

test.describe('WA-40: Search empty-state', () => {
  test('should show empty-state and allow clearing search when query matches no cities', async ({ page }) => {
    await test.step('Setup', async () => {
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'State Wise Weather Dashboard' })).toBeVisible();

      await expect(page.locator('.card')).toHaveCount(27);
      await expect(page.locator('#no-results')).toHaveClass(/hidden/);
    });

    await test.step('Test Execution', async () => {
      await page.locator('#search').fill('zzzz-not-a-city');
    });

    await test.step('Validation', async () => {
      await expect(page.locator('#no-results')).not.toHaveClass(/hidden/);

      const visibleCards = page.locator('.card:not(.hidden)');
      await expect(visibleCards).toHaveCount(0);

      await page.locator('#clear-search').click();

      await expect(page.locator('#search')).toHaveValue('');
      await expect(page.locator('#no-results')).toHaveClass(/hidden/);
      await expect(page.locator('.card:not(.hidden)')).toHaveCount(27);
    });
  });

  test('should hide empty-state when query matches one or more cities', async ({ page }) => {
    await test.step('Setup', async () => {
      await page.goto('/');
      await expect(page.locator('.card')).toHaveCount(27);
    });

    await test.step('Test Execution', async () => {
      await page.locator('#search').fill('mum');
    });

    await test.step('Validation', async () => {
      await expect(page.locator('#no-results')).toHaveClass(/hidden/);
      await expect(page.locator('.card:not(.hidden)')).toHaveCount(1);
      await expect(page.locator('.card:not(.hidden)').first().locator('h3')).toHaveText('Mumbai');
    });
  });
});
