import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.map((item) => ({
    url: absoluteUrl(item.href),
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
