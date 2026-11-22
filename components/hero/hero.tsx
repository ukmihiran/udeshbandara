import { ArrowUpRight, Download, Linkedin, Mail } from "lucide-react";
import { getCvHref } from "@/lib/cv";
import { CERTIFICATIONS, EXPERIENCES, PROFILE } from "@/lib/data";
import { yearsOfExperience } from "@/lib/format";
import { SITE } from "@/lib/site";
import { HeroCube } from "./cube";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button-styles";

export function Hero() {
  const cvHref = getCvHref();
  const current = EXPERIENCES.find((e) => !e.end) ?? EXPERIENCES[0];
  const years = yearsOfExperience(EXPERIENCES, new Date());
  const featured = CERTIFICATIONS.filter((c) => c.featured).map((c) => c.name);

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 pt-10 sm:px-6 md:pt-16 lg:min-h-[min(36rem,calc(100svh-3.5rem))] lg:grid-cols-12 lg:pt-8">
      <div className="lg:col-span-7">
        <h1 className="font-display text-display font-semibold">{SITE.name}</h1>
        {/* Kept short enough for one line in both Geist and its fallback at 360px+, so the font swap
            cannot re-wrap it and shift the page (CLS). The location lives in the footer and About. */}
        <p className="mt-5 text-title text-foreground">
          {SITE.jobTitle} at {current.company}
        </p>
        <p className="mt-2 max-w-[52ch] text-body text-foreground-secondary">
          Penetration testing, red teaming and cloud security assessments for enterprise clients, plus open-source
          tooling and research on the side.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${SITE.email}`} className={buttonPrimary}>
            <Mail aria-hidden className="size-4" /> Get in touch
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
            <Linkedin aria-hidden className="size-4" /> LinkedIn
            <ArrowUpRight aria-hidden className="size-3.5 text-muted-foreground" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {cvHref && (
            <a href={cvHref} download className={buttonSecondary}>
              <Download aria-hidden className="size-4" /> Download CV
              <span className="sr-only"> (PDF)</span>
            </a>
          )}
        </div>

        {/* Two short lines instead of one dotted string, so nothing wraps with a dangling separator. */}
        <div data-hero-meta className="mt-8 space-y-1.5 text-caption text-muted-foreground tabular-nums">
          <p className="flex flex-wrap items-center gap-x-2">
            <span className="inline-flex items-center gap-2 text-foreground-secondary">
              <span aria-hidden className="size-2 rounded-full bg-accent" />
              {PROFILE.status}
            </span>
            <span aria-hidden>·</span>
            <span>{years} years experience</span>
          </p>
          <p>{featured.join(" · ")}</p>
        </div>
      </div>

      {/* Decorative: shown from sm up. On phones the proof below takes the space instead. */}
      <div className="hidden justify-center sm:flex lg:col-span-5 lg:justify-end">
        <HeroCube />
      </div>
    </section>
  );
}
