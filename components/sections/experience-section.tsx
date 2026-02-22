"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCES } from "@/lib/data";
import { Building2, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeIn = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function ExperiencePanel() {
  return (
    <section className="flex-1 px-4 py-5 md:px-6 md:py-8">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
          <p className="text-[15px] text-muted-foreground mt-1.5">
            4+ years across offensive security, consulting, and research.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative pl-10"
        >
          <div className="timeline-line" />

          {EXPERIENCES.map((exp, i) => {
            const isLast = i === EXPERIENCES.length - 1;
            const isWideLogo = exp.company === "Kroll";
            const logoScaleClass =
              exp.company === "Axiata Digital Labs"
                ? "scale-[1.35]"
                : exp.company === "CryptoGen"
                  ? "scale-[1.28]"
                  : exp.company === "PwC Sri Lanka"
                    ? "scale-[1.2]"
                    : "scale-100";

            return (
              <motion.div
                key={i}
                variants={fadeIn}
                className={`relative ${isLast ? "" : "pb-6"}`}
              >
                <div
                  className={`timeline-dot ${exp.current ? "timeline-dot-active" : ""}`}
                />

                <Card
                  className={`card-glow scanline-overlay relative overflow-hidden p-5 transition-all duration-200 cursor-default ${
                    exp.current
                      ? "border-accent/20 bg-accent/[0.02]"
                      : "border-border/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {exp.image ? (
                      <div
                        className={`relative shrink-0 overflow-hidden border border-border/40 flex items-center justify-center bg-white/95 dark:bg-white ${
                          isWideLogo ? "h-10 w-16 rounded-lg p-1" : "h-12 w-12 rounded-xl p-1.5"
                        }`}
                      >
                        <Image
                          src={exp.image}
                          alt={exp.company}
                          width={isWideLogo ? 64 : 48}
                          height={isWideLogo ? 40 : 48}
                          className={`object-contain w-full h-full ${logoScaleClass}`}
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                        <Building2 className="h-5 w-5 text-accent" />
                      </div>
                    )}

                    <div className="min-w-0 flex-1 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <h3 className="text-[15px] font-semibold leading-tight text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {exp.current && (
                            <Badge className="text-[10px] px-2 py-0.5 bg-accent/15 text-accent border-accent/30 font-semibold">
                              Current
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 border-border/50 text-muted-foreground"
                          >
                            {exp.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3 shrink-0" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
