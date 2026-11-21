# UI/UX audit — udeshbandara.com (feat/portfolio-rebuild)

Date: 2026-11-21 · Method: live review in the browser (375 / 768 / 1440px, dark + light) plus a code-level token count, judged against the eight guidelines in `Desktop/Dev/UIUX/` (01 transitions, 02 form controls, 03 overlays, 04 cards, 05 pricing, 06 typography, 07 calendar, 08 engineered restraint) and Nielsen heuristics.

## Verdict

**Not perfect.** The rebuild fixed the engineering (routes, SEO, a11y 100, responsive, security), but the *visual language* is the "neon cyber portfolio" template that AI generators produce by default. A recruiter who has seen a few AI-built portfolios will recognise it in seconds. The fix is not more decoration — it is **removal plus a real design system**: fewer sizes, fewer colours, flat surfaces, and specific content.

Guidelines 05 (pricing) and 07 (calendar) don't apply — the site has neither. 02 applies only to the theme toggle (fine). 01, 03, 04, 06 and 08 apply heavily.

### Measured (code)

| Dimension | Now | Guideline target |
|---|---|---|
| Font sizes | **11** (11, 12, 13, 14, 15, 16, 18, 20, 30px + 2 fluid) | ≤ 5 from one ratio (06 §1–3) |
| Font weights | 3 (500 ×16, 600 ×24, 700 ×3) | 2: 400 read, 600 scan (06 §8) |
| Text colour roles | 2 (foreground, muted) + accent used as text **42×** | 3: primary / secondary / muted (06 §5) |
| Accent usage | **62** (42 text, 11 fills, 9 borders) | Scarce: primary CTA, links, current state (08 §13–14) |
| Corner radii | 5 (md, lg, xl, 2xl, full) | 1–2 (04 §27) |
| Spacing | off-grid 6 / 10 / 14px (`gap-1.5/2.5/3.5`) | 4px grid tokens (08 §27–28) |
| Card treatment | same glow card on **8** component types, incl. non-clickable | contextual, entity-only (04 §5, §29) |
| Infinite animations | 5 (float, ping ring, status ping, cursor blink, timeline pulse) | 0 decorative (01 §10, 08 §24) |
| Glass / blur | header, mobile sheet, avatar glow | none by default (08 §10) |

### 5-second test (home, desktop)
What is this? *A security person's portfolio* — clear. Primary action? *Get in Touch* — clear. What draws the eye first? **The glowing 3D cartoon avatar**, not the name or credentials. Hierarchy problem: the decoration out-ranks the evidence.

---

## Issues and fixes

Severity: **3** major (hurts credibility/usability) · **2** minor · **1** cosmetic. IDs reference your guideline audit codes where one fits.

### A. AI-slop tells (remove first)

