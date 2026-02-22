"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATIONS } from "@/lib/data";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const featured = ["AWS Solutions Architect", "CRTP", "CREST CRT"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function CertLogo({ src, alt, size = 36 }: { src?: string; alt: string; size?: number }) {
  const scaleClass =
    alt === "EC-Council"
      ? "scale-[1.55]"
      : alt === "CREST"
        ? "scale-[1.2]"
        : alt === "Cisco"
          ? "scale-[1.2]"
          : alt === "Amazon Web Services"
            ? "scale-[1.1]"
            : alt === "Altered Security"
              ? "scale-[1.12]"
              : alt === "Microsoft"
                ? "scale-[1.12]"
                : alt === "eLearnSecurity"
                  ? "scale-[1.14]"
                  : "scale-100";

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`object-contain w-full h-full ${scaleClass}`}
      />
    );
  }
  return <ShieldCheck className="text-accent" style={{ width: size * 0.7, height: size * 0.7 }} />;
}

export function CertificationsPanel() {
  const featuredCerts = CERTIFICATIONS.filter((c) => featured.includes(c.name));
  const otherCerts = CERTIFICATIONS.filter((c) => !featured.includes(c.name));

  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-8">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold tracking-tight">Certifications</h2>
          <p className="text-[15px] text-muted-foreground mt-1.5">
            Industry-recognized credentials in offensive security and cloud.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Featured certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {featuredCerts.map((cert) => (
              <motion.div key={cert.name} variants={fadeUp}>
                <Card className="card-glow scanline-overlay relative overflow-hidden group p-6 flex flex-col items-center text-center gap-4 border-accent/15 bg-accent/[0.02] cursor-default h-full">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/95 dark:bg-white border border-border/40 p-2">
                    <CertLogo src={cert.image} alt={cert.issuer} size={36} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold leading-tight text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Badge className="text-[11px] px-2.5 py-0.5 bg-accent/15 text-accent border-accent/30 font-semibold">
                    {cert.year}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Other certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {otherCerts.map((cert) => (
              <motion.div key={cert.name} variants={fadeUp}>
                <Card className="card-glow group p-4 flex items-center gap-4 cursor-default h-full border-border/40">
                  <div className="flex items-center justify-center h-12 w-12 shrink-0 rounded-xl bg-white/95 dark:bg-white border border-border/40 p-1.5">
                    <CertLogo src={cert.image} alt={cert.issuer} size={28} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-foreground leading-tight truncate">{cert.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                      <span className="text-border text-xs">·</span>
                      <span className="text-xs text-muted-foreground">{cert.year}</span>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-accent shrink-0 transition-colors" />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
