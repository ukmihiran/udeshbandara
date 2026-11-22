/** The site mark: a small isometric cube, echoing the hero cube. Decorative next to the name. */
export function BrandMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-6 shrink-0" fill="none">
      <path d="M12 2.5 20.5 7.25v9.5L12 21.5l-8.5-4.75v-9.5L12 2.5Z" className="fill-surface-2 stroke-border-strong" strokeWidth="1" />
      <path d="M12 12 20.5 7.25M12 12 3.5 7.25M12 12v9.5" className="stroke-border-strong" strokeWidth="1" />
      <path d="M12 2.5 20.5 7.25 12 12 3.5 7.25 12 2.5Z" className="fill-accent" />
    </svg>
  );
}
