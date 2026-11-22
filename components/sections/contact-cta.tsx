import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button-styles";
import { CopyEmail } from "@/components/ui/copy-email";
import { SITE } from "@/lib/site";

/** The page close on every route: one line of intent, the address in plain text, two ways to reach out. */
export function ContactCta() {
  return (
    <section
      aria-labelledby="contact"
      className="grid gap-8 border-t border-border pt-16 md:grid-cols-[1fr_auto] md:items-end"
    >
      <div>
        <h2 id="contact" className="font-display text-page font-semibold">
          Hiring for a red team or pentest role?
        </h2>
        <p className="mt-3 max-w-[52ch] text-body text-foreground-secondary">
          Email is the quickest way to reach me. I&apos;m also on LinkedIn.
        </p>
        <p className="-ml-3 mt-4 flex flex-wrap items-center gap-x-1">
          <span className="pl-3 font-mono text-body text-foreground">{SITE.email}</span>
          <CopyEmail email={SITE.email} />
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${SITE.email}`} className={buttonPrimary}>
          <Mail aria-hidden className="size-4" /> Email me
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
          <Linkedin aria-hidden className="size-4" /> LinkedIn
          <ArrowUpRight aria-hidden className="size-3.5 text-muted-foreground" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
