import { test, expect } from "@playwright/test";

test("User can add a valid Todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Positive test case: Add a valid Todo item
  const validTask = "Buy milk";
  await todoInput.fill(validTask);
  await todoInput.press("Enter");

  // Verify the task was added
  await expect(page.getByText(validTask, { exact: true })).toBeVisible();

  // Verify one task exists in the list
  await expect(page.locator(".todo-list li")).toHaveCount(1);
});

test("User cannot add an empty Todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Negative test case: Attempt to add an empty Todo item

  await todoInput.press("Enter");

  // Verify that no task was added
  await expect(page.locator(".todo-list li")).toHaveCount(0);
});

test("Empty input does not change an existing Todo list", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add Study Playwright task
  const studyTask = "Study Playwright";
  await todoInput.fill(studyTask);
  await todoInput.press("Enter");

  // Verify the task exists
  await expect(page.getByText(studyTask, { exact: true })).toBeVisible();

  // Press enter on an empty input field
  await todoInput.fill("");
  await todoInput.press("Enter");

  // Verify Study Playwright task still exists
  await expect(page.getByText(studyTask, { exact: true })).toBeVisible();

  // Verify exactly one Todo item exists in the list
  await expect(page.locator(".todo-list li")).toHaveCount(1);
});
