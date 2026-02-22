"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Shield, Clock, Award, Crosshair, MapPin } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stats = [
  { icon: Clock, value: "4+", label: "Years Exp." },
  { icon: Award, value: "10+", label: "Certifications" },
  { icon: Crosshair, value: "50+", label: "Engagements" },
  { icon: MapPin, value: "UK", label: "Based" },
];

const roles = [
  "Penetration Tester",
  "Red Teamer",
  "Cloud Security Engineer",
  "Security Researcher",
];

function TypewriterRole() {
  const [display, setDisplay] = useState("");
  const state = useRef({ index: 0, deleting: false });

  const tick = useCallback(() => {
    const { index, deleting } = state.current;
    const current = roles[index];

    if (!deleting && display === current) {
      return setTimeout(() => {
        state.current.deleting = true;
        setDisplay((d) => d.slice(0, -1));
      }, 2000);
    }

    if (deleting && display === "") {
      state.current.deleting = false;
      state.current.index = (index + 1) % roles.length;
      setDisplay(roles[(index + 1) % roles.length].slice(0, 1));
      return undefined;
    }

    const speed = deleting ? 30 : 60;
    return setTimeout(() => {
      setDisplay(
        deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1)
      );
    }, speed);
  }, [display]);

  useEffect(() => {
    const id = tick();
    return () => { if (id) clearTimeout(id); };
  }, [tick]);

  return (
    <span className="text-accent font-medium">
      {display}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function HexAvatar() {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative flex items-center justify-center"
    >
      {/* Diffuse glow behind the hex */}
      <div className="absolute inset-[-40px] hex-clip bg-accent/10 blur-3xl animate-pulse-glow" />

      {/* Radar ping rings */}
      <div className="hex-ring hex-ring-1" />
      <div className="hex-ring hex-ring-2" />

      {/* Hex frame with neon border */}
      <div className="hex-frame animate-float">
        <div className="hex-glitch-idle">
          {/* Gradient border layer */}
          <div className="hex-clip hex-border-pulse bg-gradient-to-br from-accent via-accent/60 to-accent p-[3px]">
            {/* Background punch-out */}
            <div className="hex-clip bg-background">
              <div className="relative">
                <Image
                  src="/avatar-3d.png"
                  alt="Udesh Bandara — 3D avatar"
                  width={800}
                  height={800}
                  priority
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 300px, 360px"
                  className="hex-clip w-60 h-60 md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] object-cover"
                />
                {/* Scanline overlay on avatar */}
                <div className="absolute inset-0 hex-clip hex-scanlines pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HUD status label */}
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full border border-accent/25 bg-background/80 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="font-mono text-[11px] text-accent tracking-wider uppercase">
          verified
        </span>
      </m.div>
    </m.div>
  );
}

export function HeroSection() {
  return (
    <LazyMotion features={domAnimation}>
    <section className="flex-1 flex items-center justify-center px-4 py-6 md:py-10 md:px-6">
      <div className="w-full max-w-5xl mx-auto">
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-center"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            <m.div variants={fadeUp}>
              <Badge className="mb-4 gap-1.5 px-3 py-1 text-xs font-medium bg-accent/15 text-accent border border-accent/30">
                <Shield className="h-3.5 w-3.5" />
                Offensive Security Consultant
              </Badge>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]"
            >
              Udesh Bandara
            </m.h1>

            <m.p variants={fadeUp} className="mt-3 text-base md:text-lg text-muted-foreground font-normal">
              <TypewriterRole />
            </m.p>

            <m.p
              variants={fadeUp}
              className="mt-4 max-w-lg text-[15px] text-muted-foreground leading-relaxed"
            >
              Security consultant at{" "}
              <span className="text-accent font-medium">Kroll UK</span>,
              specializing in Penetration Testing, Red Teaming &amp; Cloud Security.
            </m.p>

            <m.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold cursor-pointer rounded-xl px-6">
                <a href="mailto:contact@udeshbandara.com">
                  <Mail className="mr-2 h-4 w-4" /> Get in Touch
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="cursor-pointer border-border/60 hover:bg-accent/10 hover:border-accent/40 hover:text-accent rounded-xl px-6">
                <a href="https://www.linkedin.com/in/udesh-wiyasinghe/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
            </m.div>

            <m.div variants={fadeUp} className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 w-full max-w-lg">
              {stats.map((s) => (
                <Card
                  key={s.label}
                  className="card-glow scanline-overlay relative overflow-hidden flex flex-col items-center gap-1.5 p-3.5 border-border/40 bg-card/60 backdrop-blur-sm cursor-default"
                >
                  <s.icon className="h-4 w-4 text-accent" />
                  <span className="text-lg font-bold leading-none tracking-tight">{s.value}</span>
                  <span className="text-[10px] text-muted-foreground leading-none tracking-wider uppercase font-medium">{s.label}</span>
                </Card>
              ))}
            </m.div>
          </div>

          <div className="relative flex justify-center order-1 md:order-2 py-8">
            <HexAvatar />
          </div>
        </m.div>
      </div>
    </section>
    </LazyMotion>
  );
}
