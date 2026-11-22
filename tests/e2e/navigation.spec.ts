import { expect, test } from "@playwright/test";

const ROUTES = [
  ["/about", "About"],
  ["/experience", "Experience"],
  ["/certifications", "Certifications"],
  ["/projects", "Projects"],
] as const;

test("each route loads directly with one h1 and an active nav link", async ({ page }) => {
  for (const [path, heading] of ROUTES) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    await expect(page.locator(`header a[href="${path}"][aria-current="page"]`).first()).toBeAttached();
  }
});

test("unknown route shows the custom 404 with a way home", async ({ page }) => {
  const res = await page.goto("/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/experience");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test.describe("small phone", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("arrow keys scroll instead of switching sections", async ({ page }) => {
    await page.goto("/experience");
    await page.getByRole("heading", { level: 1 }).click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveURL(/\/experience$/);
  });

  test("no double gap under the mobile header", async ({ page }) => {
    await page.goto("/about");
    const header = await page.locator("header").first().boundingBox();
    const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(h1!.y - (header!.y + header!.height)).toBeLessThan(48);
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("a menu link navigates, closes the sheet, and Back returns", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL(/\/experience$/);
    await expect(dialog).toBeHidden();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("nav links work and content renders", async ({ page }) => {
    await page.goto("/");
    await page.locator('header a[href="/experience"]').first().click();
    await expect(page).toHaveURL(/\/experience$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Experience");
  });
});

test("nav fits without horizontal scroll at tablet and desktop widths", async ({ page }) => {
  for (const width of [768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});
