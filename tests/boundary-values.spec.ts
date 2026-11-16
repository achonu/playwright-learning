import { test, expect, Page, Locator } from "@playwright/test";

function getTodoItem(page: Page, taskName: string): Locator {
  return page.getByRole("listitem").filter({
    has: page.getByText(taskName, { exact: true }),
  });
}

test("User cannot add a whitespace only Todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Attempt to add a task containing only spaces
  await todoInput.fill("  ");
  await todoInput.press("Enter");

  // Verify no Todo item was created
  await expect(page.locator(".todo-list li")).toHaveCount(0);
});

test("User can add a single-character Todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add a single-character task
  await todoInput.fill("A");
  await todoInput.press("Enter");

  // Verify the task is visible
  await expect(page.getByText("A", { exact: true })).toBeVisible();

  // Verify the list contains exactly one Todo item

  await expect(page.locator(".todo-list li")).toHaveCount(1);
});

test("User can delete one of two identical Todo items", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Step 1: Add "Buy milk" twice
  const milk = "Buy milk";

  await todoInput.fill(milk);
  await todoInput.press("Enter");
  await todoInput.fill(milk);
  await todoInput.press("Enter");

  //  Find the first "Buy milk" Todo using .nth(0)
  const milkItems = getTodoItem(page, milk);

  // Verify two Todo items exist
  await expect(milkItems).toHaveCount(2);

  // Select the first milk item
  const firstMilk = milkItems.nth(0);

  // Hover over the item
  await firstMilk.hover();

  // delete the first task
  await firstMilk.locator(".destroy").click();

  // Verify exactly one Buy milk task remains

  await expect(milkItems).toHaveCount(1);
});
