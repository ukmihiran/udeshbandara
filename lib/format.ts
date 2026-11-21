import { PROFILE } from "./data";
import type { Certification, Education, Experience, HeroStat, TimelineEntry, YearMonth } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatPoint(point: YearMonth): string {
  const [year, month] = point.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatPeriod(start: YearMonth, end?: YearMonth): string {
  return `${formatPoint(start)} — ${end ? formatPoint(end) : "Present"}`;
}

/** Months since year 0; a year-only value counts from January. */
function toMonthIndex(point: YearMonth): number {
  const [year, month = "1"] = point.split("-");
  return Number(year) * 12 + (Number(month) - 1);
}

export function totalExperienceMonths(experiences: Experience[], now: Date): number {
  const nowIndex = now.getUTCFullYear() * 12 + now.getUTCMonth();
  return experiences.reduce((sum, exp) => {
    const end = exp.end ? toMonthIndex(exp.end) : nowIndex;
    return sum + Math.max(0, end - toMonthIndex(exp.start));
  }, 0);
}

export function getHeroStats(experiences: Experience[], certifications: Certification[], now: Date): HeroStat[] {
  const years = Math.floor(totalExperienceMonths(experiences, now) / 12);
  return [
    { value: `${years}+`, label: "Years experience" },
    { value: String(certifications.length), label: "Certifications" },
    { value: PROFILE.engagements, label: "Engagements" },
    { value: PROFILE.based, label: "Based" },
  ];
}

const OPEN_END = "9999";

export function buildTimeline(experiences: Experience[], education: Education[]): TimelineEntry[] {
  const work: TimelineEntry[] = experiences.map((e) => ({
    kind: "work",
    title: e.role,
    org: e.company,
    location: e.location,
    start: e.start,
    end: e.end,
    current: !e.end,
    description: e.description,
    badge: e.type,
    image: e.image,
    logoScale: e.logoScale,
  }));
  const study: TimelineEntry[] = education.map((e) => ({
    kind: "education",
    title: e.degree,
    org: e.school,
    location: e.location,
    start: e.start,
    end: e.end,
    current: false,
    badge: "Education",
    image: e.image,
    logoScale: e.logoScale,
  }));
  return [...work, ...study].sort(
    (a, b) => (b.end ?? OPEN_END).localeCompare(a.end ?? OPEN_END) || b.start.localeCompare(a.start),
  );
}