| # | Issue | Where | Guideline | Sev | Fix |
|---|---|---|---|---|---|
| A1 | 3D cartoon avatar in a neon hexagon with glow, float, ping ring and gradient border. Reads as AI-generated and is the page's loudest element. | `components/hero/hex-avatar.tsx`, `globals.css .hex-*` | 01 §10, 08 §7/§10, H8 | 3 | Use a real professional photo (or none). Plain circle or 4:5 rounded-rect crop, 1px border, no glow/float/ring. Smaller than the name. |
| A2 | Typewriter cycling job titles with blinking cursor. Dated trope; the hero never states one clear position. | `typewriter-role.tsx` | 01 §10, H8 | 2 | One static line: "Offensive Security Consultant at Kroll — penetration testing and red teaming." Delete the component. |
| A3 | Four vanity stat tiles (4+, 8, 50+, **"UK / Based"** — not a stat). Template pattern. | `hero.tsx` stats `dl` | 04 §29, 08 §6 | 2 | Replace with one factual meta line under the title (e.g. *London · 4+ years · CREST CRT · CRTP · AWS SA*) in muted text with tabular numerals. |
| A4 | Pulsing "Open to opportunities" pill with ping animation. | `hero.tsx` | 08 §15, §24 | 1 | Static text (or remove if not true). No animation. |
| A5 | Decorative atmosphere: dot-grid background, accent gradient hairlines, `drop-shadow` glow filter, blur halo. | `layout.tsx`, `footer.tsx`, `globals.css` | 08 §7, §10 | 2 | Delete. Separation comes from surface levels + 1px borders. |
| A6 | Glass (backdrop-blur) floating pill nav with `shadow-xl`; filled bright-green active pill. | `components/layout/header.tsx` | 08 §10, §36; 06 §35 | 2 | Plain top bar: name left, links right, hairline bottom border, opaque surface. Active = foreground colour + 600 weight + 2px accent underline. |
| A7 | Terminal gimmick footer `$ whoami → offensive-security-consultant@kroll`. | `footer.tsx` | H8 | 1 | Replace with a plain line (name, © year, links). Keep monospace only for genuinely technical values. |
| A8 | An icon before every section heading (GraduationCap, Wrench, Briefcase, Award, BookOpen, Shield…). | about, home highlights, latest posts | anti-AI list (04 §35, 08 §45) | 2 | Remove heading icons. Keep icons only where they carry meaning (external-link, social logos). |
| A9 | Uppercase, widely tracked eyebrow labels on almost every block (EDUCATION, TOOLS & TECHNOLOGIES, NOW, FEATURED PROJECTS, stat labels). | 8 places | 06 §17–18 | 2 | Sentence-case section headings at the section size. Reserve one uppercase micro-label style, if any. |

### B. Cards and surfaces (guideline 04, 08)

| # | Issue | Where | Guideline | Sev | Fix |
|---|---|---|---|---|---|
| B1 | Everything is a card: bio, education, tools, stats, timeline entries, cert tiles, highlights, posts — all `card-glow`. | 8 component types | CARD-SYSTEM-001/002 | 3 | Cards only for **entities with one destination**: project, blog post, (optionally) certification with a verify link. Bio/education/tools become plain sections with headings and dividers. |
| B2 | Hover glow on **non-clickable** cards (bio, education, timeline, stats, certs without link) — false affordance. | `.card-glow` | CARD-SYSTEM-012, H4 | 3 | Hover state only on interactive cards, and as a surface/border change (≤100ms), never a glow. |
| B3 | Nested boxes: each tool is a bordered chip inside the bordered Tools card. | `about.tsx` tech grid | CARD-SYSTEM-006 | 2 | Plain 3-column list (category heading + items as text). No chip boxes. |
| B4 | Dark-mode elevation via accent-coloured `box-shadow` glow. | `.card-glow:hover` | CARD-SYSTEM-010/011 | 2 | Three tonal surfaces (bg / surface-1 / surface-2) + `1px` border one step lighter. No shadows in dark mode. |
| B5 | Bright white logo tiles in dark mode (timeline, education, certs) jump out as the brightest pixels on the page. | `org-logo.tsx` | 08 §18 | 2 | Smaller (32–40px), tonal tile in dark mode, or monochrome logos; consistent size. |
| B6 | Bento grid on /about with uneven card sizes. | `about.tsx` | 04 §32 | 2 | Single column of sections at a readable measure; two columns only where content is genuinely parallel. |

### C. Typography (guideline 06)

