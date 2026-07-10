# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\login.spec.ts >> Login Page Tests >> @regression should show error message for invalid login
- Location: tests\ui\login.spec.ts:25:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByText('Your email or password is incorrect!')
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Your email or password is incorrect!')

```

# Test source

```ts
  1  | import { expect, Locator, Page } from "@playwright/test";
  2  | import { appConfig } from "../configs/config";
  3  | import { BasePage } from "./BasePage";
  4  | 
  5  | export class LoginPage extends BasePage {
  6  |   readonly loginTitle: Locator;
  7  |   readonly emailInput: Locator;
  8  |   readonly passwordInput: Locator;
  9  |   readonly loginButton: Locator;
  10 |   readonly invalidLoginMessage: Locator;
  11 | 
  12 |   constructor(page: Page) {
  13 |     super(page);
  14 | 
  15 |     this.loginTitle = page.locator(".login-form h2");
  16 |     this.emailInput = page.locator('[data-qa="login-email"]');
  17 |     this.passwordInput = page.locator('[data-qa="login-password"]');
  18 |     this.loginButton = page.locator('[data-qa="login-button"]');
  19 |     this.invalidLoginMessage = page.getByText(
  20 |       "Your email or password is incorrect!",
  21 |     );
  22 |   }
  23 | 
  24 |   async navigateToLoginPage(): Promise<void> {
  25 |     await this.navigateTo(`${appConfig.baseUrl}/login`);
  26 |   }
  27 | 
  28 |   async verifyLoginPageIsVisible(): Promise<void> {
  29 |     await expect(this.loginTitle).toContainText("Login to your account");
  30 |   }
  31 | 
  32 |   async login(email: string, password: string): Promise<void> {
  33 |     await this.fill(this.emailInput, email);
  34 |     await this.fill(this.passwordInput, password);
  35 |     await this.click(this.loginButton);
  36 |   }
  37 | 
  38 |   async verifyInvalidLoginMessage(): Promise<void> {
> 39 |     await expect(this.invalidLoginMessage).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
  40 |   }
  41 | }
  42 | 
```