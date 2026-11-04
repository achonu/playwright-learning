import { test, expect } from "@playwright/test";

test("User can add multiple tasks and verify their count and visibility", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  const tasks = [
    "Practise Playwright",
    "Study TypeScript",
    "Learn Git",
    "Review Testing Concepts",
  ];

  const todoInput = page.getByPlaceholder("What needs to be done?");

  //Repeat these actions for every task in the array
  for (const taskName of tasks) {
    await todoInput.fill(taskName);
    await todoInput.press("Enter");
  }

  //Verify the total number of Todo items
  await expect(page.locator(".todo-list li")).toHaveCount(tasks.length);

  //Verify that each of the four tasks is visible
  for (const taskName of tasks) {
    await expect(page.getByText(taskName)).toBeVisible();
  }

  // Create expected counter text
  const expectedCounter = `${tasks.length} items left`;

  // Verify the counter matches the number of incomplete tasks
  await expect(page.locator(".todo-count")).toHaveText(expectedCounter);
});
