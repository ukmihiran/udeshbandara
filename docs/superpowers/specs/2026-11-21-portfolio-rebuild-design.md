# udeshbandara.com — Portfolio rebuild design

Date: 2026-11-21 · Branch: `feat/portfolio-rebuild` · Approach: separate pages per section with View Transitions

## Intent
A general personal portfolio so anyone — especially recruiters and employers — can understand Udesh's work and background. The blog stays on cybernetgen.com and is linked, not merged.

- **Goals:** every section findable by Google and shareable by URL; smooth and correct on all phones, tablets and desktops; quick credibility for recruiters.
- **Non-goals:** moving the blog into this site; a CMS; services/sales pages for consulting clients.
- **Anti-goals:** losing the dark navy + green "cyber" identity; heavier or slower pages than today.

## Approaches
1. One scrolling page with anchor nav — simplest code, best skimming; loses the tab feel.
2. **Separate pages per section with View Transitions — chosen.** Keeps today's feel, each section gets a URL and link preview, Back button works. More files; visitors click per section.
3. Patch the tabs in place — least effort, but content stays hidden from crawlers and the quirks remain.

## Current state (verified 2026-11-21)
Single `"use client"` page (`app/page.tsx`) with tab state; About/Experience/Certifications/Projects load via `dynamic(..., { ssr: false })`. Verified on the live site:
- Section text absent from server HTML; URL never changes; sitemap has one URL.
- 768px: desktop nav spans edge to edge; document 801px wide (avatar glow/rings overflow).
- 375px: 56px double top padding (sticky header + `main pt-14`); hero CTA ends at y=743 (below the fold on 667px phones); Experience "Full-time" badge clipped.
- No CSP header, no `/.well-known/security.txt`; GA always on via hard-coded fallback ID, no consent.

Full issue list (38 items) is in the review findings section at the end of this document.

## Architecture
- **Routes** (App Router, Server Components, static): `/` (hero + highlights: latest role, top certs, 3 featured projects, latest blog posts), `/about`, `/experience`, `/certifications`, `/projects` (ISR, `revalidate = 3600`), plus `not-found.tsx` and `error.tsx`.
- `app/layout.tsx` owns Header + Footer so the shell stays mounted.
- Nav: `next/link` + `usePathname()`, `aria-current="page"`, skip link. Global arrow/number-key handler removed.
- Transitions: `experimental.viewTransition: true` + `unstable_ViewTransition` around page content, off under reduced motion. Fallback: CSS fade in `app/template.tsx` if the flag misbehaves on Next 16.1.6.
- Client islands only: header (menu + active state), mode toggle, typewriter, small motion wrappers. framer-motion via `LazyMotion` + `m` only, inside `<MotionConfig reducedMotion="user">`.
- SEO: per-route `metadata` with title template `"%s | Udesh Bandara"`, one shared OG renderer (`lib/og.tsx`) matching the site palette, full `sitemap.ts`, JSON-LD `Person` on home and `BreadcrumbList` on subpages.
- GitHub: delete `app/api/repos`; `lib/github.ts` uses `fetch` with `next: { revalidate: 3600 }`, maps to `Repository` fields only, filters forks/archived/profile repo, supports a curated list in `lib/data.ts`. Drop `@octokit/rest`.
- Blog: server fetch of the cybernetgen.com RSS/Atom feed (daily revalidate); section hides on failure.
- One `lib/site.ts` holding the site URL (from `NEXT_PUBLIC_APP_URL`, default `https://udeshbandara.com`), name and socials.

## Responsive system
- Breakpoints: phone <640 · large phone 640–767 · tablet 768–1023 · desktop ≥1024 · wide ≥1440 (max-width caps).
- Hamburger Sheet below `lg`; floating pill nav from `lg`. Mobile header `fixed` with matching top padding on `main`.
- `dvh`/`svh` instead of `100vh`; `viewport` export with light/dark `themeColor` and `viewportFit: "cover"`; safe-area padding on header, footer, Sheet.
- Hero on phones: text + CTA first, avatar 160–200px after it; glow/rings inside an `overflow-hidden` wrapper. Stats derived from data, labels ≥11px, no wrapping.
- Experience: badges stack under the title below `sm`; combined timeline includes the MSc 2022–23.
- Projects grid: 2 cols tablet, 3 desktop, last row centred; server-rendered, no skeleton shift.
- Fluid type with `clamp()`; touch targets ≥44px.

