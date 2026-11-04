import { test, expect, type Page } from "@playwright/test";

// 1. DEFINE THE FUNCTION OUTSIDE THE TEST
async function addTask(page: Page, taskName: string) {
  const input = page.getByPlaceholder("What needs to be done?");

  await input.fill(taskName);
  await input.press("Enter");
}

// 2. START THE TEST
test("User can add a task using a function", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const tasks = ["Learn Playwright", "Study TypeScript", "Learn Git"];

  for (const taskname of tasks) {
    await addTask(page, taskname);
  }

  // 4. VERIFY THE RESULT IS VISIBLE
  await expect(page.locator(".todo-list li")).toHaveCount(tasks.length);

  // 4. VERIFY THE RESULT IS VISIBLE WITH A FOR LOOP

  for (const taskname of tasks) {
    await expect(page.getByText(taskname)).toBeVisible();
  }
  await expect(page.locator(".todo-count")).toHaveText("3 items left");
});
