import { expect, test } from "@playwright/test";

test.describe("small phone (iPhone SE)", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("name and primary CTA are above the fold", async ({ page }) => {
    await page.goto("/");
    const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
    const cta = await page.getByRole("link", { name: "Get in Touch" }).boundingBox();
    expect(h1!.y).toBeGreaterThan(0);
    expect(cta!.y + cta!.height).toBeLessThanOrEqual(667);
  });

  test("avatar glow does not cause horizontal scroll", async ({ page }) => {
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);
  });
});

test("avatar glow does not cause horizontal scroll at tablet width", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(768);
});

test("hero stats come from the data", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-stat='Certifications']")).toContainText("8");
  await expect(page.locator("[data-stat='Years experience']")).toContainText("4+");
});

test("no Download CV button until the PDF exists", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Download CV/ })).toHaveCount(0);
});

test("the meaningless VERIFIED badge is gone and the status line shows", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("verified", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Open to opportunities")).toBeVisible();
});

test("highlights link to each section", async ({ page }) => {
  await page.goto("/");
  for (const href of ["/experience", "/certifications", "/projects"]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
});

test("the raw avatar PNG is not downloaded", async ({ page }) => {
  const raw: string[] = [];
  page.on("request", (r) => {
    if (new URL(r.url()).pathname === "/avatar-3d.png") raw.push(r.url());
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(raw).toEqual([]);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("typewriter shows a complete static role", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-role-text]")).toHaveText("Penetration Tester");
  });
});

test("screen readers get every role as static text", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".sr-only", { hasText: "Penetration Tester, Red Teamer" })).toHaveCount(1);
});
