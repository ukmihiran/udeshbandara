import Image from "next/image";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** White tile holding an organisation/issuer logo; falls back to an icon. */
export function OrgLogo({
  src,
  alt,
  scale = 1,
  className,
}: {
  src?: string;
  alt: string;
  scale?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/40 bg-white p-2",
        className,
      )}
    >
      {src ? (
        <div className="relative size-full" style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}>
          <Image src={src} alt={alt} fill sizes="64px" className="object-contain" />
        </div>
      ) : (
        <Building2 aria-hidden className="size-5 text-accent" />
      )}
    </div>
  );
}
