import type { TimelineEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { transitionStyle } from "@/lib/view-transition";
import { OrgLogo } from "./org-logo";
import { Period } from "./period";

/**
 * Work and study on one rail. Dates sit in their own column on wider screens (a changelog
 * layout); the filled accent dot marks the current role.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative">
      {entries.map((entry, i) => (
        <li key={`${entry.org}-${entry.start}`} className="relative pb-12 last:pb-0 sm:pl-[13.5rem]">
          <div className="relative pl-9 sm:pl-10">
            {i < entries.length - 1 && <span aria-hidden className="timeline-line" />}
            <span aria-hidden className={cn("timeline-dot left-0", entry.current && "timeline-dot-active")} />
            <p className="mb-2 ml-[4.5rem] text-caption text-muted-foreground sm:absolute sm:ml-0 sm:right-full sm:top-0.5 sm:mb-0 sm:mr-10 sm:w-44 sm:text-right">
              <Period start={entry.start} end={entry.end} />
            </p>
            <article data-timeline-card className="flex items-start gap-4">
              {/* Every tile is the wide size so all entries share one text edge (Kroll is a wide wordmark). */}
              <OrgLogo src={entry.image} alt={entry.org} scale={entry.logoScale} wide />
              <div className="min-w-0 flex-1">
                <h2
                  {...(entry.current ? { "data-role-current": true, style: transitionStyle("role", "current") } : {})}
                  className="text-title font-semibold text-foreground [overflow-wrap:anywhere]"
                >
                  {entry.title}
                </h2>
                <p className="text-body text-foreground-secondary">
                  <span data-timeline-org>{entry.org}</span>
                  <span className="text-muted-foreground"> · {entry.location}</span>
                </p>
                {entry.description && (
                  <p className="mt-3 max-w-[65ch] text-body text-foreground-secondary">{entry.description}</p>
                )}
              </div>
            </article>
          </div>
        </li>
      ))}
    </ol>
  );
}
