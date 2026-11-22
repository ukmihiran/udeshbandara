import { formatPeriod } from "@/lib/format";
import type { YearMonth } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * A date range in Geist Mono with a true en dash: the dash is set in the sans face, because a
 * monospaced en dash is as short as a hyphen. Text content stays "Jul 2024 – Present".
 */
export function Period({ start, end, className }: { start: YearMonth; end?: YearMonth; className?: string }) {
  const [from, to] = formatPeriod(start, end).split(" – ");
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {from}
      <span className="font-sans"> – </span>
      {to}
    </span>
  );
}
