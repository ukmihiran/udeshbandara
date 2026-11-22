---
name: Udesh Bandara
description: Portfolio of an offensive security consultant, built like a well-made developer tool.
colors:
  graphite-ground: "oklch(0.155 0.003 270)"
  graphite-card: "oklch(0.185 0.004 270)"
  graphite-raised: "oklch(0.225 0.005 270)"
  ink: "oklch(0.97 0.002 270)"
  ink-secondary: "oklch(0.82 0.004 270)"
  ink-muted: "oklch(0.69 0.006 270)"
  hairline: "oklch(1 0 0 / 8%)"
  hairline-strong: "oklch(1 0 0 / 15%)"
  lit-edge: "oklch(1 0 0 / 7%)"
  signal-green: "oklch(0.8 0.16 155)"
  signal-green-ink: "oklch(0.17 0.03 155)"
  paper-ground: "oklch(0.985 0.001 270)"
  paper-card: "oklch(1 0 0)"
  paper-raised: "oklch(0.955 0.002 270)"
  graphite-ink: "oklch(0.19 0.006 270)"
  graphite-ink-secondary: "oklch(0.36 0.008 270)"
  graphite-ink-muted: "oklch(0.47 0.008 270)"
  hairline-light: "oklch(0.19 0.006 270 / 9%)"
  hairline-strong-light: "oklch(0.19 0.006 270 / 18%)"
  signal-green-deep: "oklch(0.5 0.14 155)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 4vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  page:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.6rem + 1.75vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  section:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.75vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.45
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.6
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.45
  meta:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "\"tnum\" 1"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  hairline-gap: "4px"
  card-gap: "12px"
  gutter: "16px"
  gutter-wide: "24px"
  card-padding-compact: "20px"
  card-padding: "24px"
  section: "80px"
  section-wide: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.signal-green-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "oklch(0.8 0.16 155 / 90%)"
  button-secondary:
    backgroundColor: "{colors.graphite-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.graphite-raised}"
  card:
    backgroundColor: "{colors.graphite-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-padding}"
  card-link-hover:
    backgroundColor: "{colors.graphite-raised}"
  tag:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "4px 10px 5px"
  nav-link:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 12px"
    height: "36px"
  nav-link-active:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.ink}"
  icon-button:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.lg}"
    size: "44px"
  icon-button-hover:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.ink}"
  status-dot:
    backgroundColor: "{colors.signal-green}"
    rounded: "{rounded.full}"
    size: "8px"
  org-logo:
    backgroundColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "4px"
    size: "40px"
---

# Design System: Udesh Bandara

## Overview

**Creative North Star: "The Well-Made Tool"**

The site reads like a calm, crisp developer product rather than an editorial page or a consultancy template. It is a near-black graphite world (dark is the default theme; a paper-white light theme mirrors the same structure exactly), built from stepped surfaces, 1px hairlines and one restrained signal green. The quality bar is the category canon: Raycast's quiet, precise product UI and Resend's single animated 3D object in the hero. Everything else holds still so that the one moving thing, a monochrome Rubik's cube, can carry the personality.

Density is product-UI density: compact cards on a 12px grid gap, small keycap tags, 14px captions for metadata, and a single content column that every page shares with the header. Information is shown as evidence (roles, certifications, tools, repositories) in bordered cards and a changelog-style timeline, never as stat tiles or adjectives. Depth comes from tone and light, not shadow: a card is one step lighter than the ground and carries a lit hairline on its top edge.

The direction was chosen deliberately as the category standard and executed at full commitment. That includes Geist: the font detector flags it as overused, and the choice stands because Geist is the native face of the developer-tool canon this site places itself in. Its familiarity is the signal ("this person ships tools"), not a default that slipped through.

**Key Characteristics:**
- Near-black graphite ground with two lighter surface steps; light theme mirrors it.
- 1px hairline borders plus a lit top edge; no outer shadows, no glow, no glass.
- One signal green for status, primary action and focus; everything else is greyscale.
- Geist for display and body, Geist Mono only for dates, years and figures.
- Five fixed type sizes plus one fluid hero name.
- One authored motion moment: the 27-cubelet hero cube, which stops under reduced motion.

