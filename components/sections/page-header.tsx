export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-12 border-b border-border pb-10">
      <h1 className="font-display text-page font-semibold">{title}</h1>
      <p className="mt-3 max-w-[60ch] text-title text-foreground-secondary">{description}</p>
    </div>
  );
}
