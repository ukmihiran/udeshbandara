"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { CONSENT_KEY, CONSENT_RESET_EVENT } from "@/lib/analytics";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button-styles";

type Consent = "granted" | "denied" | null;
const CHANGE_EVENT = "analytics-consent-change";

function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null; // storage blocked: ask every visit, load nothing until allowed
  }
}

/** Withdrawn after allowing: tell gtag (if loaded) and delete the _ga cookies it set. */
function revokeAnalytics() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = window.location.hostname;
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

function writeConsent(value: Consent) {
  if (value === "denied") revokeAnalytics();
  try {
    if (value) window.localStorage.setItem(CONSENT_KEY, value);
    else window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore: the choice then lasts for this page view only
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const reset = () => writeConsent(null);
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_RESET_EVENT, reset);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_RESET_EVENT, reset);
  };
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event when analytics is loaded and allowed; a no-op otherwise. */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  window.gtag?.("event", name, params);
}

/**
 * Google Analytics 4, loaded only after the visitor allows it (UK PECR: analytics cookies need
 * consent). Until then nothing is requested from Google. Also records contact intent: clicks
 * on mailto and LinkedIn links, delegated from the document so server components stay static.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  // Server render and first client render agree on "undecided-and-hidden" (undefined).
  const consent = useSyncExternalStore<Consent | undefined>(subscribe, readConsent, () => undefined);

  useEffect(() => {
    if (consent !== "granted") return;
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) trackEvent("generate_lead", { method: "email" });
      else if (href.includes("linkedin.com")) trackEvent("generate_lead", { method: "linkedin" });
    }
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [consent]);

  if (consent === "granted") {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
        </Script>
      </>
    );
  }

  if (consent !== null) return null; // denied, or not yet known on this render

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="panel fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 rounded-xl border border-border-strong bg-card p-5 sm:left-auto sm:right-6 sm:max-w-sm"
    >
      <p className="text-body font-semibold text-foreground">Allow analytics cookies?</p>
      <p className="mt-1 text-caption text-foreground-secondary">
        Google Analytics would show me which pages are useful. Nothing is loaded unless you allow it.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={buttonPrimary} onClick={() => writeConsent("granted")}>
          Allow
        </button>
        <button type="button" className={buttonSecondary} onClick={() => writeConsent("denied")}>
          No thanks
        </button>
      </div>
    </div>
  );
}

/** Footer control that re-opens the consent prompt so a choice can be changed. */
export function AnalyticsSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(CONSENT_RESET_EVENT))}>
      Cookie settings
    </button>
  );
}
