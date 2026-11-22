import type { Social } from "./types";

export const SITE = {
  url: (process.env.NEXT_PUBLIC_APP_URL ?? "https://udeshbandara.com").replace(/\/+$/, ""),
  name: "Udesh Bandara",
  alternateName: "Udesh Wiyasinghe",
  jobTitle: "Offensive Security Consultant",
  employer: "Kroll",
  email: "contact@udeshbandara.com",
  githubUser: "ukmihiran",
  github: "https://github.com/ukmihiran",
  linkedin: "https://www.linkedin.com/in/udesh-wiyasinghe/",
  blogUrl: "https://cybernetgen.com/",
  blogFeedUrl: "https://cybernetgen.com/api/rss",
} as const;

export const SOCIALS: Social[] = [
  { href: SITE.github, label: "GitHub" },
  { href: SITE.linkedin, label: "LinkedIn" },
  { href: SITE.blogUrl, label: "Blog" },
  { href: `mailto:${SITE.email}`, label: "Email" },
];
