import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../configs/env';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.navigateTo(config.baseUrl);
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Playwright/);
  }
}