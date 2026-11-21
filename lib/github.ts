import { FEATURED_REPOS } from "./data";
import { SITE } from "./site";
import type { Repository } from "./types";

/** Only the fields we read from GET /users/{user}/repos. */
export interface GitHubRepoApi {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

/** Repos that are never worth featuring: the profile README repo and this site. */
const ALWAYS_EXCLUDED = new Set(["udeshbandara"]);

function toRepository(r: GitHubRepoApi): Repository {
  return {
    id: r.id,
    name: r.name,
    url: r.html_url,
    description: r.description,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    pushedAt: r.pushed_at,
  };
}

export function selectFeaturedRepos(
  raw: GitHubRepoApi[],
  opts: { username: string; pinned: string[]; limit: number },
): Repository[] {
  const eligible = raw.filter(
    (r) => !r.fork && !r.archived && r.name !== opts.username && !ALWAYS_EXCLUDED.has(r.name),
  );
  const byName = new Map(eligible.map((r) => [r.name, r]));
  const pinned = opts.pinned.flatMap((name) => byName.get(name) ?? []);
  const pinnedNames = new Set(pinned.map((r) => r.name));
  const rest = eligible
    .filter((r) => !pinnedNames.has(r.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at));
  return [...pinned, ...rest].slice(0, opts.limit).map(toRepository);
}

export async function getFeaturedRepos(limit = 6): Promise<{ repos: Repository[]; error: boolean }> {
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=pushed`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error("GitHub API returned a non-array body");
    return {
      repos: selectFeaturedRepos(data as GitHubRepoApi[], {
        username: SITE.githubUser,
        pinned: FEATURED_REPOS,
        limit,
      }),
      error: false,
    };
  } catch (err) {
    console.error("[github] could not load repositories:", err instanceof Error ? err.message : err);
    return { repos: [], error: true };
  }
}
