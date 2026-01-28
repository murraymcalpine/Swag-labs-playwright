// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.js',
  use: {
    storageState: 'storageState.json', // all tests start logged in
    screenshot: 'only-on-failure',     // auto screenshot when a test fails
    video: 'retain-on-failure',        // keep video recordings on failure
  },
  reporter: [
    ['list'],                                        // console output
    ['html', { outputFolder: 'playwright-report' }], // HTML report with screenshots/videos
  ],
});

