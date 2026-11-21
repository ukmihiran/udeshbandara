const CV_PUBLIC_PATH = "/cv/udesh-bandara-cv.pdf";

/**
 * Public URL of the CV PDF, or null if `public/cv/udesh-bandara-cv.pdf` was absent at build time.
 * CV_AVAILABLE is inlined by next.config.ts: public/ isn't traced into Vercel functions, so a
 * runtime fs check would hide the button after the first ISR revalidation.
 */
export function getCvHref(): string | null {
  return process.env.CV_AVAILABLE === "1" ? CV_PUBLIC_PATH : null;
}
