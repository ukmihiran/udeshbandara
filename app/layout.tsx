import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Udesh Bandara | Offensive Security Consultant",
  description:
    "Udesh Bandara — Offensive Security Consultant at Kroll UK. Specializing in Penetration Testing, Red Teaming, and Cloud Security.",
  keywords: ["cybersecurity", "penetration testing", "red teaming", "offensive security", "Udesh Bandara", "Kroll"],
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Udesh Bandara | Offensive Security Consultant",
    description: "Offensive Security Consultant at Kroll UK. Penetration Testing, Red Teaming & Cloud Security.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udesh Bandara | Offensive Security Consultant",
    description: "Offensive Security Consultant at Kroll UK.",
  },
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
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <div aria-hidden className="dot-grid pointer-events-none fixed inset-0 z-0 opacity-[0.03]" />
          <Header />
          <main
            id="main"
            tabIndex={-1}
            className="relative z-10 flex flex-1 flex-col pt-[calc(3.5rem+env(safe-area-inset-top))] outline-none lg:pt-24"
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
