import { Download, Linkedin, Mail } from "lucide-react";
import { getCvHref } from "@/lib/cv";
import { CERTIFICATIONS, EXPERIENCES, PROFILE } from "@/lib/data";
import { yearsOfExperience } from "@/lib/format";
import { SITE } from "@/lib/site";
import { ProfilePhoto } from "./profile-photo";

const primaryCta =
  "inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-5 font-semibold text-accent-foreground transition-colors duration-100 hover:bg-accent/90";
const secondaryCta =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-5 font-medium transition-colors duration-100 hover:border-foreground/30";

export function Hero() {
  const cvHref = getCvHref();
  const meta = [
    `${yearsOfExperience(EXPERIENCES, new Date())} years experience`,
    ...CERTIFICATIONS.filter((c) => c.featured).map((c) => c.name),
    PROFILE.status,
  ];

  return (
    <section className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-8 px-4 pt-8 sm:px-6 md:grid-cols-[1fr_auto] md:gap-12 md:pt-16">
      <div>
        <h1 className="flex items-center gap-4 text-[clamp(2rem,1.4rem+3vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
          <ProfilePhoto decorative sizes="64px" className="size-16 md:hidden" />
          {SITE.name}
        </h1>
        <p className="mt-3 text-lg text-foreground">{SITE.jobTitle} at Kroll UK.</p>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
          Penetration testing, red teaming and cloud security assessments for enterprise clients.
        </p>
        <p data-hero-meta className="mt-4 text-sm text-muted-foreground tabular-nums">
          {meta.join(" · ")}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <a href={`mailto:${SITE.email}`} className={primaryCta}>
            <Mail aria-hidden className="size-4" /> Get in touch
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={secondaryCta}>
            <Linkedin aria-hidden className="size-4" /> LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {cvHref && (
            <a href={cvHref} download className={secondaryCta}>
              <Download aria-hidden className="size-4" /> Download CV
              <span className="sr-only"> (PDF)</span>
            </a>
          )}
        </div>
      </div>

      <ProfilePhoto sizes="240px" className="hidden size-60 md:block" />
    </section>
  );
}
