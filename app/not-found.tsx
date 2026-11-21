import Link from "next/link";
import { Container } from "@/components/layout/container";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="font-mono text-caption text-accent">HTTP 404</p>
      <h1 className="mt-2 font-display text-page font-medium">Page not found</h1>
      <p className="mt-3 max-w-md text-body text-muted-foreground">
        That path doesn&apos;t exist here. It may have moved when the site was rebuilt.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-accent px-6 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
      >
        Back to home
      </Link>
    </Container>
  );
}
