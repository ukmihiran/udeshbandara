# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single client-rendered tab page into server-rendered pages per section (`/`, `/about`, `/experience`, `/certifications`, `/projects`) that are indexable, shareable, accessible and correct at every device width.

**Architecture:** Next.js App Router with Server Components and static generation (ISR for GitHub/blog data). The root layout owns a client Header (links + `usePathname` active state) and a server Footer; page bodies are server components fed by pure, unit-tested helpers in `lib/`. Page changes animate with React View Transitions via Next's `experimental.viewTransition`.

**Tech Stack:** Next.js 16.1.6, React 19.2.4, TypeScript 5, Tailwind CSS v4 (`app/globals.css` tokens), framer-motion 12 (hero only), next-themes, Radix Dialog (Sheet), lucide-react, react-icons. New: Vitest (unit), Playwright (e2e/device matrix), `@vercel/analytics`, `@vercel/speed-insights`.

**Spec:** `docs/superpowers/specs/2026-11-21-portfolio-rebuild-design.md`

## Global Constraints

- Branch `feat/portfolio-rebuild`; one commit per task; commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Keep Next 16.1.6 / React 19.2.4 / Tailwind v4 from `package-lock.json`; no framework upgrades.
- Runtime deps may only be added: `@vercel/analytics`, `@vercel/speed-insights`. Dev deps may only be added: `vitest`, `@playwright/test`.
- Keep the existing colour tokens and dark navy + green identity in `app/globals.css`; `defaultTheme="dark"`.
- Site URL: `process.env.NEXT_PUBLIC_APP_URL ?? "https://udeshbandara.com"`, read only via `lib/site.ts`.
- Contact email `contact@udeshbandara.com`; GitHub user `ukmihiran`; blog `https://cybernetgen.com/`, feed `https://cybernetgen.com/api/rss` (RSS 2.0, verified 2026-11-21, **not sorted by date**).
- Breakpoints: phone <640 · `sm` 640 · `md` 768 · `lg` 1024 · wide ≥1440. Floating pill nav only at `lg`+; hamburger Sheet below `lg`.
- Viewport heights use `dvh`/`svh`, never `100vh`/`min-h-screen`.
- Interactive targets ≥44×44px. Text ≥11px.
- No element may cause horizontal scroll at 320, 375, 414, 768, 1024, 1440, 1920 widths.
- Every page's text content must be present in server HTML (no `ssr: false`).
- Motion respects `prefers-reduced-motion` (CSS media query + `<MotionConfig reducedMotion="user">`).
- Titles: root `template: "%s | Udesh Bandara"`, default `"Udesh Bandara | Offensive Security Consultant"`.

## Review Focus

1. **Blog feed down, malformed, or unsorted at build time** → build still succeeds, posts appear newest-first, and the "Latest writing" block is omitted (not an empty box) when there are no posts. Pinned in Task 3.
2. **GitHub API rate-limited (403) or down at build** → `/projects` still builds and shows a "Browse on GitHub" fallback instead of an empty grid. Pinned in Task 2 and Task 6.
3. **Long unbroken strings at 320px** (role titles, repo names up to ~70 chars like `CSRF-protection-in-web-applications-via-Synchronizer-Token-Patterns`) → wrap within cards, no horizontal scroll. Pinned in Task 9 device matrix.
4. **JavaScript disabled** → every page's content is readable and nav links work. Pinned in Task 5.
5. **Mobile menu navigation** → tapping a Sheet link changes the URL, closes the Sheet, and browser Back returns to the previous page. Pinned in Task 5.

---

## File Structure

```
lib/
  site.ts            SITE constant (url, name, email, github, blog, feed), SOCIALS
  types.ts           all shared types (rewritten)
  data.ts            content: NAV_ITEMS, EXPERIENCES, EDUCATION, CERTIFICATIONS, TECH_STACK, FEATURED_REPOS, PROFILE
  format.ts          formatPeriod, totalExperienceMonths, getHeroStats, buildTimeline
  nav.ts             isActivePath
  github.ts          selectFeaturedRepos (pure) + getFeaturedRepos (fetch)
  blog.ts            parseRss (pure) + getLatestPosts (fetch)
  csp.ts             buildCsp
  cv.ts              getCvHref
  og.tsx             renderOgImage (shared OG/Twitter renderer)
app/
  layout.tsx         shell: Header, <main id="main">, Footer, skip link, viewport, analytics, JSON-LD Person
  page.tsx           home: hero + highlights
  about/page.tsx · experience/page.tsx · certifications/page.tsx · projects/page.tsx
  not-found.tsx · error.tsx
  opengraph-image.tsx · twitter-image.tsx (re-export) · <route>/opengraph-image.tsx
  sitemap.ts · robots.ts · icon.tsx
components/
  layout/header.tsx (client) · layout/mobile-nav.tsx (client) · layout/footer.tsx · layout/page-transition.tsx (client)
  hero/hero.tsx · hero/hex-avatar.tsx (client) · hero/typewriter-role.tsx (client)
  sections/about.tsx · sections/timeline.tsx · sections/certifications.tsx · sections/projects.tsx · sections/latest-posts.tsx · sections/page-header.tsx
  ui/*               existing primitives (badge, button, card, sheet, mode-toggle)
public/.well-known/security.txt
tests/unit/*.test.ts · tests/e2e/*.spec.ts
vitest.config.ts · playwright.config.ts · .github/workflows/ci.yml
```

