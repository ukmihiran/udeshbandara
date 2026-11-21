export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold tracking-tight">{title}</h1>
      <p className="mt-1.5 text-[15px] text-muted-foreground">{description}</p>
    </div>
  );
}
