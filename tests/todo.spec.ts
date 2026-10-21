import { test, expect } from "@playwright/test";

/*test("user can add a todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  await todoInput.fill("Learn Playwright to get a job!");
  await todoInput.press("Enter");

  await expect(page.getByText("Learn Playwright to get a job")).toBeVisible();
});

test("user can add a second todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  await todoInput.fill("Learn Playwright.");
  await todoInput.press("Enter");

  await expect(page.getByText("Learn Playwright.")).toBeVisible();
});

test("user can add a third todo item", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  await todoInput.fill("Learn TypeScript.");
  await todoInput.press("Enter");

  await expect(page.getByText("Learn TypeScript.")).toBeVisible();
  await expect(page.getByText("1 item left")).toBeVisible();
});
*/
test("user can complete one of three tasks and see two items left", async ({
  page,
}) => {
  await page.goto("https://demo.playwright.dev/todomvc/");

  const todoInput = page.getByPlaceholder("What needs to be done?");

  await todoInput.fill("Learn Playwright.");
  await todoInput.press("Enter");
  await page
    .getByRole("listitem")
    .filter({ hasText: "Learn Playwright." })
    .getByRole("checkbox")
    .check();
  await todoInput.fill("Learn TypeScript.");
  await todoInput.press("Enter");
  await todoInput.fill("Learn API Testing.");
  await todoInput.press("Enter");

  await expect(page.getByText("2 items left")).toBeVisible();
});
