import { test, expect } from '@playwright/test';

test('homepage should load', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://www.saucedemo.com/');

  // Check that the page title contains "Swag Labs"
  await expect(page).toHaveTitle(/Swag Labs/);
});