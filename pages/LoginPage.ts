import type { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  getUsernameField() {
    return this.page.getByPlaceholder("Username");
  }

  getPasswordField() {
    return this.page.getByPlaceholder("Password");
  }

  async login(username: string, password: string) {
    await this.getUsernameField().fill(username);
    await this.getPasswordField().fill(password);
    const loginButton = this.page.locator('[data-test="login-button"]');
    await loginButton.click();
  }
}
