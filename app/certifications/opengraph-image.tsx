import { renderOgImage } from "@/lib/og";

export const alt = "Udesh Bandara — certifications";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Certifications",
    title: "8 security certifications",
    subtitle: "AWS Solutions Architect · CRTP · CREST CRT · CREST CPSA · CEH",
  });
}
