import { expect, test } from "@playwright/test";

test("server HTML contains each section's content", async ({ request }) => {
  expect(await (await request.get("/experience")).text()).toContain("Leading penetration testing");
  expect(await (await request.get("/certifications")).text()).toContain("Altered Security");
  expect(await (await request.get("/about")).text()).toContain("Cyber Security Professional");
});

test("timeline shows the MSc between Kroll and Axiata", async ({ page }) => {
  await page.goto("/experience");
  const orgs = await page.locator("[data-timeline-org]").allTextContents();
  expect(orgs.slice(0, 3)).toEqual(["Kroll", "University of the West of England", "Axiata Digital Labs"]);
  await expect(page.getByText("Jul 2024 – Present")).toBeVisible();
});

test("exactly one role is current: one 'Present' date range", async ({ page }) => {
  await page.goto("/experience");
  await expect(page.getByText(/– Present$/)).toHaveCount(1);
});

test("all eight certifications render, and cards without a verifyUrl are not links", async ({ page }) => {
  await page.goto("/certifications");
  await expect(page.locator("[data-cert]")).toHaveCount(8);
  await expect(page.locator("a[data-cert]")).toHaveCount(0);
});

test("tech stack chips are not interactive", async ({ page }) => {
  await page.goto("/about");
  const chip = page.locator("[data-tech]").first();
  await expect(chip).toBeVisible();
  expect(await chip.evaluate((el) => getComputedStyle(el).cursor)).not.toBe("pointer");
});

test("projects page renders repo cards or the GitHub fallback, never an empty grid", async ({ page }) => {
  await page.goto("/projects");
  const cards = await page.locator("[data-repo]").count();
  if (cards === 0) {
    await expect(page.getByRole("link", { name: /Browse my repositories on GitHub/ })).toBeVisible();
  } else {
    expect(cards).toBeLessThanOrEqual(6);
    await expect(page.locator("[data-repo]").first()).toHaveAttribute("href", /^https:\/\/github\.com\/ukmihiran\//);
  }
});

