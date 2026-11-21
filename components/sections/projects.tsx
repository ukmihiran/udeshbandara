import { ExternalLink, GitFork, Github, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import type { Repository } from "@/lib/types";

export function ProjectGrid({
  repos,
  error,
  limit,
  headingLevel = 2,
}: {
  repos: Repository[];
  error: boolean;
  limit?: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const shown = limit ? repos.slice(0, limit) : repos;

  if (error || shown.length === 0) {
    return (
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link flex min-h-24 items-center justify-center gap-3 rounded-xl border border-dashed border-border/60 bg-card/50 p-6 text-[15px] text-muted-foreground transition-colors duration-100 hover:text-foreground"
      >
        <Github aria-hidden className="size-5" />
        Browse my repositories on GitHub
      </a>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((repo) => (
        <li
          key={repo.id}
          className="sm:[&:nth-child(odd):last-child]:col-span-2 lg:[&:nth-child(odd):last-child]:col-span-1"
        >
          <a
            data-repo
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link group flex h-full flex-col rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start gap-2">
              <Heading className="min-w-0 text-sm font-semibold [overflow-wrap:anywhere] transition-colors group-hover:text-accent">
                {repo.name}
              </Heading>
              <ExternalLink
                aria-hidden
                className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </div>
            <p className="mt-2.5 line-clamp-3 flex-grow text-sm leading-relaxed text-muted-foreground">
              {repo.description || "No description."}
            </p>
            <div className="mt-3.5 flex items-center gap-3 border-t border-border/40 pt-3.5 text-xs text-muted-foreground">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="size-2 rounded-full bg-accent" />
                  {repo.language}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Star aria-hidden className="size-3" /> {repo.stars}
                <span className="sr-only"> stars</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork aria-hidden className="size-3" /> {repo.forks}
                <span className="sr-only"> forks</span>
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
