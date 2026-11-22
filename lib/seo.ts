import type { Metadata } from "next";
import { SITE } from "./site";
import type { NavItem } from "./types";

type Path = NavItem["href"];

export const PAGE_META: Record<Path, { name: string; title: string; description: string }> = {
  "/": {
    name: "Home",
    title: "Udesh Bandara | Offensive Security Consultant, London",
    description:
      "Udesh Bandara is an Offensive Security Consultant at Kroll in London: penetration testing, red teaming and cloud security assessments. CREST CRT and CRTP.",
  },
  "/about": {
    name: "About",
    title: "About: Offensive Security Consultant",
    description:
      "About Udesh Bandara: penetration testing, red teaming, vulnerability management and cloud security, with an MSc in Cyber Security from UWE Bristol.",
  },
  "/experience": {
    name: "Experience",
    title: "Offensive Security Experience",
    description:
      "Career timeline of Udesh Bandara: offensive security consulting at Kroll, plus security roles at Axiata Digital Labs, CryptoGen and PwC Sri Lanka.",
  },
  "/certifications": {
    name: "Certifications",
    title: "Certifications: CREST CRT, CRTP, AWS",
    description:
      "Udesh Bandara's security certifications: AWS Solutions Architect, CRTP, CREST CRT, CREST CPSA, CEH, eJPT, Azure Fundamentals and CCNA Cyber Ops.",
  },
  "/projects": {
    name: "Projects",
    title: "Open-Source Security Tools",
    description:
      "Open-source security tools by Udesh Bandara: a standalone BloodHound container, live-host enumeration, SecurityTrails subdomain scanning and DGA detection.",
  },
};

export function absoluteUrl(path: Path): string {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

/** Per-page metadata. OG/Twitter images come from each route's opengraph-image file. */
export function pageMetadata(path: Path): Metadata {
  const { title, description } = PAGE_META[path];
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE.name,
      type: "website",
      locale: "en_GB",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export function breadcrumbJsonLd(path: Exclude<Path, "/">) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: PAGE_META["/"].name, item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: PAGE_META[path].name, item: absoluteUrl(path) },
    ],
  };
}

/**
 * Google Search Console HTML-tag verification. Set GOOGLE_SITE_VERIFICATION in Vercel to the
 * token from Search Console (only needed when the site is not already verified by DNS).
 */
export function verificationMetadata(env: { GOOGLE_SITE_VERIFICATION?: string }): Metadata["verification"] {
  const token = env.GOOGLE_SITE_VERIFICATION?.trim();
  return token && /^[A-Za-z0-9_-]{10,100}$/.test(token) ? { google: token } : undefined;
}

/** Serialise JSON-LD safely for an inline <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
