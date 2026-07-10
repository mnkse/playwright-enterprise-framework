import { expect, test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables must be defined.'
    );
  }

  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(email, password);

  // Başarılı login sonrası görünen gerçek bir locator ile değiştireceğiz.
  await expect(page.getByText(/Logged in as/i)).toBeVisible();

  await page.context().storageState({
    path: authFile,
  });
});