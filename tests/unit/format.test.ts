import { describe, expect, test } from "vitest";
import { buildTimeline, formatPeriod, getHeroStats, totalExperienceMonths, yearsOfExperience } from "@/lib/format";
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from "@/lib/data";

const NOW = new Date("2026-11-21T00:00:00Z");

describe("formatPeriod", () => {
  test("open-ended month range reads Present", () => {
    expect(formatPeriod("2024-07")).toBe("Jul 2024 — Present");
  });
  test("closed month range", () => {
    expect(formatPeriod("2021-04", "2021-12")).toBe("Apr 2021 — Dec 2021");
  });
  test("year-only range", () => {
    expect(formatPeriod("2022", "2023")).toBe("2022 — 2023");
  });
});

describe("totalExperienceMonths", () => {
  test("sums work periods only (9 + 12 + 8 + 28)", () => {
    expect(totalExperienceMonths(EXPERIENCES, NOW)).toBe(57);
  });
});

describe("getHeroStats", () => {
  test("derives years and certification count from data", () => {
    expect(getHeroStats(EXPERIENCES, CERTIFICATIONS, NOW)).toEqual([
      { value: "4+", label: "Years experience" },
      { value: "8", label: "Certifications" },
      { value: "50+", label: "Engagements" },
      { value: "UK", label: "Based" },
    ]);
  });
});

describe("buildTimeline", () => {
  test("merges work and education newest-first", () => {
    const t = buildTimeline(EXPERIENCES, EDUCATION);
    expect(t.map((e) => e.org)).toEqual([
      "Kroll",
      "University of the West of England",
      "Axiata Digital Labs",
      "CryptoGen",
      "PwC Sri Lanka",
      "SLIIT",
    ]);
  });
  test("marks the open-ended role current and labels education", () => {
    const t = buildTimeline(EXPERIENCES, EDUCATION);
    expect(t[0]).toMatchObject({ kind: "work", current: true, badge: "Full-time" });
    expect(t[1]).toMatchObject({ kind: "education", badge: "Education", current: false });
  });
});

describe("yearsOfExperience (shared by hero and About)", () => {
  test("rolls over to 5+ once 60 months are reached", () => {
    expect(yearsOfExperience(EXPERIENCES, NOW)).toBe("4+");
    expect(yearsOfExperience(EXPERIENCES, new Date("2027-02-01T00:00:00Z"))).toBe("5+");
  });
});
