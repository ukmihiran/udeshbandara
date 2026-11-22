import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { buttonPrimary, buttonSecondary } from "@/components/ui/button-styles";
import { SITE } from "@/lib/site";

/**
 * The page close on every route: one card with the ask on the left and the two ways to reach
 * out on the right. The address stays visible as plain, selectable text for visitors without
 * a mail client.
 */
export function ContactCta() {
  return (
    <section
      aria-labelledby="contact"
      className="panel grid gap-6 rounded-xl border border-border bg-card p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:p-10"
    >
      <div>
        <h2 id="contact" className="font-display text-section font-semibold">
          Hiring for a red team or pentest role?
        </h2>
        <p className="mt-2 max-w-[52ch] text-body text-foreground-secondary">
          I&apos;m open to offensive security, red teaming and cloud security roles. Email is the quickest way to
          reach me.
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-2 inline-flex min-h-11 items-center break-all text-caption text-muted-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-100 hover:text-foreground"
        >
          {SITE.email}
        </a>
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
