/**
 * Captures the hero cube's first WebGL frame as public/cube-poster.png, the instant placeholder
 * shown before the 3D scene starts (components/hero/cube.tsx). Rerun after changing the scene's
 * look, pose, lighting or stickers in components/hero/cube-scene.ts.
 *
 *   npm run dev          (or `npm run build && npm start`)
 *   npm run cube:poster  -- [base URL, default http://localhost:3000]
 */
import { chromium } from "@playwright/test";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const out = path.join(process.cwd(), "public", "cube-poster.png");

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
// Reduced motion: the scene renders its initial pose once and never animates, so the capture
// is exactly the frame visitors see first. Square, at the renderer's 1.5x density cap.
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1.5, reducedMotion: "reduce" });
await page.addInitScript(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = `
      html, body, main, section, div { background: transparent !important; }
      header, nextjs-portal, [data-nextjs-toast] { display: none !important; }
      [data-hero-cube] { width: 600px !important; height: 600px !important; flex: none !important; }
      [data-hero-cube] img { display: none !important; }`;
    document.head.append(style);
  });
});
await page.goto(base + "/");
await page.waitForFunction(() => document.querySelector("[data-hero-cube] canvas")?.classList.contains("opacity-100"), null, {
  timeout: 30_000,
});
await page.waitForTimeout(500); // let a resize re-render settle
await page.locator("[data-hero-cube] canvas").screenshot({ path: out, omitBackground: true });
await browser.close();
console.log(`wrote ${out}`);
