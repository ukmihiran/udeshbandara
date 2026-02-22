export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
}

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
  description: string;
  type: "Full-time" | "Co-Founder" | "Contract" | "Internship";
  image?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  image?: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  year: string;
  image?: string;
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
