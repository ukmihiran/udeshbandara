<div align="center">
  <h1>udeshbandara.com</h1>
  <p>Minimal, modern personal portfolio built with Next.js.</p>

  <p>
    <a href="https://udeshbandara.com"><strong>Live</strong></a>
    ·
    <a href="#quickstart"><strong>Quickstart</strong></a>
    ·
    <a href="#environment-variables"><strong>Environment</strong></a>
    ·
    <a href="#deploy"><strong>Deploy</strong></a>
  </p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white" />
    <img alt="Vercel" src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white" />
  </p>

  <p>
    <strong>Tags</strong>: Portfolio · Cybersecurity · UI/UX · Performance · SEO
  </p>

  <p>
    <strong>Built for</strong>: Performance · Accessibility · SEO
  </p>
</div>

## About

This is my personal portfolio web app. It’s designed to be fast, accessible, and responsive, with dark/light mode and sections for experience, certifications, and projects.

## Preview

<p align="center">
  <img alt="udeshbandara.com preview" src="https://udeshbandara.com/opengraph-image" />
</p>

## Highlights

- **A page per section**: `/`, `/about`, `/experience`, `/certifications`, `/projects`, all server-rendered and statically generated, with smooth View Transitions between them
- **Works on every screen**: tested at 320–1920px wide with no horizontal scroll; floating nav from 1024px up, a menu sheet below that
- **Accessible**: skip link, `aria-current` nav, 44px touch targets, respects reduced motion, works without JavaScript
- **Live content**: GitHub repos (refreshed hourly) and recent posts from the [Cybernetgen](https://cybernetgen.com/) RSS feed (refreshed daily); both degrade gracefully if unreachable
- **SEO**: per-page titles, descriptions, canonical URLs, branded Open Graph images, sitemap and JSON-LD
- **Security**: Content-Security-Policy and hardening headers, `/.well-known/security.txt`
- **Privacy-friendly analytics**: Vercel Web Analytics + Speed Insights (cookieless); Google Analytics only if you set an ID

## Quickstart

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editing content

Everything lives in `lib/data.ts` and `lib/site.ts`:

| What | Where |
| --- | --- |
| Jobs, education, certifications, tools | `EXPERIENCES`, `EDUCATION`, `CERTIFICATIONS`, `TECH_STACK` in `lib/data.ts` |
| Featured GitHub repos (shown first, in order) | `FEATURED_REPOS` in `lib/data.ts` |
| Status pill, engagements count, typewriter roles | `PROFILE` in `lib/data.ts` |
| Name, email, social links, blog feed | `SITE` in `lib/site.ts` |
| Per-page titles and descriptions | `PAGE_META` in `lib/seo.ts` |

- **Certificate verification links**: add `verifyUrl` (e.g. a Credly URL) to a certification and its card becomes a link.
- **CV download**: drop your PDF at `public/cv/udesh-bandara-cv.pdf`. The "Download CV" button appears on the next build.
- **Years of experience** and the **certification count** in the hero are calculated from the data, so they stay correct.

## Environment variables

Create `.env.local` (don't commit it). All are optional.

```bash
# Site URL for canonical links, sitemap and OG images (defaults to https://udeshbandara.com)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# GitHub token: raises the API rate limit for /projects (public repos work without it)
GH_TOKEN="your_github_token"

# Google Analytics 4. Leave unset unless you add a cookie-consent banner (UK PECR).
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

GitHub Actions secret names can't start with `GITHUB_`, so prefer `GH_TOKEN` (`GITHUB_TOKEN` also works locally).

## Testing

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm test            # Vitest unit tests (tests/unit)
npm run test:e2e    # Playwright: builds, starts on :3100, runs tests/e2e
```

First time running e2e: `npx playwright install chromium`. CI (`.github/workflows/ci.yml`) runs all of the above plus `npm audit` on every push and pull request.

<details>
  <summary><strong>Architecture</strong></summary>
  <br />

```text
app/
  layout.tsx              # shell: header, footer, skip link, analytics, JSON-LD
  page.tsx                # home: hero + highlights
  about/ experience/ certifications/ projects/   # one route per section
  */opengraph-image.tsx   # branded social cards (lib/og.tsx)
  sitemap.ts robots.ts not-found.tsx error.tsx
components/
  layout/                 # header, mobile nav, footer, container, page transition
  hero/                   # hero (server) + avatar and typewriter (client islands)
  sections/               # about, timeline, certifications, projects, blog posts
  ui/                     # small primitives (badge, sheet, mode toggle)
lib/
  data.ts site.ts         # content and site config
  format.ts               # dates, hero stats, combined timeline
  github.ts blog.ts       # server data fetching (never throws)
  csp.ts seo.ts og.tsx    # headers, metadata, social images
tests/unit tests/e2e
```

</details>

## Deploy

Deploy on **Vercel**. Optionally set `NEXT_PUBLIC_APP_URL`, `GH_TOKEN` and `NEXT_PUBLIC_GA_ID`.

## License

All rights reserved — this is my personal portfolio. If you want to reuse parts of it, please contact me first.
