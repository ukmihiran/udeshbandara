import Link from "next/link";
import { BookOpen, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { SITE, SOCIALS } from "@/lib/site";
import type { Social } from "@/lib/types";
import { BrandMark } from "./brand-mark";
import { AnalyticsSettingsButton } from "@/components/analytics/google-analytics";
import { GA_ID } from "@/lib/analytics";

const ICONS: Record<Social["label"], LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Blog: BookOpen,
  Email: Mail,
};

/**
 * Two rows. Top: brand and one-line summary, page links inline on the right.
 * Bottom bar: copyright and cookie settings, social icons on the right.
 * Targets are 44px on phones and tighten from sm up, where a pointer is precise.
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 text-body font-semibold sm:min-h-9">
              <BrandMark />
              {SITE.name}
            </Link>
            <p className="mt-1 text-caption text-muted-foreground">
              {SITE.jobTitle} in London. Penetration testing, red teaming and cloud security.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="-mx-2 grid grid-cols-2 sm:flex sm:flex-wrap sm:gap-x-1 md:justify-end">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center rounded-md px-2 text-caption text-muted-foreground transition-colors duration-100 hover:text-foreground sm:min-h-9"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border py-4 text-caption text-muted-foreground">
          <p className="flex flex-wrap items-center gap-x-4">
            <span>
              &copy; {new Date().getFullYear()} {SITE.name}
            </span>
            {GA_ID && (
              <AnalyticsSettingsButton className="min-h-11 underline decoration-border-strong underline-offset-4 transition-colors duration-100 hover:text-foreground sm:min-h-9" />
            )}
          </p>
          <ul className="-mr-2.5 flex items-center">
            {SOCIALS.map(({ href, label }) => {
              const Icon = ICONS[label];
              const external = !href.startsWith("mailto:");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={external ? `${label} (opens in a new tab)` : label}
                    title={label}
                    className="flex size-11 items-center justify-center rounded-md transition-colors duration-100 hover:bg-surface-2 hover:text-foreground"
                  >
                    <Icon aria-hidden className="size-[18px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
