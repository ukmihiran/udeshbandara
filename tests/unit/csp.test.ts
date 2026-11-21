import { describe, expect, test } from "vitest";
import { buildCsp } from "@/lib/csp";

const directives = (csp: string) =>
  Object.fromEntries(
    csp
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const [name, ...values] = d.split(/\s+/);
        return [name, values];
      }),
  );

describe("buildCsp (production, no GA)", () => {
  const prod = buildCsp({ dev: false, gaEnabled: false });
  const d = directives(prod);

  test("has a strict baseline", () => {
    expect(d["default-src"]).toEqual(["'self'"]);
    expect(d["object-src"]).toEqual(["'none'"]);
    expect(d["base-uri"]).toEqual(["'self'"]);
    expect(d["frame-ancestors"]).toEqual(["'none'"]);
    expect(d["form-action"]).toEqual(["'self'"]);
    expect(d["upgrade-insecure-requests"]).toEqual([]);
  });

  test("never allows eval or third-party script hosts", () => {
    expect(prod).not.toContain("unsafe-eval");
    expect(prod).not.toContain("googletagmanager");
    expect(d["script-src"]).toEqual(["'self'", "'unsafe-inline'"]);
  });

  test("connect-src stays same-origin (Vercel Analytics posts to /_vercel)", () => {
    expect(d["connect-src"]).toEqual(["'self'"]);
  });
});

test("dev adds unsafe-eval and websocket HMR, drops upgrade-insecure-requests", () => {
  const d = directives(buildCsp({ dev: true, gaEnabled: false }));
  expect(d["script-src"]).toContain("'unsafe-eval'");
  expect(d["connect-src"]).toContain("ws:");
  expect(d["upgrade-insecure-requests"]).toBeUndefined();
});

test("Vercel's debug analytics host is allowed in dev only", () => {
  expect(directives(buildCsp({ dev: true, gaEnabled: false }))["script-src"]).toContain("https://va.vercel-scripts.com");
  expect(buildCsp({ dev: false, gaEnabled: false })).not.toContain("vercel-scripts");
});

test("GA origins appear only when GA is enabled", () => {
  const d = directives(buildCsp({ dev: false, gaEnabled: true }));
  expect(d["script-src"]).toContain("https://www.googletagmanager.com");
  expect(d["connect-src"]).toEqual(
    expect.arrayContaining(["https://*.google-analytics.com", "https://*.analytics.google.com"]),
  );
  expect(d["img-src"]).toContain("https://*.google-analytics.com");
});
