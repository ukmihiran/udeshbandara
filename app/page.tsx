import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { LatestPosts } from "@/components/sections/latest-posts";
import { ProjectGrid } from "@/components/sections/projects";
import { getLatestPosts } from "@/lib/blog";
import { CERTIFICATIONS, EXPERIENCES } from "@/lib/data";
import { formatPeriod } from "@/lib/format";
import { getFeaturedRepos } from "@/lib/github";
import { transitionStyle } from "@/lib/view-transition";

export const metadata = pageMetadata("/");

export const revalidate = 3600;

const sectionLink =
  "inline-flex min-h-11 items-center gap-1 text-caption text-muted-foreground transition-colors duration-100 hover:text-foreground";
const card = "card-link flex h-full flex-col rounded-xl border border-border bg-card p-5";

export default async function HomePage() {
  const [{ repos, error }, posts] = await Promise.all([getFeaturedRepos(3), getLatestPosts(3)]);
  const current = EXPERIENCES.find((e) => !e.end) ?? EXPERIENCES[0];
  const featuredCerts = CERTIFICATIONS.filter((c) => c.featured);

  return (
    <>
      <Hero />

      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-10 sm:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/experience" className={`${card} group`}>
            <h2 data-now-role style={transitionStyle("role", "current")} className="font-semibold text-foreground [overflow-wrap:anywhere]">
              {current.role}
            </h2>
            <span className="text-caption text-muted-foreground">
              {current.company} · {formatPeriod(current.start, current.end)}
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-caption text-muted-foreground transition-colors duration-100 group-hover:text-foreground">
              Full experience <ArrowRight aria-hidden className="size-3.5" />
            </span>
          </Link>
          <Link href="/certifications" className={`${card} group`}>
            <h2 className="font-semibold text-foreground">Key certifications</h2>
            <span className="mt-3 flex flex-wrap gap-2">
              {featuredCerts.map((c) => (
                <span
                  key={c.name}
                  data-cert-vt={c.name}
                  style={transitionStyle("cert", c.name)}
                  className="rounded-md border border-border px-3 py-1 text-caption text-foreground"
                >
                  {c.name}
                </span>
              ))}
            </span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-caption text-muted-foreground transition-colors duration-100 group-hover:text-foreground">
              All {CERTIFICATIONS.length} certifications <ArrowRight aria-hidden className="size-3.5" />
            </span>
          </Link>
        </div>

        <section aria-labelledby="featured-projects" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 id="featured-projects" className="font-display text-section font-medium">
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
