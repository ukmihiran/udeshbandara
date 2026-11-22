import { expect, test } from "@playwright/test";

const WIDTHS = [320, 375, 414, 768, 1024, 1440, 1920];

/** True page width with the body's overflow-x clip disabled, so masked overflow is still caught. */
const trueScrollWidth = () =>
  document.body.style.setProperty("overflow-x", "visible") ?? document.documentElement.scrollWidth;
const ROUTES = ["/", "/about", "/experience", "/certifications", "/projects", "/nope"];

for (const width of WIDTHS) {
  test(`no horizontal scroll at ${width}px on any route`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ROUTES) {
      await page.goto(route);
      const scrollWidth = await page.evaluate(trueScrollWidth);
      expect(scrollWidth, `${route} at ${width}px`).toBe(width);
    }
  });
}

test("a 70-character repo name wraps inside its card at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/projects");
  const changed = await page.evaluate(() => {
    const el = document.querySelector("[data-repo] h2");
    if (el) el.textContent = "CSRF-protection-in-web-applications-via-Synchronizer-Token-Patterns";
    return Boolean(el);
  });
  test.skip(!changed, "GitHub unavailable — fallback card shown");
  expect(await page.evaluate(trueScrollWidth)).toBe(320);
});

test("header and footer controls are at least 44px on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const small = await page.$$eval("header a, header button, footer a", (els) =>
    els
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.width < 44 || r.height < 44);
      })
      .map((e) => e.getAttribute("aria-label") ?? e.textContent?.trim()),
  );
  expect(small).toEqual([]);
});

test("mobile menu close button is at least 44px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const box = await page.getByRole("button", { name: "Close" }).boundingBox();
  // Round away subpixel layout noise (44px can measure as 43.99997); a real 43px control still fails.
  expect(Math.round(box!.width)).toBeGreaterThanOrEqual(44);
  expect(Math.round(box!.height)).toBeGreaterThanOrEqual(44);
});

test("theme toggle switches and persists across navigation", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const before = await html.getAttribute("class");
  await page.getByRole("button", { name: /Switch to (light|dark) theme/ }).first().click();
  await expect(html).not.toHaveAttribute("class", before ?? "");
  const after = await html.getAttribute("class");
  await page.locator('header a[href="/about"]').first().click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(html).toHaveAttribute("class", after ?? "");
});

test("home has a good Cumulative Layout Shift on a phone (< 0.1)", async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 823 });
  await page.addInitScript(() => {
    (window as unknown as { __cls: number }).__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
        if (!entry.hadRecentInput) (window as unknown as { __cls: number }).__cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => (window as unknown as { __cls: number }).__cls)).toBeLessThan(0.1);
});
