import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

//Clearing the screenshots folder before tests run
test.beforeAll(() => {
  const folder = path.join(process.cwd(), 'screenshots', 'inventory-tests');

  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }
  fs.mkdirSync(folder, { recursive: true });
});

test('inventory page conatins 6 items', async ({ page }) => {
     const timestamp = Date.now();
  // No need to log in — storageState.json already has a logged-in session
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Take screenshot of inventory page
  await page.screenshot({ path: `screenshots/inventory-tests/Inventory-page-${timestamp}.png` });

    // Locate all inventory items
    const items = page.locator('.inventory_item');

    // Assert that there are 6 items
    await expect(items).toHaveCount(6);
});

test('Navigate to an item and back to inventory page', async ({ page }) => {
        const timestamp = Date.now();
        await page.goto('https://www.saucedemo.com/inventory.html');

  // Click on the first item
    await page.locator('[data-test="item-0-img-link"]').click();

  // Take screenshot of item detail page
    await page.screenshot({ path: `screenshots/inventory-tests/Item-detail-${timestamp}.png` });

  const itemName = page.locator('[data-test="inventory-item-name"]');
  // Check that it's visible
    await expect(itemName).toBeVisible();
  // Check that it has the correct text
    await expect(itemName).toHaveText('Sauce Labs Bike Light');

  //Click back to inventory
    await page.locator('[data-test="back-to-products"]').click();

  //Assert we're back on the inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    });
