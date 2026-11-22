import Image from "next/image";

/**
 * The site mark: the profile picture as a small round avatar beside the name in the header and
 * footer. Decorative there (the name is the link text), so alt is empty. Served through
 * next/image at 28px, so the 800px source PNG is never downloaded.
 */
export function BrandMark() {
  return (
    <Image
      src="/avatar-3d.png"
      alt=""
      width={28}
      height={28}
      sizes="28px"
      className="size-7 shrink-0 rounded-full border border-border-strong object-cover"
    />
  );
}
