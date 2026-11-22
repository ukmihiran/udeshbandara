import type { MetadataRoute } from "next";
import { PAGE_META } from "@/lib/seo";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name}, ${SITE.jobTitle}`,
    short_name: SITE.name,
    description: PAGE_META["/"].description,
    start_url: "/",
    display: "browser",
    background_color: "#121214",
    theme_color: "#0b0b0d",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
