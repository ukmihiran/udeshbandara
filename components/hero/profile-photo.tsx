import Image from "next/image";
import { cn } from "@/lib/utils";

/** Plain circular portrait with a hairline border. No clip-path, glow or motion. */
export function ProfilePhoto({
  className,
  sizes,
  decorative = false,
}: {
  className?: string;
  sizes: string;
  /** True when the name is already announced next to it (e.g. inside the h1). */
  decorative?: boolean;
}) {
  return (
    <Image
      src="/avatar-3d.png"
      alt={decorative ? "" : "Udesh Bandara"}
      width={800}
      height={800}
      priority={!decorative}
      sizes={sizes}
      className={cn("aspect-square rounded-full border border-border object-cover", className)}
    />
  );
}
