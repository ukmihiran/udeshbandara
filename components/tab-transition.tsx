"use client";

interface TabTransitionProps {
  activeKey: string;
  children: React.ReactNode;
}

export function TabTransition({ activeKey, children }: TabTransitionProps) {
  return (
    <div key={activeKey} className="flex-1 flex flex-col min-w-0 animate-in fade-in duration-200">
      {children}
    </div>
  );
}
