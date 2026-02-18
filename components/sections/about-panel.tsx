"use client";

import { Card } from "@/components/ui/card";
import { EDUCATION, TECH_STACK } from "@/lib/data";
import { GraduationCap, Wrench, Shield, Code, Cloud } from "lucide-react";
import {
  SiBurpsuite, SiMetasploit, SiPython, SiCplusplus,
  SiGnubash, SiPhp, SiJavascript,
  SiAmazon, SiDocker, SiGit,
} from "react-icons/si";
import { Search, Network, Terminal, Monitor, MonitorCog } from "lucide-react";
import type { ReactNode } from "react";

const techIconMap: Record<string, ReactNode> = {
  "Burp Suite": <SiBurpsuite className="h-4 w-4" />,
  "Metasploit": <SiMetasploit className="h-4 w-4" />,
  "Nmap": <Network className="h-4 w-4" />,
  "Cobalt Strike": <Shield className="h-4 w-4" />,
  "BloodHound": <Search className="h-4 w-4" />,
  "Nessus": <Shield className="h-4 w-4" />,
  "Python": <SiPython className="h-4 w-4" />,
  "C / C++": <SiCplusplus className="h-4 w-4" />,
  "PowerShell": <Terminal className="h-4 w-4" />,
  "Bash": <SiGnubash className="h-4 w-4" />,
  "PHP": <SiPhp className="h-4 w-4" />,
  "JavaScript": <SiJavascript className="h-4 w-4" />,
  "AWS": <SiAmazon className="h-4 w-4" />,
  "Azure": <Cloud className="h-4 w-4" />,
  "Docker": <SiDocker className="h-4 w-4" />,
  "Git": <SiGit className="h-4 w-4" />,
  "Linux": <Monitor className="h-4 w-4" />,
  "Windows AD": <MonitorCog className="h-4 w-4" />,
};

const categoryIcons: Record<string, ReactNode> = {
  security: <Shield className="h-4 w-4" />,
  languages: <Code className="h-4 w-4" />,
  cloud: <Cloud className="h-4 w-4" />,
};

const categoryLabels: Record<string, string> = {
  security: "Security Tools",
  languages: "Languages",
  cloud: "Cloud & Infrastructure",
};

export function AboutPanel() {
  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 auto-rows-min">
          {/* Bio - Large card spanning 4 columns */}
          <Card className="card-glow md:col-span-4 p-5 border-accent/15">
            <h2 className="text-lg font-semibold tracking-tight mb-3 flex items-center gap-2">
              <span className="text-accent">About</span>
              <span className="text-muted-foreground">Me</span>
            </h2>
            <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
              <p className="text-sm">
                Dedicated <span className="text-accent font-medium">Cyber Security Professional</span> with 4+ years of experience
                in Penetration Testing, Red Teaming, Vulnerability Management, and
                Cloud Security.
              </p>
              <p className="text-sm">
                Currently an{" "}
                <span className="text-accent font-medium">Offensive Security Consultant</span>{" "}
                at <span className="text-accent font-medium">Kroll UK</span>, specializing in
                advanced security assessments and red team operations.
              </p>
              <p className="text-sm">
                Co-founded{" "}
                <a href="https://hackedon.com" target="_blank" rel="noopener noreferrer"
                  className="text-accent font-medium hover:underline underline-offset-4 cursor-pointer transition-colors">
                  HackedON
                </a>, a crowdsourced vulnerability coordination platform that helps organizations
                identify and remediate security issues.
              </p>
              <p className="text-sm">
                I write about cybersecurity research and best practices on{" "}
                <a href="https://cybernetgen.com/" target="_blank" rel="noopener noreferrer"
                  className="text-accent font-medium hover:underline underline-offset-4 cursor-pointer transition-colors">
                  Cybernetgen
                </a>.
              </p>
            </div>
          </Card>

          {/* Education - Medium card */}
          <Card className="card-glow md:col-span-2 p-5 border-accent/15">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-foreground">
              <GraduationCap className="h-4 w-4 text-accent" />
              Education
            </h3>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={edu.degree} className={idx > 0 ? "pt-3 border-t border-border/50" : ""}>
                  <p className="text-sm font-semibold text-foreground mb-1">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground mb-1">{edu.school}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{edu.year}</span>
                    <span className="text-border">•</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tech Stack - Large card spanning full width */}
          <Card className="card-glow md:col-span-6 p-5 border-accent/15">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-foreground">
              <Wrench className="h-4 w-4 text-accent" />
              Tools &amp; Technologies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["security", "languages", "cloud"] as const).map((cat) => (
                <div key={cat} className="space-y-2.5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent">
                      {categoryIcons[cat]}
                    </span>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      {categoryLabels[cat]}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {TECH_STACK.filter((t) => t.category === cat).map((t) => (
                      <div
                        key={t.name}
                        className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/50 text-sm transition-all duration-200 hover:bg-accent/10 hover:text-accent hover:border-accent/40 cursor-default"
                      >
                        <span className="text-muted-foreground group-hover:text-accent shrink-0 transition-colors">
                          {techIconMap[t.name] ?? <Shield className="h-4 w-4" />}
                        </span>
                        <span className="font-medium truncate">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
