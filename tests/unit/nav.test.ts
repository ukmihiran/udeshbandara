import { expect, test } from "vitest";
import { isActivePath } from "@/lib/nav";

test("home is active only on the root path", () => {
  expect(isActivePath("/", "/")).toBe(true);
  expect(isActivePath("/about", "/")).toBe(false);
});

test("section matches itself and a trailing slash", () => {
  expect(isActivePath("/experience", "/experience")).toBe(true);
  expect(isActivePath("/experience/", "/experience")).toBe(true);
});

test("a path that merely starts with the same letters is not active", () => {
  expect(isActivePath("/experiences", "/experience")).toBe(false);
});
