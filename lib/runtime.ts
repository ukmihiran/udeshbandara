/** Upper bound for any third-party fetch made while rendering a page. */
export const FETCH_TIMEOUT_MS = 5000;

/**
 * True on the production server (ISR revalidation), false during `next build`, dev and tests.
 * At runtime a data fetch should throw so Next keeps serving the last good page instead of
 * caching a degraded one; at build time it should degrade so the build still succeeds.
 */
export function shouldThrowOnFetchFailure(): boolean {
  return process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build";
}