Delete: `app/api/repos/route.ts`, `components/tab-transition.tsx`, `components/sections/*-panel.tsx` / `*-section.tsx` (replaced), `components/ui/header.tsx`, `components/ui/footer.tsx` (moved), `.eslintrc.json`, `public/favicon.ico`, `public/profile_picture.png` and `public/kroll.svg` only if unreferenced after the port.

---

### Task 1: Test tooling, site config, data model, formatting helpers

**Files:**
- Create: `vitest.config.ts`, `lib/site.ts`, `lib/format.ts`, `lib/nav.ts`, `tests/unit/format.test.ts`, `tests/unit/nav.test.ts`
- Modify: `package.json` (scripts + deps), `lib/types.ts`, `lib/data.ts`
- Delete: `.eslintrc.json`

**Interfaces:**
- Produces (`lib/types.ts`):
  - `type YearMonth = string` — `"YYYY"` or `"YYYY-MM"`.
  - `interface Experience { role; company; location; start: YearMonth; end?: YearMonth; type: "Full-time"|"Co-Founder"|"Contract"|"Internship"; description; image?; logoScale?: number }` (`current` and `period` removed; current = no `end`).
  - `interface Education { degree; school; location; start: YearMonth; end?: YearMonth; image?; logoScale?: number }`
  - `interface Certification { name; issuer; year; image?; logoScale?: number; verifyUrl?: string; featured?: boolean }`
  - `interface TechItem { name; category: "security"|"languages"|"cloud" }`
  - `interface NavItem { href: "/"|"/about"|"/experience"|"/certifications"|"/projects"; label: string }`
  - `interface Social { href; label: "GitHub"|"LinkedIn"|"Blog"|"Email" }`
  - `interface Repository { id: number; name; url; description: string|null; stars: number; forks: number; language: string|null; pushedAt: string }`
  - `interface BlogPost { title; url; publishedAt: string /* ISO */; excerpt: string }`
  - `interface HeroStat { value: string; label: string }`
  - `type TimelineEntry = { kind: "work"|"education"; title; org; location; start: YearMonth; end?: YearMonth; current: boolean; description?; badge?: string; image?; logoScale?: number }`
- Produces (`lib/site.ts`): `export const SITE = { url, name: "Udesh Bandara", jobTitle: "Offensive Security Consultant", email: "contact@udeshbandara.com", githubUser: "ukmihiran", linkedin: "https://www.linkedin.com/in/udesh-wiyasinghe/", blogUrl: "https://cybernetgen.com/", blogFeedUrl: "https://cybernetgen.com/api/rss" } as const`; `export const SOCIALS: Social[]` (GitHub, LinkedIn, Blog, Email/mailto).
- Produces (`lib/data.ts`): `NAV_ITEMS: NavItem[]` (Home, About, Experience, Certifications, Projects), `EXPERIENCES`, `EDUCATION`, `CERTIFICATIONS`, `TECH_STACK`, `FEATURED_REPOS: string[]`, `PROFILE = { status: "Open to opportunities", engagements: "50+", based: "UK", roles: string[] /* the 4 typewriter roles */ }`.
- Produces (`lib/format.ts`):
  - `formatPeriod(start: YearMonth, end?: YearMonth): string`
  - `totalExperienceMonths(experiences: Experience[], now: Date): number`
  - `getHeroStats(experiences: Experience[], certifications: Certification[], now: Date): HeroStat[]`
  - `buildTimeline(experiences: Experience[], education: Education[]): TimelineEntry[]`
- Produces (`lib/nav.ts`): `isActivePath(pathname: string, href: NavItem["href"]): boolean`

Data values: move existing content over verbatim. Experience `start`/`end`: Kroll `2024-07`/–, Axiata `2021-04`/`2021-12`, CryptoGen `2020-04`/`2021-04`, PwC `2019-07`/`2020-04`. Education: MSc `2022`/`2023`, BSc `2016`/`2020`. `logoScale` from the current string hacks (Axiata 1.35, CryptoGen 1.28, PwC 1.2, UWE 1.38, SLIIT 1.25, EC-Council 1.55, CREST 1.2, Cisco 1.2, AWS 1.1, Altered Security 1.12, Microsoft 1.12, eLearnSecurity 1.14). `featured: true` on AWS Solutions Architect, CRTP, CREST CRT. `verifyUrl` left undefined (Udesh supplies later). `FEATURED_REPOS = ["BloodHound-Standalone", "EnumLiveHost", "WifiPasswordViewer", "PDFUnlocker", "dga_detection_deep_learning", "SecurityTrails-Subdomain-Scanner"]` — **builder default, flagged for Udesh to edit.**

