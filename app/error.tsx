"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  /** Refetches the Server Component payload, then resets the boundary (reset alone re-renders the same failed payload). */
  retry: () => void;
}) {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center text-center">
      <p className="font-mono text-caption text-accent">Something broke</p>
      <h1 className="mt-2 font-display text-page font-medium">This page failed to load</h1>
      <p className="mt-3 max-w-md text-body text-muted-foreground">Try again, or head back to the home page.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={retry}
          className="inline-flex min-h-11 items-center rounded-xl bg-accent px-6 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl border border-border px-6 transition-colors hover:border-foreground/30"
        >
          Back to home
        </Link>
      </div>
    </Container>
  );
}
