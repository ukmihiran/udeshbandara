import { renderOgImage } from "@/lib/og";

export const alt = "Udesh Bandara — experience";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Experience",
    title: "Career timeline",
    subtitle: "Kroll · Axiata Digital Labs · CryptoGen · PwC Sri Lanka",
  });
}
