import { expect, test } from "@playwright/test";
import { EXPERIENCES } from "../../lib/data";
import { yearsOfExperience } from "../../lib/format";

/**
 * Guards for the design system (DESIGN.md): the removed "AI template" patterns stay out, and the
 * graphite product-UI world keeps its rules. Each test pins one rule so it cannot drift.
 */
const PAGES = ["/", "/about", "/experience", "/certifications", "/projects"];

/** Infinite animations outside the hero cube, which is the one authored motion moment. */
const strayInfinite = () =>
  document
    .getAnimations()
    .filter((a) => a.effect?.getComputedTiming().iterations === Infinity)
    .map((a) => (a.effect as KeyframeEffect | null)?.target as Element | null)
    .filter((el) => !el?.closest("[data-hero-cube]"))
    .map((el) => el?.className?.toString() ?? "?");

test("the hero cube is the only infinite animation on any page", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    expect(await page.evaluate(strayInfinite), path).toEqual([]);
  }
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the hero cube holds still", async ({ page }) => {
    await page.goto("/");
    const cube = page.locator("[data-hero-cube]");
    await expect(cube).toBeVisible();
    expect(await cube.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
  });
});

test("the hero cube is decorative: hidden from assistive tech, poster first, 3D canvas behind it", async ({ page }) => {
  await page.goto("/");
  const cube = page.locator("[data-hero-cube]");
  await expect(cube).toHaveAttribute("aria-hidden", "true");
  await expect(cube.locator("[data-cube-poster]")).toHaveCount(1);
  await expect(cube.locator("canvas")).toHaveCount(1);
});

test("server HTML paints the cube poster (the 3D scene's first frame), never a different placeholder", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const hero = html.slice(html.indexOf("data-hero-cube"), html.indexOf("data-hero-cube") + 2000);
  expect(hero).toContain("cube-poster.png");
  expect(html).not.toContain('class="cubie"');
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
  await expect(page.locator("[data-hero-meta]")).toContainText(`${yearsOfExperience(EXPERIENCES, new Date())} years`);
});

test("avatar is a plain image: no clip-path, glow filter or animation", async ({ page }) => {
  await page.goto("/about");
  const img = page.getByAltText("Udesh Bandara", { exact: true });
  const decoration = await img.evaluate((el) => {
    const out: string[] = [];
    for (let n: Element | null = el; n && n.tagName !== "MAIN"; n = n.parentElement) {
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
  const read = () =>
    card.evaluate((el) => ({ shadow: getComputedStyle(el).boxShadow, bg: getComputedStyle(el).backgroundColor }));
  const rest = await read();
  await card.hover();
  await page.waitForTimeout(300);
  const hover = await read();
  expect(hover.bg).not.toBe(rest.bg); // the surface steps up
  expect(hover.shadow).toBe(rest.shadow); // hover adds no glow
  // The only elevation is the 1px inset top edge: no outer, blurred shadow.
  expect(rest.shadow === "none" || /^\S.*0px 1px 0px 0px inset$/.test(rest.shadow), rest.shadow).toBe(true);
});

test("footer has no terminal costume", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("footer")).not.toContainText("whoami");
});

/* ── The type system (tokens in app/globals.css) ─────────────────────────── */

/** Computed font size, weight and family of every element that directly holds visible text. */
const textStyles = () =>
  [...document.querySelectorAll("header *, main *, footer *")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      const own = [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
      return own && r.width > 0 && r.height > 0 && !el.closest(".sr-only");
    })
    .map((el) => {
      const s = getComputedStyle(el);
      return { size: parseFloat(s.fontSize), weight: s.fontWeight, family: s.fontFamily, tag: el.tagName };
    });

// At the 1280px test viewport the fluid heading roles sit at their caps: section 28, page 44.
const ALLOWED_SIZES = [14, 16, 18, 28, 44]; // caption, body, title, section, page
/** The fluid display size is allowed only for the hero name on "/"; every other H1 must be on the scale. */
const isDisplay = (s: { tag: string; size: number }, path: string) => path === "/" && s.tag === "H1" && s.size >= 44;

test("text uses only the five type-scale sizes (plus the fluid hero name)", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const sizes = (await page.evaluate(textStyles)).filter((s) => !isDisplay(s, path)).map((s) => s.size);
    const offScale = [...new Set(sizes)].filter((px) => !ALLOWED_SIZES.includes(Math.round(px)));
    expect(offScale, path).toEqual([]);
  }
});

