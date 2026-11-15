import { test, expect, Page, Locator } from "@playwright/test";

// Reusable function that returns a precise Todo item locator
function getTodoItem(page: Page, taskName: string): Locator {
  return page.getByRole("listitem").filter({
    has: page.getByText(taskName, { exact: true }),
  });
}

test("User can find a Todo item using a reusable locator helper", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const tasks = ["Tea", "Green Tea", "Tea Bags"];

  const todoInput = page.getByPlaceholder("What needs to be done?");

  // Add three tasks
  for (const task of tasks) {
    await todoInput.fill(task);
    await todoInput.press("Enter");
  }

  // Use our helper to find Tea
  const teaItem = getTodoItem(page, "Tea");

  // Verify that exactly one Tea task exists
  await expect(teaItem).toHaveCount(1);

  // Find the checkbox inside Tea
  const teaCheckbox = teaItem.getByRole("checkbox");

  // Complete Tea
  await teaCheckbox.check();

  //Verify that Tea is marked as complete
  await expect(teaCheckbox).toBeChecked();

  // Use getTodoItem() to find Green Tea
  const greenTeaItem = getTodoItem(page, "Green Tea");

  //Find the checkbox inside Green Tea
  const greenTeaCheckbox = greenTeaItem.getByRole("checkbox");

  // Verify that Green Tea is not checked
  await expect(greenTeaCheckbox).not.toBeChecked();

  // Use getTodoItem() to find Tea Bags
  const teaBagsItem = getTodoItem(page, "Tea Bags");

  // Find the checkbox inside Tea Bags
  const teaBagsCheckbox = teaBagsItem.getByRole("checkbox");

  // Verify that Tea Bags is not checked
  await expect(teaBagsCheckbox).not.toBeChecked();

  // Verify that all three tasks still exist
  await expect(page.locator(".todo-list li")).toHaveCount(tasks.length);
});
