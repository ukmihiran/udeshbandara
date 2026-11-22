import { cn } from "@/lib/utils";

/** A keycap-style label: hairline border with a slightly heavier bottom edge. Never interactive. */
export function Tag({ className, children, ...rest }: React.ComponentProps<"li">) {
  return (
    <li
      {...rest}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-surface-2 px-2.5 pb-[5px] pt-1 text-caption text-foreground shadow-[inset_0_-1px_0_var(--border-strong)]",
        className,
      )}
    >
      {children}
    </li>
  );
}
