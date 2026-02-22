"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { EDUCATION, TECH_STACK } from "@/lib/data";
import { GraduationCap, Wrench, Shield, Code, Cloud } from "lucide-react";
import {
  SiBurpsuite, SiMetasploit, SiPython, SiCplusplus,
  SiGnubash, SiPhp, SiJavascript,
  SiAmazon, SiDocker, SiGit,
} from "react-icons/si";
import { Search, Network, Terminal, Monitor, MonitorCog } from "lucide-react";
import { motion } from "framer-motion";
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function AboutPanel() {
  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-8">
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-6 gap-3.5 auto-rows-min"
        >
          {/* Bio */}
          <motion.div variants={fadeUp} className="md:col-span-4">
            <Card className="card-glow scanline-overlay relative overflow-hidden h-full p-6 border-border/40">
              <h2 className="text-xl font-semibold tracking-tight mb-4">
                About <span className="text-accent">Me</span>
              </h2>
              <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  Dedicated <span className="text-foreground font-medium">Cyber Security Professional</span> with 4+ years of experience
                  in Penetration Testing, Red Teaming, Vulnerability Management, and
                  Cloud Security.
                </p>
                <p>
                  Currently an{" "}
                  <span className="text-foreground font-medium">Offensive Security Consultant</span>{" "}
                  at <span className="text-accent font-medium">Kroll UK</span>, specializing in
                  advanced security assessments and red team operations for global enterprises.
                </p>
                <p>
                  I write about cybersecurity research and best practices on{" "}
                  <a href="https://cybernetgen.com/" target="_blank" rel="noopener noreferrer"
                    className="text-accent font-medium hover:underline underline-offset-4 cursor-pointer transition-colors">
                    Cybernetgen
                  </a>.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <Card className="card-glow scanline-overlay relative overflow-hidden h-full p-6 border-border/40">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-foreground uppercase tracking-wider">
                <GraduationCap className="h-4 w-4 text-accent" />
                Education
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, idx) => {
                  const eduLogoScale =
                    edu.school === "University of the West of England"
                      ? "scale-[1.38]"
                      : edu.school === "SLIIT"
                        ? "scale-[1.25]"
                        : "scale-100";

                  return (
                  <div key={edu.degree} className={idx > 0 ? "pt-4 border-t border-border/40" : ""}>
                    <div className="flex items-start gap-3">
                      {edu.image && (
                        <div className="relative h-11 w-11 shrink-0 rounded-xl overflow-hidden bg-white/95 dark:bg-white border border-border/40 flex items-center justify-center p-1">
                          <Image
                            src={edu.image}
                            alt={edu.school}
                            width={44}
                            height={44}
                            className={`object-contain ${eduLogoScale}`}
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-snug">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>{edu.year}</span>
                          <span className="text-border">·</span>
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </Card>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={fadeUp} className="md:col-span-6">
            <Card className="card-glow scanline-overlay relative overflow-hidden p-6 border-border/40">
              <h3 className="text-sm font-semibold flex items-center gap-2 mb-5 text-foreground uppercase tracking-wider">
                <Wrench className="h-4 w-4 text-accent" />
                Tools &amp; Technologies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {(["security", "languages", "cloud"] as const).map((cat) => (
                  <div key={cat} className="space-y-3">
                    <div className="flex items-center gap-2">
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
                          className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/40 bg-muted/30 text-sm transition-all duration-200 hover:bg-accent/10 hover:text-accent hover:border-accent/30 cursor-pointer"
                        >
                          <span className="text-muted-foreground group-hover:text-accent shrink-0 transition-colors">
                            {techIconMap[t.name] ?? <Shield className="h-4 w-4" />}
                          </span>
                          <span className="font-medium truncate text-foreground group-hover:text-accent transition-colors">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
