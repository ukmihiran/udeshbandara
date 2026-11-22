"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Download, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonPrimary } from "@/components/ui/button-styles";
import { NAV_ITEMS } from "@/lib/data";
import { isActivePath } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconButton =
  "flex size-11 items-center justify-center rounded-lg text-foreground transition-colors duration-100 hover:bg-surface-2";
const secondaryLink =
  "flex min-h-11 items-center gap-3 rounded-lg px-3 text-body text-muted-foreground transition-colors duration-100 hover:bg-surface-2 hover:text-foreground";

const ELSEWHERE = [
  { href: SITE.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.github, label: "GitHub", Icon: Github },
  { href: SITE.blogUrl, label: "Blog", Icon: BookOpen },
];

/**
 * Phone and tablet menu. The panel repeats the site header's 56px row, so its close button
 * lands exactly where the menu button was; links come in two groups; email is the closing action.
 */
export function MobileNav({ pathname, cvHref }: { pathname: string; cvHref: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={iconButton} aria-label="Open menu">
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        hideClose
        className="w-[min(20rem,85vw)] gap-0 overflow-y-auto bg-background"
        // Focus the panel, not the first control, so opening by tap shows no focus ring;
        // keyboard users Tab straight to the links.
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          (event.currentTarget as HTMLElement).focus();
        }}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border pl-4 pr-1">
          <SheetTitle className="text-body font-semibold">Menu</SheetTitle>
          <SheetClose className={iconButton}>
            <X aria-hidden className="size-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        <SheetDescription className="sr-only">Site sections and contact links.</SheetDescription>

        <nav aria-label="Mobile" className="grid gap-0.5 px-2 pt-3">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-lg px-3 text-body transition-colors duration-100",
                    active ? "bg-surface-2 font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        <div className="mx-4 my-3 h-px shrink-0 bg-border" />

        <ul className="grid gap-0.5 px-2">
          {ELSEWHERE.map(({ href, label, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
                <Icon aria-hidden className="size-4" />
                {label}
                <ArrowUpRight aria-hidden className="ml-auto size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          {cvHref && (
            <li>
              <a href={cvHref} download className={secondaryLink}>
                <Download aria-hidden className="size-4" />
                Download CV
                <span className="sr-only"> (PDF)</span>
              </a>
            </li>
          )}
        </ul>

        <div className="mt-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
          <a href={`mailto:${SITE.email}`} className={cn(buttonPrimary, "w-full justify-center")}>
            <Mail aria-hidden className="size-4" /> Email me
          </a>
          <p className="mt-2 truncate text-center font-mono text-caption text-muted-foreground">{SITE.email}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