test("no text smaller than the 14px caption floor", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const tiny = (await page.evaluate(textStyles)).filter((s) => s.size < 14);
    expect(tiny.length, path).toBe(0);
  }
});

test("only the 400/500/600 Geist weights and 400 Geist Mono", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const bad = (await page.evaluate(textStyles))
      .filter((s) => {
        const mono = /mono/i.test(s.family);
        return mono ? s.weight !== "400" : !["400", "500", "600"].includes(s.weight);
      })
      .map((s) => `${s.tag} ${s.weight} ${s.family.split(",")[0]}`);
    expect([...new Set(bad)], path).toEqual([]);
  }
});

test("chosen families only: Geist and Geist Mono", async ({ page }) => {
  for (const path of ["/", "/experience"]) {
    await page.goto(path);
    const families = [...new Set((await page.evaluate(textStyles)).map((s) => s.family.split(",")[0].replace(/['"]/g, "").trim()))];
    for (const f of families) expect(f, families.join(" | ")).toMatch(/^Geist( Mono)?\b/);
  }
});

test("headings balance their wrap and paragraphs avoid stragglers", async ({ page }) => {
  await page.goto("/experience");
  const wraps = await page.evaluate(() => ({
    h: getComputedStyle(document.querySelector("main h1")!).textWrapStyle,
    p: getComputedStyle(document.querySelector("main p")!).textWrapStyle,
  }));
  expect(wraps).toEqual({ h: "balance", p: "pretty" });
});

test("headings step up the scale: page 44px and section 28px in Geist at 1280px", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/about");
  const read = (sel: string) =>
    page.locator(sel).first().evaluate((el) => {
      const s = getComputedStyle(el);
      return `${Math.round(parseFloat(s.fontSize))} ${s.fontFamily.split(",")[0].replace(/['"]/g, "")}`;
    });
  expect(await read("main h1")).toMatch(/^44 Geist\b/);
  expect(await read("main h2")).toMatch(/^28 Geist\b/);
});

test("fluid headings scale down on a phone: page 32px, section 22px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/about");
  const size = (sel: string) => page.locator(sel).first().evaluate((el) => Math.round(parseFloat(getComputedStyle(el).fontSize)));
  expect(await size("main h1")).toBe(32);
  expect(await size("main h2")).toBe(22);
});

/* ── Layout and structure ────────────────────────────────────────────────── */

test("every page shares one content column aligned with the header name", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of PAGES) {
    await page.goto(path);
    const [brand, h1] = await Promise.all([
      page.locator("header a[href='/']").first().boundingBox(),
      page.locator("main h1").first().boundingBox(),
    ]);
    // On home the h1 starts after the (phone-only) photo slot, which is hidden at this width.
    expect(Math.round(h1!.x), path).toBe(Math.round(brand!.x));
  }
});

test("no nested cards: a bordered card never sits inside another", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const nested = await page.evaluate(() => {
      const isCard = (el: Element) => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const sides = [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth];
        // A "card" is a container: chips, dots and icons are smaller than this.
        return sides.every((w) => parseFloat(w) > 0) && parseFloat(s.borderTopLeftRadius) >= 8 && r.width >= 120 && r.height >= 80;
      };
      const cards = [...document.querySelectorAll("main *")].filter((el) => el.tagName !== "IMG" && isCard(el));
      return cards
        .filter((el) => cards.some((other) => other !== el && other.contains(el)))
        .map((el) => `${el.tagName}.${String(el.className).split(" ").slice(0, 3).join(".")}`);
    });
    expect(nested, path).toEqual([]);
  }
});

test("no employment-type or 'Current' badges on the timeline", async ({ page }) => {
  await page.goto("/experience");
  await expect(page.getByText("Full-time", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Current", { exact: true })).toHaveCount(0);
  await expect(page.locator(".timeline-dot-active")).toHaveCount(1);
});

test("organisation logos are small (≤ 40px tall, ≤ 56px wide for wordmarks)", async ({ page }) => {
  for (const path of ["/experience", "/certifications", "/about"]) {
    await page.goto(path);
    const boxes = await page.locator("[data-org-logo]").evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      }),
    );
    expect(boxes.length, path).toBeGreaterThan(0);
    expect(boxes.filter((b) => b.h > 40 || b.w > 56), path).toEqual([]);
  }
});

