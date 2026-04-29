import { test, expect } from '@playwright/test';

// WA-40: Show empty-state message when search returns no results

test.describe('WA-40 Search empty-state', () => {
  test('should show empty-state and allow clearing search when there are zero matches', async ({ page }) => {
    await test.step('Setup', async () => {
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'State Wise Weather Dashboard' })).toBeVisible();
      await expect(page.locator('.card')).toHaveCount(27);
    });

    await test.step('Test Execution', async () => {
      await page.locator('#search').fill('zzzz-no-city');
    });

    await test.step('Validation', async () => {
      const noResults = page.locator('#no-results');
      await expect(noResults).toBeVisible();
      await expect(noResults).toContainText('No results found.');

      // All cards should be hidden via CSS class when there are no matches.
      await expect(page.locator('.card:not(.hidden)')).toHaveCount(0);

      await page.locator('#clear-search').click();
      await expect(noResults).toBeHidden();
      await expect(page.locator('#search')).toHaveValue('');
      await expect(page.locator('.card:not(.hidden)')).toHaveCount(27);
    });
  });

  test('should not show empty-state when there is at least one match', async ({ page }) => {
    await test.step('Setup', async () => {
      await page.goto('/');
      await expect(page.locator('.card')).toHaveCount(27);
    });

    await test.step('Test Execution', async () => {
      await page.locator('#search').fill('mum');
    });

    await test.step('Validation', async () => {
      const noResults = page.locator('#no-results');
      await expect(noResults).toBeHidden();

      // At least one card should remain visible and Mumbai should be included.
      await expect(page.locator('.card:not(.hidden)')).toHaveCount(1);
      await expect(page.locator('.card:not(.hidden)').first()).toContainText('Mumbai');
    });
  });
});