- [ ] **Step 1: Install test tooling and wire scripts**

Run: `npm i -D vitest @playwright/test` then remove unused deps: `npm rm @radix-ui/react-avatar autoprefixer`. Add scripts: `"test": "vitest run"`, `"test:e2e": "playwright test"`, `"typecheck": "tsc --noEmit"`. `vitest.config.ts`: node environment, `include: ["tests/unit/**/*.test.ts"]`, alias `@` → project root. Delete `.eslintrc.json`.

- [ ] **Step 2: Write failing tests** in `tests/unit/format.test.ts` and `tests/unit/nav.test.ts`

```ts
const NOW = new Date("2026-11-21T00:00:00Z");
test("formatPeriod month range and open end", () => {
  expect(formatPeriod("2024-07")).toBe("Jul 2024 — Present");
  expect(formatPeriod("2021-04", "2021-12")).toBe("Apr 2021 — Dec 2021");
  expect(formatPeriod("2022", "2023")).toBe("2022 — 2023");
});
test("totalExperienceMonths sums work periods only", () => {
  expect(totalExperienceMonths(EXPERIENCES, NOW)).toBe(57); // 9+12+8+28
});
test("getHeroStats derives years and cert count from data", () => {
  expect(getHeroStats(EXPERIENCES, CERTIFICATIONS, NOW)).toEqual([
    { value: "4+", label: "Years experience" },
    { value: "8", label: "Certifications" },
    { value: "50+", label: "Engagements" },
    { value: "UK", label: "Based" },
  ]);
});
test("buildTimeline merges work and education newest-first", () => {
  const t = buildTimeline(EXPERIENCES, EDUCATION);
  expect(t.map((e) => e.org)).toEqual([
    "Kroll", "University of the West of England", "Axiata Digital Labs", "CryptoGen", "PwC Sri Lanka", "SLIIT",
  ]);
  expect(t[0].current).toBe(true);
  expect(t[1]).toMatchObject({ kind: "education", badge: "Education", current: false });
});
// nav.test.ts
test("isActivePath", () => {
  expect(isActivePath("/", "/")).toBe(true);
  expect(isActivePath("/about", "/")).toBe(false);
  expect(isActivePath("/experience", "/experience")).toBe(true);
  expect(isActivePath("/experience/", "/experience")).toBe(true);
  expect(isActivePath("/experiences", "/experience")).toBe(false);
});
```

