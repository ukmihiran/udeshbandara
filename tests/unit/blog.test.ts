import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test, vi } from "vitest";
import { getLatestPosts, parseRss } from "@/lib/blog";

const fixture = readFileSync(path.join(__dirname, "fixtures/cybernetgen-rss.xml"), "utf8");

const item = (fields: string) => `<rss><channel><item>${fields}</item></channel></rss>`;

describe("parseRss", () => {
  test("returns items newest-first regardless of feed order", () => {
    expect(parseRss(fixture, 3).map((p) => p.publishedAt.slice(0, 10))).toEqual([
      "2025-10-28",
      "2024-03-01",
      "2021-01-02",
    ]);
  });

  test("decodes entities and unwraps CDATA", () => {
    const [newest] = parseRss(fixture, 1);
    expect(newest.title).toBe("Windows Privilege Escalation & Token Abuse");
    expect(newest.excerpt).toBe("Abusing SeImpersonate & friends on modern Windows.");
    expect(newest.url).toBe("https://cybernetgen.com/blog/windows-token-abuse");
  });

  test("trims long excerpts to 160 characters plus an ellipsis", () => {
    const oldest = parseRss(fixture, 3)[2];
    expect(oldest.excerpt.length).toBeLessThanOrEqual(161);
    expect(oldest.excerpt.endsWith("…")).toBe(true);
  });

  test("respects the limit", () => {
    expect(parseRss(fixture, 2)).toHaveLength(2);
  });

  test("returns an empty list for malformed or empty input", () => {
    expect(parseRss("<!DOCTYPE html><html>404</html>", 3)).toEqual([]);
    expect(parseRss("", 3)).toEqual([]);
  });

  test("skips items with a missing link or an invalid date", () => {
    expect(parseRss(item("<title>No link</title><pubDate>Fri, 01 Mar 2024 12:00:00 GMT</pubDate>"), 3)).toEqual([]);
    expect(
      parseRss(item("<title>Bad date</title><link>https://cybernetgen.com/blog/x</link><pubDate>someday</pubDate>"), 3),
    ).toEqual([]);
  });

  test("rejects links that are not on the cybernetgen.com blog", () => {
    const evil = item(
      "<title>Phish</title><link>javascript:alert(1)</link><pubDate>Fri, 01 Mar 2024 12:00:00 GMT</pubDate>",
    );
    const offsite = item(
      "<title>Elsewhere</title><link>https://cybernetgen.com.evil.test/blog/x</link><pubDate>Fri, 01 Mar 2024 12:00:00 GMT</pubDate>",
    );
    expect(parseRss(evil, 3)).toEqual([]);
    expect(parseRss(offsite, 3)).toEqual([]);
  });

  test("strips HTML tags from titles and excerpts", () => {
    const html = item(
      "<title>&lt;b&gt;Bold&lt;/b&gt; title</title><link>https://cybernetgen.com/blog/x</link><pubDate>Fri, 01 Mar 2024 12:00:00 GMT</pubDate><description>&lt;img src=x onerror=alert(1)&gt;Text</description>",
    );
    const [post] = parseRss(html, 1);
    expect(post.title).toBe("Bold title");
    expect(post.excerpt).toBe("Text");
  });
});

describe("getLatestPosts", () => {
  test("returns parsed posts on success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(fixture, { status: 200 })));
    expect((await getLatestPosts(2)).map((p) => p.title)).toEqual([
      "Windows Privilege Escalation & Token Abuse",
      "Apache Tomcat Server - Deserialization of Untrusted Data",
    ]);
  });

  test("returns an empty list on a non-2xx response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not found", { status: 404 })));
    await expect(getLatestPosts()).resolves.toEqual([]);
  });

  test("returns an empty list when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    await expect(getLatestPosts()).resolves.toEqual([]);
  });
});

describe("getLatestPosts hardening (final review)", () => {
  test("aborts a hung feed: fetch gets an AbortSignal", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(fixture, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await getLatestPosts(1);
    expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  test("rejects a feed body over the size cap", async () => {
    const huge = fixture + " ".repeat(300_000);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(huge, { status: 200 })));
    await expect(getLatestPosts()).resolves.toEqual([]);
  });

  test("on the production server a failure throws so ISR keeps the last good page", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new DOMException("timed out", "TimeoutError")));
    await expect(getLatestPosts()).rejects.toThrow();
  });

  test("during the production build a failure degrades to an empty list", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "phase-production-build");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new DOMException("timed out", "TimeoutError")));
    await expect(getLatestPosts()).resolves.toEqual([]);
  });
});

describe("parseRss performance on hostile input", () => {
  test("a megabyte of unclosed tags parses in linear time", () => {
    const bomb = `<item>${"<link ".repeat(170_000)}</item>`;
    const unclosed = "<item>".repeat(170_000);
    const t0 = performance.now();
    parseRss(bomb, 3);
    parseRss(unclosed, 3);
    expect(performance.now() - t0).toBeLessThan(1000);
  });
});

describe("getLatestPosts rejects non-feed documents (PR review)", () => {
  test("on the production server an HTML 200 page throws so ISR keeps the last good page", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "");
    const html = "<!doctype html><html><body>Service unavailable</body></html>";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(html, { status: 200 })));
    await expect(getLatestPosts()).rejects.toThrow(/not an RSS feed/);
  });

  test("a valid but empty RSS feed still resolves to an empty list", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PHASE", "");
    const empty = '<?xml version="1.0"?><rss version="2.0"><channel><title>x</title></channel></rss>';
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(empty, { status: 200 })));
    await expect(getLatestPosts()).resolves.toEqual([]);
  });
});
