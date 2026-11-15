import { test, expect, Page, Locator } from "@playwright/test";

function getTodoItem(page: Page, taskName: string): Locator {
  return page.getByRole("listitem").filter({
    has: page.getByText(taskName, { exact: true }),
  });
}

test("User can add, edit and delete Todo items", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const studyTasks = ["Study TypeScript", "Practice Playwright", "Review Git"];

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add the three tasks to the Todo list
  for (const task of studyTasks) {
    await todoInput.fill(task);
    await todoInput.press("Enter");
  }

  // Verify that all three tasks are visible
  for (const task of studyTasks) {
    await expect(page.getByText(task)).toBeVisible();
  }

  // Edit Study TypeScript Todo
  const todoItem = getTodoItem(page, "Study TypeScript");

  const updatedTask = getTodoItem(page, "Practice TypeScript Functions");

  const editInput = todoItem.locator(".edit");

  await todoItem.dblclick();
  await editInput.fill("Practice TypeScript Functions");
  await editInput.press("Enter");

  // Verify the updated task is visible
  await expect(updatedTask).toBeVisible();

  // Verify the old description is no longer present
  await expect(page.getByText("Study TypeScript")).toHaveCount(0);

  // Delete a task
  const taskToDelete = "Review Git";
  const deleteItem = getTodoItem(page, taskToDelete);

  await deleteItem.hover();
  await deleteItem.locator(".destroy").click();

  // Verify the task is deleted
  await expect(deleteItem).toHaveCount(0);

  // Verify the remaining tasks are still visible
  await expect(
    page.getByText("Practice TypeScript Functions", { exact: true }),
  ).toBeVisible();

  await expect(
    page.getByText("Practice Playwright", { exact: true }),
  ).toBeVisible();

  await expect(page.locator(".todo-list li")).toHaveCount(2);
});
