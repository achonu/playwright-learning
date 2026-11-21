import type { Page } from "@playwright/test";

export class InventoryPage {
  constructor(private page: Page) {}

  getProduct(productName: string) {
    return this.page.locator(".inventory_item").filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  async addProduct(productName: string) {
    await this.getProduct(productName)
      .getByRole("button", { name: "Add to cart" })
      .click();
  }
}
