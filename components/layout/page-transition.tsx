"use client";

import { ViewTransition } from "react";

/** Cross-fades page content on client navigation (no-op in browsers without View Transitions). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}
