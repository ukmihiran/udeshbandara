import { renderOgImage } from "@/lib/og";

export const alt = "Udesh Bandara — projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Projects",
    title: "Open-source security tools",
    subtitle: "Recon scripts, BloodHound tooling and research on GitHub.",
  });
}
