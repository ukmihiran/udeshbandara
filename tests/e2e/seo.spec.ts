import { expect, test } from "@playwright/test";

const PAGES = ["/", "/about", "/experience", "/certifications", "/projects"];

test("each page has a unique title and description, a canonical URL and one og:image", async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of PAGES) {
    await page.goto(path);
    titles.add(await page.title());
    descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://udeshbandara.com${path === "/" ? "" : path}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  }
  expect(titles.size).toBe(PAGES.length);
  expect(descriptions.size).toBe(PAGES.length);
});

test("subpage titles use the site template", async ({ page }) => {
  await page.goto("/experience");
  await expect(page).toHaveTitle("Experience | Udesh Bandara");
});

test("subpages carry breadcrumb structured data", async ({ page }) => {
  await page.goto("/certifications");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const crumbs = blocks.map((b) => JSON.parse(b)).find((d) => d["@type"] === "BreadcrumbList");
  expect(crumbs.itemListElement.map((i: { name: string }) => i.name)).toEqual(["Home", "Certifications"]);
});

test("OG images render as PNG for home and a subpage", async ({ request }) => {
  for (const path of ["/opengraph-image", "/experience/opengraph-image"]) {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
  }
});
