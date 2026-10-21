import { test, expect } from "@playwright/test";

test("User can add a task using a variable", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const taskName = "Become a QA Automation Engineer";
  const todoInput = page.getByPlaceholder("What needs to be done?");

  await todoInput.fill(taskName);
  await todoInput.press("Enter");

  await expect(page.getByText(taskName)).toBeVisible();
});

test("User can add three tasks and check they are visible", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const task1 = "Learn Playwright";
  const task2 = "Learn TypeScript";
  const task3 = "Learn API Testing";
  const todoInput = page.getByPlaceholder("What needs to be done?");
  const expectedCount = page.getByText("3 items left");

  await todoInput.fill(task1);
  await todoInput.press("Enter");
  await todoInput.fill(task2);
  await todoInput.press("Enter");
  await todoInput.fill(task3);
  await todoInput.press("Enter");

  await expect(page.getByText(task1)).toBeVisible();
  await expect(page.getByText(task2)).toBeVisible();
  await expect(page.getByText(task3)).toBeVisible();
  await expect(expectedCount).toBeVisible();
});
