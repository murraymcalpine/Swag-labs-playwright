import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.use({ storageState: undefined }); // no saved login

//Clearing the screenshots folder before tests run
test.beforeAll(() => {
  const folder = path.join(process.cwd(), 'screenshots', 'login-tests');

  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }
  fs.mkdirSync(folder, { recursive: true });
});

test('login page should load', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://www.saucedemo.com/');

  // Check that the page title contains "Swag Labs"
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login form should be visible', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Check that the username field is visible
  const usernameField = page.getByPlaceholder('Username');
  await expect(usernameField).toBeVisible();

  // Check that the password field is visible
  const passwordField = page.getByPlaceholder('Password');
  await expect(passwordField).toBeVisible();

  // Check that the login button is visible
  const loginButton = page.locator('[name="login-button"]');
  await expect(loginButton).toBeVisible();
});

test('login with valid credentials', async ({ page }) => {
  const timestamp = Date.now();
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

// Fill username field by placeholder
await page.getByPlaceholder('Username').fill('standard_user');

// Fill password field by placeholder
await page.getByPlaceholder('Password').fill('secret_sauce');

  // Take screenshot before clicking login
await page.screenshot({ path: `screenshots/login-tests/Login-filled-in-${timestamp}.png` });
  
// Click login
  await page.click('#login-button');

  // Assert navigation worked (example: dashboard URL)
  await expect(page).toHaveURL(/.*inventory\.html/);

  //Capture screenshot after login
  await page.screenshot({ path: `screenshots/login-tests/Login-successful-${timestamp}.png` });
});

test('login with lockedout user credentials shows error', async ({ page }) => {
  const timestamp = Date.now();
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Fill username field with invalid data
  await page.getByPlaceholder('Username').fill('locked_out_user');

  // Fill password field with invalid data
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Take screenshot before clicking login
  await page.screenshot({ path: `screenshots/login-tests/Locked-out-user-filled-in-${timestamp}.png` });
  
  // Click login
  await page.click('#login-button');

  // Capture screenshot after attempting login
  await page.screenshot({ path: `screenshots/login-tests/Locked-out-user-error-${timestamp}.png` });

  // Assert error message is visible
const errorMessage = page.locator('[data-test="error"]');
await expect(errorMessage).toBeVisible();
await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});


test('login with incorrect user credentials shows error', async ({ page }) => {
  const timestamp = Date.now();
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Fill username field with invalid data
  await page.getByPlaceholder('Username').fill('abc');

  // Fill password field with invalid data
  await page.getByPlaceholder('Password').fill('password');

  // Take screenshot before clicking login
  await page.screenshot({ path: `screenshots/login-tests/Incorrect-details-filled-in-${timestamp}.png` });
  
  // Click login
  await page.click('#login-button');

  // Capture screenshot after attempting login
  await page.screenshot({ path: `screenshots/login-tests/Incorrect-user-details-error-${timestamp}.png` });

  // Locate the error message element
const errorMessage = page.locator('[data-test="error"]');
 // Assert it's visible
await expect(errorMessage).toBeVisible();
 // Assert it has the correct text
await expect(errorMessage).toHaveText(
  'Epic sadface: Username and password do not match any user in this service'
);
});