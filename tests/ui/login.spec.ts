import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { JsonReader } from '../../utils/JsonReader';

type LoginData = {
  validUser: {
    email: string;
    password: string;
  };
  invalidUser: {
    email: string;
    password: string;
  };
};

const loginData = JsonReader.read<LoginData>('test-data/loginData.json');

test.describe('Login Page Tests', () => {
  test('@smoke should display login page successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.verifyLoginPageIsVisible();
  });

  test('@regression should show error message for invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(
      loginData.invalidUser.email,
      loginData.invalidUser.password
    );
    await loginPage.verifyInvalidLoginMessage();
  });
});