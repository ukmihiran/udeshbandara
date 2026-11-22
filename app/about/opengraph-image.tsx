import { renderOgImage } from "@/lib/og";

export const alt = "About Udesh Bandara";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "Udesh Bandara",
    subtitle: "MSc Cyber Security · tools, languages and cloud platforms.",
  });
}
