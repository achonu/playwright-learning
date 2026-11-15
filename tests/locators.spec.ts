import { test, expect } from "@playwright/test";

test("User can identify tasks with similar names", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  const tasks = ["Tea", "Green Tea", "Tea Bags"];

  // Add three tasks

  for (const task of tasks) {
    await todoInput.fill(task);
    await todoInput.press("Enter");
  }

  // Find the list item containing the text "Tea" and check that it is visible
  const teaItem = page
    .getByRole("listitem")
    .filter({ has: page.getByText("Tea", { exact: true }) });

  // Check that the locator matches one Todo item
  await expect(teaItem).toHaveCount(1);

  //Find the checkbox within the "Tea" list item
  const teaCheckbox = teaItem.getByRole("checkbox");

  // Complete the "Tea" task by checking the checkbox
  await teaCheckbox.check();

  // Verify that the "Tea" task is marked as complete
  await expect(teaCheckbox).toBeChecked();

  // Verify that all three tasks are still exist
  await expect(page.locator(".todo-list li")).toHaveCount(tasks.length);

  // Verify 2 tasks remain incomplete
  await expect(page.locator(".todo-count")).toHaveText("2 items left");

  // FFind Green Tea and verify it remains incomplete
  const greenTeaItem = page
    .getByRole("listitem")
    .filter({ has: page.getByText("Green Tea", { exact: true }) });

  // Verify exactly one Green Tea task exists
  await expect(greenTeaItem).toHaveCount(1);

  // Find the checkbox within the "Green Tea" list item
  const greenTeaCheckbox = greenTeaItem.getByRole("checkbox");

  await expect(greenTeaCheckbox).not.toBeChecked();

  // Find the list item containing the text "Tea Bags" and check that it is visible
  const teaBagsItem = page
    .getByRole("listitem")
    .filter({ has: page.getByText("Tea Bags", { exact: true }) });

  // Verify exactly one Tea Bags exists
  await expect(teaBagsItem).toHaveCount(1);

  // Find the checkbox within the "Tea Bags" list item
  const teaBagsCheckbox = teaBagsItem.getByRole("checkbox");

  await expect(teaBagsCheckbox).not.toBeChecked();
});
