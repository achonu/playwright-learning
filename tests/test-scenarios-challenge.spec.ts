//Test ID	Test scenario	                            Expected result
//TC-001	Enter "Buy milk" and press Enter	        Buy milk is visible; exactly 1 Todo exists
//TC-002	Enter "   " (three spaces) and press Enter	No Todo is created; total count is 0
//TC-003	Add "Chocolate" and select its checkbox	    Chocolate is checked; counter displays "0 items left"
//TC-004	Add "Tea" and "Coffee", then delete Tea    	Tea is removed; Coffee remains; exactly 1 Todo exists

import { test, expect, Page, Locator } from "@playwright/test";

// todo helper function to return a locator
function getTodoItem(page: Page, taskName: string): Locator {
  return page.getByRole("listitem").filter({
    has: page.getByText(taskName, { exact: true }),
  });
}

test("TC-001: User can add a valid Todo", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add Buy milk
  await todoInput.fill("Buy milk");
  await todoInput.press("Enter");

  // Verify Buy milk is visible
  await expect(page.getByText("Buy milk", { exact: true })).toBeVisible();

  // Verify exactly one Todo exists
  await expect(page.locator(".todo-list li")).toHaveCount(1);
});

test("TC-002: Whitespace-only Todo input is rejected", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add 3 white spaces
  await todoInput.fill("   ");
  await todoInput.press("Enter");

  // Verify no Todo exists
  await expect(page.locator(".todo-list li")).toHaveCount(0);
});

test("TC-003: User can complete a Todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  const todoItem = "Chocolate";

  // Add Chocolate
  await todoInput.fill(todoItem);
  await todoInput.press("Enter");

  // Locate the Chocolate Todo item
  const chocoItem = getTodoItem(page, todoItem);

  // Verify the counter initially shows 1 item left
  await expect(page.locator(".todo-count")).toHaveText("1 item left");

  // Check the Chocolate checkbox
  await chocoItem.getByRole("checkbox").check();

  // Verify the checkbox is checked
  await expect(chocoItem.getByRole("checkbox")).toBeChecked();

  // Verify the counter now shows 0 items left
  await expect(page.locator(".todo-count")).toHaveText("0 items left");
});

test("TC-004: User can delete a Todo without affecting other tasks", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add Tea and Coffee
  const tasks = ["Tea", "Coffee"];

  for (const task of tasks) {
    await todoInput.fill(task);
    await todoInput.press("Enter");
  }

  // Locate the Tea Todo item
  const teaTodo = getTodoItem(page, "Tea");

  // Hover over Tea to reveal the delete button
  await teaTodo.hover();

  // Delete Tea
  await teaTodo.locator(".destroy").click();

  // Verify Tea is removed
  await expect(teaTodo).toHaveCount(0);

  // Verify Coffee still exists
  const coffeeTodo = getTodoItem(page, "Coffee");
  await expect(coffeeTodo).toBeVisible();

  // Verify exactly one Todo remains & one incomplete task remains
  await expect(page.locator(".todo-count")).toHaveText("1 item left");
  await expect(page.locator(".todo-list li")).toHaveCount(1);
});
