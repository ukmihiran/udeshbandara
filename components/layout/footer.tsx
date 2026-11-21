import { BookOpen, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { SOCIALS } from "@/lib/site";
import type { Social } from "@/lib/types";

const ICONS: Record<Social["label"], LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Blog: BookOpen,
  Email: Mail,
};

export function Footer() {
  return (
    <footer className="w-full pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
      <div aria-hidden className="mb-3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4">
        <p className="font-mono text-[11px] tracking-tight text-muted-foreground">
          <span className="text-accent">$</span> whoami <span aria-hidden>&rarr;</span>{" "}
          offensive-security-consultant<span className="text-accent">@</span>kroll
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3">
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
                    className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-[11px] text-muted-foreground">&copy; {new Date().getFullYear()} Udesh Bandara</p>
        </div>
      </div>
    </footer>
  );
}
