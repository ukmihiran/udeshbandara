# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** recruiters, hiring managers and security leads evaluating Udesh Bandara for offensive-security roles. They arrive from LinkedIn, a CV, or a search for his name, often on a phone between other candidates, and decide within seconds whether to read further and make contact.
- **Secondary:** peers in the security community and potential clients who want to understand his work, tools and writing.

## Product Purpose

A personal portfolio that lets anyone understand Udesh's work and background quickly, and gives recruiters and employers a credible, low-effort path to contact him. Success: a visitor can say what he does, why he is credible, and how to reach him, and finds the evidence (roles, certifications, tools, research) without hunting.

## Positioning

The combination, not any single trait: consulting breadth (Big-4 and boutique consultancies, global clients in critical infrastructure and financial services) **plus** hands-on technical offensive depth (penetration testing, red teaming, Active Directory attack paths, cloud security) **plus** researcher/builder output (own open-source tools, a security blog). Confirmed by Udesh, 2026-11-21.

## Operating Context

- Visitors evaluate on desktop and on phones; first impression happens in the first viewport.
- Linked from LinkedIn, CV and the blog (cybernetgen.com); the site links back to LinkedIn, GitHub, the blog and email.
- Content is maintained by Udesh in code (`lib/data.ts`, `lib/site.ts`); GitHub repos and blog posts are fetched live with graceful fallbacks.

## Capabilities and Constraints

- Next.js App Router, statically generated pages with ISR; deployed on Vercel. Routes: `/`, `/about`, `/experience`, `/certifications`, `/projects`.
- Must stay fast and light: Lighthouse mobile Performance ≥ 95, Accessibility 100, no horizontal scroll 320–1920px, works without JavaScript, respects reduced motion. Static CSP (`script-src 'self' 'unsafe-inline'`): no third-party scripts or fonts from other hosts, with one exception: when Google Analytics is enabled (Vercel production, or `NEXT_PUBLIC_GA_ID` set; see `lib/analytics.ts`), the CSP also allows `https://www.googletagmanager.com` scripts and Google Analytics endpoints, and the GA script loads only after the visitor allows analytics in the consent banner.
- Undecided: a real photograph (current image is a stylised 3D avatar); whether "Open to opportunities" is shown.

## Brand Commitments

- Name: Udesh Bandara (alternate: Udesh Wiyasinghe). Title: Offensive Security Consultant at Kroll UK.
- Must not feel **too corporate** (a safe consultancy template) or **heavy/slow**. Field flavour and purposeful motion are acceptable.

## Evidence on Hand

- Roles: Kroll (2024–present), Axiata Digital Labs, CryptoGen, PwC Sri Lanka; MSc Cyber Security (UWE Bristol), BSc (SLIIT). `lib/data.ts`.
- Certifications: AWS Solutions Architect, CRTP, CREST CRT, CREST CPSA, CEH, Azure Fundamentals, eJPT, CCNA Cyber Ops (no verify links yet).
- Open-source repos on GitHub (curated in `FEATURED_REPOS`), blog posts on cybernetgen.com (newest 2021).
- **Exists but not yet supplied — never fabricate:** CVEs / disclosures, CTF / HackTheBox results and talks, sanitised case studies, concrete per-role achievements, CV PDF, Credly links. Sections for these render only from real data Udesh provides.

## Product Principles

1. Evidence over adjectives: show the work (roles, tools, research) rather than describing it.
2. Recruiter-first speed: who, what, why credible, and how to contact are clear in the first screen.
3. Honest by construction: no invented claims, metrics or credentials; empty evidence is hidden, not padded.
4. Fast everywhere: phone-first performance and accessibility are part of the design, not afterthoughts.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard navigable, visible focus, 44px touch targets, reduced-motion support, sufficient contrast in light and dark themes.
