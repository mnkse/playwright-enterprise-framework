import { expect, test } from "../../fixtures/baseFixture";

test.describe("Products Page Tests", () => {
  test("should show a matching product after searching for Blue Top", async ({
    productsPage,
  }) => {
    await productsPage.navigateToProductsPage();
    await productsPage.searchForProduct("Blue Top");

    await expect(productsPage.getProductCard("Blue Top")).toBeVisible();
  });

  test("should show a matching product after searching for Men Tshirt", async ({
    productsPage,
  }) => {
    await productsPage.navigateToProductsPage();
    await productsPage.searchForProduct("Men Tshirt");

    await expect(productsPage.getProductCard("Men Tshirt")).toBeVisible();
  });

  test("should show a matching product after searching for Sleeveless Dress", async ({
    productsPage,
  }) => {
    await productsPage.navigateToProductsPage();
    await productsPage.searchForProduct("Sleeveless Dress");

    await expect(productsPage.getProductCard("Sleeveless Dress")).toBeVisible();
  });

  test("should not show a product matching a non-existing search term", async ({
    productsPage,
  }) => {
    await productsPage.navigateToProductsPage();
    await productsPage.searchForProduct("Non Existing Product 12345");

    await expect(
      productsPage.getProductNameLocator("Non Existing Product 12345"),
    ).toHaveCount(0);
  });
});
