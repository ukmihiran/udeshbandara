import type { CSSProperties } from "react";

type Face = "front" | "back" | "right" | "left" | "top" | "bottom";
const FACES: Face[] = ["front", "back", "right", "left", "top", "bottom"];
const AXIS = [-1, 0, 1] as const;

/** True when the face points out of the cube (an exterior sticker) rather than at a neighbour. */
function isOuter(face: Face, x: number, y: number, z: number): boolean {
  switch (face) {
    case "front":
      return z === 1;
    case "back":
      return z === -1;
    case "right":
      return x === 1;
    case "left":
      return x === -1;
    case "top":
      return y === -1;
    case "bottom":
      return y === 1;
  }
}

/** The few signal-green stickers the twists carry around the cube. */
const STICKERS = new Set(["1,-1,1:front", "-1,-1,0:top", "1,0,-1:right", "0,1,1:front", "-1,1,-1:left"]);

/**
 * A monochrome 3×3 Rubik's cube in CSS 3D (no WebGL, no JavaScript): the whole cube sways while
 * its three horizontal layers take turns twisting. Purely decorative; motion stops under
 * prefers-reduced-motion. Styles live in app/globals.css (".cube-*").
 */
export function HeroCube({ className }: { className?: string }) {
  return (
    <div data-hero-cube aria-hidden className={`cube-scene ${className ?? ""}`}>
      <div className="cube">
        {AXIS.map((y, layer) => (
          <div key={y} className="cube-layer" data-layer={layer}>
            {AXIS.flatMap((x) =>
              AXIS.map((z) => (
                <div key={`${x},${z}`} className="cubie" style={{ "--x": x, "--y": y, "--z": z } as CSSProperties}>
                  {FACES.map((face) => {
                    const outer = isOuter(face, x, y, z);
                    return (
                      <span
                        key={face}
                        className="cube-face"
                        data-face={face}
                        data-out={outer || undefined}
                        data-sticker={(outer && STICKERS.has(`${x},${y},${z}:${face}`)) || undefined}
                      />
                    );
                  })}
                </div>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