Note on ordering: BSc `2016`–`2020` sorts after PwC `2019-07` because entries sort by `end ?? "9999"` descending, then `start` descending. Work `badge` = `type`.

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test` — Expected: FAIL (modules/exports missing).

- [ ] **Step 4: Implement** `lib/types.ts`, `lib/site.ts`, `lib/data.ts`, `lib/format.ts`, `lib/nav.ts` per Interfaces. Month counting: inclusive-exclusive difference of year*12+month; `getHeroStats` years = `Math.floor(months/12) + "+"`.

- [ ] **Step 5: Run tests** — `npm test` → PASS. (`npm run typecheck` fails in the old components until Task 5 deletes them; accepted for Tasks 1–4 only. From Task 5 on, lint + typecheck must pass.)

- [ ] **Step 6: Commit** — `feat: add site config, typed content model and formatting helpers`

---

### Task 2: Server-side GitHub repositories

**Files:**
- Modify: `lib/github.ts`
- Create: `tests/unit/github.test.ts`, `tests/unit/fixtures/github-repos.json` (trimmed copy of `GET /users/ukmihiran/repos` with ≥1 fork, the `ukmihiran` profile repo, the `udeshbandara` repo, an archived repo, and the 6 featured names)
- Modify: `package.json` (`npm rm @octokit/rest`)

**Interfaces:**
- Consumes: `Repository`, `SITE.githubUser`, `FEATURED_REPOS`.
- Produces:
  - `type GitHubRepoApi` (only the fields read: `id, name, html_url, description, stargazers_count, forks_count, language, pushed_at, fork, archived`)
  - `selectFeaturedRepos(raw: GitHubRepoApi[], opts: { username: string; pinned: string[]; limit: number }): Repository[]`
  - `getFeaturedRepos(limit = 6): Promise<{ repos: Repository[]; error: boolean }>`

- [ ] **Step 1: Write failing tests**

```ts
test("pinned repos come first, in pinned order", () => {
  const r = selectFeaturedRepos(fixture, { username: "ukmihiran", pinned: ["PDFUnlocker", "EnumLiveHost"], limit: 6 });
  expect(r.slice(0, 2).map((x) => x.name)).toEqual(["PDFUnlocker", "EnumLiveHost"]);
});
test("excludes forks, archived, profile repo and this portfolio repo", () => {
  const names = selectFeaturedRepos(fixture, { username: "ukmihiran", pinned: [], limit: 50 }).map((x) => x.name);
  expect(names).not.toContain("SharpCollection");
  expect(names).not.toContain("ukmihiran");
  expect(names).not.toContain("udeshbandara");
});
test("fills remaining slots by stars desc, then pushedAt desc, and respects limit", () => { /* assert length === limit and order */ });
test("maps to Repository shape only", () => {
  expect(Object.keys(selectFeaturedRepos(fixture, { username: "ukmihiran", pinned: [], limit: 1 })[0]).sort())
    .toEqual(["description", "forks", "id", "language", "name", "pushedAt", "stars", "url"]);
});
test("getFeaturedRepos returns error flag on 403", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })));
  await expect(getFeaturedRepos()).resolves.toEqual({ repos: [], error: true });
});
test("getFeaturedRepos returns error flag when fetch rejects", async () => { /* mockRejectedValue → { repos: [], error: true } */ });
```

- [ ] **Step 2: Run** `npm test -- github` → FAIL.
- [ ] **Step 3: Implement.** `getFeaturedRepos` calls `https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=pushed` with `next: { revalidate: 3600 }`, headers `Accept: application/vnd.github+json` and `Authorization: Bearer ${GH_TOKEN ?? GITHUB_TOKEN}` only when set. Never throws.
- [ ] **Step 4: Run** `npm test -- github` → PASS.
- [ ] **Step 5: Commit** — `feat: fetch curated GitHub repos on the server`

---

### Task 3: Blog feed

**Files:**
- Create: `lib/blog.ts`, `tests/unit/blog.test.ts`, `tests/unit/fixtures/cybernetgen-rss.xml` (3 items, deliberately out of date order, one with `&amp;` and a CDATA title)

**Interfaces:**
- Consumes: `BlogPost`, `SITE.blogFeedUrl`.
- Produces: `parseRss(xml: string, limit: number): BlogPost[]`; `getLatestPosts(limit = 3): Promise<BlogPost[]>`

- [ ] **Step 1: Write failing tests**

```ts
test("parses items newest-first regardless of feed order", () => {
  expect(parseRss(fixture, 3).map((p) => p.publishedAt.slice(0, 10))).toEqual(["2025-10-28", "2024-03-01", "2021-01-02"]);
});
test("decodes entities and CDATA, trims excerpt to 160 chars with ellipsis", () => { /* title has "&", excerpt length ≤ 161 and endsWith("…") */ });
test("respects limit", () => expect(parseRss(fixture, 2)).toHaveLength(2));
test("returns [] for malformed or empty input", () => {
  expect(parseRss("<html>404</html>", 3)).toEqual([]);
  expect(parseRss("", 3)).toEqual([]);
});
test("skips items missing link or valid pubDate", () => { /* inline xml with one bad item → length 0 */ });
test("getLatestPosts returns [] when fetch fails or non-2xx", async () => { /* 404 Response and rejected fetch both → [] */ });
```

- [ ] **Step 2: Run** `npm test -- blog` → FAIL.
- [ ] **Step 3: Implement** with regex extraction of `<item>…</item>` and child tags (no XML dependency); only `https://cybernetgen.com/` links accepted. `getLatestPosts` uses `next: { revalidate: 86400 }`, never throws.
- [ ] **Step 4: Run** `npm test -- blog` → PASS.
- [ ] **Step 5: Commit** — `feat: read latest posts from the cybernetgen RSS feed`

---

### Task 4: Security headers, CSP, analytics, cache policy

**Decision (flag to Udesh):** a nonce-based CSP forces every page to render per request, which conflicts with static generation and the "no slower pages" anti-goal. This task ships a **static header CSP** (no nonce; `script-src 'self' 'unsafe-inline'`) with all other directives strict. If Udesh wants nonce CSP instead, swap to `proxy.ts` and accept dynamic rendering.

**Files:**
- Create: `lib/csp.ts`, `tests/unit/csp.test.ts`, `public/.well-known/security.txt`
- Modify: `next.config.ts`, `app/layout.tsx` (analytics block only), `package.json` (`npm i @vercel/analytics @vercel/speed-insights`)

**Interfaces:**
- Produces: `buildCsp(opts: { dev: boolean; gaEnabled: boolean }): string`

- [ ] **Step 1: Write failing tests**

