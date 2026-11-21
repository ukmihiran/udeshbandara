import { describe, expect, test, vi } from "vitest";
import fixture from "./fixtures/github-repos.json";
import { getFeaturedRepos, selectFeaturedRepos, type GitHubRepoApi } from "@/lib/github";

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
    expect(repos.map((r) => r.name)).toEqual(["BloodHound-Standalone", "EnumLiveHost", "WifiPasswordViewer"]);
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
