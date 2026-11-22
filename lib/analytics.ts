/** The site's existing Google Analytics 4 property (public: it ships in every page's HTML). */
const PRODUCTION_GA_ID = "G-D2BNKKLPJV";
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,16}$/;

/**
 * GA4 measurement ID for this build, or "" for none.
 * - NEXT_PUBLIC_GA_ID, when set and well-formed, wins (lets another property be used).
 * - Otherwise only a Vercel production build gets the site's property, so previews, local
 *   builds and tests never send analytics.
 * The ID is interpolated into a script URL and inline config, so anything malformed is dropped.
 */
export function resolveGaId(env: { NEXT_PUBLIC_GA_ID?: string; VERCEL_ENV?: string }): string {
  const explicit = env.NEXT_PUBLIC_GA_ID?.trim();
  if (explicit) return GA_ID_PATTERN.test(explicit) ? explicit : "";
  return env.VERCEL_ENV === "production" ? PRODUCTION_GA_ID : "";
}

export const GA_ID = resolveGaId({
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  VERCEL_ENV: process.env.VERCEL_ENV,
});

/** localStorage key holding the visitor's analytics choice ("granted" | "denied"). */
export const CONSENT_KEY = "analytics-consent";
/** Window event that re-opens the consent prompt (footer "Cookie settings"). */
export const CONSENT_RESET_EVENT = "analytics-consent-reset";
