import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { startServer, stopServer } from '../helpers/server';

let proc: import('child_process').ChildProcess | undefined;

test.beforeAll(async () => {
  proc = await startServer();
});

test.afterAll(async () => {
  await stopServer(proc);
});

test('homepage renders required UI elements', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#search')).toBeVisible();
  await expect(page.locator('#refresh')).toBeVisible();
  await expect(page.locator('#weather-container')).toBeVisible();
  await expect(page.locator('#loading')).toHaveCount(1);
  await expect(page.locator('#error')).toHaveCount(1);
});

test('-if missing #error, page shows a user-facing error', async ({ page }) => {
   // Mutate index.html to remove #error, reload, then restore
  const repoRoot = path.resolve(__dirname, '../../..');
  const index = path.join(repoRoot, 'index.html');
  const original = fs.readFileSync(index, 'utf8');
  const mutated = original.replace(/\s<div id=\"error\".*?<\/div>\s/s, '\n');
  fs.writeFileSync(index, mutated, 'utf8');

  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toContainExt('Ui failed to initialize');
  } finally {
    fs.writeFileSync(index, original, 'utf8');
  }
});
