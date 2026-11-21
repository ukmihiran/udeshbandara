"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Mail } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { MobileNav } from "./mobile-nav";
import { NAV_ITEMS } from "@/lib/data";
import { isActivePath } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex min-h-11 items-center gap-2.5 rounded-full px-2 text-base font-bold tracking-tight text-accent transition-colors hover:text-accent/80",
        className,
      )}
    >
      <span className="hex-clip relative block size-7 overflow-hidden border border-accent/30 bg-background/50">
        <Image src="/avatar-3d.png" alt="" width={28} height={28} className="size-full object-contain" />
      </span>
      <span>UB</span>
      <span className="sr-only">{SITE.name}, home</span>
    </Link>
  );
}

const iconLink =
  "flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] lg:top-4 lg:pt-0">
      {/* Below lg: compact bar + menu sheet */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-md lg:hidden">
        <div className="flex h-14 items-center justify-between pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))]">
          <Logo />
          <div className="flex items-center gap-1">
            <ModeToggle />
            <MobileNav pathname={pathname} />
          </div>
        </div>
      </div>

      {/* lg and up: floating pill */}
      <nav
        aria-label="Main"
        className="mx-auto hidden w-max max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border border-border/40 bg-background/75 px-2 py-1.5 shadow-xl shadow-black/5 backdrop-blur-md lg:flex dark:shadow-black/20"
      >
        <Logo className="pr-3" />
        <span aria-hidden className="mx-1 h-6 w-px bg-border/50" />
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-full px-4 text-[13px] font-medium transition-colors",
                    active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <span aria-hidden className="mx-1 h-6 w-px bg-border/50" />
        <a href={SITE.blogUrl} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="Blog (opens in a new tab)">
          <BookOpen className="size-5" />
        </a>
        <a href={`mailto:${SITE.email}`} className={iconLink} aria-label="Email">
          <Mail className="size-5" />
        </a>
        <ModeToggle />
      </nav>
    </header>
  );
}
