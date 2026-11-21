import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Certification } from "@/lib/types";
import { cn } from "@/lib/utils";
import { OrgLogo } from "./org-logo";

/** Renders as a link only when the cert has a public verification URL. */
function CertShell({
  cert,
  className,
  children,
}: {
  cert: Certification;
  className: string;
  children: React.ReactNode;
}) {
  const base = cn("group h-full rounded-xl border bg-card", cert.verifyUrl && "card-link", className);
  if (cert.verifyUrl) {
    return (
      <a
        data-cert
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${cert.name} — verify credential (opens in a new tab)`}
        className={base}
      >
        {children}
        <ExternalLink aria-hidden className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
      </a>
    );
  }
  return (
    <div data-cert className={base}>
      {children}
    </div>
  );
}

export function Certifications({ items }: { items: Certification[] }) {
  const featured = items.filter((c) => c.featured);
  const others = items.filter((c) => !c.featured);

  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {featured.map((cert) => (
          <li key={cert.name}>
            <CertShell
              cert={cert}
              className="flex flex-col items-center gap-4 border-accent/20 bg-accent/[0.03] p-6 text-center"
            >
              <OrgLogo src={cert.image} alt={cert.issuer} scale={cert.logoScale} className="h-16 w-16 rounded-2xl p-2" />
              <div className="w-full min-w-0 space-y-1">
                <h2 className="text-title font-semibold text-foreground [overflow-wrap:anywhere]">{cert.name}</h2>
                <p className="text-caption text-muted-foreground">{cert.issuer}</p>
              </div>
              <Badge className="border-accent/30 bg-accent/15 px-3 py-0.5 text-caption font-semibold text-accent">
                {cert.year}
              </Badge>
            </CertShell>
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((cert) => (
          <li key={cert.name}>
            <CertShell cert={cert} className="flex items-center gap-4 border-border/40 p-4">
              <OrgLogo src={cert.image} alt={cert.issuer} scale={cert.logoScale} className="h-12 w-12" />
              <div className="min-w-0 flex-1">
                <h2 className="text-body font-semibold text-foreground [overflow-wrap:anywhere]">{cert.name}</h2>
                <p className="mt-1 text-caption text-muted-foreground">
                  {cert.issuer} <span aria-hidden>·</span> {cert.year}
                </p>
              </div>
            </CertShell>
          </li>
        ))}
      </ul>
    </div>
  );
}
