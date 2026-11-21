import { SITE } from "./site";
import type { BlogPost } from "./types";

const EXCERPT_MAX = 160;
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
  const unwrapped = raw.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1");
  return decodeEntities(unwrapped).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function field(itemXml: string, tag: string): string | undefined {
  const match = itemXml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? toPlainText(match[1]) : undefined;
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
  const items = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) ?? [];
  const posts: BlogPost[] = [];
  for (const itemXml of items) {
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
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`feed responded ${res.status}`);
    return parseRss(await res.text(), limit);
  } catch (err) {
    console.error("[blog] could not load feed:", err instanceof Error ? err.message : err);
    return [];
  }
}
