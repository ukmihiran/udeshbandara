import Image from "next/image";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Small logo mark (40px tall). Logos ship on white, so they keep a white tile, but with no border
 * and a modest size so they don't become the brightest objects on a dark page. A wide wordmark
 * gets a 56px-wide tile and less padding so its letters stay legible.
 */
export function OrgLogo({
  src,
  alt,
  scale = 1,
  wide = false,
  className,
}: {
  src?: string;
  alt: string;
  scale?: number;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      data-org-logo
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1",
        wide && "w-14 px-1.5 py-0",
        className,
      )}
    >
      {src ? (
        <div className="relative size-full" style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}>
          <Image src={src} alt={alt} fill sizes={wide ? "56px" : "40px"} className="object-contain" />
        </div>
      ) : (
        <Building2 aria-hidden className="size-5 text-muted-foreground" />
      )}
    </div>
  );
}
