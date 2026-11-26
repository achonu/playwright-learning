import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("https://www.saucedemo.com/");
  await loginPage.login("standard_user", "secret_sauce");
});

test("CART-001: User can add a product to the basket", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  // Verify the user reaches the inventory page
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Locate the Sauce Labs Backpack product card
  const backpack = inventoryPage.getProduct("Sauce Labs Backpack");

  // Verify the Add to cart button is visible inside the backpack's product row.
  await expect(
    backpack.getByRole("button", { name: "Add to cart" }),
  ).toBeVisible();

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
  const cartPage = new CartPage(page);

  const inventoryPage = new InventoryPage(page);

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Click Add to cart INSIDE that product card
  await inventoryPage.addProduct("Sauce Labs Backpack");

  // Navigate to the basket page
  const shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  await shoppingCart.click();

  // Locate the Backpack row in the basket
  const basketPageProduct = cartPage.getCartProduct("Sauce Labs Backpack");

  // Click Remove inside the Backpack row
  await cartPage.removeProduct("Sauce Labs Backpack");

  // Verify the backpack has been removed from the basket
  await expect(cartPage.getCartProduct("Sauce Labs Backpack")).toHaveCount(0);

  // Verify no other products are in the basket
  await expect(cartPage.getCartItems()).toHaveCount(0);

  // Verify the shopping basket badge has disappeared
  await expect(
    page.locator('[data-test="shopping-cart-badge"]'),
  ).not.toBeVisible();

  // Verify the browser remains on the basket page
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
});
