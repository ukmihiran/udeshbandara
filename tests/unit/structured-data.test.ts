import { describe, expect, test } from "vitest";
import { personJsonLd, profilePageJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { CERTIFICATIONS, EDUCATION } from "@/lib/data";

describe("structured data", () => {
  const person = personJsonLd();

  test("Person has a stable @id, image, location and same-as profiles", () => {
    expect(person["@type"]).toBe("Person");
    expect(person["@id"]).toBe("https://udeshbandara.com/#person");
    expect(person.image).toMatch(/^https:\/\/udeshbandara\.com\//);
    expect(person.address).toMatchObject({ addressLocality: "London", addressCountry: "GB" });
    expect(person.sameAs).toEqual(expect.arrayContaining([expect.stringContaining("linkedin.com")]));
  });

  test("Person lists every certification and school from the data, not hand-typed copies", () => {
    expect(person.hasCredential.map((c) => c.name)).toEqual(CERTIFICATIONS.map((c) => c.name));
    expect(person.alumniOf.map((s) => s.name)).toEqual(EDUCATION.map((e) => e.school));
  });

  test("WebSite and ProfilePage point at the same Person", () => {
    expect(websiteJsonLd()).toMatchObject({ "@type": "WebSite", url: "https://udeshbandara.com", publisher: { "@id": person["@id"] } });
    expect(profilePageJsonLd()).toMatchObject({ "@type": "ProfilePage", mainEntity: { "@id": person["@id"] } });
  });
});