test("project language marker is neutral, not the accent colour", async ({ page }) => {
  await page.goto("/projects");
  const dot = page.locator("[data-repo] [data-lang-dot]").first();
  test.skip((await dot.count()) === 0, "GitHub unavailable or no language");
  const [dotColor, accent] = await dot.evaluate((el) => [
    getComputedStyle(el).backgroundColor,
    getComputedStyle(document.documentElement).getPropertyValue("--accent"),
  ]);
  expect(dotColor).not.toBe(accent);
  const accentRgb = await page.evaluate(() => {
    const probe = document.createElement("i");
    probe.style.color = "var(--accent)";
    document.body.append(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    return c;
  });
  expect(dotColor).not.toBe(accentRgb);
});

/* ── Polish ─────────────────────────────────────────────────────────────── */

test("keyboard focus shows one consistent 2px accent ring", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");
  await page.keyboard.press("Tab"); // skip link
  await page.keyboard.press("Tab"); // header name link
  const ring = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const s = getComputedStyle(el);
    const probe = document.createElement("i");
    probe.style.color = "var(--ring)";
    document.body.append(probe);
    const ringColor = getComputedStyle(probe).color;
    probe.remove();
    return { style: s.outlineStyle, width: parseFloat(s.outlineWidth), match: s.outlineColor === ringColor };
  });
  expect(ring).toEqual({ style: "solid", width: 2, match: true });
});

test("text selection and scrollbars are themed, not browser defaults", async ({ page }) => {
  await page.goto("/about");
  const surfaces = await page.evaluate(() => ({
    selection: getComputedStyle(document.querySelector("main p")!, "::selection").backgroundColor,
    scrollbar: getComputedStyle(document.documentElement).scrollbarColor,
  }));
  expect(surfaces.selection).not.toBe("rgba(0, 0, 0, 0)");
  expect(surfaces.scrollbar).not.toBe("auto");
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("opens quickly (≤ 200ms) and closes when the page changes via Back", async ({ page }) => {
    await page.goto("/");
    await page.goto("/experience");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const longest = await dialog.evaluate((el) =>
      Math.max(0, ...el.getAnimations().map((a) => Number(a.effect?.getComputedTiming().duration) || 0)),
    );
    expect(longest).toBeLessThanOrEqual(200);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(dialog).toBeHidden();
  });
});

test("the same certification keeps one transition identity on home and /certifications", async ({ page }) => {
  const names = async () =>
    page.locator("[data-cert-vt]").evaluateAll((els) =>
      Object.fromEntries(els.map((el) => [el.getAttribute("data-cert-vt"), getComputedStyle(el).viewTransitionName])),
    );
  await page.goto("/");
  const home = await names();
  await page.goto("/certifications");
  const certs = await names();
  expect(Object.keys(home).length).toBeGreaterThan(0);
  for (const [cert, name] of Object.entries(home)) {
    expect(name, cert).not.toBe("none");
    expect(certs[cert], cert).toBe(name);
  }
  expect(new Set(Object.values(certs)).size).toBe(Object.values(certs).length); // unique on the page
});

test("the current role keeps one transition identity on home and /experience", async ({ page }) => {
  await page.goto("/");
  const home = await page.locator("[data-now-role]").evaluate((el) => getComputedStyle(el).viewTransitionName);
  await page.goto("/experience");
  const timeline = await page.locator("[data-role-current]").evaluate((el) => getComputedStyle(el).viewTransitionName);
  expect(home).not.toBe("none");
  expect(timeline).toBe(home);
});

test("the 404 page does not claim a canonical URL", async ({ page }) => {
  await page.goto("/nope");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test("the cube poster's optimised image URL actually loads", async ({ page, request }) => {
  await page.goto("/");
  const url = await page
    .locator("[data-cube-poster]")
    .evaluate((el) => getComputedStyle(el).backgroundImage.match(/url\("?(.*?)"?\)/)?.[1] ?? "");
  expect(url).toContain("cube-poster.png");
  const res = await request.get(url, { headers: { Accept: "image/avif,image/webp,image/*" } });
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toMatch(/^image\//);
});
