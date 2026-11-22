/** Shared button looks: one filled primary (the accent), one hairline secondary. 44px tall. */
export const buttonPrimary =
  "inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-5 text-body font-medium text-accent-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-accent/90 active:translate-y-px";

export const buttonSecondary =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-strong bg-card px-5 text-body font-medium text-foreground transition-[background-color,border-color] duration-150 ease-out hover:border-foreground/30 hover:bg-surface-2";

/** Small text link with a trailing arrow, used for "see all" links beside section headings. */
export const sectionLink =
  "inline-flex min-h-11 items-center gap-1 text-caption text-muted-foreground transition-colors duration-100 hover:text-foreground";
