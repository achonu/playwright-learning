import { test, expect, type Page } from "@playwright/test";

// Reusable helper to add an item to the shopping list
async function addShoppingItem(page: Page, shopItem: string) {
  const input = page.getByPlaceholder("What needs to be done?");

  await input.fill(shopItem);
  await input.press("Enter");
}

//Reusable helper to mark a shopping item as purchased
async function markAsPurchased(page: Page, shopItem: string) {
  const checkbox = page
    .getByRole("listitem")
    .filter({ hasText: shopItem })
    .getByRole("checkbox");

  await checkbox.check();
}

test("User can manage a weekend shopping list", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const shopItems = [
    { item: "Cake", purchased: true },
    { item: "Tea", purchased: false },
    { item: "Bananas", purchased: true },
    { item: "Biscuit", purchased: true },
    { item: "Coke", purchased: false },
  ];

  // Add all items before checking their purchase states

  for (const shoppingItem of shopItems) {
    await addShoppingItem(page, shoppingItem.item);
  }

  // Verify each item's state and complete purchased items
  for (const shoppingItem of shopItems) {
    const checkbox = page
      .getByRole("listitem")
      .filter({ hasText: shoppingItem.item })
      .getByRole("checkbox");

    if (shoppingItem.purchased) {
      // Verify the task starts incomplete
      await expect(checkbox).not.toBeChecked();

      // Call the reusable function to complete the task
      await markAsPurchased(page, shoppingItem.item);

      // Verify the task is now complete
      await expect(checkbox).toBeChecked();
    } else {
      // Verify the task remains incomplete
      await expect(checkbox).not.toBeChecked();
    }
  }

  // Verify the total number of items
  await expect(page.locator(".todo-list li")).toHaveCount(shopItems.length);

  // Verify the remaining-item counter
  await expect(page.locator(".todo-count")).toHaveText("2 items left");
});
