import { test, expect, type Page } from "@playwright/test";

test("User can add and complete tasks using objects", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  const tasks = [
    { name: "learn Playwright", completed: true },
    { name: "Learn TypeScript", completed: false },
    { name: "Learn API Testing", completed: false },
  ];

  const todoinput = page.getByPlaceholder("What needs to be done?");

  // Add each task to the application
  for (const task of tasks) {
    await todoinput.fill(task.name);
    await todoinput.press("Enter");

    //Complete the task only if completed is true

    if (task.completed) {
      const checkbox = page
        .getByRole("listitem")
        .filter({ hasText: task.name })
        .getByRole("checkbox");

      await checkbox.check();
    }
  }

  // Verify all tasks were created
  await expect(page.locator(".todo-list li")).toHaveCount(tasks.length);

  //Verify the remaining count
  await expect(page.locator(".todo-count")).toHaveText("2 items left");
});

async function addTasks(page: Page, taskName: string) {
  const input = page.getByPlaceholder("What needs to be done");
  await input.fill(taskName);
  await input.press("Enter");
}

test("User can add tasks to management application and verify they exist", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  const todoTasks = [
    { name: "Practise Playwright", completed: true },
    { name: "Study TypeScript", completed: false },
    { name: "Learn Git", completed: true },
    { name: "Review Testing Concepts", completed: false },
  ];

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add each task to the learning task management application
  for (const todo of todoTasks) {
    const checkbox = page
      .getByRole("listitem")
      .filter({ hasText: todo.name })
      .getByRole("checkbox");

    await todoInput.fill(todo.name);
    await todoInput.press("Enter");
    // If task completed = true then check the checkbox

    if (todo.completed) {
      // Verify the task starts incomplete
      await expect(checkbox).not.toBeChecked();

      // Complete the task
      await checkbox.check();

      // Verify the task is now complete
      await expect(checkbox).toBeChecked();
    } else {
      // Verify the task remains incomplete
      await expect(checkbox).not.toBeChecked();
    }
  }

  // Verify that four Todo items exist.
  await expect(page.locator(".todo-list li")).toHaveCount(todoTasks.length);

  // Verify the remaining count
  await expect(page.locator(".todo-count")).toHaveText("2 items left");
});
