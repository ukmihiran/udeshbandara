export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-page font-medium">{title}</h1>
      <p className="mt-2 max-w-[65ch] text-body text-foreground-secondary">{description}</p>
    </div>
  );
}
