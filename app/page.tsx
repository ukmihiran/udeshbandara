import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { LatestPosts } from "@/components/sections/latest-posts";
import { OrgLogo } from "@/components/sections/org-logo";
import { Period } from "@/components/sections/period";
import { ProjectGrid } from "@/components/sections/projects";
import { SectionHeading } from "@/components/sections/section-heading";
import { sectionLink } from "@/components/ui/button-styles";
import { getLatestPosts } from "@/lib/blog";
import { CERTIFICATIONS, EXPERIENCES } from "@/lib/data";
import { getFeaturedRepos } from "@/lib/github";
import { transitionStyle } from "@/lib/view-transition";

export const metadata = pageMetadata("/");

export const revalidate = 3600;

/** Summary panels: static containers (not one giant link); the footer link is the action. */
const panel = "panel flex h-full flex-col rounded-xl border border-border bg-card p-6";
const panelLink =
  "mt-auto inline-flex min-h-11 items-center gap-1 self-start pt-4 text-caption text-muted-foreground transition-colors duration-100 hover:text-foreground";

export default async function HomePage() {
  const [{ repos, error }, posts] = await Promise.all([getFeaturedRepos(3), getLatestPosts(3)]);

  return (
    <>
      <Hero />

      <div className="mx-auto w-full max-w-6xl space-y-20 px-4 pb-20 pt-12 sm:px-6 md:space-y-24 md:pt-16">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <section aria-labelledby="career" className={panel}>
            <h2 id="career" className="text-title font-semibold text-foreground">
              Career
            </h2>
            <p className="text-caption text-foreground-secondary">Consulting and in-house security, most recent first.</p>
            <ol className="mt-5 space-y-3">
              {EXPERIENCES.map((exp) => (
                <li
                  key={`${exp.company}-${exp.start}`}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-3 sm:grid-cols-[auto_1fr_auto]"
                >
                  <OrgLogo
                    src={exp.image}
                    alt={exp.company}
                    scale={exp.logoScale}
                    wide
                    className="row-span-2 h-8 w-12 sm:row-span-1"
                  />
                  <div className="min-w-0">
                    <p
                      {...(!exp.end ? { "data-now-role": true, style: transitionStyle("role", "current") } : {})}
                      className="text-body font-medium text-foreground [overflow-wrap:anywhere]"
                    >
                      {exp.role}
                    </p>
                    <p className="text-caption text-foreground-secondary">{exp.company}</p>
                  </div>
                  <Period
                    start={exp.start}
                    end={exp.end}
                    className="col-start-2 text-caption text-muted-foreground sm:col-start-3 sm:pt-0.5 sm:text-right"
                  />
                </li>
              ))}
            </ol>
            <Link href="/experience" className={panelLink}>
              Full experience <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </section>

          <section aria-labelledby="certs" className={panel}>
            <h2 id="certs" className="text-title font-semibold text-foreground">
              Certifications
            </h2>
            <p className="text-caption text-foreground-secondary">Offensive security and cloud, each earned by exam.</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {CERTIFICATIONS.map((c) => (
                <li key={c.name} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className={`mt-2 size-1.5 shrink-0 rounded-full ${c.featured ? "bg-accent" : "bg-border-strong"}`}
                  />
                  <div className="min-w-0">
                    <p
                      data-cert-vt={c.name}
                      style={transitionStyle("cert", c.name)}
                      className="text-body font-medium text-foreground"
                    >
                      {c.name}
                    </p>
                    <p className="text-caption text-muted-foreground">
                      {c.issuer} · <span className="font-mono tabular-nums">{c.year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/certifications" className={panelLink}>
              All certifications <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </section>
        </div>

        <section aria-labelledby="featured-projects" className="space-y-6">
          <SectionHeading
            id="featured-projects"
            title="Selected projects"
            description="Open-source offensive tooling from GitHub."
            action={
              <Link href="/projects" className={sectionLink}>
                All projects <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            }
          />
          <ProjectGrid repos={repos} error={error} limit={3} headingLevel={3} />
        </section>

        <LatestPosts posts={posts} />

        <ContactCta />
      </div>
    </>
  );
}
