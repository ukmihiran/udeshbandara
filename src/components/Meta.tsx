import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { capitalise } from "../utils/capitalise";

type IMeta = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
};

const Meta: React.FC<IMeta> = ({
  title = "Udesh | Cybersecurity Professional",
  description = "Explore my portfolio showcasing my expertise in penetration testing, vulnerability management, Red Team projects, cloud security, and IT general controls. See how I can help your organization identify and mitigate security risks.",
  keywords = "Cybersecurity, Vulnerability, ReadTeam, Cloud, AWS, Azure, ITGC, IT, Security, Penetration",
  image = "https://res.cloudinary.com/dyefizjxd/image/upload/v1683254440/Udesh/IMG_0375_jhb60e.png",
}) => {
  const router = useRouter();

  let pageTitle;
  if (router.pathname === "/") {
    pageTitle = "Udesh | Cybersecurity Professional";
  } else {
    const path = router.pathname.split("/").pop();
    pageTitle = `Udesh | ${capitalise(path)}`;
  }

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-D2BNKKLPJV"></script>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());
        gtag('config', 'G-D2BNKKLPJV');`
      }} />
      
      <title>{pageTitle}</title>
    </Head>
  );
};

export default Meta;