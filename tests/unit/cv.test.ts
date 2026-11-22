import { expect, test, vi } from "vitest";
import { getCvHref } from "@/lib/cv";

// The flag is resolved at build time in next.config.ts (public/ is not traced into
// Vercel functions, so a runtime fs check would hide the button after revalidation).
test("getCvHref returns null when the build found no PDF", () => {
  vi.stubEnv("CV_AVAILABLE", "");
  expect(getCvHref()).toBeNull();
});

test("getCvHref returns the public path when the build found the PDF", () => {
  vi.stubEnv("CV_AVAILABLE", "1");
  expect(getCvHref()).toBe("/cv/udesh-bandara-cv.pdf");
});
