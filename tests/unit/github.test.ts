import { describe, expect, test, vi } from "vitest";
import fixture from "./fixtures/github-repos.json";
import { getFeaturedRepos, selectFeaturedRepos, type GitHubRepoApi } from "@/lib/github";
import { REPO_DESCRIPTIONS } from "@/lib/data";

const raw = fixture as GitHubRepoApi[];
const base = { username: "ukmihiran", pinned: [] as string[] };

describe("selectFeaturedRepos", () => {
  test("pinned repos come first, in pinned order", () => {
    const r = selectFeaturedRepos(raw, { ...base, pinned: ["PDFUnlocker", "EnumLiveHost"], limit: 6 });
    expect(r.slice(0, 2).map((x) => x.name)).toEqual(["PDFUnlocker", "EnumLiveHost"]);
  });

  test("excludes forks, archived, the profile repo and this portfolio repo", () => {
    const names = selectFeaturedRepos(raw, { ...base, limit: 50 }).map((x) => x.name);
    expect(names).not.toContain("SharpCollection");
    expect(names).not.toContain("old-archived-tool");
    expect(names).not.toContain("ukmihiran");
    expect(names).not.toContain("udeshbandara");
  });

  test("a pinned name that is a fork or missing is skipped", () => {
    const r = selectFeaturedRepos(raw, { ...base, pinned: ["SharpCollection", "does-not-exist", "PDFUnlocker"], limit: 1 });
    expect(r.map((x) => x.name)).toEqual(["PDFUnlocker"]);
  });

  test("fills remaining slots by stars desc, then most recently pushed", () => {
    const r = selectFeaturedRepos(raw, { ...base, pinned: ["EnumLiveHost"], limit: 4 });
    expect(r.map((x) => x.name)).toEqual([
      "EnumLiveHost",
      "Garage-Management-System",
      "WifiPasswordViewer",
      "PDFUnlocker",
    ]);
  });

  test("maps to the public Repository shape only", () => {
    const [first] = selectFeaturedRepos(raw, { ...base, limit: 1 });
    expect(Object.keys(first).sort()).toEqual(
      ["description", "forks", "id", "language", "name", "pushedAt", "stars", "url"],
    );
  });
});

describe("getFeaturedRepos", () => {
  test("returns repos from the API, curated list first", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(raw)));
    const { repos, error } = await getFeaturedRepos(3);
    expect(error).toBe(false);
    expect(repos.map((r) => r.name)).toEqual(["BloodHound-Standalone", "EnumLiveHost", "SecurityTrails-Subdomain-Scanner"]);
  });

  test("returns an error flag on a 403 rate limit", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })));
    await expect(getFeaturedRepos()).resolves.toEqual({ repos: [], error: true });
  });

  test("returns an error flag when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    await expect(getFeaturedRepos()).resolves.toEqual({ repos: [], error: true });
  });

  test("returns an error flag when the body is not an array", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ message: "Not Found" })));
    await expect(getFeaturedRepos()).resolves.toEqual({ repos: [], error: true });
  });
});

describe("getFeaturedRepos hardening (final review)", () => {
  test("passes an AbortSignal so a hung API cannot stall the build", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json(raw));
    vi.stubGlobal("fetch", fetchMock);
    await getFeaturedRepos(1);
    expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  test("on the production server a failure throws so ISR keeps the last good page", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })));
    await expect(getFeaturedRepos()).rejects.toThrow();
  });

  test("during the production build a failure returns the error flag", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "phase-production-build");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })));
    await expect(getFeaturedRepos()).resolves.toEqual({ repos: [], error: true });
  });
});

describe("selectFeaturedRepos with undated repos (PR review)", () => {
  const repo = (name: string, pushed_at: string | null): GitHubRepoApi => ({
    id: name.length,
    name,
    html_url: `https://github.com/ukmihiran/${name}`,
    description: null,
    stargazers_count: 1,
    forks_count: 0,
    language: null,
    pushed_at,
    fork: false,
    archived: false,
  });

  test("a null pushed_at with equal stars sorts last instead of throwing", () => {
    const input = [repo("undated", null), repo("dated", "2026-01-01T00:00:00Z"), repo("undated2", null)];
    expect(() => selectFeaturedRepos(input, { ...base, limit: 3 })).not.toThrow();
    expect(selectFeaturedRepos(input, { ...base, limit: 3 })[0].name).toBe("dated");
  });
});

describe("edited repo descriptions (finish review)", () => {
  test("an edited description in REPO_DESCRIPTIONS replaces GitHub's", () => {
    const input = [{ ...raw.find((r) => r.name === "WifiPasswordViewer")! }];
    const [repo] = selectFeaturedRepos(input, { ...base, limit: 1 });
    expect(repo.description).toBe(REPO_DESCRIPTIONS.WifiPasswordViewer);
  });

  test("repos without an override keep GitHub's description", () => {
    const other = raw.find((r) => !(r.name in REPO_DESCRIPTIONS) && !r.fork && !r.archived && r.name !== "ukmihiran" && r.name !== "udeshbandara")!;
    const [repo] = selectFeaturedRepos([other], { ...base, limit: 1 });
    expect(repo.description).toBe(other.description);
  });
});
