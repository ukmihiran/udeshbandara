"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button-styles";

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
      <h1 className="font-display text-page font-semibold">This page failed to load</h1>
      <p className="mt-3 max-w-md text-body text-muted-foreground">Try again, or head back to the home page.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={retry} className={buttonPrimary}>
          Try again
        </button>
        <Link href="/" className={buttonSecondary}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
