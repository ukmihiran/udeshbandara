"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATIONS } from "@/lib/data";
import { ShieldCheck } from "lucide-react";
import { SiAmazon, SiCisco } from "react-icons/si";
import { Cloud } from "lucide-react";
import type { ReactNode } from "react";

const issuerIconMap: Record<string, ReactNode> = {
  "Amazon Web Services": <SiAmazon className="h-6 w-6" />,
  "Microsoft": <Cloud className="h-6 w-6" />,
  "Cisco": <SiCisco className="h-6 w-6" />,
};

const featured = ["AWS Solutions Architect", "CRTP", "CREST CRT"];

export function CertificationsPanel() {
  const featuredCerts = CERTIFICATIONS.filter((c) => featured.includes(c.name));
  const otherCerts = CERTIFICATIONS.filter((c) => !featured.includes(c.name));

  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Certifications</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Industry-recognized credentials in security and cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {featuredCerts.map((cert) => (
            <Card
              key={cert.name}
              className="card-glow group relative p-5 flex flex-col items-center text-center gap-2.5 border-accent/25 cursor-default"
            >
              <span className="text-accent">
                {issuerIconMap[cert.issuer] ?? <ShieldCheck className="h-6 w-6" />}
              </span>
              <span className="text-base font-semibold leading-tight">{cert.name}</span>
              <span className="text-xs text-muted-foreground">{cert.issuer}</span>
              <Badge className="text-[10px] bg-accent/15 text-accent border-accent/30">
                {cert.year}
              </Badge>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {otherCerts.map((cert) => (
            <Card
              key={cert.name}
              className="card-glow group p-3 flex flex-col items-center text-center gap-1.5 cursor-default"
            >
              <span className="text-muted-foreground group-hover:text-accent transition-colors">
                {issuerIconMap[cert.issuer] ?? <ShieldCheck className="h-4 w-4" />}
              </span>
              <span className="text-xs font-medium leading-tight">{cert.name}</span>
              <span className="text-[10px] text-muted-foreground">{cert.year}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
