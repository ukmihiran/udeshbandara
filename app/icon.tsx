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
            background: "#0d1a0d",
            border: "1px solid #9FEF0030",
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
            background: "linear-gradient(135deg, #0d1a0d 0%, #1a2e1a 100%)",
            color: "#9FEF00",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
            border: "1px solid #9FEF0030",
          }}
        >
          UB
        </div>
      ),
      { ...size }
    );
  }
}
