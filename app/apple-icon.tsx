import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the profile picture, matching the favicon (app/icon.tsx) and the site mark. */
export default async function AppleIcon() {
  const avatar = await readFile(path.join(process.cwd(), "public", "avatar-3d.png"));
  const src = `data:image/png;base64,${avatar.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#121214" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
        <img src={src} alt="" width={180} height={180} style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
