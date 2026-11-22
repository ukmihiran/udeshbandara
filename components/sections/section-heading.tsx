/**
 * A section title with an optional one-line description. The action link sits on the title's
 * baseline (not the description's), so "All projects →" reads as belonging to the heading.
 */
export function SectionHeading({
  id,
  title,
  description,
  action,
  as: Heading = "h2",
}: {
  id: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  as?: "h2" | "h3";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-x-6">
        <Heading id={id} className="min-w-0 font-display text-section font-semibold">
          {title}
        </Heading>
        {action && <div className="-my-3 shrink-0">{action}</div>}
      </div>
      {description && <p className="mt-1 text-body text-foreground-secondary">{description}</p>}
    </div>
  );
}
