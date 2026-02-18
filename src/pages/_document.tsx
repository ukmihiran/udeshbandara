import { Html, Main, Head, NextScript } from "next/document";
import React from "react";

const NextDocument = () => {
  return (
    <Html lang="en">
      <Head>
        {/* <!-- Favicon --> */}
        <link rel="icon" href="/profile_picture.png" />

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="Udesh"></meta>
        <meta name="description" content="Udesh | Cybersecurity Proferssional"></meta>
        <meta name="keywords" content="Cybersecurity, Penetration, Vulnerability, Azure, AWS, Python, Linux, Windows, SQLi, RedTeam"></meta>

        {/* PWA */}
        <meta name="application-name" content="Udesh" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Udesh" />
        <meta name="description" content="Udesh | Cybersecurity Professional" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/ios/1024.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/ios/152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/ios/180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/ios/167.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/ios/32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/ios/16.png"
        />
        <link rel="manifest" href="/manifest.json" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://udeshbandara.com/" />
        <meta name="twitter:title" content="Udesh" />
        <meta name="twitter:description" content="Udesh | Cybersecurity Professional" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dyefizjxd/image/upload/v1683254440/Udesh/IMG_0375_jhb60e.png"
        />
        <meta name="twitter:creator" content="@Udesh" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Udesh" />
        <meta property="og:description" content="Udesh | Cybersecurity Professional" />
        <meta property="og:site_name" content="Udesh" />
        <meta property="og:url" content="https://udeshbandara.com/" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dyefizjxd/image/upload/v1683254440/Udesh/IMG_0375_jhb60e.png"
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default NextDocument;