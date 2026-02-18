import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Udesh Bandara — Offensive Security Consultant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  let avatarDataUrl = "";
  try {
    const imagePath = join(process.cwd(), "public", "avatar-3d.png");
    const imageBuffer = await readFile(imagePath);
    const imageBase64 = imageBuffer.toString("base64");
    avatarDataUrl = `data:image/png;base64,${imageBase64}`;
  } catch {
    // Fallback if image can't be loaded
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0f0a 0%, #0d1a0d 50%, #0a0f0a 100%)",
          color: "#e8e8e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "20px",
              color: "#9FEF00",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#9FEF00",
              }}
            />
            Offensive Security Consultant
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Udesh Bandara
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#7a8a7a",
              lineHeight: 1.5,
              maxWidth: "600px",
            }}
          >
            Security Consultant at Kroll UK. Penetration Testing, Red Teaming
            &amp; Cloud Security.
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "auto",
              fontSize: "18px",
              color: "#4a5a4a",
            }}
          >
            <span>udeshbandara.com</span>
            <span style={{ color: "#2a3a2a" }}>|</span>
            <span>github.com/ukmihiran</span>
          </div>
        </div>
        {avatarDataUrl && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "400px",
              height: "470px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "3px solid #9FEF0030",
              marginLeft: "40px",
              background: "#0d1a0d",
            }}
          >
            <img
              src={avatarDataUrl}
              alt="Udesh Bandara"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
