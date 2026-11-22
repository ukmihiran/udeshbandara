import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the site's cube mark on the graphite ground (hex approximations of DESIGN.md tokens). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#121214" }}>
        <svg width="112" height="112" viewBox="0 0 24 24" fill="none">
          <path d="M12 2.5 20.5 7.25v9.5L12 21.5l-8.5-4.75v-9.5L12 2.5Z" fill="#26262a" stroke="#4a4a50" strokeWidth="0.6" />
          <path d="M12 12 20.5 7.25M12 12 3.5 7.25M12 12v9.5" stroke="#4a4a50" strokeWidth="0.6" />
          <path d="M12 2.5 20.5 7.25 12 12 3.5 7.25 12 2.5Z" fill="#4ade80" />
        </svg>
      </div>
    ),
    size,
  );
}
