import { jsonLdScript } from "@/lib/seo";

/** Static, first-party structured data; jsonLdScript escapes "<" so it cannot close the tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />;
}
