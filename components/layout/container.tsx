import { cn } from "@/lib/utils";

/**
 * The one page column (matches the header's max-w-6xl and gutters, so every page's content
 * starts at the same x as the site name). Prose inside is capped separately at 65ch.
 */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6 md:pt-16", className)}>{children}</div>;
}