## Content & recruiter features
- CV download in hero + header from `public/cv/`; hidden until the PDF exists (Udesh to supply).
- Optional `verifyUrl` per certification; cards are links only when a URL exists.
- "VERIFIED" avatar badge replaced by an editable status line (default "Open to opportunities"). *Builder's call — confirm with Udesh.*
- Socials/links single-sourced in `lib/data.ts`; per-logo `logoScale` in data instead of string checks in components.

## Security, privacy, performance
- Strict CSP with per-request nonce via `proxy.ts` (Next 16) — `script-src 'nonce-…' 'strict-dynamic'`; analytics origins only as needed. `public/.well-known/security.txt`.
- Analytics: GA only when `NEXT_PUBLIC_GA_ID` is set (no hard-coded fallback); add Vercel Web Analytics + Speed Insights (cookieless). *Open: Udesh to decide whether to drop GA (recommended) or keep it with a consent banner.*
- Hero animation budget: keep float + one ring; drop hue-rotate glitch and scanline scroll on phones and under reduced motion.
- `/public` image cache: `max-age=86400, stale-while-revalidate=604800` instead of `immutable`. Recompress `axiata.png` (546 KB) and the avatar.
- Typewriter: static `sr-only` text, animated text `aria-hidden`, static under reduced motion. Header logo `alt=""`.

## Cleanup
Remove `@radix-ui/react-avatar`, `autoprefixer`, `@octokit/rest`, `.eslintrc.json`, `public/favicon.ico` duplicate, dead `SOCIALS`/`Social`/`mainRef`; load Geist Mono (used by `font-mono`); dedupe `.timeline-dot-active`; stable list keys; README updated.

## Left to the builder
Animation timings, highlight blurb copy, OG layout details, default featured repos (most-starred non-forks until curated).

## Verification
- `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Every route at 320, 375, 414, 768, 1024, 1440, 1920 wide: `scrollWidth === innerWidth`, nav fits, hero CTA above the fold at 375×667.
- Page source contains each section's text.
- Keyboard-only pass, screen-reader smoke test, reduced-motion emulation.
- Lighthouse mobile ≥95 in all four categories; securityheaders.com grade A.

---

## Appendix: review findings (38)

**SEO / discoverability** — 1 panels client-only (`ssr:false`); 2 no per-section URLs, one-URL sitemap.
**Responsive** — 3 nav spans full width at 768px; 4 avatar glow overflows (801px doc at 768); 5 mobile double top padding; 6 hero CTA below fold on small phones; 7 Experience badge clipped / title squeezed on mobile; 8 stat labels wrap, 10px text; 9 `100vh` jumps on mobile; 10 no safe-area / theme-color; 11 projects orphan row + skeleton shift.
**Accessibility** — 12 arrow keys hijacked; 13 no nav ARIA state or focus management; 14 typewriter not accessible / ignores reduced motion; 15 framer-motion ignores reduced motion; 16 false affordances (tech chips, cert external-link icon); 17 small touch targets; 18 redundant header logo alt.
**Content** — 19 "10+ certs" vs 8 listed; 20 "featured" = recently pushed; 21 unexplained 2022–24 gap; 22 meaningless "VERIFIED" badge.
**Security / privacy** — 23 no CSP; 24 no security.txt; 25 GA always on, no consent; 26 API returns full GitHub payload, errors look like empty.
**Performance** — 27 heavy infinite hero animations + backdrop blur; 28 full `motion` defeats LazyMotion; 29 immutable cache on un-hashed images; 30 oversized logo/avatar sources; 31 projects fetched client-side.
**Code quality** — 32 unused deps/code/files; 33 socials defined 3×; 34 logo-scale string hacks; 35 duplicated OG/Twitter images with off-brand palette; 36 `NEXT_PUBLIC_APP_URL` documented but unused; 37 duplicate CSS rule, index keys; 38 no 404/error pages, tests or CI.