## Colors

A greyscale graphite system tinted a hair toward blue (hue 270, chroma under 0.01), with a single green that means "alive" or "act here".

### Primary
- **Signal Green** (`signal-green`; `signal-green-deep` in light): the only chromatic colour. Fills the primary button, the "Open to opportunities" status dot, the current-role dot on the timeline, the small dot that marks featured certifications, the focus ring, text selection (at 32%), caret and native control accents. It also lights the few travelling stickers on the hero cube.
- **Signal Green Ink** (`signal-green-ink`): text and icons on a green fill. In light mode the button text is near-white instead.

### Neutral
- **Graphite Ground** (`graphite-ground` / `paper-ground`): page background, header background (solid, never translucent).
- **Graphite Card** (`graphite-card` / `paper-card`): surface 1. Cards, the secondary button fill, the footer band.
- **Graphite Raised** (`graphite-raised` / `paper-raised`): surface 2. Hover state of clickable cards and icon buttons, active nav item, tag fill, icon wells.
- **Ink** (`ink` / `graphite-ink`): headings, names, primary text.
- **Ink Secondary** (`ink-secondary` / `graphite-ink-secondary`): descriptions, body paragraphs, supporting lines under titles.
- **Ink Muted** (`ink-muted` / `graphite-ink-muted`): metadata, dates, nav at rest, footer links, icon buttons at rest.
- **Hairline** (`hairline` / `hairline-light`): every border and divider; the timeline rail.
- **Hairline Strong** (`hairline-strong` / `hairline-strong-light`): hovered card border, secondary button border, the keycap bottom edge on tags, the timeline dot ring.
- **Lit Edge** (`lit-edge`): the 1px inset highlight on the top edge of cards. Fully transparent in light mode, where white cards need no help.

### Named Rules
**The Signal Rule.** Green means status, primary action or keyboard focus (plus the cube motif that carries the identity). It never marks data: the repository language dot is neutral grey, and there is one filled green dot on the timeline, for the current role only.

**The Mirror Rule.** Light and dark are the same structure with different values. Every role exists in both themes; a component never picks a colour that exists in only one.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace)

**Character:** One neutral grotesk does all the speaking, at three weights (400, 500, 600), tightened at large sizes. Geist Mono appears only where numbers need to line up or read as data. Both load through next/font from the site's own origin.

### Hierarchy
- **Display** (600, fluid 44 to 76px, line-height 1.02, -0.035em): the hero name only. The one heading allowed off the fixed scale.
- **Page** (600, fluid 32px on phones to 44px from 1280px, 1.08, -0.03em): the H1 on inner pages.
- **Section** (600, fluid 22px on phones to 28px from 1280px, 1.2, -0.02em): section H2s via the section heading pattern, and the closing contact heading, so it never outranks the page H1.
- **Title** (600, 18px, 1.45): card titles, timeline role titles, the profile name; at 400 for the hero role line, the lead paragraph and page-header descriptions.
- **Body** (400, 16px, 1.6): paragraphs, capped at 52 to 65ch. Buttons use body size at 500.
- **Caption** (400, 14px, 1.45): metadata, card descriptions, footer, nav; at 500 for nav labels. The floor: no text is ever smaller than 14px.
- **Meta** (Geist Mono 400, 14px, tabular figures): date ranges, certification years, post dates.

### Named Rules
**The Five Sizes Rule.** Text roles are fixed at 14, 16 and 18px; the section (22→28px) and page (32→44px) headings are fluid, plus the fluid hero name. No other size, no text under 14px. All sizes are in rem, so they follow the visitor's browser font setting. An e2e guard enforces this on every page at 1280px and checks the phone end at 375px.

**The Numbers-in-Mono Rule.** Geist Mono is for dates, years and figures, nothing else. Date ranges set the en dash in the sans face, because a monospaced en dash is as short as a hyphen.

**The Quiet Wrap Rule.** Headings use balanced wrapping; paragraphs, list items and definitions use pretty wrapping.

## Layout

