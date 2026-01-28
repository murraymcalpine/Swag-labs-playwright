import { chromium } from '@playwright/test';

export default async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.click('#login-button');

  // Save storage state to file
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
};