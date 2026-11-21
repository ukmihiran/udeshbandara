import Image from "next/image";

/**
 * Hexagon avatar (server component). The entrance is a CSS scale that starts fully opaque, so the
 * LCP image is visible on first paint and without JavaScript. The padded, overflow-clipped wrapper
 * keeps the glow and ping ring inside the layout box so they can never cause horizontal scroll.
 */
export function HexAvatar() {
  return (
    <div className="relative overflow-hidden p-8 sm:p-10">
      <div className="relative flex items-center justify-center motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-700">
        <div aria-hidden className="hex-clip absolute -inset-6 hidden bg-accent/10 blur-2xl md:block" />
        <div aria-hidden className="hex-ring hex-ring-1" />
        <div className="hex-frame animate-float">
          <div className="hex-clip bg-gradient-to-br from-accent via-accent/60 to-accent p-[3px]">
            <div className="hex-clip bg-background">
              <Image
                src="/avatar-3d.png"
                alt="Udesh Bandara — 3D avatar"
                width={800}
                height={800}
                priority
                sizes="(max-width: 639px) 160px, (max-width: 767px) 192px, (max-width: 1023px) 280px, 340px"
                className="hex-clip size-40 object-cover sm:size-48 md:size-[280px] lg:size-[340px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
