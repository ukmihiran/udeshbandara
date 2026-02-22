"use client";

import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "./sheet";
import { Menu, BookOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_TABS, EXTERNAL_LINKS, type TabId } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const externalIcons: Record<string, React.ElementType> = {
  Blog: BookOpen,
  Contact: Mail,
};

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const handleHomeClick = () => {
    onTabChange("home");
  };

  return (
    <>
      {/* Desktop floating nav */}
      <header className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <nav className="relative flex items-center gap-2 rounded-full border border-border/40 bg-background/70 backdrop-blur-2xl shadow-xl shadow-black/5 dark:shadow-black/20 px-2.5 py-2.5">
          <button
            onClick={handleHomeClick}
            className="px-4 py-2 flex items-center gap-2.5 text-[15px] font-bold tracking-tight select-none text-accent hover:text-accent/80 transition-colors cursor-pointer rounded-full"
            aria-label="Go to home"
          >
            <div className="relative w-7 h-7 hex-clip overflow-hidden border border-accent/30 bg-background/50">
              <Image
                src="/avatar-3d.png"
                alt="UB"
                width={28}
                height={28}
                className="object-contain w-full h-full"
              />
            </div>
            <span>UB</span>
          </button>

          <span className="h-6 w-px bg-border/50 mx-0.5" />

          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer rounded-full",
                activeTab === tab.id
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}

          <span className="h-6 w-px bg-border/50 mx-0.5" />

          {EXTERNAL_LINKS.map((link) => {
            const Icon = externalIcons[link.label];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="h-10 w-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                aria-label={link.label}
                title={link.label}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </a>
            );
          })}

          <span className="h-6 w-px bg-border/50 mx-0.5" />
          <ModeToggle />

          <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </nav>
      </header>

      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-50 w-full bg-background/50 backdrop-blur-2xl">
        <div className="flex h-14 items-center justify-between px-5">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2.5 text-base font-bold tracking-tight select-none text-accent hover:text-accent/80 transition-colors cursor-pointer"
            aria-label="Go to home"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-accent/30 bg-background/50">
              <Image
                src="/avatar-3d.png"
                alt="UB"
                width={28}
                height={28}
                className="object-contain w-full h-full"
              />
            </div>
            <span>UB</span>
          </button>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 cursor-pointer">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/80 backdrop-blur-2xl">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetDescription className="sr-only">Site navigation.</SheetDescription>
                </SheetHeader>
                <nav className="grid gap-2 mt-8">
                  {NAV_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={cn(
                        "text-left text-base font-medium transition-colors cursor-pointer px-3 py-2 rounded-lg",
                        activeTab === tab.id
                          ? "text-accent-foreground bg-accent"
                          : "text-muted-foreground hover:text-accent"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <div className="h-px bg-border/50 my-2" />
                  {EXTERNAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="text-base text-muted-foreground hover:text-accent transition-colors cursor-pointer px-3 py-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </header>
    </>
  );
}
