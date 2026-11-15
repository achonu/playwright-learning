import { test, expect, Page, Locator } from "@playwright/test";

// todo helper function to return a locator
function getTodoItem(page: Page, taskName: string): Locator {
  return page.getByRole("listitem").filter({
    has: page.getByText(taskName, { exact: true }),
  });
}

test("Add a weekend shopping list to the TodoMVC app", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  const shoppingList = ["Buy milk", "Buy eggs", "Buy bread", "Buy chocolate"];

  // Add each item in the shopping list to the Todo list
  for (const item of shoppingList) {
    await todoInput.fill(item);
    await todoInput.press("Enter");
  }

  // Complete Add milk
  const milkItem = getTodoItem(page, "Buy milk");
  const milkCheckbox = milkItem.getByRole("checkbox");
  await milkCheckbox.check();

  await expect(milkCheckbox).toBeChecked();

  //Edit buy bread to buy wholemeal bread
  const breadItem = getTodoItem(page, "Buy bread");
  const editInput = breadItem.locator(".edit");
  await breadItem.dblclick();
  await editInput.fill("Buy wholemeal bread");
  await editInput.press("Enter");

  // Verify the old bread task no longer exists
  await expect(getTodoItem(page, "Buy bread")).toHaveCount(0);

  //Delte buy chocolate
  const chocolateItem = getTodoItem(page, "Buy chocolate");
  await chocolateItem.hover();
  await chocolateItem.locator(".destroy").click();

  // Verify chocolate was removed
  await expect(chocolateItem).toHaveCount(0);

  // Verify that the remaining items are visible
  for (const item of ["Buy milk", "Buy eggs", "Buy wholemeal bread"]) {
    await expect(getTodoItem(page, item)).toHaveCount(1);
    await expect(getTodoItem(page, item)).toBeVisible();
  }
  //Verify checkbox states and the remaining-items counter

  const incompleteTasks = ["Buy wholemeal bread", "Buy eggs"];

  for (const task of incompleteTasks) {
    const todoItem = getTodoItem(page, task);

    // Find the checkbox inside this Todo item
    const checkbox = todoItem.getByRole("checkbox");

    // Assert that the checkbox is NOT checked
    await expect(checkbox).not.toBeChecked();
  }
  // Verify that exactly three Todo items exist
  await expect(page.locator(".todo-list li")).toHaveCount(3);

  // verify that the remaining-items are incomplete
  await expect(page.locator(".todo-count")).toHaveText("2 items left");
});
