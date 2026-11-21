/** "YYYY" or "YYYY-MM". */
export type YearMonth = string;

export interface Experience {
  role: string;
  company: string;
  location: string;
  start: YearMonth;
  /** Omitted for the current role. */
  end?: YearMonth;
  type: "Full-time" | "Co-Founder" | "Contract" | "Internship";
  description: string;
  image?: string;
  logoScale?: number;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  start: YearMonth;
  end?: YearMonth;
  image?: string;
  logoScale?: number;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  image?: string;
  logoScale?: number;
  /** Public verification page (Credly, issuer). Card links only when set. */
  verifyUrl?: string;
  featured?: boolean;
}

export interface TechItem {
  name: string;
  category: "security" | "languages" | "cloud";
}

export interface NavItem {
  href: "/" | "/about" | "/experience" | "/certifications" | "/projects";
  label: string;
}

export interface Social {
  href: string;
  label: "GitHub" | "LinkedIn" | "Blog" | "Email";
}

export interface Repository {
  id: number;
  name: string;
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
}

export interface BlogPost {
  title: string;
  url: string;
  /** ISO 8601 */
  publishedAt: string;
  excerpt: string;
}

export interface TimelineEntry {
  kind: "work" | "education";
  title: string;
  org: string;
  location: string;
  start: YearMonth;
  end?: YearMonth;
  current: boolean;
  description?: string;
  badge?: string;
  image?: string;
  logoScale?: number;
}
