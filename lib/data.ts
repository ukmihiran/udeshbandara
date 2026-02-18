export type TabId = "home" | "about" | "experience" | "certifications" | "projects";

export interface NavTab {
  id: TabId;
  label: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  year: string;
}

export interface TechItem {
  name: string;
  category: "security" | "languages" | "cloud";
}

export interface Social {
  href: string;
  label: string;
  icon: string;
}

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
  },
  {
    role: "Co-Founder & Security Researcher",
    company: "HackedON",
    location: "Sri Lanka",
    period: "Jul 2019 — Present",
    current: true,
  },
  {
    role: "Cyber Security Specialist",
    company: "Axiata Digital Labs",
    location: "Colombo, Sri Lanka",
    period: "Apr 2021 — Dec 2021",
    current: false,
  },
  {
    role: "Assistant Engineer — InfoSec",
    company: "CryptoGen",
    location: "Colombo, Sri Lanka",
    period: "Apr 2020 — Apr 2021",
    current: false,
  },
  {
    role: "Cyber Security Analyst",
    company: "PwC Sri Lanka",
    location: "Sri Lanka",
    period: "Jul 2019 — Apr 2020",
    current: false,
  },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2025" },
  { name: "CRTP", issuer: "Altered Security", year: "2025" },
  { name: "CREST CRT", issuer: "CREST", year: "2024" },
  { name: "CREST CPSA", issuer: "CREST", year: "2024" },
  { name: "CEH", issuer: "EC-Council", year: "2020" },
  { name: "Azure Fundamentals", issuer: "Microsoft", year: "2020" },
  { name: "eJPT", issuer: "eLearnSecurity", year: "2020" },
  { name: "CCNA Cyber Ops", issuer: "Cisco", year: "2019" },
];

export const EDUCATION: Education[] = [
  {
    degree: "MSc Cyber Security",
    school: "University of the West of England",
    location: "Bristol, UK",
    year: "2022 — 2023",
  },
  {
    degree: "BSc (Hons) IT — Cyber Security",
    school: "SLIIT",
    location: "Sri Lanka",
    year: "2016 — 2020",
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
