import { renderOgImage } from "@/lib/og";

export const alt = "Udesh Bandara — Offensive Security Consultant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Offensive Security Consultant",
    title: "Udesh Bandara",
    subtitle: "Penetration testing, red teaming & cloud security at Kroll UK.",
  });
}
