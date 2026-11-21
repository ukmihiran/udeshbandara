import { Container } from "@/components/layout/container";
import { Certifications } from "@/components/sections/certifications";
import { PageHeader } from "@/components/sections/page-header";
import { CERTIFICATIONS } from "@/lib/data";

export default function CertificationsPage() {
  return (
    <Container>
      <PageHeader
        title="Certifications"
        description="Industry-recognised credentials in offensive security and cloud."
      />
      <Certifications items={CERTIFICATIONS} />
    </Container>
  );
}
