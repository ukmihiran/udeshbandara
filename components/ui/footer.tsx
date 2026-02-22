import { Github, Linkedin, Mail, BookOpen } from "lucide-react";

const socials = [
  { href: "https://github.com/ukmihiran", Icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/udesh-wiyasinghe/", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://cybernetgen.com/", Icon: BookOpen, label: "Blog" },
  { href: "mailto:contact@udeshbandara.com", Icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="w-full py-2.5">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-2.5" />
      <div className="container mx-auto flex flex-col items-center gap-2 px-4">
        <p className="font-mono text-[11px] text-muted-foreground tracking-tight">
          <span className="text-accent">$</span> whoami{" "}
          <span className="text-muted-foreground/50">&rarr;</span>{" "}
          offensive-security-consultant<span className="text-accent">@</span>kroll
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-accent transition-colors cursor-pointer"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <span className="h-3 w-px bg-border/60" />
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Udesh Bandara
          </p>
        </div>
      </div>
    </footer>
  );
}
