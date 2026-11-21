import type { NavItem } from "./types";

export function isActivePath(pathname: string, href: NavItem["href"]): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return path === href;
}
