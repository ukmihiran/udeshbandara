import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/sections/page-header";
import { Timeline } from "@/components/sections/timeline";
import { EDUCATION, EXPERIENCES } from "@/lib/data";
import { buildTimeline } from "@/lib/format";

export default function ExperiencePage() {
  return (
    <Container size="narrow">
      <PageHeader
        title="Experience"
        description="Offensive security, consulting and research — plus the study in between."
      />
      <Timeline entries={buildTimeline(EXPERIENCES, EDUCATION)} />
    </Container>
  );
}