```ts
const prod = buildCsp({ dev: false, gaEnabled: false });
test("strict baseline", () => {
  for (const d of ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "frame-ancestors 'none'", "form-action 'self'", "upgrade-insecure-requests"])
    expect(prod).toContain(d);
  expect(prod).not.toContain("unsafe-eval");
  expect(prod).not.toContain("googletagmanager");
});
test("dev adds unsafe-eval and drops upgrade-insecure-requests", () => {
  const dev = buildCsp({ dev: true, gaEnabled: false });
  expect(dev).toContain("'unsafe-eval'");
  expect(dev).not.toContain("upgrade-insecure-requests");
});
test("GA origins only when enabled", () => {
  const ga = buildCsp({ dev: false, gaEnabled: true });
  expect(ga).toContain("https://www.googletagmanager.com");
  expect(ga).toContain("https://*.google-analytics.com");
});
```

- [ ] **Step 2: Run** `npm test -- csp` → FAIL.
- [ ] **Step 3: Implement** `buildCsp` (script/style `'self' 'unsafe-inline'`, `img-src 'self' data: blob:`, `font-src 'self'`, `connect-src 'self'`, plus GA origins when enabled). In `next.config.ts`: add `Content-Security-Policy: buildCsp({ dev: process.env.NODE_ENV !== "production", gaEnabled: !!process.env.NEXT_PUBLIC_GA_ID })` to the `/(.*)` headers; change the image cache header to `public, max-age=86400, stale-while-revalidate=604800`; add `experimental.viewTransition: true` (used in Task 5). In `app/layout.tsx`: remove the hard-coded GA fallback (GA renders only when `NEXT_PUBLIC_GA_ID` is set) and render `<Analytics />` and `<SpeedInsights />`. `security.txt`: `Contact: mailto:contact@udeshbandara.com`, `Expires:` one year ahead (`2027-11-21T00:00:00.000Z`), `Preferred-Languages: en`, `Canonical: https://udeshbandara.com/.well-known/security.txt`.
- [ ] **Step 4: Run** `npm test -- csp` → PASS.
- [ ] **Step 5: Commit** — `feat: add CSP, security.txt, cookieless analytics and safer cache headers`

---

### Task 5: Routing shell, navigation, transitions, device-matrix harness

**Files:**
- Create: `components/layout/header.tsx`, `components/layout/mobile-nav.tsx`, `components/layout/footer.tsx`, `components/layout/page-transition.tsx`, `components/sections/page-header.tsx`, `app/not-found.tsx`, `app/error.tsx`, `app/about/page.tsx`, `app/experience/page.tsx`, `app/certifications/page.tsx`, `app/projects/page.tsx` (each a placeholder `<PageHeader>` only; bodies arrive in Task 6), `playwright.config.ts`, `tests/e2e/navigation.spec.ts`
- Modify: `app/layout.tsx`, `app/page.tsx` (becomes a server component rendering the existing `HeroSection` until Task 7), `app/globals.css`, `components/ui/mode-toggle.tsx` (44px target), `components/ui/sheet.tsx` (close button 44px + safe-area padding)
- Delete: `components/tab-transition.tsx`, `components/ui/header.tsx`, `components/ui/footer.tsx`, `app/api/repos/route.ts`, and the old panels `components/sections/about-panel.tsx`, `experience-section.tsx`, `certifications-section.tsx`, `projects-panel.tsx` (they use removed fields; their replacements land in Task 6). `hero-section.tsx` stays until Task 7.

**Interfaces:**
- Consumes: `NAV_ITEMS`, `SOCIALS`, `SITE`, `isActivePath`.
- Produces:
  - `<PageHeader title: string; description: string />` — server component, renders the page `h1` (each subpage has exactly one `h1`).
  - `<PageTransition>{children}</PageTransition>` — client; wraps children in `unstable_ViewTransition` from `react`. If `next build` fails or transitions don't fire on 16.1.6, replace with `app/template.tsx` using the existing `animate-in fade-in duration-200` classes and note it in the commit.
  - Layout contract: `<a href="#main">Skip to content</a>`, `<Header/>`, `<main id="main" tabIndex={-1}>`, `<Footer/>`. `export const viewport = { themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0f1520" }, { media: "(prefers-color-scheme: light)", color: "#f8fafc" }], viewportFit: "cover" }`. `<MotionConfig reducedMotion="user">` lives in a tiny client provider next to `ThemeProvider`.

