import { CERTIFICATIONS, EDUCATION, EXPERIENCES, TECH_STACK } from "./data";
import { PAGE_META, absoluteUrl } from "./seo";
import { SITE } from "./site";

/**
 * Schema.org JSON-LD built from the same data the pages render, so search engines never see
 * facts the visitor cannot. Every node references one Person by @id.
 */
const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;

export function personJsonLd() {
  const current = EXPERIENCES.find((e) => !e.end) ?? EXPERIENCES[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    jobTitle: SITE.jobTitle,
    description: PAGE_META["/"].description,
    url: SITE.url,
    image: `${SITE.url}/avatar-3d.png`,
    email: `mailto:${SITE.email}`,
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
    worksFor: { "@type": "Organization", name: current.company },
    knowsAbout: [
      "Penetration testing",
      "Red teaming",
      "Vulnerability management",
      "Cloud security",
      "Active Directory security",
      ...TECH_STACK.filter((t) => t.category === "cloud").map((t) => t.name),
    ],
    alumniOf: EDUCATION.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    hasCredential: CERTIFICATIONS.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: c.issuer },
      ...(c.verifyUrl ? { url: c.verifyUrl } : {}),
    })),
    sameAs: [SITE.linkedin, SITE.github, SITE.blogUrl],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: PAGE_META["/"].description,
    inLanguage: "en-GB",
    publisher: { "@id": PERSON_ID },
  };
}

/** Google's ProfilePage: the About page is the canonical profile of the Person. */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/about"),
    name: `About ${SITE.name}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}
