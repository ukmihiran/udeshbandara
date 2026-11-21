import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectGrid } from "@/components/sections/projects";
import { getFeaturedRepos } from "@/lib/github";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const { repos, error } = await getFeaturedRepos(6);
  return (
    <Container>
      <PageHeader title="Projects" description="Open-source tools and research from GitHub." />
      <ProjectGrid repos={repos} error={error} />
      {!error && repos.length > 0 && (
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          More on GitHub <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      )}
    </Container>
  );
}
