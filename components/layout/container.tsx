import { cn } from "@/lib/utils";

/**
 * The one page column (matches the header's max-w-5xl and gutters, so every page's content
 * starts at the same x as the site name). Prose inside is capped separately at 65ch.
 */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-12", className)}>{children}</div>;
}
