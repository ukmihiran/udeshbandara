import { formatPeriod } from "@/lib/format";
import type { TimelineEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { OrgLogo } from "./org-logo";

/**
 * Work and study on one vertical line. Entries are typographic, not boxed; the filled dot marks
 * the current role and the date range ends in "Present".
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative pl-9 sm:pl-10">
      {/* Line centre sits at x=20px; dots (16px) are centred on it from each item's padded edge. */}
      <div aria-hidden className="timeline-line" />
      <ol className="space-y-10">
        {entries.map((entry) => (
          <li key={`${entry.org}-${entry.start}`} className="relative">
            <span aria-hidden className={cn("timeline-dot -left-6 sm:-left-7", entry.current && "timeline-dot-active")} />
            <article data-timeline-card className="flex items-start gap-4">
              <OrgLogo src={entry.image} alt={entry.org} scale={entry.logoScale} />
              <div className="min-w-0 flex-1">
                <h2 className="text-title font-semibold text-foreground [overflow-wrap:anywhere]">{entry.title}</h2>
                <p className="text-body text-foreground-secondary">
                  <span data-timeline-org>{entry.org}</span>
                  <span className="text-muted-foreground"> · {entry.location}</span>
                </p>
                <p className="mt-1 font-mono text-caption text-muted-foreground tabular-nums">
                  {formatPeriod(entry.start, entry.end)}
                </p>
                {entry.description && (
                  <p className="mt-3 max-w-[65ch] text-body text-foreground-secondary">{entry.description}</p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
