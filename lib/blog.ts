import { FETCH_TIMEOUT_MS, shouldThrowOnFetchFailure } from "./runtime";
import { SITE } from "./site";
import type { BlogPost } from "./types";

const EXCERPT_MAX = 160;
/** The real feed is ~6 KB; anything this large is broken or hostile. */
const MAX_FEED_CHARS = 200_000;
const ALLOWED_HOSTS = new Set(["cybernetgen.com", "www.cybernetgen.com"]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** Plain text from an RSS field: unwrap CDATA, decode entities, drop tags, collapse whitespace. */
function toPlainText(raw: string): string {
  const trimmed = raw.trim();
  const unwrapped =
    trimmed.startsWith("<![CDATA[") && trimmed.endsWith("]]>") ? trimmed.slice(9, -3) : trimmed;
  // [^<>] keeps the tag stripper linear even on long runs of "<".
  return decodeEntities(unwrapped).replace(/<[^<>]*>/g, "").replace(/\s+/g, " ").trim();
}

/** Index of the next `<tag` followed by ">" or whitespace (so `<link` never matches `<linkx`), or -1. */
function findOpenTag(lower: string, tag: string, from: number): number {
  let i = lower.indexOf(`<${tag}`, from);
  while (i !== -1) {
    const next = lower.charAt(i + tag.length + 1);
    if (next === ">" || next === " " || next === "\t" || next === "\n" || next === "\r") return i;
    i = lower.indexOf(`<${tag}`, i + 1);
  }
  return -1;
}

/** Text content of the first <tag>…</tag>, using linear indexOf scans (no backtracking regex). */
function field(itemXml: string, tagName: string): string | undefined {
  const lower = itemXml.toLowerCase();
  const tag = tagName.toLowerCase();
  const open = findOpenTag(lower, tag, 0);
  if (open === -1) return undefined;
  const contentStart = lower.indexOf(">", open);
  if (contentStart === -1) return undefined;
  const close = lower.indexOf(`</${tag}>`, contentStart);
  return close === -1 ? undefined : toPlainText(itemXml.slice(contentStart + 1, close));
}

function splitItems(xml: string): string[] {
  const lower = xml.toLowerCase();
  const items: string[] = [];
  let pos = 0;
  for (;;) {
    const open = findOpenTag(lower, "item", pos);
    if (open === -1) break;
    const close = lower.indexOf("</item>", open);
    if (close === -1) break;
    items.push(xml.slice(open, close));
    pos = close + "</item>".length;
  }
  return items;
}

function safeBlogUrl(link: string | undefined): string | undefined {
  if (!link) return undefined;
  try {
    const url = new URL(link);
    return url.protocol === "https:" && ALLOWED_HOSTS.has(url.hostname) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function truncate(text: string): string {
  return text.length > EXCERPT_MAX ? `${text.slice(0, EXCERPT_MAX).trimEnd()}…` : text;
}

export function parseRss(xml: string, limit: number): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const itemXml of splitItems(xml)) {
    const url = safeBlogUrl(field(itemXml, "link"));
    const date = new Date(field(itemXml, "pubDate") ?? "");
    const title = field(itemXml, "title");
    if (!url || !title || Number.isNaN(date.getTime())) continue;
    posts.push({
      title,
      url,
      publishedAt: date.toISOString(),
      excerpt: truncate(field(itemXml, "description") ?? ""),
    });
  }
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
}

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const res = await fetch(SITE.blogFeedUrl, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`feed responded ${res.status}`);
    if (Number(res.headers.get("content-length") ?? 0) > MAX_FEED_CHARS) throw new Error("feed too large");
    const xml = await res.text();
    if (xml.length > MAX_FEED_CHARS) throw new Error("feed too large");
    // A 200 with an HTML error page would parse to [] and replace the cached posts; treat it as a failure.
    if (!/<(rss|rdf:RDF|feed)[\s>]/i.test(xml)) throw new Error("response is not an RSS feed");
    return parseRss(xml, limit);
  } catch (err) {
    console.error("[blog] could not load feed:", err instanceof Error ? err.message : err);
    if (shouldThrowOnFetchFailure()) throw err;
    return [];
  }
}
