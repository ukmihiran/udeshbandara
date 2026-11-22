import { describe, expect, test } from "vitest";
import { resolveGaId } from "@/lib/analytics";

describe("resolveGaId", () => {
  test("an explicit NEXT_PUBLIC_GA_ID always wins", () => {
    expect(resolveGaId({ NEXT_PUBLIC_GA_ID: "G-TEST123", VERCEL_ENV: "preview" })).toBe("G-TEST123");
  });

  test("Vercel production falls back to the site's existing GA property", () => {
    expect(resolveGaId({ VERCEL_ENV: "production" })).toBe("G-D2BNKKLPJV");
  });

  test("previews, local builds and tests load no analytics", () => {
    expect(resolveGaId({ VERCEL_ENV: "preview" })).toBe("");
    expect(resolveGaId({})).toBe("");
  });

  test("a malformed ID is ignored rather than injected into a script URL", () => {
    expect(resolveGaId({ NEXT_PUBLIC_GA_ID: "G-1'); alert(1)//" })).toBe("");
  });
});
