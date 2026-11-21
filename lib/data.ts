import type { Certification, Education, Experience, NavItem, TechItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/projects", label: "Projects" },
];

/** Hand-maintained profile facts. Edit freely. */
export const PROFILE = {
  status: "Open to opportunities",
  engagements: "50+",
  based: "UK",
  roles: ["Penetration Tester", "Red Teamer", "Cloud Security Engineer", "Security Researcher"],
} as const;

export const EXPERIENCES: Experience[] = [
  {
    role: "Consultant, Offensive Security",
    company: "Kroll",
    location: "London, UK",
    start: "2024-07",
    type: "Full-time",
    description:
      "Leading penetration testing, red team operations, and cloud security assessments for global enterprise clients across critical infrastructure and financial services.",
    image: "/kroll.png",
  },
  {
    role: "Cyber Security Specialist",
    company: "Axiata Digital Labs",
    location: "Colombo, Sri Lanka",
    start: "2021-04",
    end: "2021-12",
    type: "Full-time",
    description:
      "Conducted security assessments and vulnerability management for digital services across Axiata Group's South-East Asian operations.",
    image: "/axiata.png",
    logoScale: 1.35,
  },
  {
    role: "Assistant Engineer — InfoSec",
    company: "CryptoGen",
    location: "Colombo, Sri Lanka",
    start: "2020-04",
    end: "2021-04",
    type: "Full-time",
    description:
      "Performed network and application security testing, vulnerability assessments, and security monitoring for enterprise clients.",
    image: "/cryptogen.jpeg",
    logoScale: 1.28,
  },
  {
    role: "Cyber Security Analyst",
    company: "PwC Sri Lanka",
    location: "Sri Lanka",
    start: "2019-07",
    end: "2020-04",
    type: "Full-time",
    description:
      "Delivered cybersecurity consulting services including penetration testing, vulnerability assessments, and compliance audits.",
    image: "/pwc.png",
    logoScale: 1.2,
  },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2025", image: "/certs/AWS.png", logoScale: 1.1, featured: true },
  { name: "CRTP", issuer: "Altered Security", year: "2025", image: "/certs/CRTP.png", logoScale: 1.12, featured: true },
  { name: "CREST CRT", issuer: "CREST", year: "2024", image: "/certs/crest.png", logoScale: 1.2, featured: true },
  { name: "CREST CPSA", issuer: "CREST", year: "2024", image: "/certs/crest.png", logoScale: 1.2 },
  { name: "CEH", issuer: "EC-Council", year: "2020", image: "/certs/CEH.png", logoScale: 1.55 },
  { name: "Azure Fundamentals", issuer: "Microsoft", year: "2020", image: "/certs/azure.png", logoScale: 1.12 },
  { name: "eJPT", issuer: "eLearnSecurity", year: "2020", image: "/certs/ejpt.svg", logoScale: 1.14 },
  { name: "CCNA Cyber Ops", issuer: "Cisco", year: "2019", image: "/certs/cisco.svg", logoScale: 1.2 },
];

export const EDUCATION: Education[] = [
  {
    degree: "MSc Cyber Security",
    school: "University of the West of England",
    location: "Bristol, UK",
    start: "2022",
    end: "2023",
    image: "/uwe.png",
    logoScale: 1.38,
  },
  {
    degree: "BSc (Hons) IT — Cyber Security",
    school: "SLIIT",
    location: "Sri Lanka",
    start: "2016",
    end: "2020",
    image: "/sliit.png",
    logoScale: 1.25,
  },
];

export const TECH_STACK: TechItem[] = [
  { name: "Burp Suite", category: "security" },
  { name: "Metasploit", category: "security" },
  { name: "Nmap", category: "security" },
  { name: "Cobalt Strike", category: "security" },
  { name: "BloodHound", category: "security" },
  { name: "Nessus", category: "security" },
  { name: "Python", category: "languages" },
  { name: "C / C++", category: "languages" },
  { name: "PowerShell", category: "languages" },
  { name: "Bash", category: "languages" },
  { name: "PHP", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "AWS", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "Git", category: "cloud" },
  { name: "Linux", category: "cloud" },
  { name: "Windows AD", category: "cloud" },
];

/** GitHub repos shown first on /projects, in this order. Edit to curate. */
export const FEATURED_REPOS: string[] = [
  "BloodHound-Standalone",
  "EnumLiveHost",
  "WifiPasswordViewer",
  "PDFUnlocker",
  "dga_detection_deep_learning",
  "SecurityTrails-Subdomain-Scanner",
];
