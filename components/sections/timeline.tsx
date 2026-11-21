import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPeriod } from "@/lib/format";
import type { TimelineEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { OrgLogo } from "./org-logo";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative pl-9 sm:pl-10">
      {/* Line centre sits at x=20px; dots (16px) are centred on it from each item's padded edge. */}
      <div aria-hidden className="timeline-line" />
      <ol className="space-y-5">
      {entries.map((entry) => (
        <li key={`${entry.org}-${entry.start}`} className="relative motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
          <span aria-hidden className={cn("timeline-dot -left-6 sm:-left-7", entry.current && "timeline-dot-active")} />
          <article
            data-timeline-card
            className={cn(
              "card-glow rounded-xl border bg-card p-4 sm:p-5",
              entry.current ? "border-accent/25 bg-accent/[0.03]" : "border-border/40",
            )}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <OrgLogo src={entry.image} alt={entry.org} scale={entry.logoScale} />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-0.5">
                    <h2 className="text-[15px] font-semibold leading-snug break-words text-foreground">{entry.title}</h2>
                    <p data-timeline-org className="text-sm font-medium text-muted-foreground">
                      {entry.org}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-1.5">
                    {entry.current && (
                      <Badge data-badge className="border-accent/30 bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
                        Current
                      </Badge>
                    )}
                    {entry.badge && (
                      <Badge data-badge variant="outline" className="border-border/50 px-2 py-0.5 text-[11px] text-muted-foreground">
                        {entry.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar aria-hidden className="size-3 shrink-0" />
                    {formatPeriod(entry.start, entry.end)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin aria-hidden className="size-3 shrink-0" />
                    {entry.location}
                  </span>
                </p>
                {entry.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
      </ol>
    </div>
  );
}
