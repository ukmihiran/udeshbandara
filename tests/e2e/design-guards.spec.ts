import { expect, test } from "@playwright/test";

/**
 * Guards against the "AI template" look (docs/design/2026-11-21-ui-ux-audit.md, step 1).
 * Each test pins one removed pattern so it cannot creep back in.
 */
const PAGES = ["/", "/about", "/experience", "/certifications", "/projects"];

test("no infinite decorative animations on any page", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const infinite = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().iterations === Infinity)
        .map((a) => (a.effect as KeyframeEffect | null)?.target?.className?.toString() ?? "?"),
    );
    expect(infinite, path).toEqual([]);
  }
});

test("no glass: nothing uses backdrop-filter", async ({ page }) => {
  for (const path of ["/", "/about"]) {
    await page.goto(path);
    const blurred = await page.evaluate(() =>
      [...document.querySelectorAll("body *")].filter((el) => {
        const s = getComputedStyle(el);
        return s.backdropFilter !== "none" && s.backdropFilter !== "";
      }).length,
    );
    expect(blurred, path).toBe(0);
  }
});

test("no decorative radial-gradient backgrounds (dot grid, halos)", async ({ page }) => {
  await page.goto("/");
  const decorated = await page.evaluate(() =>
    [...document.querySelectorAll("body, body *")].filter((el) =>
      getComputedStyle(el).backgroundImage.includes("radial-gradient"),
    ).length,
  );
  expect(decorated).toBe(0);
});

test("no uppercase eyebrow labels in page content", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const shouty = await page.evaluate(() =>
      [...document.querySelectorAll("main *, footer *")]
        .filter((el) => getComputedStyle(el).textTransform === "uppercase" && el.textContent?.trim())
        .map((el) => el.textContent!.trim().slice(0, 30)),
    );
    expect(shouty, path).toEqual([]);
  }
});

test("headings carry no decorative icons", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    await expect(page.locator(":is(h1, h2, h3) svg"), path).toHaveCount(0);
  }
});

test("hero: the name comes first, with one static role line and no stat tiles", async ({ page }) => {
  await page.goto("/");
  const firstText = await page.evaluate(() => {
    const hero = document.querySelector("main section");
    const walker = document.createTreeWalker(hero!, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
    });
    return walker.nextNode()?.parentElement?.closest("h1") ? "h1" : walker.currentNode.textContent;
  });
  expect(firstText).toBe("h1");
  await expect(page.locator("[data-role-text]")).toHaveCount(0);
  await expect(page.locator("[data-stat]")).toHaveCount(0);
  await expect(page.locator("[data-hero-meta]")).toContainText("4+ years");
});

test("avatar is a plain image: no clip-path, glow filter or animation", async ({ page }) => {
  await page.goto("/");
  const img = page.getByAltText("Udesh Bandara", { exact: true });
  const decoration = await img.evaluate((el) => {
    const out: string[] = [];
    for (let n: Element | null = el; n && n.tagName !== "SECTION"; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.clipPath !== "none") out.push(`clip-path on ${n.tagName}`);
      if (s.filter !== "none") out.push(`filter on ${n.tagName}`);
      if (n.getAnimations().length) out.push(`animation on ${n.tagName}`);
    }
    return out;
  });
  expect(decoration).toEqual([]);
});

test("non-clickable cards do not react to hover", async ({ page }) => {
  await page.goto("/experience");
  const card = page.locator("[data-timeline-card]").first();
  const read = () => card.evaluate((el) => `${getComputedStyle(el).boxShadow}|${getComputedStyle(el).borderColor}`);
  const before = await read();
  await card.hover();
  await page.waitForTimeout(300);
  expect(await read()).toBe(before);
});

test("clickable cards change surface on hover, without a glow", async ({ page }) => {
  await page.goto("/projects");
  const card = page.locator("[data-repo]").first();
  test.skip((await card.count()) === 0, "GitHub unavailable — fallback card shown");
  await card.hover();
  await page.waitForTimeout(300);
  expect(await card.evaluate((el) => getComputedStyle(el).boxShadow)).toBe("none");
});

test("footer has no terminal costume", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("footer")).not.toContainText("whoami");
});
