import { test, expect } from "@playwright/test";

test("User can complete a Todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  await todoInput.fill("Study Playwright");
  await todoInput.press("Enter");

  const todoItem = page.getByRole("listitem").filter({
    has: page.getByText("Study Playwright", { exact: true }),
  });

  // Complete the task
  await todoItem.getByRole("checkbox").check();

  // Verify the task is complete
  await expect(todoItem.getByRole("checkbox")).toBeChecked();

  // Verify the remaining-items counter
  await expect(page.locator(".todo-count")).toHaveText("0 items left");
});
