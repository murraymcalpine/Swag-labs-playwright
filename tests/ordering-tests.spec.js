import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

//Clearing the screenshots folder before tests run
test.beforeAll(() => {
  const folder = path.join(process.cwd(), 'screenshots', 'ordering-tests');

  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }
  fs.mkdirSync(folder, { recursive: true });
});

test('Add Item to Cart', async ({ page }) => {
     const timestamp = Date.now();
  // No need to log in — storageState.json already has a logged-in session
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Add one item to the cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Take screenshot of inventory page
  await page.screenshot({ path: `screenshots/ordering-tests/Item-added-to-cart-${timestamp}.png` });

  //Verify that item has a remove item
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await expect(removeButton).toBeVisible();

  //Verify that cart badge shows 1 item
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText('1');

  //Navigate to cart page
  await page.click('[data-test="shopping-cart-link"]');

  //Assert that we're on the cart page
  await expect(page).toHaveURL(/.*cart\.html/);

  //Take screenshot of cart page
  await page.screenshot({ path: `screenshots/ordering-tests/Cart-page-with-item-${timestamp}.png` });

  //Verify that the item is in the cart
  const cartItem = page.locator('.cart_item');
  await expect(cartItem).toHaveCount(1);

  //Verify correct item is in the cart
  const itemName = page.locator('.inventory_item_name');
  await expect(itemName).toHaveText('Sauce Labs Backpack');
});

test('Remove Item from Cart', async ({ page }) => {
        const timestamp = Date.now();
  // No need to log in — storageState.json already has a logged-in session
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Add one item to the cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Navigate to cart page
  await page.click('[data-test="shopping-cart-link"]');

  // Remove the item from the cart
  await page.click('[data-test="remove-sauce-labs-backpack"]');

  // Take screenshot of cart page after removal
  await page.screenshot({ path: `screenshots/ordering-tests/Cart-page-after-removal-${timestamp}.png` });

  //Verify that cart is empty
  const cartItem = page.locator('.cart_item');
  await expect(cartItem).toHaveCount(0);

  //Verify that cart badge is not visible
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveCount(0);
});

test('Checkout Process to completion', async ({ page }) => {
       const timestamp = Date.now();
  // No need to log in — storageState.json already has a logged-in session
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Add one item to the cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Navigate to cart page
  await page.click('[data-test="shopping-cart-link"]');

  // Click checkout button
  await page.click('[data-test="checkout"]');

  // Fill in checkout information
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');

  // Take screenshot of checkout information page
  await page.screenshot({ path: `screenshots/ordering-tests/Checkout-information-${timestamp}.png` });

  // Click continue button
  await page.click('[data-test="continue"]');

  // Take screenshot of overview page
  await page.screenshot({ path: `screenshots/ordering-tests/Checkout-overview-${timestamp}.png` });

  // Click finish button
  await page.click('[data-test="finish"]');

  // Take screenshot of order confirmation page
  await page.screenshot({ path: `screenshots/ordering-tests/Order-confirmation-${timestamp}.png` });

  //Verify that we're on the confirmation page
  await expect(page).toHaveURL(/.*checkout-complete\.html/);

  //Verify that the confirmation message is visible
  const confirmationMessage = page.locator('.complete-header');
  await expect(confirmationMessage).toHaveText('Thank you for your order!');

  //click back to home
  await page.click('[data-test="back-to-products"]');

  //Assert we're back on the inventory page
  await expect(page).toHaveURL(/.*inventory\.html/);
});