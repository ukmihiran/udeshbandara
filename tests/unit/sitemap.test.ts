import { expect, test } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

test("sitemap lists every route with absolute URLs", () => {
  expect(sitemap().map((e) => e.url)).toEqual(
    ["", "/about", "/experience", "/certifications", "/projects"].map((p) => `https://udeshbandara.com${p}`),
  );
});

test("robots points at the sitemap", () => {
  expect(robots().sitemap).toBe("https://udeshbandara.com/sitemap.xml");
});

test("every sitemap entry carries a lastModified date", () => {
  for (const entry of sitemap()) {
    expect(entry.lastModified, entry.url).toBeInstanceOf(Date);
  }
});
