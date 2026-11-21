import { Container } from "@/components/layout/container";
import { About } from "@/components/sections/about";
import { LatestPosts } from "@/components/sections/latest-posts";
import { PageHeader } from "@/components/sections/page-header";
import { getLatestPosts } from "@/lib/blog";

export const revalidate = 86400;

export default async function AboutPage() {
  const posts = await getLatestPosts(3);
  return (
    <Container size="wide">
      <PageHeader title="About Me" description="Background, education, and the tools I work with." />
      <About />
      <div className="mt-10">
        <LatestPosts posts={posts} />
      </div>
    </Container>
  );
}
