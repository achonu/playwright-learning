import { test, expect, Page, Locator } from "@playwright/test";

test("LOGIN-001: User can log in with valid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Locate the username and password fields
  const username = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");
  const loginButton = page.locator('[data-test="login-button"]');

  // Enter valid credentials
  await username.fill("standard_user");
  await password.fill("secret_sauce");

  // Click the Login button
  await loginButton.click();

  // Verify the user reaches the inventory page
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Verify the Products heading is visible
  await expect(page.getByText("Products", { exact: true })).toBeVisible();

  // Verify first product card is visible
  const products = page.locator(".inventory_item");
  await expect(products.first()).toBeVisible();

  // Verify first product card contains a visible name.

  const firstProduct = page.locator(".inventory_item").first();

  await expect(firstProduct).toBeVisible();

  await expect(firstProduct.locator(".inventory_item_name")).toBeVisible();
});

test("LOGIN-002: User cannot log in with an incorrect password", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  // Locate the username and password fields
  const username = page.locator("#user-name");
  const password = page.locator("#password");
  const loginButton = page.locator("#login-button");

  // Enter a valid username and an incorrect password
  await username.fill("standard_user");
  await password.fill("123");
  // Click the Login button
  await loginButton.click();

  // Verify the error message appears
  const errorMessage = page.getByRole("alert");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );

  // Verify the user remains on the login page
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
