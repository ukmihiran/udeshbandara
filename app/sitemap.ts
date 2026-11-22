import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

/** The sitemap is generated at build time, so each deploy stamps the date its content shipped. */
const BUILT_AT = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.map((item) => ({
    url: absoluteUrl(item.href),
    lastModified: BUILT_AT,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
