import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";
import { REPO_TITLES } from "@/lib/data";
import { SITE } from "@/lib/site";
import type { Repository } from "@/lib/types";

/** Below this, a star or fork count reads as a weak signal rather than proof, so it is not shown. */
const MIN_SHOWN_COUNT = 5;

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
      <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-border-strong bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body text-foreground-secondary">Repositories couldn&apos;t be loaded right now.</p>
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-body text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-100 hover:decoration-foreground"
        >
          <Github aria-hidden className="size-4" />
          Browse my repositories on GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
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
            className="card-link group flex h-full flex-col panel rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <Heading className="min-w-0 text-title font-semibold [overflow-wrap:anywhere]">
                {REPO_TITLES[repo.name] ?? repo.name}
              </Heading>
              <ArrowUpRight
                aria-hidden
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-[color,transform] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </div>
            <p className="mt-2 line-clamp-3 flex-grow text-caption text-foreground-secondary">
              {repo.description || "No description."}
            </p>
            <div className="mt-6 flex items-center gap-4 text-caption text-muted-foreground tabular-nums">
              {repo.language && (
                <span className="inline-flex items-center gap-2">
                  <span data-lang-dot aria-hidden className="size-2 rounded-full bg-muted-foreground/60" />
                  {repo.language}
                </span>
              )}
              {repo.stars >= MIN_SHOWN_COUNT && (
                <span className="inline-flex items-center gap-1">
                  <Star aria-hidden className="size-3" /> {repo.stars}
                  <span className="sr-only"> stars</span>
                </span>
              )}
              {repo.forks >= MIN_SHOWN_COUNT && (
                <span className="inline-flex items-center gap-1">
                  <GitFork aria-hidden className="size-3" /> {repo.forks}
                  <span className="sr-only"> forks</span>
                </span>
              )}
            </div>
            <span className="sr-only"> (opens GitHub in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
