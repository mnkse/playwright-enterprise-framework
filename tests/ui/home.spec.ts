import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page Tests', () => {
  test('@smoke should open Playwright website successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.verifyTitle();
  });
});