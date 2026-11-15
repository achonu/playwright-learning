import { test, expect } from "@playwright/test";

test("User can edit an existing Todo Item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const originalTask = "Learn Playwright";
  const updatedTask = "Practise Playwright locators";

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add the original task
  await todoInput.fill(originalTask);
  await todoInput.press("Enter");

  // Verify the original task exists

  await expect(page.getByText(originalTask)).toBeVisible();

  // Double click the task to enter editing mode
  await page.getByText(originalTask).dblclick();

  // Locate the editing textbox

  const editInput = page.locator(".todo-list li .edit");

  // Verify the textbox contains the original task after double click
  await expect(editInput).toHaveValue(originalTask);

  // edit the task description
  await editInput.fill(updatedTask);

  // Press Enter to save the changes
  await editInput.press("Enter");

  // Verify the updated task is visible
  await expect(page.getByText(updatedTask)).toBeVisible();

  // Verify the old description is no longer present
  await expect(page.getByText(originalTask)).toHaveCount(0);
});
