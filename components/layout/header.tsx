"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Download, Mail } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { MobileNav } from "./mobile-nav";
import { NAV_ITEMS } from "@/lib/data";
import { getCvHref } from "@/lib/cv";
import { isActivePath } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconLink =
  "flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:text-foreground";

export function Header() {
  const pathname = usePathname();
  const cvHref = getCvHref();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background pt-[env(safe-area-inset-top)]"
      // Captured as its own layer so page transitions never paint over it (see globals.css).
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between pl-[max(1rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] sm:pl-6">
        <Link href="/" className="flex min-h-11 items-center font-display text-title font-medium">
          {SITE.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <ul className="flex items-center">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center px-3 text-caption transition-colors duration-100",
                      active
                        ? "font-semibold text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span aria-hidden className="mx-2 h-5 w-px bg-border" />
          <a href={SITE.blogUrl} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="Blog (opens in a new tab)">
            <BookOpen className="size-[18px]" />
          </a>
          <a href={`mailto:${SITE.email}`} className={iconLink} aria-label="Email">
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
          <MobileNav pathname={pathname} cvHref={cvHref} />
        </div>
      </div>
    </header>
  );
}
