import type { CSSProperties } from "react";

/**
 * Stable view-transition identity for an object shown on more than one page, derived from the
 * entity (never from a list index) so the browser can morph it between routes.
 */
export function transitionName(kind: "cert" | "role", id: string): string {
  return `${kind}-${id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function transitionStyle(kind: "cert" | "role", id: string): CSSProperties {
  return { viewTransitionName: transitionName(kind, id) };
}
