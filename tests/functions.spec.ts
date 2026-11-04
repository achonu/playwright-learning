import { test, expect, type Page } from "@playwright/test";

// Resuable function to add a Todo task
async function addTask(page: Page, taskName: string) {
  const input = page.getByPlaceholder("What needs to be done?");

  await input.fill(taskName);
  await input.press("Enter");
}

test("User can add tasks using a reusable function", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const tasks = ["Learn Playwright", "Study TypeScript", "Learn Git"];

  // Call our function for every task
  for (const taskName of tasks) {
    await addTask(page, taskName);
  }

  //Verify the total number of Todo items
  await expect(page.locator(".todo-list li")).toHaveCount(tasks.length);

  // Verify every task is visible
  for (const taskName of tasks) {
    await expect(page.getByText(taskName)).toBeVisible();
  }
});
