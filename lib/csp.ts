/**
 * Static Content-Security-Policy. Pages are statically generated, so a per-request
 * nonce is not available; inline scripts (Next.js hydration data) need 'unsafe-inline'.
 * Everything else is locked to same-origin.
 */
export function buildCsp(opts: { dev: boolean; gaEnabled: boolean }): string {
  const ga = opts.gaEnabled;
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      // Dev: eval for React Refresh; Vercel Analytics loads debug scripts from its CDN.
      ...(opts.dev ? ["'unsafe-eval'", "https://va.vercel-scripts.com"] : []),
      ...(ga ? ["https://www.googletagmanager.com"] : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      ...(ga ? ["https://*.google-analytics.com", "https://*.googletagmanager.com"] : []),
    ],
    "font-src": ["'self'"],
    "connect-src": [
      "'self'",
      ...(opts.dev ? ["ws:", "wss:"] : []),
      ...(ga
        ? [
            "https://*.google-analytics.com",
            "https://*.analytics.google.com",
            "https://*.googletagmanager.com",
          ]
        : []),
    ],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    ...(opts.dev ? {} : { "upgrade-insecure-requests": [] }),
  };
  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(" "))
    .join("; ");
}