One content column, `max-width: 72rem` (Tailwind `max-w-6xl`), centred, with 16px gutters on phones and 24px from 640px. The header uses the same column, so every page's H1 starts at the same x as the site name in the header. Inner pages open with a page header (32→44px H1, an 18px description capped at 60ch, then a hairline rule and 48px of space); content sits below with 40px top padding (64px from 768px) and 80px at the bottom.

The home page is a sequence of blocks separated by 80px (96px from 768px): the hero, a two-up pair of summary cards (Career, Certifications), selected projects, the blog, and the contact close. The hero is two columns from 1024px (7/12 text, 5/12 cube), at least 40rem tall or the viewport below the header, whichever is smaller; on phones the cube comes first, compact (13.5rem tall), above the name and buttons.

Card grids use a 12px gap: projects at 1, 2 and 3 columns, certifications at 1, 2 and 4, blog posts at 1 and 3. A lone last card in a two-column row spans both columns. The About page is a 4/8 split from 1024px with a sticky profile column. The experience timeline is a changelog: dates sit in their own right-aligned column to the left of the rail from 640px, and above the entry on phones.

Touch targets are at least 44px everywhere (buttons, nav links in the mobile menu, icon buttons, footer links). The fixed header is 56px plus the top safe-area inset; the layout respects safe areas on all four sides.

### Named Rules
**The One Column Rule.** Every page shares the header's column and gutters. Nothing breaks out to full bleed except the header and footer bands.

## Elevation & Depth

The system is flat and tonal. Depth is conveyed by three surface steps (ground, card, raised) and by light, not by cast shadows. A card is the card surface with a 1px hairline border and a 1px inset highlight along its top edge, the way Raycast lights a panel. Tags carry the inverse: a 1px inset line along the bottom edge, so they read as keycaps.

### Shadow Vocabulary
- **Lit top edge** (`box-shadow: inset 0 1px 0 var(--card-highlight)`): every card. Visible only in dark mode.
- **Keycap edge** (`box-shadow: inset 0 -1px 0 var(--border-strong)`): tags only.

### Named Rules
**The Lit Edge Rule.** The only elevation is a 1px inset line. No outer shadows, no blur, no glow, no backdrop-filter, at rest or on hover.

**The Flat Hover Rule.** Only whole-card links react to hover, and they react by stepping up one surface (card to raised) and brightening the border to hairline-strong, in 150ms ease-out. Cards that are not links never change on hover.

## Shapes

Gently rounded and consistent by size: 6px for small objects (tags, organisation logo tiles), 8px for controls (buttons, nav items, icon buttons, contact links, icon wells), 12px for cards. Circles are reserved for dots (status, timeline, language, featured marks) and the theme and menu toggles. Borders are always 1px; the only dashed border is the GitHub fallback card shown when repositories cannot be fetched. The brand mark is the profile picture as a 28px circle with a hairline border.

## Components

### Buttons
Crisp and quiet: two variants, both 44px tall, 8px radius, 16px medium label, 20px horizontal padding, an optional 16px leading or trailing icon.
- **Primary:** signal green fill with dark green ink. Hover drops the fill to 90%; press nudges it down 1px. One per group, for the main action ("Get in touch", email).
- **Secondary:** card surface with a hairline-strong border and ink text. Hover steps the fill to raised and lifts the border to 30% ink. Used for "View projects", "Download CV", LinkedIn.
- **Section link:** a 14px muted text link with a trailing arrow, beside section headings ("All projects"). Brightens to ink on hover.
- **Focus:** every focusable element shows the same 2px solid signal-green outline at a 2px offset.

### Tags
Keycap-style labels for tools and certification names: raised surface, hairline border, 6px radius, 14px ink text, a slightly heavier bottom edge. Never interactive. A featured certification carries a 6px green dot before its name.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** card surface; raised on hover when the card is a link.
- **Shadow Strategy:** the lit top edge only (see Elevation & Depth).
- **Border:** 1px hairline; hairline-strong on hover for links.
- **Internal Padding:** 24px (20px for the denser certification cards).
- **Anatomy:** an 18px semibold title, a 14px secondary description, then metadata or a footer link pinned to the bottom ("Full experience" with an arrow that brightens with the card). Repository cards show language (neutral dot), stars and forks in 14px muted tabular figures; the corner arrow drifts up and right 2px on hover.
- Cards never nest. A summary card may hold a list or tags, never another bordered card.

