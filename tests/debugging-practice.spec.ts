import { test, expect } from "@playwright/test";

test("User can add a Todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add one Todo item
  await todoInput.fill("Buy milk");
  await todoInput.press("Enter");

  // Verify the item is visible
  await expect(page.getByText("Buy milk", { exact: true })).toBeVisible();

  // Verify exactly one Todo item exists
  await expect(page.locator(".todo-list li")).toHaveCount(1);
});
