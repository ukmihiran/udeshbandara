import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  try {
    // Load the avatar image
    const imagePath = join(process.cwd(), "public", "avatar-3d.png");
    const imageBuffer = await readFile(imagePath);
    const imageBase64 = imageBuffer.toString("base64");
    const imageDataUrl = `data:image/png;base64,${imageBase64}`;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#151517",
            border: "1px solid #ffffff26",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
          <img
            src={imageDataUrl}
            alt="UB"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
      { ...size }
    );
  } catch {
    // Fallback to circular icon with initials
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#151517",
            color: "#4ade80",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
            border: "1px solid #ffffff26",
          }}
        >
          UB
        </div>
      ),
      { ...size }
    );
  }
}
