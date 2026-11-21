import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import type { BlogPost } from "@/lib/types";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function LatestPosts({ posts, headingLevel = 2 }: { posts: BlogPost[]; headingLevel?: 2 | 3 }) {
  if (posts.length === 0) return null;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <section aria-labelledby="latest-writing" className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Heading id="latest-writing" className="text-lg font-semibold tracking-tight">
          From the blog
        </Heading>
        <a
          href={SITE.blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground"
        >
          All posts on Cybernetgen <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.url}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link group flex h-full flex-col rounded-xl border border-border bg-card p-5"
            >
              <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                {dateFormat.format(new Date(post.publishedAt))}
              </time>
              <span className="mt-1.5 font-semibold leading-snug break-words transition-colors duration-100 group-hover:text-accent">
                {post.title}
              </span>
              {post.excerpt && (
                <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
