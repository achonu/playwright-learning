import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test("CART-001: User can add a product to the basket", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  const inventoryPage = new InventoryPage(page);

  // Log in using valid credentials
  // Locate the username and password fields
  const username = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");
  const loginButton = page.locator('[data-test="login-button"]');
  await username.fill("standard_user");
  await password.fill("secret_sauce");
  await loginButton.click();

  // Verify the user reaches the inventory page
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Locate the Sauce Labs Backpack product card
  const backpack = inventoryPage.getProduct("Sauce Labs Backpack");

  // Click Add to cart INSIDE that product card
  await inventoryPage.addProduct("Sauce Labs Backpack");

  // Verify the button changes to Remove
  await expect(backpack.getByRole("button", { name: "Remove" })).toBeVisible();

  // Verify the shopping basket badge displays 1
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
    "1",
  );

  // Open the basket
  const shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  await shoppingCart.click();

  // Verify Sauce Labs navigates to the cart page
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Verify Sauce Labs Backpack is visible

  const basketPageProduct = page.locator(".cart_item").filter({
    has: page.getByText("Sauce Labs Backpack", { exact: true }),
  });

  await expect(basketPageProduct.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack",
  );
});

test("CART-002: User can remove a product from the basket", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  const cartPage = new CartPage(page);

  const inventoryPage = new InventoryPage(page);

  // Log in using valid credentials
  const username = page.getByPlaceholder("Username");
  const password = page.getByPlaceholder("Password");
  const loginButton = page.locator('[data-test="login-button"]');
  await username.fill("standard_user");
  await password.fill("secret_sauce");
  await loginButton.click();

  // Click Add to cart INSIDE that product card
  await inventoryPage.addProduct("Sauce Labs Backpack");

  // Navigate to the basket page
  const shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  await shoppingCart.click();

  // Locate the Backpack row in the basket
  const basketPageProduct = cartPage.getCartProduct("Sauce Labs Backpack");

  // Click Remove inside the Backpack row
  await cartPage.removeProduct("Sauce Labs Backpack");

  // Verify Backpack has been removed
  await expect(basketPageProduct).toHaveCount(0);

  // Verify the basket contains zero products
  await expect(page.locator(".cart_item")).toHaveCount(0);

  // Verify the shopping basket badge has disappeared
  await expect(
    page.locator('[data-test="shopping-cart-badge"]'),
  ).not.toBeVisible();

  // Verify the browser remains on the basket page
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
});
