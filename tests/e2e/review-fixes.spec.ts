import { expect, test, type Page } from "@playwright/test";

/** console.error + uncaught errors, ignoring the Vercel analytics scripts that only exist on Vercel. */
function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && !/_vercel|Failed to load resource/.test(msg.text())) errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

const trueScrollWidth = () =>
  document.body.style.setProperty("overflow-x", "visible") ?? document.documentElement.scrollWidth;

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("home hydrates without errors", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});

test("every page hydrates without console errors", async ({ page }) => {
  const errors = collectErrors(page);
  for (const path of ["/", "/about", "/experience", "/certifications", "/projects"]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }
  expect(errors).toEqual([]);
});

test.describe("phone without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });

  test("every section is reachable by a visible link", async ({ page }) => {
    await page.goto("/");
    for (const path of ["/about", "/experience", "/certifications", "/projects"]) {
      await expect(page.locator(`a[href="${path}"]:visible`).first()).toBeVisible();
    }
    await page.locator('a[href="/about"]:visible').first().click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("About");
  });

  test("the avatar is visible", async ({ page }) => {
    await page.goto("/");
    const opacity = await page
      .getByAltText("Udesh Bandara", { exact: true })
      .evaluate((img) => {
        let el: Element | null = img;
        let min = 1;
        while (el) {
          min = Math.min(min, Number(getComputedStyle(el).opacity));
          el = el.parentElement;
        }
        return min;
      });
    expect(opacity).toBe(1);
  });
});

test("no ARIA labels on role-less spans", async ({ page }) => {
  for (const path of ["/", "/projects"]) {
    await page.goto(path);
    await expect(page.locator("span[aria-label]:not([role])")).toHaveCount(0);
  }
});

test("a long unbroken role title wraps on the home card and certification cards at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const long = "Principal-Offensive-Security-Consultant-and-Red-Team-Operations-Lead";
  await page.goto("/");
  await page.locator("[data-now-role]").evaluate((el, t) => (el.textContent = t), long);
  expect(await page.evaluate(trueScrollWidth)).toBe(320);
  await page.goto("/certifications");
  await page.locator("[data-cert] [data-cert-name]").first().evaluate((el, t) => (el.textContent = t), long);
  expect(await page.evaluate(trueScrollWidth)).toBe(320);
});

test("the header is anchored during page transitions", async ({ page }) => {
  await page.goto("/");
  const name = await page.locator("body > header, header").first().evaluate((el) => getComputedStyle(el).viewTransitionName);
  expect(name).toBe("site-header");
});

test("three featured projects leave no orphan card at tablet width", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  const cards = page.locator("section[aria-labelledby=featured-projects] ul > li");
  test.skip((await cards.count()) !== 3, "GitHub unavailable — fallback card shown");
  const grid = await page.locator("section[aria-labelledby=featured-projects] ul").boundingBox();
  const last = await cards.nth(2).boundingBox();
  expect(last!.width).toBeGreaterThan(grid!.width * 0.9);
});
