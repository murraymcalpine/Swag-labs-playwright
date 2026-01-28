// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    screenshot: 'only-on-failure',   // auto screenshot when a test fails
    video: 'retain-on-failure',      // optional: keep video recordings on failure
  },
  reporter: [
    ['list'],                                        // console output
    ['html', { outputFolder: 'playwright-report' }], // HTML report with screenshots/videos
  ],
});