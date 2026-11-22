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
  await expect(page).toHaveTitle("Offensive Security Experience | Udesh Bandara");
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

test("manifest, apple icon and sitemap dates are served", async ({ request }) => {
  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.status()).toBe(200);
  expect((await manifest.json()).name).toContain("Udesh Bandara");
  expect((await request.get("/apple-icon")).headers()["content-type"]).toBe("image/png");
  expect(await (await request.get("/sitemap.xml")).text()).toContain("<lastmod>");
});

test("structured data: Person site-wide, WebSite on home, ProfilePage on About, all valid JSON", async ({ page }) => {
  const types = async () =>
    page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((el) => JSON.parse(el.textContent!)["@type"]));
  await page.goto("/");
  expect(await types()).toEqual(expect.arrayContaining(["Person", "WebSite"]));
  await page.goto("/about");
  expect(await types()).toEqual(expect.arrayContaining(["Person", "ProfilePage", "BreadcrumbList"]));
});

test("no analytics, consent banner or Google requests in a non-production build", async ({ page }) => {
  const google: string[] = [];
  page.on("request", (r) => {
    if (/google(tagmanager|-analytics)\.com/.test(r.url())) google.push(r.url());
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("region", { name: "Analytics consent" })).toHaveCount(0);
  expect(google).toEqual([]);
});