| # | Issue | Guideline | Sev | Fix |
|---|---|---|---|---|
| C1 | 11 font sizes incl. arbitrary 11 / 13 / 15px. | TYPOGRAPHY-001/002 | 2 | 5-step scale, ratio ≈1.25: **13 caption · 15 body · 19 component · 24 section · 30 page** (page title 26 on phones). Tokens in `@theme`. |
| C2 | Three weights; `font-medium` used for emphasis in 16 places. | TYPOGRAPHY-003 | 2 | 400 for reading, 600 for headings/labels/active nav only. |
| C3 | Accent green used as a text colour 42× (company names, links, roles, badges). | TYPOGRAPHY-007, 08 §14 | 2 | Text roles: `--text-primary`, `--text-secondary`, `--text-muted`. Accent text = links only. |
| C4 | No tabular numerals on dates, years, counts. | TYPOGRAPHY-008 | 1 | `font-variant-numeric: tabular-nums` on dates, stats, cert years. |
| C5 | Page widths jump between pages (`max-w-3xl` / `4xl` / `5xl`). | 06 §20, H4 | 2 | One layout width for all pages + `max-width: 65ch` for prose. |
| C6 | Centred text in featured cert tiles and on several headings at md+. | 08 §31–33 | 1 | Left-align content; centre only the single hero line on phones if desired. |
| C7 | **Overused font** — Geist is 91–95% of all text on every page (Impeccable `overused-font`). It is the `create-next-app` default and a strong template tell. | Impeccable, anti-AI | 2 | Choose a deliberate pairing during step 2 (one text family with good tabular figures + a mono for technical values). Run Impeccable `typeset` for candidates. |
| C8 | **Em-dash overuse** — 9 on /experience (Impeccable `em-dash-overuse`); a known AI-writing tell. Most are date ranges ("Jul 2024 — Present") and titles ("Assistant Engineer — InfoSec"). | Impeccable, 06 | 1 | En dash for ranges (`Jul 2024 – Present`), comma or parentheses in titles; rewrite copy without em dashes. |
| C9 | **Stragglers** on phones — single words alone on the last line of paragraphs (/experience ×3, /projects). | Impeccable `straggler` | 1 | `text-wrap: pretty` on body paragraphs; `text-wrap: balance` on headings. |

### D. Colour and status (guideline 08)