### Navigation
- **Header:** fixed, solid ground colour with a bottom hairline. Brand mark plus name (16px semibold) on the left. From 1024px, nav items are 14px medium labels, 36px tall, 8px radius: muted at rest, ink on hover, raised fill when current. A 1px divider separates them from a "Blog" text link, 44px icon buttons (LinkedIn, email, CV) and the theme toggle.
- **Mobile:** a theme toggle and a menu button open a right-side sheet (up to 20rem wide) with 44px rows at 16px, the current page in semibold on a muted fill. It opens in 200ms or less and closes on any navigation, including Back.
- **Footer:** a card-surface band with the brand, a one-line description, a 14px link list and 44px social icon buttons.

### Timeline
Work and study on one rail: a 2px hairline rail, 16px ring dots with a hairline-strong border on the ground colour, and a filled green dot for the current role only. Entries pair a 40px logo tile with an 18px role title, organisation in secondary ink and location in muted. There are no employment-type or "Current" badges; the dot says it.

### Organisation logos
Small white tiles, 40px (32px in the home career card), 6px radius, 4px inset, no border. Logos ship on white, so the tile stays white in both themes but stays small so it never becomes the brightest object on a dark page.

### Hero Cube (signature)
A 3 by 3 Rubik's cube in WebGL (three.js, `components/hero/cube-scene.ts`): 27 rounded, glossy black cubelets (clearcoat, studio-environment reflections) with six signal-green stickers. Layers take eased quarter turns on all three axes (700ms, 450ms pause), the cube tumbles slowly, and it can be dragged to spin with momentum. It renders in a Web Worker on an OffscreenCanvas (main-thread fallback), pauses off-screen and in hidden tabs, and holds one still frame under reduced motion. Server HTML paints `/cube-poster.png`, a capture of the scene's exact first frame (`npm run cube:poster`), so the live scene takes over with no visible change; the poster is also the no-JavaScript fallback. Decorative and hidden from assistive technology.

**The One Moving Thing Rule.** The hero cube is the only infinite animation on any page, and under `prefers-reduced-motion: reduce` it holds completely still. All other motion is a response to the user: 100 to 150ms colour and surface transitions, 180ms page cross-fades and 220ms shared-element morphs through view transitions (a certification or the current role keeps one identity across pages), all disabled under reduced motion.

## Do's and Don'ts

### Do:
- **Do** set text only in the five roles (14, 16, 18px, the fluid 22→28px section and 32→44px page headings) or the fluid hero display, and never below 14px.
- **Do** use Geist at 400, 500 and 600 and Geist Mono at 400 only, with Mono reserved for dates, years and figures.
- **Do** separate surfaces with a 1px hairline and give every card the 1px lit top edge.
- **Do** make hover on a card link a surface step (card to raised) and a border step (hairline to hairline-strong) in 150ms ease-out.
- **Do** keep signal green for status, the primary action, focus and selection, and the cube motif.
- **Do** keep every interactive target at least 44px and show the 2px green focus ring at a 2px offset.
- **Do** align every page's content to the header's single column, and cap prose at 52 to 65ch.
- **Do** build every new colour role in both the dark and light themes.

### Don't:
- **Don't** use backdrop-filter or glass, gradient text, or decorative radial-gradient backgrounds (dot grids, halos).
- **Don't** put uppercase eyebrow or kicker labels above headings, and don't use uppercase text anywhere in page content.
- **Don't** nest a bordered card inside another card.
- **Don't** add outer, blurred or glowing shadows, at rest or on hover.
- **Don't** add another infinite animation; the hero cube is the only one, and it stops under reduced motion.
- **Don't** put icons inside headings.
- **Don't** make non-link cards react to hover.
- **Don't** use the accent colour for data marks such as language dots.
- **Don't** put stat tiles or rotating role text in the hero; the name comes first.
- **Don't** show organisation logos larger than 40px.
- **Don't** add employment-type or "Current" badges to the timeline.
- **Don't** dress the site in terminal costume (prompts, `whoami`, typing effects).
