"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { TabTransition } from "@/components/tab-transition";
import { HeroSection } from "@/components/sections/hero-section";
import { NAV_TABS, type TabId } from "@/lib/data";

const AboutPanel = dynamic(
  () => import("@/components/sections/about-panel").then((m) => m.AboutPanel),
  { ssr: false },
);

const ExperiencePanel = dynamic(
  () => import("@/components/sections/experience-section").then((m) => m.ExperiencePanel),
  { ssr: false },
);

const CertificationsPanel = dynamic(
  () => import("@/components/sections/certifications-section").then((m) => m.CertificationsPanel),
  { ssr: false },
);

const ProjectsPanel = dynamic(
  () => import("@/components/sections/projects-panel").then((m) => m.ProjectsPanel),
  { ssr: false },
);

const panels: Record<TabId, React.ComponentType> = {
  home: HeroSection,
  about: AboutPanel,
  experience: ExperiencePanel,
  certifications: CertificationsPanel,
  projects: ProjectsPanel,
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const mainRef = useRef<HTMLElement>(null);
  const ActivePanel = panels[activeTab];

  const onTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  const handleKeyNav = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    const num = parseInt(e.key);
    if (num >= 1 && num <= NAV_TABS.length) {
      onTabChange(NAV_TABS[num - 1].id);
      return;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const idx = NAV_TABS.findIndex((t) => t.id === activeTab);
      onTabChange(NAV_TABS[(idx + 1) % NAV_TABS.length].id);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const idx = NAV_TABS.findIndex((t) => t.id === activeTab);
      onTabChange(NAV_TABS[(idx - 1 + NAV_TABS.length) % NAV_TABS.length].id);
    }
  }, [activeTab, onTabChange]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [handleKeyNav]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="fixed inset-0 z-0 dot-grid opacity-[0.03] pointer-events-none" />

      <Header activeTab={activeTab} onTabChange={onTabChange} />
      <main ref={mainRef} className="relative z-10 flex-1 flex flex-col pt-14 md:pt-20 min-h-[calc(100vh-8rem)]">
        <TabTransition activeKey={activeTab}>
          <ActivePanel />
        </TabTransition>
      </main>
      <Footer />
    </div>
  );
}
