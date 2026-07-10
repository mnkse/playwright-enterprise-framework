import { test } from '../../fixtures/baseFixture';
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
  test('@smoke should display login page successfully', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.verifyLoginPageIsVisible();
  });

  test('@regression should show error message for invalid login', async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();

    await loginPage.login(
      loginData.invalidUser.email,
      loginData.invalidUser.password
    );

    await loginPage.verifyInvalidLoginMessage();
  });
});