import fs from "node:fs";
import { expect, test, vi } from "vitest";
import { getCvHref } from "@/lib/cv";

test("getCvHref returns null when the PDF is absent", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getCvHref()).toBeNull();
});

test("getCvHref returns the public path when the PDF exists", () => {
  const spy = vi.spyOn(fs, "existsSync").mockReturnValue(true);
  expect(getCvHref()).toBe("/cv/udesh-bandara-cv.pdf");
  expect(String(spy.mock.calls[0][0]).replace(/\\/g, "/")).toMatch(/public\/cv\/udesh-bandara-cv\.pdf$/);
});
