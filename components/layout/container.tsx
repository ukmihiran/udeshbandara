import { cn } from "@/lib/utils";

const WIDTHS = { narrow: "max-w-3xl", default: "max-w-4xl", wide: "max-w-5xl" } as const;

/** Page-width wrapper with the shared horizontal gutter and vertical rhythm. */
export function Container({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof WIDTHS;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-4 py-6 sm:px-6 md:py-10", WIDTHS[size], className)}>{children}</div>
  );
}
