import { Locator, Page } from "@playwright/test";
import { appConfig } from "../configs/config";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.getByRole("textbox", { name: "Search Product" });
    this.searchButton = page.locator("#submit_search");
  }

  async navigateToProductsPage(): Promise<void> {
    await this.navigateTo(`${appConfig.baseUrl}/products`);
  }

  async searchForProduct(productName: string): Promise<void> {
    await this.fill(this.searchInput, productName);
    await this.click(this.searchButton);
  }

  getProductNameLocator(productName: string): Locator {
    const escapedProductName = productName.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    return this.page
      .locator(".productname")
      .filter({ hasText: new RegExp(`^\\s*${escapedProductName}\\s*$`) })
      .first();
  }

  getProductCard(productName: string): Locator {
    return this.page
      .locator(".productinfo")
      .filter({ hasText: productName })
      .first();
  }
}
