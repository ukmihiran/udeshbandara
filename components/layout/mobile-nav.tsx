"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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
        className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:text-accent"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(20rem,85vw)] bg-background/95 backdrop-blur-md">
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
                    "flex min-h-11 items-center rounded-lg px-3 text-base font-medium transition-colors",
                    active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
          <div aria-hidden className="my-2 h-px bg-border/50" />
          <a
            href={SITE.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center px-3 text-base text-muted-foreground transition-colors hover:text-accent"
          >
            Blog
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex min-h-11 items-center px-3 text-base text-muted-foreground transition-colors hover:text-accent"
          >
            Contact
          </a>
          {cvHref && (
            <a
              href={cvHref}
              download
              className="flex min-h-11 items-center px-3 text-base text-muted-foreground transition-colors hover:text-accent"
            >
              Download CV (PDF)
            </a>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
