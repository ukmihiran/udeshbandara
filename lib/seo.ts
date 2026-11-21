import type { Metadata } from "next";
import { SITE } from "./site";
import type { NavItem } from "./types";

type Path = NavItem["href"];

export const PAGE_META: Record<Path, { name: string; title: string; description: string }> = {
  "/": {
    name: "Home",
    title: "Udesh Bandara | Offensive Security Consultant",
    description:
      "Udesh Bandara — Offensive Security Consultant at Kroll UK. Penetration testing, red teaming and cloud security.",
  },
  "/about": {
    name: "About",
    title: "About",
    description:
      "Background, education (MSc Cyber Security, UWE Bristol) and the offensive security tools Udesh Bandara works with.",
  },
  "/experience": {
    name: "Experience",
    title: "Experience",
    description:
      "Career timeline: offensive security consulting at Kroll, plus security roles at Axiata Digital Labs, CryptoGen and PwC.",
  },
  "/certifications": {
    name: "Certifications",
    title: "Certifications",
    description: "Security certifications including AWS Solutions Architect, CRTP, CREST CRT, CREST CPSA, CEH and eJPT.",
  },
  "/projects": {
    name: "Projects",
    title: "Projects",
    description: "Open-source security tools and research by Udesh Bandara: BloodHound standalone, recon scripts and more.",
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
    openGraph: { title: fullTitle, description, url: absoluteUrl(path), siteName: SITE.name, type: "website" },
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

/** Serialise JSON-LD safely for an inline <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
