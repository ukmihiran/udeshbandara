"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Download, Linkedin, Mail } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { MobileNav } from "./mobile-nav";
import { NAV_ITEMS } from "@/lib/data";
import { getCvHref } from "@/lib/cv";
import { isActivePath } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";

const iconLink =
  "flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-100 hover:bg-surface-2 hover:text-foreground";

export function Header() {
  const pathname = usePathname();
  const cvHref = getCvHref();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background pt-[env(safe-area-inset-top)]"
      // Captured as its own layer so page transitions never paint over it (see globals.css).
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between pl-[max(1rem,env(safe-area-inset-left))] pr-[max(0.25rem,env(safe-area-inset-right))] sm:pl-6 sm:pr-3">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 text-body font-semibold tracking-[-0.01em]">
          <BrandMark />
          {SITE.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-9 items-center rounded-lg px-3 text-caption font-medium transition-colors duration-100",
                      active ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span aria-hidden className="mx-2 h-5 w-px bg-border" />
          <a
            href={SITE.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-9 items-center gap-1 rounded-lg px-3 text-caption font-medium text-muted-foreground transition-colors duration-100 hover:text-foreground"
          >
            Blog <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
            aria-label="LinkedIn (opens in a new tab)"
            title="LinkedIn"
          >
            <Linkedin className="size-[18px]" />
          </a>
          <a href={`mailto:${SITE.email}`} className={iconLink} aria-label={`Email ${SITE.email}`} title={SITE.email}>
            <Mail className="size-[18px]" />
          </a>
          {cvHref && (
            <a href={cvHref} download className={iconLink} aria-label="Download CV (PDF)">
              <Download className="size-[18px]" />
            </a>
          )}
          <ModeToggle />
        </nav>

        <div className="flex items-center lg:hidden">
          <ModeToggle />
          {/* Keyed by route so the menu closes on any navigation, including browser Back. */}
          <MobileNav key={pathname} pathname={pathname} cvHref={cvHref} />
        </div>
      </div>
    </header>
  );
}
