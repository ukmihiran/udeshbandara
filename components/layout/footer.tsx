import Link from "next/link";
import { BookOpen, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { SITE, SOCIALS } from "@/lib/site";
import type { Social } from "@/lib/types";
import { BrandMark } from "./brand-mark";

const ICONS: Record<Social["label"], LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Blog: BookOpen,
  Email: Mail,
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-6 pt-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 text-body font-semibold">
            <BrandMark />
            {SITE.name}
          </Link>
          <p className="mt-1 max-w-[40ch] text-caption text-muted-foreground">
            {SITE.jobTitle}, London. Penetration testing, red teaming and cloud security.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="-ml-3 grid grid-cols-3 sm:flex sm:flex-wrap md:-mr-3 md:ml-0 md:justify-end">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center px-3 text-caption text-muted-foreground transition-colors duration-100 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-3 border-t border-border pt-4 md:col-span-2">
          <p className="text-caption text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <ul className="-mr-3 flex items-center">
            {SOCIALS.map(({ href, label }) => {
              const Icon = ICONS[label];
              const external = !href.startsWith("mailto:");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={external ? `${label} (opens in a new tab)` : label}
                    className="flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-100 hover:bg-surface-2 hover:text-foreground"
                  >
                    <Icon className="size-4" />
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
