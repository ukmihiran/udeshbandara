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

- **Responsive navigation**: Desktop floating nav + mobile drawer menu
- **Tabbed experience**: Home / About / Experience / Certifications / Projects
- **Theming**: Dark & light mode with `next-themes`
- **GitHub projects**: Server route `GET /api/repos` via Octokit
- **SEO**: `robots.txt`, `sitemap.xml`, Open Graph/Twitter images
- **Analytics (optional)**: GA4 via `NEXT_PUBLIC_GA_ID`

## Quickstart

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create `.env.local` in the project root (don’t commit it).

```bash
# Optional: used by /api/repos to fetch GitHub repositories
GH_TOKEN="your_github_token"

# Used for canonical URLs / metadata
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### GitHub token notes

- **Token is optional** (public repos can be fetched without one), but recommended to avoid rate limits.
- **Vercel**: add the token as **`GH_TOKEN`** in Project Settings → Environment Variables.
- **GitHub Environments/Secrets**: secret names **cannot** start with `GITHUB_`, so prefer `GH_TOKEN`.
- **Backwards compatible**: the code also supports `GITHUB_TOKEN` (local/dev), but `GH_TOKEN` is preferred.

## How “Projects” works

- UI fetches `GET /api/repos` from `components/sections/projects-panel.tsx`
- API route: `app/api/repos/route.ts`
- GitHub call: `lib/github.ts` (Octokit → `GET /users/{username}/repos`)

<details>
  <summary><strong>Architecture (high level)</strong></summary>
  <br />

```text
app/
  layout.tsx              # global layout, metadata, analytics (optional)
  page.tsx                # tabbed single-page shell
  api/repos/route.ts      # GitHub repos API (server)
components/
  ui/                     # shared UI (Header, Sheet, Buttons, etc.)
  sections/               # tab panels (Hero/About/Experience/Certs/Projects)
lib/
  data.ts                 # content (tabs, experience, certifications, etc.)
  github.ts               # Octokit GitHub fetcher
public/                   # static assets (logos/images)
```

- **Content updates**: start in `lib/data.ts` (experience/certs/education/etc.).
- **UI changes**: edit section components in `components/sections/`.
</details>

<details>
  <summary><strong>Stack & scripts</strong></summary>
  <br />

**Stack**

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** + PostCSS
- **Radix UI** primitives (Sheet/Dialog) + component layer
- **Octokit** (GitHub API)

**Scripts**

```bash
npm run dev
npm run build
npm run start
npm run lint
```
</details>

## Deploy

Deploy on **Vercel** and set:

- `NEXT_PUBLIC_APP_URL` (your production domain)
- `NEXT_PUBLIC_GA_ID` (optional)
- `GH_TOKEN` (optional)

## License

All rights reserved — this is my personal portfolio. If you want to reuse parts of it, please contact me first.
