import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import type { NavItem } from "@/lib/types";

/** Static, first-party structured data; jsonLdScript escapes "<" so it cannot close the tag. */
export function BreadcrumbJsonLd({ path }: { path: Exclude<NavItem["href"], "/"> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(path)) }} />;
}
