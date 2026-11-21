import { Award, Clock, Crosshair, Download, Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";
import { getCvHref } from "@/lib/cv";
import { CERTIFICATIONS, EXPERIENCES, PROFILE } from "@/lib/data";
import { getHeroStats } from "@/lib/format";
import { SITE } from "@/lib/site";
import { HexAvatar } from "./hex-avatar";
import { TypewriterRole } from "./typewriter-role";

const STAT_ICONS: Record<string, LucideIcon> = {
  "Years experience": Clock,
  Certifications: Award,
  Engagements: Crosshair,
  Based: MapPin,
};

const primaryCta =
  "inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 font-semibold text-accent-foreground transition-colors hover:bg-accent/90";
const secondaryCta =
  "inline-flex min-h-11 items-center gap-2 rounded-xl border border-border/60 px-5 font-medium transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent";

export function Hero() {
  const stats = getHeroStats(EXPERIENCES, CERTIFICATIONS, new Date());
  const cvHref = getCvHref();

  return (
    <section className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-2 px-4 pt-6 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:pt-10">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {PROFILE.status}
        </p>

        <h1 className="text-[clamp(2rem,1.4rem+3vw,3.5rem)] font-bold leading-[1.1] tracking-tight">{SITE.name}</h1>

        <p className="mt-2 min-h-7 text-base text-muted-foreground md:text-lg">
          <TypewriterRole roles={PROFILE.roles} />
        </p>

        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          {SITE.jobTitle} at <span className="font-medium text-accent">Kroll UK</span>, specializing in Penetration
          Testing, Red Teaming &amp; Cloud Security.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2.5 md:justify-start">
          <a href={`mailto:${SITE.email}`} className={primaryCta}>
            <Mail aria-hidden className="size-4" /> Get in Touch
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={secondaryCta}>
            <Linkedin aria-hidden className="size-4" /> LinkedIn
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {cvHref && (
            <a href={cvHref} download className={secondaryCta}>
              <Download aria-hidden className="size-4" /> Download CV
              <span className="sr-only">(PDF)</span>
            </a>
          )}
        </div>

        {/* 2×2 at every width: four columns can't fit "Years experience" on one line. */}
        <dl className="mt-6 grid w-full max-w-md grid-cols-2 gap-2.5">
          {stats.map((s) => {
            const Icon = STAT_ICONS[s.label] ?? Award;
            return (
              <div
                key={s.label}
                data-stat={s.label}
                className="card-glow flex flex-col items-center gap-1.5 rounded-xl border border-border/40 bg-card/60 p-3"
              >
                <Icon aria-hidden className="size-4 text-accent" />
                <dt className="order-last whitespace-nowrap text-[11px] font-medium uppercase leading-none tracking-wide text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="text-lg font-bold leading-none tracking-tight">{s.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="flex justify-center">
        <HexAvatar />
      </div>
    </section>
  );
}
