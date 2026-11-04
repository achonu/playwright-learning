import { test, expect, type Page } from "@playwright/test";

// function to handle entering and adding a todo
async function addTask(page: Page, taskName: string) {
  const todoInput = page.getByPlaceholder("What needs to be done?");

  await todoInput.fill(taskName);
  await todoInput.press("Enter");
}

// completeTask() function
async function completeTask(page: Page, taskName: string) {
  const checkbox = page
    .getByRole("listitem")
    .filter({ hasText: taskName })
    .getByRole("checkbox");

  await checkbox.check();
}

test("User can add tasks and verify their completion status", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  const todoTasks = [
    { name: "Practise Playwright", completed: true },
    { name: "Study TypeScript", completed: false },
    { name: "Learn Git", completed: true },
    { name: "Review Testing Concepts", completed: false },
  ];

  // Call the addTask function
  for (const taskName of todoTasks) {
    await addTask(page, taskName.name);
  }

  for (const todo of todoTasks) {
    const checkbox = page
      .getByRole("listitem")
      .filter({ hasText: todo.name })
      .getByRole("checkbox");

    if (todo.completed) {
      // Verify the task starts incomplete
      await expect(checkbox).not.toBeChecked();

      // Call the reusable function to complete the task
      await completeTask(page, todo.name);

      // Verify the task is now complete
      await expect(checkbox).toBeChecked();
    } else {
      // Verify the task remains incomplete
      await expect(checkbox).not.toBeChecked();
    }
  } // Closes the for...of loop

  // Verify the total number of Todo items
  await expect(page.locator(".todo-list li")).toHaveCount(todoTasks.length);

  // Verify the remaining count
  await expect(page.locator(".todo-count")).toHaveText("2 items left");
});
