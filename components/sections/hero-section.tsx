"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Shield, Clock, Award, Crosshair, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 30 : 60;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="text-accent">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="flex-1 flex items-center justify-center px-4 py-8 md:py-12 md:px-6">
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 items-center"
        >
          {/* Text column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            <motion.div variants={fadeUp}>
              <Badge className="mb-3 gap-1.5 px-3 py-1 text-xs font-medium bg-accent/15 text-accent border border-accent/30">
                <Shield className="h-3.5 w-3.5" />
                Offensive Security Consultant
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              Udesh Bandara
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-2 text-sm md:text-base text-muted-foreground">
              <TypewriterRole />
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed"
            >
              Security consultant at{" "}
              <span className="text-accent font-medium">Kroll UK</span>,
              specializing in Penetration Testing, Red Teaming &amp; Cloud Security.
              Co-founder of{" "}
              <a
                href="https://hackedon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent font-medium hover:underline underline-offset-4 cursor-pointer transition-colors"
              >
                HackedON
              </a>.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2.5">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold cursor-pointer">
                <a href="mailto:contact@udeshbandara.com">
                  <Mail className="mr-2 h-4 w-4" /> Get in Touch
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="cursor-pointer border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50">
                <a href="https://www.linkedin.com/in/udesh-wiyasinghe/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-xl">
              {stats.map((s) => (
                <Card
                  key={s.label}
                  className="card-glow flex flex-col items-center gap-1.5 p-3 border-accent/15 bg-card/50 backdrop-blur-sm cursor-default"
                >
                  <s.icon className="h-4 w-4 text-accent" />
                  <span className="text-base font-bold leading-none">{s.value}</span>
                  <span className="text-[10px] text-muted-foreground leading-none tracking-wide uppercase">{s.label}</span>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Avatar column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center order-1 md:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-accent/8 blur-3xl animate-pulse-glow" />
              <motion.div
                className="relative animate-float"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/avatar-3d.png"
                  alt="Udesh Bandara — 3D avatar"
                  width={800}
                  height={800}
                  priority
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 400px"
                  className="relative z-10 w-60 h-60 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] object-contain drop-shadow-2xl dark:drop-shadow-[0_0_20px_rgba(159,239,0,0.1)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
