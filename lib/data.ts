import type {
  NavTab,
  Experience,
  Certification,
  Education,
  TechItem,
} from "./types";

export type { TabId } from "./types";

export const NAV_TABS: NavTab[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
];

export const EXTERNAL_LINKS = [
  { href: "https://cybernetgen.com/", label: "Blog" },
  { href: "mailto:contact@udeshbandara.com", label: "Contact" },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Consultant, Offensive Security",
    company: "Kroll",
    location: "London, UK",
    period: "Jul 2024 — Present",
    current: true,
    type: "Full-time",
    description:
      "Leading penetration testing, red team operations, and cloud security assessments for global enterprise clients across critical infrastructure and financial services.",
    image: "/kroll.png",
  },
  {
    role: "Cyber Security Specialist",
    company: "Axiata Digital Labs",
    location: "Colombo, Sri Lanka",
    period: "Apr 2021 — Dec 2021",
    current: false,
    type: "Full-time",
    description:
      "Conducted security assessments and vulnerability management for digital services across Axiata Group's South-East Asian operations.",
    image: "/axiata.png",
  },
  {
    role: "Assistant Engineer — InfoSec",
    company: "CryptoGen",
    location: "Colombo, Sri Lanka",
    period: "Apr 2020 — Apr 2021",
    current: false,
    type: "Full-time",
    description:
      "Performed network and application security testing, vulnerability assessments, and security monitoring for enterprise clients.",
    image: "/cryptogen.jpeg",
  },
  {
    role: "Cyber Security Analyst",
    company: "PwC Sri Lanka",
    location: "Sri Lanka",
    period: "Jul 2019 — Apr 2020",
    current: false,
    type: "Full-time",
    description:
      "Delivered cybersecurity consulting services including penetration testing, vulnerability assessments, and compliance audits.",
    image: "/pwc.png",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2025", image: "/certs/AWS.png" },
  { name: "CRTP", issuer: "Altered Security", year: "2025", image: "/certs/CRTP.png" },
  { name: "CREST CRT", issuer: "CREST", year: "2024", image: "/certs/crest.png" },
  { name: "CREST CPSA", issuer: "CREST", year: "2024", image: "/certs/crest.png" },
  { name: "CEH", issuer: "EC-Council", year: "2020", image: "/certs/CEH.png" },
  { name: "Azure Fundamentals", issuer: "Microsoft", year: "2020", image: "/certs/azure.png" },
  { name: "eJPT", issuer: "eLearnSecurity", year: "2020", image: "/certs/ejpt.svg" },
  { name: "CCNA Cyber Ops", issuer: "Cisco", year: "2019", image: "/certs/cisco.svg" },
];

export const EDUCATION: Education[] = [
  {
    degree: "MSc Cyber Security",
    school: "University of the West of England",
    location: "Bristol, UK",
    year: "2022 — 2023",
    image: "/uwe.png",
  },
  {
    degree: "BSc (Hons) IT — Cyber Security",
    school: "SLIIT",
    location: "Sri Lanka",
    year: "2016 — 2020",
    image: "/sliit.png",
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

export const SOCIALS = [
  { href: "https://github.com/ukmihiran", label: "GitHub", icon: "Github" },
  { href: "https://www.linkedin.com/in/udesh-wiyasinghe/", label: "LinkedIn", icon: "Linkedin" },
  { href: "https://cybernetgen.com/", label: "Blog", icon: "BookOpen" },
  { href: "mailto:contact@udeshbandara.com", label: "Email", icon: "Mail" },
] as const;
