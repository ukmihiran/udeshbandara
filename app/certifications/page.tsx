import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-jsonld";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { Certifications } from "@/components/sections/certifications";
import { PageHeader } from "@/components/sections/page-header";
import { CERTIFICATIONS } from "@/lib/data";

export const metadata = pageMetadata("/certifications");

export default function CertificationsPage() {
  return (
    <Container>
      <BreadcrumbJsonLd path="/certifications" />
      <PageHeader
        title="Certifications"
        description="Industry-recognised credentials in offensive security and cloud."
      />
      <Certifications items={CERTIFICATIONS} />
    </Container>
  );
}
