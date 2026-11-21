import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("LOGIN-001: User can log in with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto("https://www.saucedemo.com/");

  // Login
  await loginPage.login("standard_user", "secret_sauce");

  // Verify the user reaches the inventory page
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Verify the Products heading is visible
  await expect(page.getByText("Products", { exact: true })).toBeVisible();

  const firstProduct = page.locator(".inventory_item").first();

  await expect(firstProduct).toBeVisible();

  await expect(firstProduct.locator(".inventory_item_name")).toBeVisible();
});

test("LOGIN-002: User cannot log in with an incorrect password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await page.goto("https://www.saucedemo.com/");

  // Login
  await loginPage.login("standard_user", "123");

  // Verify the error message appears
  const errorMessage = page.getByRole("alert");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );

  // Verify the user remains on the login page
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
