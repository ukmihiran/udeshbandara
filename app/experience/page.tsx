import { BreadcrumbJsonLd } from "@/components/layout/breadcrumb-jsonld";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/sections/page-header";
import { Timeline } from "@/components/sections/timeline";
import { EDUCATION, EXPERIENCES } from "@/lib/data";
import { buildTimeline } from "@/lib/format";

export const metadata = pageMetadata("/experience");

export default function ExperiencePage() {
  return (
    <Container>
      <BreadcrumbJsonLd path="/experience" />
      <PageHeader
        title="Experience"
        description="Offensive security, consulting and research — plus the study in between."
      />
      <Timeline entries={buildTimeline(EXPERIENCES, EDUCATION)} />
    </Container>
  );
}
