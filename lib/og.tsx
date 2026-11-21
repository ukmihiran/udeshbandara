import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#0f1520";
const ACCENT = "#4ade80";
const TEXT = "#e6e9ef";
const MUTED = "#94a3b8";

let avatarCache: Promise<string | null> | undefined;
function loadAvatar(): Promise<string | null> {
  avatarCache ??= readFile(path.join(process.cwd(), "public", "avatar-3d.png"))
    .then((buf) => `data:image/png;base64,${buf.toString("base64")}`)
    .catch(() => null);
  return avatarCache;
}

/** Shared 1200×630 social card in the site's navy + green palette. */
export async function renderOgImage(opts: { eyebrow: string; title: string; subtitle: string }) {
  const avatar = await loadAvatar();
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px",
          background: `linear-gradient(135deg, ${BG} 0%, #131c2b 60%, ${BG} 100%)`,
          color: TEXT,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: ACCENT }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: ACCENT }} />
            {opts.eyebrow}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, marginTop: 28, letterSpacing: "-0.02em" }}>
            {opts.title}
          </div>
          <div style={{ fontSize: 28, color: MUTED, lineHeight: 1.45, marginTop: 24, maxWidth: 620 }}>
            {opts.subtitle}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: "auto", fontSize: 22, color: MUTED }}>
            <span style={{ color: ACCENT }}>$</span>
            <span>udeshbandara.com</span>
          </div>
        </div>
        {avatar && (
          <div
            style={{
              display: "flex",
              width: 380,
              height: 380,
              marginLeft: 48,
              borderRadius: 24,
              overflow: "hidden",
              border: `3px solid ${ACCENT}55`,
              background: "#131c2b",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
            <img src={avatar} alt="" width={380} height={380} style={{ objectFit: "cover" }} />
          </div>
        )}
      </div>
    ),
    OG_SIZE,
  );
}
