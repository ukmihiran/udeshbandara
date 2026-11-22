import { Cloud, Crosshair, FlaskConical, Github, Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";
import { EDUCATION, EXPERIENCES, PROFILE, TECH_STACK } from "@/lib/data";
import { yearsOfExperience } from "@/lib/format";
import { SITE } from "@/lib/site";
import type { TechItem } from "@/lib/types";
import { ProfilePhoto } from "@/components/hero/profile-photo";
import { Tag } from "@/components/ui/tag";
import { OrgLogo } from "./org-logo";
import { Period } from "./period";

const CATEGORIES: { id: TechItem["category"]; label: string }[] = [
  { id: "security", label: "Offensive tooling" },
  { id: "languages", label: "Languages" },
  { id: "cloud", label: "Cloud & platforms" },
];

const FOCUS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Crosshair,
    title: "Penetration testing & red teaming",
    body: "Infrastructure, web and Active Directory testing, and goal-based red team operations for enterprise clients.",
  },
  {
    icon: Cloud,
    title: "Cloud security",
    body: "AWS and Azure security assessments: identity, configuration and attack paths across cloud estates.",
  },
  {
    icon: FlaskConical,
    title: "Research & tooling",
    body: "Open-source tools on GitHub and write-ups on Cybernetgen, from AD enumeration to DGA detection.",
  },
];

const sectionHeading = "font-display text-section font-semibold";
const contactLink =
  "flex min-h-11 items-center gap-3 rounded-lg px-3 text-caption text-foreground-secondary transition-colors duration-100 hover:bg-surface-2 hover:text-foreground";

/** Profile panel on the left (sticky on desktop), the story and the toolkit on the right. */
export function About() {
  const current = EXPERIENCES.find((e) => !e.end) ?? EXPERIENCES[0];
  const years = yearsOfExperience(EXPERIENCES, new Date());

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      <aside aria-label="Profile" className="lg:col-span-4">
        <div className="lg:sticky lg:top-24">
          <ProfilePhoto sizes="112px" className="size-28" />
          <p className="mt-5 text-title font-semibold text-foreground">{SITE.name}</p>
          <p className="text-body text-foreground-secondary">
            {current.role}, {current.company}
          </p>
          <p className="mt-3 flex items-center gap-2 text-caption text-muted-foreground">
            <MapPin aria-hidden className="size-4" /> {current.location}
          </p>
          <p className="mt-1 flex items-center gap-2 text-caption text-muted-foreground">
            <span aria-hidden className="mx-1 size-2 rounded-full bg-accent" /> {PROFILE.status}
          </p>
          <ul className="-mx-3 mt-6 border-t border-border pt-4">
            <li>
              <a href={`mailto:${SITE.email}`} className={contactLink}>
                <Mail aria-hidden className="size-4" /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={contactLink}>
                <Linkedin aria-hidden className="size-4" /> LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className={contactLink}>
                <Github aria-hidden className="size-4" /> GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="min-w-0 space-y-16 lg:col-span-8">
        <section aria-labelledby="bio">
          <h2 id="bio" className={sectionHeading}>
            Who I am
          </h2>
          <div className="mt-4 max-w-[65ch] space-y-4 text-body text-foreground-secondary">
            <p className="text-title text-foreground">
              I&apos;m a cyber security professional with {years} years of experience in penetration testing, red
              teaming, vulnerability management and cloud security.
            </p>
            <p>
              Currently an <span className="text-foreground">Offensive Security Consultant</span> at{" "}
              <span className="text-foreground">Kroll UK</span>, specializing in advanced security assessments and
              red team operations for global enterprises.
            </p>
            <p>
              I write about cybersecurity research and best practices on{" "}
              <a
                href={SITE.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-accent/50 underline-offset-4 transition-colors duration-100 hover:decoration-accent"
              >
                Cybernetgen
              </a>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="focus">
          <h2 id="focus" className={sectionHeading}>
            What I focus on
          </h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {FOCUS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="grid grid-cols-[auto_1fr] gap-x-4 py-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-surface-2 text-foreground">
                  <Icon aria-hidden className="size-[18px]" />
                </span>
                <div className="pt-2">
                  <h3 className="text-body font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 max-w-[60ch] text-body text-foreground-secondary">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tools">
          <h2 id="tools" className={sectionHeading}>
            Toolkit
          </h2>
          <dl className="mt-6 space-y-5">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="pt-1.5 text-caption text-muted-foreground">{cat.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {TECH_STACK.filter((t) => t.category === cat.id).map((t) => (
                      <Tag key={t.name} data-tech>
                        {t.name}
                      </Tag>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="education">
          <h2 id="education" className={sectionHeading}>
            Education
          </h2>
          <ul className="mt-6 space-y-6">
            {EDUCATION.map((edu) => (
              <li key={edu.degree} className="flex items-start gap-4">
                <OrgLogo src={edu.image} alt={edu.school} scale={edu.logoScale} />
                <div className="min-w-0 flex-1">
                  <p className="text-body font-semibold text-foreground [text-wrap:balance]">{edu.degree}</p>
                  <p className="text-caption text-foreground-secondary">
                    {edu.school} · {edu.location}
                  </p>
                </div>
                <Period start={edu.start} end={edu.end} className="shrink-0 text-caption text-muted-foreground" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
