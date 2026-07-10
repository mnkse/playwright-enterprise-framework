import { expect, Locator, Page } from "@playwright/test";
import { appConfig } from "../configs/config";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly loginTitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidLoginMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.loginTitle = page.locator(".login-form h2");
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.invalidLoginMessage = page.getByText(
      "Your email or password is incorrect!",
    );
  }

  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo(`${appConfig.baseUrl}/login`);
  }

  async verifyLoginPageIsVisible(): Promise<void> {
    await expect(this.loginTitle).toContainText("Login to your account");
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
