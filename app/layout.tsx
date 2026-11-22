import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GA_ID } from "@/lib/analytics";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { PAGE_META, pageMetadata, verificationMetadata } from "@/lib/seo";
import { personJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/layout/json-ld";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Type system (DESIGN.md): Geist for display and body, Geist Mono only for dates, years and figures.
// display "optional": a preloaded face that arrives within ~100ms is used; otherwise the page keeps
// its fallback for that view instead of swapping later. Fallback metrics differ per OS (no Arial on
// Android or Linux), so a late swap would re-wrap text and shift the layout (CLS).
const sans = Geist({ variable: "--font-geist", subsets: ["latin"], weight: ["400", "500", "600"], display: "optional" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400"], display: "optional" });

// Canonical URLs are set per page; the root must not give one to 404 / error pages.
const { alternates: _homeCanonical, ...homeMeta } = pageMetadata("/");

export const metadata: Metadata = {
  ...homeMeta,
  title: { default: PAGE_META["/"].title, template: `%s | ${SITE.name}` },
  keywords: ["cybersecurity", "penetration testing", "red teaming", "offensive security", "Udesh Bandara", "Kroll"],
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE.url),
  verification: verificationMetadata({ GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-dvh flex-col overflow-x-clip bg-background font-sans antialiased",
          sans.variable,
          mono.variable,
        )}
      >
        <JsonLd data={personJsonLd()} />
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main
            id="main"
            tabIndex={-1}
            className="flex flex-1 flex-col pt-[calc(3.5rem+1px+env(safe-area-inset-top))] outline-none"
          >
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>

        <Analytics />
        <SpeedInsights />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
