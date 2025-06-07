import { test, expect } from '@playwright/test';

// Simple smoke test to ensure the game page renders the canvas

test('loads game canvas', async ({ page }) => {
  await page.goto('/index.html');
  const canvas = page.locator('#game');
  await expect(canvas).toBeVisible();
});
