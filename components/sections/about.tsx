import { EDUCATION, EXPERIENCES, TECH_STACK } from "@/lib/data";
import { formatPeriod, yearsOfExperience } from "@/lib/format";
import { SITE } from "@/lib/site";
import type { TechItem } from "@/lib/types";
import { OrgLogo } from "./org-logo";

const CATEGORIES: { id: TechItem["category"]; label: string }[] = [
  { id: "security", label: "Security tools" },
  { id: "languages", label: "Languages" },
  { id: "cloud", label: "Cloud & infrastructure" },
];

const sectionHeading = "font-display text-section font-medium";

/** About as plain sections separated by space and a hairline, not a grid of boxes. */
export function About() {
  return (
    <div className="divide-y divide-border">
      <section aria-labelledby="bio" className="pb-12">
        <h2 id="bio" className={sectionHeading}>
          Who I am
        </h2>
        <div className="mt-4 max-w-[65ch] space-y-4 text-body text-foreground-secondary">
          <p>
            Dedicated <span className="text-foreground">Cyber Security Professional</span> with{" "}
            {yearsOfExperience(EXPERIENCES, new Date())} years of experience in Penetration Testing, Red Teaming,
            Vulnerability Management, and Cloud Security.
          </p>
          <p>
            Currently an <span className="text-foreground">Offensive Security Consultant</span> at{" "}
            <span className="text-foreground">Kroll UK</span>, specializing in advanced security assessments and red
            team operations for global enterprises.
          </p>
          <p>
            I write about cybersecurity research and best practices on{" "}
            <a
              href={SITE.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              Cybernetgen
            </a>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="education" className="py-12">
        <h2 id="education" className={sectionHeading}>
          Education
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {EDUCATION.map((edu) => (
            <li key={edu.degree} className="flex items-start gap-4">
              <OrgLogo src={edu.image} alt={edu.school} scale={edu.logoScale} />
              <div className="min-w-0">
                <p className="text-body font-semibold text-foreground">{edu.degree}</p>
                <p className="text-caption text-foreground-secondary">{edu.school}</p>
                <p className="mt-1 font-mono text-caption text-muted-foreground tabular-nums">
                  {formatPeriod(edu.start, edu.end)} · {edu.location}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tools" className="pt-12">
        <h2 id="tools" className={sectionHeading}>
          Tools &amp; technologies
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-body font-semibold text-foreground">{cat.label}</h3>
              <ul className="mt-2 space-y-1 text-body text-foreground-secondary">
                {TECH_STACK.filter((t) => t.category === cat.id).map((t) => (
                  <li key={t.name} data-tech>
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
