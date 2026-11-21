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

/** Posts often open with their first heading run into the body ("Introduction In today's…"). */
const LEADING_LABEL = /^(?:Introduction|Overview|Summary|Background)\s+(?=[A-Z])/;

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
      excerpt: truncate((field(itemXml, "description") ?? "").replace(LEADING_LABEL, "")),
    });
  }
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
}

const FEED_ROOTS = ["rss", "rdf:RDF", "feed"] as const;

const isSpace = (ch: string | undefined) => ch === " " || ch === "\t" || ch === "\r" || ch === "\n";

const PREDEFINED_ENTITIES = new Set(["amp", "lt", "gt", "quot", "apos"]);
const NUMERIC_REF = /^#(?:[0-9]{1,7}|x[0-9A-Fa-f]{1,6})$/;

/**
 * True when every "&" in text or an attribute value starts a valid reference: one of XML's five
 * predefined entities or a numeric character reference. Feeds declare no DTD, so any other named
 * entity (e.g. &nbsp;) is undefined and the document is malformed. No entity is ever expanded.
 */
function hasValidReferences(text: string): boolean {
  for (let amp = text.indexOf("&"); amp !== -1; amp = text.indexOf("&", amp + 1)) {
    const semi = text.indexOf(";", amp + 1);
    if (semi === -1 || semi - amp > 10) return false; // the longest valid reference is &#x10FFFF;
    const ref = text.slice(amp + 1, semi);
    if (!PREDEFINED_ENTITIES.has(ref) && !NUMERIC_REF.test(ref)) return false;
  }
  return true;
}
const NAME_START = /^[A-Za-z_:]$/;
const NAME_CHAR = /^[-A-Za-z0-9_:.]$/;

/**
 * Parses the inside of an element tag ("item", "/item", `link href="x" /`) by hand, one character
 * at a time (no backtracking). Returns null when the tag is malformed: a bad name, an attribute
 * without whitespace before it, without "=", with an unquoted value or "<" in its value, or a
 * duplicated attribute.
 */
function parseTag(raw: string): { name: string; closing: boolean; selfClosing: boolean } | null {
  const closing = raw.startsWith("/");
  let k = closing ? 1 : 0;
  const readName = () => {
    const start = k;
    if (!NAME_START.test(raw[k] ?? "")) return "";
    while (k < raw.length && NAME_CHAR.test(raw[k])) k++;
    return raw.slice(start, k);
  };
  const skipSpace = () => {
    const start = k;
    while (k < raw.length && isSpace(raw[k])) k++;
    return k > start;
  };

  const name = readName();
  if (!name) return null;
  if (closing) {
    skipSpace();
    return k === raw.length ? { name, closing, selfClosing: false } : null;
  }
  const seen = new Set<string>();
  for (;;) {
    const spaced = skipSpace();
    if (k === raw.length) return { name, closing, selfClosing: false };
    if (raw[k] === "/" && k === raw.length - 1) return { name, closing, selfClosing: true };
    if (!spaced) return null; // attributes must be separated by whitespace
    const attr = readName();
    if (!attr || seen.has(attr)) return null;
    seen.add(attr);
    skipSpace();
    if (raw[k] !== "=") return null;
    k++;
    skipSpace();
    const quote = raw[k];
    if (quote !== '"' && quote !== "'") return null;
    const close = raw.indexOf(quote, k + 1);
    const value = close === -1 ? "" : raw.slice(k + 1, close);
    if (close === -1 || value.includes("<") || !hasValidReferences(value)) return null;
    k = close + 1;
  }
}

/**
 * True when the document is a well-formed RSS, RDF or Atom feed: exactly one feed root, every
 * element closed in order, valid attribute syntax, and nothing but whitespace, comments and PIs
 * outside the root. Comments, CDATA, PIs and a doctype are skipped, so "<rss" inside an HTML
 * comment, a truncated body, "<rss><item></rss>", `<channel foo=bar>` and a bare "&" all fail.
 * Entities are only checked, never expanded, so there is no external-entity (XXE) surface.
 * Linear time: one forward scan.
 */
export function isFeedDocument(xml: string): boolean {
  let i = xml.charCodeAt(0) === 0xfeff ? 1 : 0;
  const stack: string[] = [];
  let rootClosed = false;

  while (i < xml.length) {
    const lt = xml.indexOf("<", i);
    // Outside the root only whitespace may appear; inside, text is free.
    const text = lt === -1 ? xml.slice(i) : xml.slice(i, lt);
    if (stack.length === 0 && text.trim() !== "") return false;
    if (!hasValidReferences(text)) return false;
    if (lt === -1) break;
    i = lt;

    let end: number;
    if (xml.startsWith("<!--", i)) end = xml.indexOf("-->", i + 4) + 3;
    else if (xml.startsWith("<![CDATA[", i)) {
      if (stack.length === 0) return false;
      end = xml.indexOf("]]>", i + 9) + 3;
    } else if (xml.startsWith("<?", i)) end = xml.indexOf("?>", i + 2) + 2;
    else if (xml.slice(i, i + 9).toLowerCase() === "<!doctype") {
      if (stack.length > 0 || rootClosed) return false;
      end = xml.indexOf(">", i) + 1;
    } else {
      // An element tag: find its ">" while skipping quoted attribute values (which may contain ">").
      let j = i + 1;
      let quote = "";
      for (; j < xml.length; j++) {
        const ch = xml[j];
        if (quote) {
          if (ch === quote) quote = "";
        } else if (ch === '"' || ch === "'") quote = ch;
        else if (ch === ">") break;
      }
      if (j >= xml.length) return false; // unterminated tag
      const tag = parseTag(xml.slice(i + 1, j));
      if (!tag) return false; // malformed name or attributes
      const { name, closing, selfClosing } = tag;
      if (closing) {
        if (stack.pop() !== name) return false;
        if (stack.length === 0) rootClosed = true;
      } else {
        if (stack.length === 0) {
          if (rootClosed || !(FEED_ROOTS as readonly string[]).includes(name)) return false; // one feed root only
          if (selfClosing) return false; // an empty root carries no channel
        }
        if (!selfClosing) stack.push(name);
      }
      end = j + 1;
    }
    if (end <= i) return false; // unterminated comment, CDATA, PI or doctype
    i = end;
  }
  return rootClosed && stack.length === 0;
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
    if (!isFeedDocument(xml)) throw new Error("response is not an RSS feed");
    return parseRss(xml, limit);
  } catch (err) {
    console.error("[blog] could not load feed:", err instanceof Error ? err.message : err);
    if (shouldThrowOnFetchFailure()) throw err;
    return [];
  }
}
