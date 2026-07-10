import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  timeout: 30_000,

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        detail: true,
        suiteTitle: false,
      },
    ],
  ],

  outputDir: "test-results/",

  use: {
    headless: process.env.CI === "true",

    viewport: {
      width: 1920,
      height: 1080,
    },

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "on-first-retry",

    actionTimeout: 10_000,

    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: "api",
      testMatch: /api\/.*\.spec\.ts/,
    },

    {
      name: "chromium",
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
