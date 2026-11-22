import { describe, expect, test } from "vitest";
import { PAGE_META, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const paths = Object.keys(PAGE_META) as (keyof typeof PAGE_META)[];
/** The title as Google sees it: subpages get the "| Udesh Bandara" template. */
const rendered = (p: keyof typeof PAGE_META) => (p === "/" ? PAGE_META[p].title : `${PAGE_META[p].title} | ${SITE.name}`);

describe("page metadata for search", () => {
  test.each(paths)("%s title fits a results page (≤ 60 characters)", (p) => {
    expect(rendered(p).length).toBeLessThanOrEqual(60);
    expect(rendered(p).length).toBeGreaterThanOrEqual(40);
  });

  test.each(paths)("%s description is 120–160 characters", (p) => {
    const { length } = PAGE_META[p].description;
    expect(length).toBeGreaterThanOrEqual(120);
    expect(length).toBeLessThanOrEqual(160);
  });

  test("titles and descriptions are unique", () => {
    expect(new Set(paths.map(rendered)).size).toBe(paths.length);
    expect(new Set(paths.map((p) => PAGE_META[p].description)).size).toBe(paths.length);
  });

  test("Open Graph declares the locale", () => {
    expect((pageMetadata("/about").openGraph as { locale?: string }).locale).toBe("en_GB");
  });
});

describe("Search Console verification", () => {
  test("is emitted only when the token is configured", async () => {
    const { verificationMetadata } = await import("@/lib/seo");
    expect(verificationMetadata({})).toBeUndefined();
    expect(verificationMetadata({ GOOGLE_SITE_VERIFICATION: "abc_123-XYZ" })).toEqual({ google: "abc_123-XYZ" });
    expect(verificationMetadata({ GOOGLE_SITE_VERIFICATION: '"><script>' })).toBeUndefined();
  });
});
