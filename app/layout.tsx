import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Udesh Bandara | Offensive Security Consultant",
  description:
    "Udesh Bandara — Offensive Security Consultant at Kroll UK. Specializing in Penetration Testing, Red Teaming, and Cloud Security.",
  keywords: [
    "cybersecurity",
    "penetration testing",
    "red teaming",
    "offensive security",
    "Udesh Bandara",
    "Kroll",
  ],
  robots: { index: true, follow: true },
  metadataBase: new URL("https://udeshbandara.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Udesh Bandara | Offensive Security Consultant",
    description:
      "Offensive Security Consultant at Kroll UK. Penetration Testing, Red Teaming & Cloud Security.",
    url: "https://udeshbandara.com",
    siteName: "Udesh Bandara",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udesh Bandara | Offensive Security Consultant",
    description: "Offensive Security Consultant at Kroll UK.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Udesh Bandara",
  alternateName: "Udesh Wiyasinghe",
  jobTitle: "Offensive Security Consultant",
  worksFor: { "@type": "Organization", name: "Kroll" },
  url: "https://udeshbandara.com",
  sameAs: [
    "https://www.linkedin.com/in/udesh-wiyasinghe/",
    "https://github.com/ukmihiran",
    "https://cybernetgen.com/",
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-D2BNKKLPJV";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          geistSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <noscript>
          <div style={{ padding: "2rem", maxWidth: "40rem", margin: "0 auto" }}>
            <h1>Udesh Bandara — Offensive Security Consultant</h1>
            <p>
              Cyber Security Professional at Kroll UK specializing in Penetration
              Testing, Red Teaming &amp; Cloud Security.
            </p>
            <p>
              Certifications: AWS Solutions Architect, CRTP, CREST CRT, CREST
              CPSA, CEH, Azure Security, eJPT, CCNA.
            </p>
            <p>
              <a href="https://www.linkedin.com/in/udesh-wiyasinghe/">LinkedIn</a>
              {" | "}
              <a href="https://github.com/ukmihiran">GitHub</a>
              {" | "}
              <a href="https://cybernetgen.com/">Blog</a>
            </p>
          </div>
        </noscript>

        {GA_ID !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
