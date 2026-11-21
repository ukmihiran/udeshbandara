import { ExternalLink } from "lucide-react";
import type { Certification } from "@/lib/types";
import { OrgLogo } from "./org-logo";

function CertRow({ cert }: { cert: Certification }) {
  return (
    <>
      <OrgLogo src={cert.image} alt={cert.issuer} scale={cert.logoScale} />
      <div className="min-w-0 flex-1">
        <p data-cert-name className="text-body font-semibold text-foreground [overflow-wrap:anywhere]">
          {cert.name}
        </p>
        <p className="text-caption text-foreground-secondary">{cert.issuer}</p>
      </div>
      <span className="font-mono text-caption text-muted-foreground tabular-nums">{cert.year}</span>
      {cert.verifyUrl && (
        <ExternalLink
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-colors duration-100 group-hover:text-foreground"
        />
      )}
    </>
  );
}

/** One divided list in authored order; a row is a link only when it can be verified. */
export function Certifications({ items }: { items: Certification[] }) {
  return (
    <ul className="max-w-3xl divide-y divide-border border-y border-border">
      {items.map((cert) => (
        <li key={cert.name}>
          {cert.verifyUrl ? (
            <a
              data-cert
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cert.name}, ${cert.issuer}, ${cert.year}. Verify credential (opens in a new tab)`}
              className="group flex min-h-16 items-center gap-4 py-4 transition-colors duration-100 hover:bg-surface-2"
            >
              <CertRow cert={cert} />
            </a>
          ) : (
            <div data-cert className="flex min-h-16 items-center gap-4 py-4">
              <CertRow cert={cert} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
