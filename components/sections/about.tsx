import type { ReactNode } from "react";
import { Cloud, Code, GraduationCap, Monitor, MonitorCog, Network, Search, Shield, Terminal, Wrench } from "lucide-react";
import {
  SiAmazon,
  SiBurpsuite,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiGnubash,
  SiJavascript,
  SiMetasploit,
  SiPhp,
  SiPython,
} from "react-icons/si";
import { EDUCATION, EXPERIENCES, TECH_STACK } from "@/lib/data";
import { formatPeriod, yearsOfExperience } from "@/lib/format";
import { SITE } from "@/lib/site";
import type { TechItem } from "@/lib/types";
import { OrgLogo } from "./org-logo";

const icon = "size-4";
const TECH_ICONS: Record<string, ReactNode> = {
  "Burp Suite": <SiBurpsuite className={icon} />,
  Metasploit: <SiMetasploit className={icon} />,
  Nmap: <Network className={icon} />,
  "Cobalt Strike": <Shield className={icon} />,
  BloodHound: <Search className={icon} />,
  Nessus: <Shield className={icon} />,
  Python: <SiPython className={icon} />,
  "C / C++": <SiCplusplus className={icon} />,
  PowerShell: <Terminal className={icon} />,
  Bash: <SiGnubash className={icon} />,
  PHP: <SiPhp className={icon} />,
  JavaScript: <SiJavascript className={icon} />,
  AWS: <SiAmazon className={icon} />,
  Azure: <Cloud className={icon} />,
  Docker: <SiDocker className={icon} />,
  Git: <SiGit className={icon} />,
  Linux: <Monitor className={icon} />,
  "Windows AD": <MonitorCog className={icon} />,
};

const CATEGORIES: { id: TechItem["category"]; label: string; icon: ReactNode }[] = [
  { id: "security", label: "Security tools", icon: <Shield className={icon} /> },
  { id: "languages", label: "Languages", icon: <Code className={icon} /> },
  { id: "cloud", label: "Cloud & infrastructure", icon: <Cloud className={icon} /> },
];

const card = "card-glow rounded-xl border border-border/40 bg-card p-5 sm:p-6";

export function About() {
  return (
    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-6">
      <section aria-labelledby="bio" className={`${card} md:col-span-4`}>
        <h2 id="bio" className="mb-4 text-xl font-semibold tracking-tight">
          Who I am
        </h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            Dedicated <span className="font-medium text-foreground">Cyber Security Professional</span> with{" "}
            {yearsOfExperience(EXPERIENCES, new Date())} years of experience in Penetration Testing, Red Teaming, Vulnerability Management, and Cloud Security.
          </p>
          <p>
            Currently an <span className="font-medium text-foreground">Offensive Security Consultant</span> at{" "}
            <span className="font-medium text-accent">Kroll UK</span>, specializing in advanced security assessments and
            red team operations for global enterprises.
          </p>
          <p>
            I write about cybersecurity research and best practices on{" "}
            <a
              href={SITE.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Cybernetgen
            </a>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="education" className={`${card} md:col-span-2`}>
        <h2 id="education" className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
          <GraduationCap aria-hidden className="size-4 text-accent" />
          Education
        </h2>
        <ul className="space-y-4">
          {EDUCATION.map((edu, i) => (
            <li key={edu.degree} className={i > 0 ? "border-t border-border/40 pt-4" : undefined}>
              <div className="flex items-start gap-3">
                <OrgLogo src={edu.image} alt={edu.school} scale={edu.logoScale} className="h-11 w-11" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-foreground">{edu.degree}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{edu.school}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatPeriod(edu.start, edu.end)} <span aria-hidden>·</span> {edu.location}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tools" className={`${card} md:col-span-6`}>
        <h2 id="tools" className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
          <Wrench aria-hidden className="size-4 text-accent" />
          Tools &amp; technologies
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <span aria-hidden className="text-accent">
                  {cat.icon}
                </span>
                {cat.label}
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {TECH_STACK.filter((t) => t.category === cat.id).map((t) => (
                  <li
                    key={t.name}
                    data-tech
                    className="flex min-w-0 items-center gap-2.5 rounded-xl border border-border/40 bg-muted/30 px-3 py-2.5 text-sm"
                  >
                    <span aria-hidden className="shrink-0 text-muted-foreground">
                      {TECH_ICONS[t.name] ?? <Shield className={icon} />}
                    </span>
                    <span className="truncate font-medium text-foreground">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
