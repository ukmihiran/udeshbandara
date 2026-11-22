import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonPrimary } from "@/components/ui/button-styles";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="font-display text-page font-semibold">Page not found</h1>
      <p className="mt-3 max-w-md text-body text-muted-foreground [text-wrap:balance]">
        That path doesn&apos;t exist here. It may have moved when the site was rebuilt.
      </p>
      <Link href="/" className={`mt-8 ${buttonPrimary}`}>
        Back to home
      </Link>
    </Container>
  );
}
