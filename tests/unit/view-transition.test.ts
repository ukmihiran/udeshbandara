import { expect, test } from "vitest";
import { transitionName } from "@/lib/view-transition";

test("transition names are stable slugs of the entity", () => {
  expect(transitionName("cert", "AWS Solutions Architect")).toBe("cert-aws-solutions-architect");
  expect(transitionName("cert", "CREST CRT")).toBe("cert-crest-crt");
  expect(transitionName("role", "current")).toBe("role-current");
});

test("punctuation never produces leading, trailing or repeated dashes", () => {
  expect(transitionName("cert", "  C / C++ (Hons) ")).toBe("cert-c-c-hons");
});
