import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page Tests', () => {
  test('@smoke should display login page successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.verifyLoginPageIsVisible();
  });

  test('@regression should show error message for invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login('invalid@test.com', 'wrongPassword');
    await loginPage.verifyInvalidLoginMessage();
  });
});