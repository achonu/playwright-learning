import { test, expect } from "@playwright/test";

test("User can delete a task", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");
  const taskItem = "Buy Groceries";

  // Add a task to Todo

  await todoInput.fill(taskItem);
  await todoInput.press("Enter");

  // Verify the task is added
  await expect(page.getByText(taskItem)).toBeVisible();

  const todoItem = page.getByRole("listitem").filter({
    has: page.getByText(taskItem, { exact: true }),
  });

  // Hover over task
  await todoItem.hover();

  // Delete the task
  await todoItem.locator(".destroy").click();

  // Verify the task is deleted
  await expect(todoItem).toHaveCount(0);
});
