import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Award, Briefcase } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { LatestPosts } from "@/components/sections/latest-posts";
import { ProjectGrid } from "@/components/sections/projects";
import { getLatestPosts } from "@/lib/blog";
import { CERTIFICATIONS, EXPERIENCES } from "@/lib/data";
import { formatPeriod } from "@/lib/format";
import { getFeaturedRepos } from "@/lib/github";

export const metadata = pageMetadata("/");

export const revalidate = 3600;

const sectionLink =
  "inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent";
const card = "card-glow flex h-full flex-col rounded-xl border border-border/40 bg-card p-5";

export default async function HomePage() {
  const [{ repos, error }, posts] = await Promise.all([getFeaturedRepos(3), getLatestPosts(3)]);
  const current = EXPERIENCES.find((e) => !e.end) ?? EXPERIENCES[0];
  const featuredCerts = CERTIFICATIONS.filter((c) => c.featured);

  return (
    <>
      <Hero />

      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-10 sm:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          <Link href="/experience" className={`${card} group`}>
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Briefcase aria-hidden className="size-4 text-accent" /> Now
            </span>
            <span className="mt-3 font-semibold text-foreground">{current.role}</span>
            <span className="text-sm text-muted-foreground">
              {current.company} · {formatPeriod(current.start, current.end)}
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-muted-foreground transition-colors group-hover:text-accent">
              Full experience <ArrowRight aria-hidden className="size-3.5" />
            </span>
          </Link>
          <Link href="/certifications" className={`${card} group`}>
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Award aria-hidden className="size-4 text-accent" /> Key certifications
            </span>
            <span className="mt-3 flex flex-wrap gap-2">
              {featuredCerts.map((c) => (
                <span key={c.name} className="rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1 text-sm font-medium text-accent">
                  {c.name}
                </span>
              ))}
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-muted-foreground transition-colors group-hover:text-accent">
              All {CERTIFICATIONS.length} certifications <ArrowRight aria-hidden className="size-3.5" />
            </span>
          </Link>
        </div>

        <section aria-labelledby="featured-projects" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 id="featured-projects" className="text-sm font-semibold uppercase tracking-wider">
              Featured projects
            </h2>
            <Link href="/projects" className={sectionLink}>
              All projects <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>
          <ProjectGrid repos={repos} error={error} limit={3} headingLevel={3} />
        </section>

        <LatestPosts posts={posts} />
      </div>
    </>
  );
}
