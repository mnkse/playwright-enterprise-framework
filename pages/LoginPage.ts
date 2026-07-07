import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginTitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidLoginMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.loginTitle = page.getByText('Login to your account');
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.invalidLoginMessage = page.getByText('Your email or password is incorrect!');
  }

  async navigateToLoginPage() {
    await this.navigateTo('https://automationexercise.com/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginPageIsVisible() {
    await expect(this.loginTitle).toBeVisible();
  }

  async verifyInvalidLoginMessage() {
    await expect(this.invalidLoginMessage).toBeVisible();
  }
}