Header behaviour: pill nav `hidden lg:flex`, fixed, centred, max-width `calc(100vw - 2rem)`; links use `next/link` with `aria-current="page"` when `isActivePath`. Below `lg`: fixed 56px bar + safe-area top padding; `main` gets `pt-[calc(3.5rem+env(safe-area-inset-top))] lg:pt-24`. Mobile Sheet links are `SheetClose asChild` → `Link`. Header logo image `alt=""`. Global keydown handler is gone. Footer: socials from `SOCIALS`, 44px targets, safe-area bottom padding. `globals.css`: remove duplicate `.timeline-dot-active`, add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }`, `min-h-dvh` on the shell.

- [ ] **Step 1: Write failing e2e tests** (`playwright.config.ts`: `webServer: { command: "npm run build && npm run start -- -p 3100", url: "http://localhost:3100", reuseExistingServer: true, timeout: 240_000 }`, projects `chromium`; `tests/e2e/navigation.spec.ts`):

```ts
test("each route is directly loadable with one h1 and active nav", async ({ page }) => {
  for (const [path, h1] of [["/about", "About"], ["/experience", "Experience"], ["/certifications", "Certifications"], ["/projects", "Projects"]]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(new RegExp(h1));
    await expect(page.locator(`header a[href="${path}"][aria-current="page"]`).first()).toBeVisible();
  }
});
test("unknown route shows custom 404 with nav", async ({ page }) => {
  const res = await page.goto("/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
test("arrow keys scroll the page instead of switching sections", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/experience");
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveURL(/\/experience$/);
});
test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test("Sheet link navigates, closes, and Back returns", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL(/\/experience$/);
    await expect(page.getByRole("dialog")).toBeHidden();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
  });
});
test.describe("no JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("content and nav links work", async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href="/experience"]').first().click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Experience/);
  });
});
test("nav fits at tablet and desktop widths", async ({ page }) => {
  for (const width of [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});
```

- [ ] **Step 2: Run** `npx playwright install chromium && npm run test:e2e -- navigation` → FAIL.
- [ ] **Step 3: Implement** per Interfaces and behaviour above.
- [ ] **Step 4: Run** `npm run lint && npm run typecheck && npm run test:e2e -- navigation` → PASS.
- [ ] **Step 5: Commit** — `feat: route-per-section shell with accessible nav and view transitions`

---

### Task 6: Section pages as server components

**Files:**
- Create: `components/sections/about.tsx`, `components/sections/timeline.tsx`, `components/sections/certifications.tsx`, `components/sections/projects.tsx`, `components/sections/latest-posts.tsx`, `tests/e2e/sections.spec.ts`
- Modify: `app/about/page.tsx`, `app/experience/page.tsx`, `app/certifications/page.tsx`, `app/projects/page.tsx`

**Interfaces:**
- Consumes: `buildTimeline`, `formatPeriod`, `getFeaturedRepos`, `getLatestPosts`, data exports, `<PageHeader>`.
- Produces: `<About />`, `<Timeline entries: TimelineEntry[] />`, `<Certifications items: Certification[] />`, `<ProjectGrid repos: Repository[]; error: boolean; limit?: number />`, `<LatestPosts posts: BlogPost[] />` (renders `null` when `posts.length === 0`). All server components, no framer-motion; entrance animation via CSS `animate-in fade-in` only.

Rules carried from the spec:
- Timeline card: logo + text; badges (`badge`, and "Current" when `current`) on their own row under the title below `sm`, inline at `sm`+; titles use `break-words`; date + location row `flex-wrap gap-x-3`; `logoScale` applied as inline `transform: scale()`.
- Tech-stack chips: no `cursor-pointer`, no hover colour change (non-interactive).
- Certification card is an `<a target="_blank" rel="noopener noreferrer">` with the `ExternalLink` icon **only when `verifyUrl` exists**; otherwise a plain card with no icon.
- Projects: `grid sm:grid-cols-2 lg:grid-cols-3`, repo name `break-all`; when `error` or empty, render "Browse my repositories on GitHub" link card instead of a grid. Page `export const revalidate = 3600`.
- About page includes `<LatestPosts posts={await getLatestPosts(3)} />` with heading "Latest writing" and a link to `SITE.blogUrl`; `export const revalidate = 86400`.

- [ ] **Step 1: Write failing e2e tests** (`tests/e2e/sections.spec.ts`)

```ts
test("server HTML contains section content", async ({ request }) => {
  expect(await (await request.get("/experience")).text()).toContain("Leading penetration testing");
  expect(await (await request.get("/certifications")).text()).toContain("Altered Security");
  expect(await (await request.get("/about")).text()).toContain("Cyber Security Professional");
});
test("timeline shows MSc between Kroll and Axiata", async ({ page }) => {
  await page.goto("/experience");
  const orgs = await page.locator("[data-timeline-org]").allTextContents();
  expect(orgs.slice(0, 3)).toEqual(["Kroll", "University of the West of England", "Axiata Digital Labs"]);
});
test("cert cards without verifyUrl are not links", async ({ page }) => {
  await page.goto("/certifications");
  await expect(page.locator("[data-cert] a")).toHaveCount(0); // no verifyUrl set yet
});
test("projects page renders cards or the GitHub fallback, never an empty grid", async ({ page }) => {
  await page.goto("/projects");
  const cards = await page.locator("[data-repo]").count();
  if (cards === 0) await expect(page.getByRole("link", { name: /Browse my repositories on GitHub/ })).toBeVisible();
  else expect(cards).toBeLessThanOrEqual(6);
});
```

- [ ] **Step 2: Run** `npm run test:e2e -- sections` → FAIL.
- [ ] **Step 3: Implement** the components and pages.
- [ ] **Step 4: Run** `npm run lint && npm run typecheck && npm test && npm run test:e2e -- sections` → PASS.
- [ ] **Step 5: Commit** — `feat: server-rendered about, experience, certifications and projects pages`

---

### Task 7: Home page hero and highlights, CV link

**Files:**
- Create: `components/hero/hero.tsx` (server), `components/hero/hex-avatar.tsx` (client), `components/hero/typewriter-role.tsx` (client), `lib/cv.ts`, `tests/unit/cv.test.ts`, `tests/e2e/home.spec.ts`
- Modify: `app/page.tsx`, `app/globals.css` (hero animation budget)
- Delete: `components/sections/hero-section.tsx`

**Interfaces:**
- Consumes: `getHeroStats`, `PROFILE`, `SITE`, `EXPERIENCES`, `CERTIFICATIONS`, `getFeaturedRepos`, `getLatestPosts`, `<ProjectGrid>`, `<LatestPosts>`.
- Produces: `getCvHref(): string | null` — returns `"/cv/udesh-bandara-cv.pdf"` iff `public/cv/udesh-bandara-cv.pdf` exists (checked with `fs.existsSync` at build time), else `null`.

Home layout: hero (status pill from `PROFILE.status`, `h1` name, typewriter role, one-line summary, CTAs "Get in Touch" [mailto] + "LinkedIn" + "Download CV" only when `getCvHref()` is non-null, 4 stats from `getHeroStats(..., new Date())`), then highlights: current role card linking to `/experience`, featured certs linking to `/certifications`, `<ProjectGrid limit={3}>` + "All projects" link, `<LatestPosts>`. `export const revalidate = 86400`.

Responsive rules: below `md`, text column first and avatar second at `size-40 sm:size-48`; `md`+ two columns with avatar right at `md:size-[280px] lg:size-[340px]`. Avatar wrapper `overflow-hidden` with padding so rings/glow stay inside. Stats `grid-cols-2 sm:grid-cols-4`, labels `text-[11px]` `whitespace-nowrap`. Remove the "VERIFIED" pill. Animation budget: keep `animate-float` and `.hex-ring-1`; remove `.hex-ring-2`, `hex-glitch-idle`, `hex-scanlines` keyframes/classes; `blur-3xl` glow only at `md`+. Typewriter: `<span className="sr-only">{roles.join(", ")}</span>` + animated span `aria-hidden`; under reduced motion render `roles[0]` statically (use `useReducedMotion` from framer-motion).

- [ ] **Step 1: Write failing tests**

```ts
// cv.test.ts
test("getCvHref returns null when the PDF is absent", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(false);
  expect(getCvHref()).toBeNull();
});
test("getCvHref returns public path when present", () => {
  vi.spyOn(fs, "existsSync").mockReturnValue(true);
  expect(getCvHref()).toBe("/cv/udesh-bandara-cv.pdf");
});
// home.spec.ts
test.describe("small phone", () => {
  test.use({ viewport: { width: 375, height: 667 } });
  test("name and primary CTA are above the fold", async ({ page }) => {
    await page.goto("/");
    const cta = await page.getByRole("link", { name: "Get in Touch" }).boundingBox();
    expect(cta!.y + cta!.height).toBeLessThanOrEqual(667);
  });
});
test("stats come from data", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Certifications", { exact: true }).locator("..")).toContainText("8");
});
test("no Download CV button without the file", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveCount(0);
});
test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("typewriter shows a full static role", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Penetration Tester", { exact: true })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run** `npm test -- cv && npm run test:e2e -- home` → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run** `npm run lint && npm run typecheck && npm test && npm run test:e2e -- home` → PASS.
- [ ] **Step 5: Commit** — `feat: rebuilt home hero with highlights, derived stats and optional CV`

---

### Task 8: SEO — metadata, OG images, sitemap, structured data

**Files:**
- Create: `lib/og.tsx`, `app/about/opengraph-image.tsx`, `app/experience/opengraph-image.tsx`, `app/certifications/opengraph-image.tsx`, `app/projects/opengraph-image.tsx`, `tests/unit/sitemap.test.ts`, `tests/e2e/seo.spec.ts`
- Modify: `app/layout.tsx` (metadata template, `metadataBase: new URL(SITE.url)`), each `app/*/page.tsx` (`export const metadata` with title, description, `alternates.canonical`), `app/opengraph-image.tsx`, `app/twitter-image.tsx` (re-export `default`, `size`, `contentType`, `alt` from `./opengraph-image`), `app/sitemap.ts`, `app/robots.ts`, `app/icon.tsx`

**Interfaces:**
- Produces: `renderOgImage(opts: { eyebrow: string; title: string; subtitle: string }): Promise<ImageResponse>` — 1200×630, background `#0f1520`, accent `#4ade80`-family green matching `--accent` dark, avatar right; used by every `opengraph-image.tsx`.
- Page descriptions (builder writes ≤155 chars each). JSON-LD: `Person` (existing object, `url: SITE.url`) in root layout; `BreadcrumbList` (Home → Page) on each subpage via an inline `<script type="application/ld+json">`.

- [ ] **Step 1: Write failing tests**

```ts
// sitemap.test.ts
test("sitemap lists every route with absolute URLs", () => {
  expect(sitemap().map((e) => e.url)).toEqual(
    ["", "/about", "/experience", "/certifications", "/projects"].map((p) => `https://udeshbandara.com${p}`));
});
// seo.spec.ts
test("each page has unique title, canonical and og:image", async ({ page }) => {
  const titles = new Set<string>();
  for (const p of ["/", "/about", "/experience", "/certifications", "/projects"]) {
    await page.goto(p);
    titles.add(await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://udeshbandara.com${p === "/" ? "" : p}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  }
  expect(titles.size).toBe(5);
});
test("og image route returns a PNG", async ({ request }) => {
  const res = await request.get("/experience/opengraph-image");
  expect(res.headers()["content-type"]).toBe("image/png");
});
```

- [ ] **Step 2: Run** `npm test -- sitemap && npm run test:e2e -- seo` → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4: Run** the same commands → PASS.
- [ ] **Step 5: Commit** — `feat: per-page metadata, branded OG images, full sitemap and breadcrumbs`

---

### Task 9: Device matrix, assets, cleanup, CI, docs

**Files:**
- Create: `tests/e2e/responsive.spec.ts`, `.github/workflows/ci.yml`
- Modify: `public/axiata.png` and `public/avatar-3d.png` (recompress), `app/layout.tsx` (load `Geist_Mono` as `--font-geist-mono`), `README.md`
- Delete: `public/favicon.ico` (keep `app/favicon.ico` + `app/icon.tsx`), and `public/profile_picture.png`, `public/kroll.svg` if `grep -r` finds no reference

- [ ] **Step 1: Write the failing device-matrix test**

```ts
const WIDTHS = [320, 375, 414, 768, 1024, 1440, 1920];
const ROUTES = ["/", "/about", "/experience", "/certifications", "/projects", "/nope"];
for (const width of WIDTHS) for (const route of ROUTES) {
  test(`no horizontal scroll at ${width}px on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  });
}
test("long repo names wrap at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/projects");
  await page.evaluate(() => {
    const el = document.querySelector("[data-repo] h3");
    if (el) el.textContent = "CSRF-protection-in-web-applications-via-Synchronizer-Token-Patterns";
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});
test("all interactive elements are at least 44px on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const small = await page.$$eval("header a, header button, footer a", (els) =>
    els.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < 44 || r.height < 44); }).length);
  expect(small).toBe(0);
});
```

- [ ] **Step 2: Run** `npm run test:e2e -- responsive` → note failures; fix layouts until it passes.
- [ ] **Step 3: Recompress assets** so `axiata.png` ≤ 40 KB and `avatar-3d.png` ≤ 150 KB at 800×800 (any lossless/near-lossless tool; keep PNG names so references don't change).
- [ ] **Step 4: CI** — `ci.yml` on push/PR: Node 20, `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npx playwright install --with-deps chromium`, `npm run test:e2e`.
- [ ] **Step 5: README** — routes, `npm test`/`test:e2e`, env vars (`NEXT_PUBLIC_APP_URL` now used; GA optional), where to edit `FEATURED_REPOS`, `verifyUrl`, `PROFILE.status`, and where to drop the CV PDF.
- [ ] **Step 6: Full verification** — `npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e` → all PASS. Then in a browser: Lighthouse mobile on `/` and `/experience` (target ≥95 all categories) and check headers with `curl -sI http://localhost:3100 | grep -i content-security`.
- [ ] **Step 7: Commit** — `chore: device-matrix tests, asset compression, CI and docs`

---

## Spec coverage map
Findings #1–2 → Tasks 5, 6, 8 · #3–11 → Tasks 5, 6, 7, 9 · #12–18 → Tasks 5, 6, 7 · #19–22 → Tasks 1, 2, 6, 7 · #23–26 → Tasks 2, 4 · #27–31 → Tasks 4, 6, 7, 9 · #32–38 → Tasks 1, 2, 5, 8, 9. CV and verifiable cert links ship as conditional UI (Tasks 6, 7); content arrives from Udesh.
