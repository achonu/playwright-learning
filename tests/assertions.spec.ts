import { test, expect } from "@playwright/test";

test("User can add three tasks", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  const task1 = "Learn Playwright";
  const task2 = "Learn TypeScript";
  const task3 = "Learn API Testing";

  await todoInput.fill(task1);
  await todoInput.press("Enter");

  await todoInput.fill(task2);
  await todoInput.press("Enter");

  await todoInput.fill(task3);
  await todoInput.press("Enter");

  // Assertion 1: Check that a task is visible
  await expect(page.getByText(task1)).toBeVisible();

  //Assertion 92: Check the number of tasks
  await expect(page.locator(".todo-list li")).toHaveCount(3);

  //Assertion 3: Check the remaining-task counter
  await expect(page.locator(".todo-count")).toHaveText("3 items left");
});

test("User can add three tasks and verify two tasks are visible and one task is marked as complete", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  // get the locator for the input field
  const todoInput = page.getByPlaceholder("What needs to be done?");

  // assign text  to const variables
  const playwrightTask = "Learn Playwright";
  const motivationTask = "Be Better";
  const typeScriptTask = "Learn TypeScript";
  const playwrightCheckbox = page
    .getByRole("listitem")
    .filter({ hasText: playwrightTask })
    .getByRole("checkbox");

  const typeScriptCheckbox = page
    .getByRole("listitem")
    .filter({ hasText: typeScriptTask })
    .getByRole("checkbox");

  //Add Learn Playwright
  await todoInput.fill(playwrightTask);
  await todoInput.press("Enter");

  //Verify it starts incomplete
  await expect(playwrightCheckbox).not.toBeChecked();

  //Mark it complete
  await playwrightCheckbox.check();

  //Add Motivation Task
  await todoInput.fill(motivationTask);
  await todoInput.press("Enter");

  // Add TypeScript
  await todoInput.fill(typeScriptTask);
  await todoInput.press("Enter");

  // Assertion 1 : Verify three todo items exist
  await expect(page.locator(".todo-list li")).toHaveCount(3);

  // Assertion 2: Verify Learn Playwright checkbox is checked
  await expect(playwrightCheckbox).toBeChecked();

  //Assertion 3: Verify the counter says 2 items left using toHaveText()
  await expect(page.locator(".todo-count")).toHaveText("2 items left");

  //Assertion 4: verify the other two tasks are still visible using tobeVisible
  await expect(page.getByText(motivationTask)).toBeVisible();
  await expect(page.getByText(typeScriptTask)).toBeVisible();
});
