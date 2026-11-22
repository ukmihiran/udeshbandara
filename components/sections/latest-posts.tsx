import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import type { BlogPost } from "@/lib/types";
import { sectionLink } from "@/components/ui/button-styles";
import { SectionHeading } from "./section-heading";

const dateFormat = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/** "2020" or "2020–2021": the honest span of the posts shown, so older writing is not dressed as new. */
function yearSpan(posts: BlogPost[]): string {
  const years = posts.map((p) => new Date(p.publishedAt).getUTCFullYear());
  const [min, max] = [Math.min(...years), Math.max(...years)];
  return min === max ? `${min}` : `${min}–${max}`;
}

/** Writing as a dated list (title, date, one line), not another row of cards. */
export function LatestPosts({ posts, headingLevel = 2 }: { posts: BlogPost[]; headingLevel?: 2 | 3 }) {
  if (posts.length === 0) return null;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <section aria-labelledby="latest-writing" className="space-y-6">
      <SectionHeading
        id="latest-writing"
        as={Heading}
        title="Writing"
        description={`Write-ups on Cybernetgen, ${yearSpan(posts)}.`}
        action={
          <a href={SITE.blogUrl} target="_blank" rel="noopener noreferrer" className={sectionLink}>
            All posts <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        }
      />
      <ul className="divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <li key={post.url}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-x-8 gap-y-1 py-5 transition-colors duration-100 sm:grid-cols-[8rem_1fr_auto]"
            >
              <time
                dateTime={post.publishedAt}
                className="font-mono text-caption text-muted-foreground tabular-nums sm:pt-0.5"
              >
                {dateFormat.format(new Date(post.publishedAt))}
              </time>
              <span className="min-w-0">
                <span className="block text-title font-semibold text-foreground underline decoration-transparent underline-offset-4 transition-colors duration-100 group-hover:decoration-border-strong">
                  {post.title}
                </span>
                {post.excerpt && (
                  <span className="mt-1 line-clamp-2 text-caption text-foreground-secondary sm:line-clamp-1">{post.excerpt}</span>
                )}
              </span>
              <ArrowUpRight
                aria-hidden
                className="hidden size-4 text-muted-foreground transition-colors duration-100 group-hover:text-foreground sm:mt-1 sm:block"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
