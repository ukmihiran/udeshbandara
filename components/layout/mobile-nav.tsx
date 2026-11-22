"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/data";
import { isActivePath } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav({ pathname, cvHref }: { pathname: string; cvHref: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex size-11 items-center justify-center rounded-lg text-foreground transition-colors duration-100 hover:bg-surface-2"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(20rem,85vw)] overflow-y-auto bg-background">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Site sections and contact links.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="grid gap-1 px-4">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-lg px-3 text-body transition-colors",
                    active ? "bg-muted font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
          <div aria-hidden className="my-2 h-px bg-border" />
          {[
            { href: SITE.linkedin, label: "LinkedIn" },
            { href: SITE.github, label: "GitHub" },
            { href: SITE.blogUrl, label: "Blog" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1.5 px-3 text-body text-muted-foreground transition-colors duration-100 hover:text-foreground"
            >
              {label} <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="flex min-h-11 items-center px-3 text-body text-muted-foreground transition-colors duration-100 hover:text-foreground"
          >
            Email {SITE.email}
          </a>
          {cvHref && (
            <a
              href={cvHref}
              download
              className="flex min-h-11 items-center px-3 text-body text-muted-foreground transition-colors duration-100 hover:text-foreground"
            >
              Download CV (PDF)
            </a>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
