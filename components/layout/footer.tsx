import Link from "next/link";
import { BookOpen, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { SITE, SOCIALS } from "@/lib/site";
import type { Social } from "@/lib/types";

const ICONS: Record<Social["label"], LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Blog: BookOpen,
  Email: Mail,
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <nav aria-label="Footer">
          <ul className="-ml-2.5 flex flex-wrap">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center px-2.5 text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <ul className="flex items-center">
            {SOCIALS.map(({ href, label }) => {
              const Icon = ICONS[label];
              const external = !href.startsWith("mailto:");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={external ? `${label} (opens in a new tab)` : label}
                    className="flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:text-foreground"
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
