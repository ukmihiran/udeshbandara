import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { PAGE_META, jsonLdScript, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

// Type system (docs/design/2026-11-21-ui-ux-audit.md, step 2): serif display, humanist sans body, mono for dates.
const display = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], weight: ["500"] });
const sans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"], weight: ["400", "600"] });
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  ...pageMetadata("/"),
  title: { default: PAGE_META["/"].title, template: `%s | ${SITE.name}` },
  keywords: ["cybersecurity", "penetration testing", "red teaming", "offensive security", "Udesh Bandara", "Kroll"],
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1520" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  viewportFit: "cover",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: SITE.alternateName,
  jobTitle: SITE.jobTitle,
  worksFor: { "@type": "Organization", name: SITE.employer },
  url: SITE.url,
  sameAs: [SITE.linkedin, SITE.github, SITE.blogUrl],
};

/** Google Analytics loads only when explicitly configured (needs a consent banner under UK PECR). */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-dvh flex-col overflow-x-clip bg-background font-sans antialiased",
          display.variable,
          sans.variable,
          mono.variable,
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd) }}
        />
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
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
