import fs from "node:fs";
import path from "node:path";

const CV_PUBLIC_PATH = "/cv/udesh-bandara-cv.pdf";

/** Public URL of the CV PDF, or null until the file is added to public/cv/. Checked at build time. */
export function getCvHref(): string | null {
  return fs.existsSync(path.join(process.cwd(), "public", CV_PUBLIC_PATH)) ? CV_PUBLIC_PATH : null;
}
