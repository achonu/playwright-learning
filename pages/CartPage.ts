import type { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  getCartProduct(productName: string) {
    return this.page.locator(".cart_item").filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  async removeProduct(productName: string) {
    await this.getCartProduct(productName)
      .getByRole("button", { name: "Remove" })
      .click();
  }

  getCartItems() {
    return this.page.locator(".cart_item");
  }
}
