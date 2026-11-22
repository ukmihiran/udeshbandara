import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-jsonld";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { About } from "@/components/sections/about";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = pageMetadata("/about");

export default function AboutPage() {
  return (
    <Container>
      <BreadcrumbJsonLd path="/about" />
      <PageHeader
        title="About"
        description="Background, focus areas, toolkit and education."
      />
      <About />
      <div className="mt-20">
        <ContactCta />
      </div>
    </Container>
  );
}
