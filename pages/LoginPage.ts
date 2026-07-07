import { expect, Locator, Page } from '@playwright/test';
import { appConfig } from '../configs/config';
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

  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo(`${appConfig.baseUrl}/login`);
  }

  async verifyLoginPageIsVisible(): Promise<void> {
    await expect(this.loginTitle).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async verifyInvalidLoginMessage(): Promise<void> {
    await expect(this.invalidLoginMessage).toBeVisible();
  }
}