| # | Issue | Sev | Fix |
|---|---|---|---|
| D1 | Accent used for decoration (icons, borders, tints, pills, dots) so it no longer signals "primary/active". | 2 | Accent budget: primary CTA, text links, focus ring, current-role marker. Everything else neutral. |
| D2 | Badge overload: "Full-time" on every role, "Current", "Education", accent year pills on certs. | 2 | Drop "Full-time" (it's the default); "Current" as plain muted text "— Present"; years as muted tabular text. |
| D3 | Project language dot is always accent green regardless of language. | 1 | Neutral dot, or GitHub's language colours at low saturation. |

### E. Motion and transitions (guidelines 01, 08)

| # | Issue | Sev | Fix |
|---|---|---|---|
| E1 | Fade-in on every list item + zoom-in avatar + infinite float/ping/pulse/blink. | 2 | Remove entrance stagger and all infinite loops. Keep only the page transition. |
| E2 | Page change is a generic root cross-fade. Guideline 01 prefers shared-element where the same object appears on both pages. | 1 | Where it fits: home "Key certifications" chips → /certifications items; home "Now" card → current timeline entry (`view-transition-name` from stable ids). Elsewhere keep an instant/short fade. |
| E3 | Hover transitions 200ms on cards. | 1 | ≤100–150ms, surface/border only (08 §22–23). |

### F. Overlays (guideline 03)

| # | Finding | Sev | Fix |
|---|---|---|---|
| F1 | Mobile menu is a right-side drawer with scrim — a correct choice for navigation (modal interruption, focus trapped by Radix, Escape works). | — | Keep. |
| F2 | Drawer uses blur + 95% translucent surface; heavy scrim. | 1 | Opaque surface, lighter scrim, slide from the side ≤200ms, no blur. Consider a simple top-dropping menu instead of a drawer — the site has only 5 links. |

### G. Content and UX writing (biggest credibility gap for recruiters)

| # | Issue | Sev | Fix |
|---|---|---|---|
| G1 | Generic résumé phrasing ("Dedicated Cyber Security Professional…"); the same "Penetration Testing, Red Teaming & Cloud Security" line appears 3×. | 3 | Write in first person, specific and short. Lead with what you do and for whom. |
| G2 | One vague sentence per job; no outcomes, scope, or evidence. | 3 | 2–4 concrete bullets per role (engagement types, sectors, notable work, tools, any CVEs/talks/CTF results you can publish). |
| G3 | Project descriptions are raw GitHub text (some ungrammatical). | 2 | Curated one-line descriptions in `FEATURED_REPOS` data. |
| G4 | "From the blog" shows 2020–21 posts. | 2 | Hide until there's a recent post, or label the section "Writing" with years visible and no "latest" framing. |
| G5 | No proof elements recruiters look for: verified cert links, CV, a short "what I work on" summary. | 2 | Add Credly links (`verifyUrl`), the CV PDF, and a 3-line "Focus areas" section. |

---

## Proposed design direction: "engineered, not decorated"

A quiet, precise **consultant's dossier**: typography and alignment carry the design; colour is a signal, not a theme.

- **Surfaces:** 3 tonal levels per theme (`--surface-0/1/2`), 1px borders (`rgba(255,255,255,0.08)` dark), no shadows in dark mode, no blur.
- **Type:** one deliberately chosen text family (not the Geist default — see C7) with good tabular figures, plus a mono only for technical values (dates in timeline, cert IDs). Scale 13/15/19/24/30, weights 400/600, tight leading on headings (1.1–1.2), 1.5 on body, `-0.02em` on ≥24px, prose capped at 65ch.
- **Colour:** neutral greys carry ~95% of the UI; the green accent only for primary CTA, links, focus and the "current" marker. Check AA contrast in both themes.
- **Space:** 4px grid tokens (4/8/12/16/24/32/48/64); one page width; consistent section rhythm (48px desktop / 32px mobile).
- **Radius:** 8px for interactive cards and inputs, full for avatar/pills. Nothing else.
- **Motion:** page transition only (≤180ms), hover ≤100ms, no infinite animations, reduced-motion = none.
- **Layout:** plain top bar; home = name + one-line position + meta line + 2 CTAs, then "Now", key certs (as a list), 3 projects; /about = sections, not bento; timeline as a typographic list with small logos.

---

## Skills to use (researched)

| Skill | What it's for here | Install | Notes |
|---|---|---|---|
| **Impeccable** (Paul Bakaus) | Anti-pattern detector + commands such as `/audit`, `/polish`, `/typeset`, `/distill` to strip AI tells and tighten typography. Built on Anthropic's frontend-design skill. | `npx skills add pbakaus/impeccable` or `/plugin marketplace add pbakaus/impeccable` | **Best fit** for "remove the AI look". Command/rule counts differ between sources — check the repo. |
| **frontend-design** (Anthropic) | Sets a deliberate aesthetic direction and lists the clichés to avoid (default fonts, purple gradients, cookie-cutter layouts). | `npx skills add https://github.com/anthropics/skills --skill frontend-design` | Use for *direction*, but ignore its push toward atmospheric gradients — your guidelines (08) favour restraint. |
| **web-design-guidelines** (Vercel) | Audits UI code against Vercel's Web Interface Guidelines; outputs `file:line` findings (a11y, focus, forms, motion, typography details). | `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines` | Fetches the latest rules at review time; good as a final gate. |
| **ui-ux-pro-max** | Design-system generator that writes `design-system/MASTER.md` from a product description. | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` | Optional. Large style catalogue can itself push toward templates; your `.gitignore` shows it was used before. |
| Already installed here | `design-skills:design-systems` (tokens), `design-skills:design-elevation`, `design-skills:ux-writing` (copy), `design-skills:accessibility-audit`, `modern-web-guidance` | — | Enough to do the work without installing anything; the third-party ones add a second opinion and a detector. |

Third-party skills run with your permissions; read each SKILL.md before installing.

---

## Progress

| Step | Status | Commit | Detector (5 pages × 2 widths) |
|---|---|---|---|
| Baseline | — | — | 12 findings (overused-font ×10, em-dash ×1, straggler ×4 phone…) |
| 1 · Strip the slop | done | `40173a2` | unchanged (font/copy items belong to later steps) |
| 2 · Tokens + typeface | done | `c90ba9a` | **0 findings** |
| 3 · Layout + structure | done | (this commit) | **0 findings** |

Step 2 decisions: typeface **Newsreader 500** (headings) + **Source Sans 3 400/600** (body) + **IBM Plex Mono 400** (dates), chosen by Udesh from a live specimen. Scale 14 / 16 / 20 / 25 / 31 + fluid display 36–52px (16px body floor per Impeccable `typeset`). Text roles `foreground` / `foreground-secondary` / `muted-foreground`; surfaces `background` / `card` / `surface-2`; radii 8px controls, 12px cards; spacing on the 4px grid; `text-wrap: balance` on headings, `pretty` on prose; en dashes in date ranges.

Step 3 decisions: one 1024px column for every page, left edge aligned with the header name; About as divided sections (no bento, no chips, no brand icons); timeline typographic with the filled dot as the only "current" marker; certifications as a divided list (rows link only when a `verifyUrl` exists); 40px borderless logo tiles; neutral project language dot; Badge component, `react-icons`, `class-variance-authority` and `@radix-ui/react-slot` removed.

## Fix plan (in order)

1. **Strip the slop** — A1–A9, B2, E1 (mostly deletions; fast, high impact).
2. **Tokens** — C1–C3, D1, B4, spacing/radius tokens in `app/globals.css` `@theme`; refactor components to use them.
3. **Layout and IA** — header (A6), flatten /about (B1, B3, B6), one page width (C5), typographic timeline and cert list (B5, D2, C6).
4. **Content** — G1–G5 (needs your input: photo, achievements, Credly links, CV, curated project lines).
5. **Polish and gates** — shared-element transitions (E2), tabular numerals (C4), drawer (F2), then run Impeccable `/audit` + Vercel guidelines + Lighthouse; update e2e tests.

### Decisions needed from Udesh
- Real photo for the hero, or no photo?
- Keep "Open to opportunities"?
- Achievement bullets per role, Credly URLs, CV PDF, one-line project descriptions.
- Keep the blog section while the newest post is from 2021?

## Impeccable detector baseline (engine 0.1.27, 2026-11-21)

Live scan of all 5 routes on the dev server at 1440×900 and 390×844 (`impeccable detect --json --viewport …`):

| Rule | Severity | Where | Count |
|---|---|---|---|
| `overused-font` (Geist) | warning | every page | 5 per viewport |
| `em-dash-overuse` | advisory | /experience | 1 (9 dashes) |
| `straggler` | advisory | /experience, /projects (phone only) | 4 |

No contrast, tiny-text, overflow, gradient-text or broken-image findings. The detector is mechanical: hover-only glows, the avatar treatment, card overuse and copy quality are not in its rule set, so the manual findings above still stand. A source-only scan returns nothing because it cannot parse Tailwind classes; always scan the running site. Re-run after each fix step:

```bash
sh .claude/skills/impeccable/scripts/impeccable detect --json --viewport 1440x900 http://localhost:3000/ http://localhost:3000/about http://localhost:3000/experience http://localhost:3000/certifications http://localhost:3000/projects
```

## Sources
- [Improving frontend design through Skills — Anthropic](https://claude.com/blog/improving-frontend-design-through-skills)
- [frontend-design skill reference (anthropics/skills)](https://www.mintlify.com/anthropics/skills/reference/frontend-design)
- [Impeccable — tessl registry](https://tessl.io/registry/skills/github/pbakaus/impeccable) · [Impeccable README](https://cdn.jsdelivr.net/npm/impeccable@2.3.2/README.repo.md) · [Skill engineering and the case against one-shot AI design — Latent Space](https://www.latent.space/p/skill-engineering-design)
- [web-design-guidelines — skills.sh (vercel-labs)](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines)
- [ui-ux-pro-max-skill — GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
