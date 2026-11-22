import { ArrowUpRight } from "lucide-react";
import type { Certification } from "@/lib/types";
import { cn } from "@/lib/utils";
import { transitionStyle } from "@/lib/view-transition";
import { OrgLogo } from "./org-logo";

function CertBody({ cert }: { cert: Certification }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <OrgLogo src={cert.image} alt={cert.issuer} scale={cert.logoScale} />
        <span className="font-mono text-caption text-muted-foreground tabular-nums">{cert.year}</span>
      </div>
      <h2
        data-cert-name
        data-cert-vt={cert.name}
        style={transitionStyle("cert", cert.name)}
        className="mt-4 text-body font-semibold text-foreground [overflow-wrap:anywhere] sm:mt-6 sm:text-title"
      >
        {cert.name}
      </h2>
      <p className="text-caption text-foreground-secondary">{cert.issuer}</p>
      {cert.verifyUrl && (
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-caption text-muted-foreground transition-colors duration-100 group-hover:text-foreground">
          Verify credential <ArrowUpRight aria-hidden className="size-3.5" />
        </span>
      )}
    </>
  );
}

const card = "panel flex h-full flex-col rounded-xl border border-border bg-card p-4 sm:p-5";

/** A grid in authored order (featured first); a card is a link only when it can be verified. */
export function Certifications({ items }: { items: Certification[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((cert) => (
        <li key={cert.name}>
          {cert.verifyUrl ? (
            <a
              data-cert
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cert.name}, ${cert.issuer}, ${cert.year}. Verify credential (opens in a new tab)`}
              className={cn(card, "card-link group")}
            >
              <CertBody cert={cert} />
            </a>
          ) : (
            <div data-cert className={card}>
              <CertBody cert={cert} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
