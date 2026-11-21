"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 2000;

export function TypewriterRole({ roles }: { roles: readonly string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Start fully typed so server HTML, no-JS and the first client render all agree.
  const [length, setLength] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = roles[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    let next: () => void;
    if (!deleting && length === word.length) {
      delay = HOLD_MS;
      next = () => setDeleting(true);
    } else if (deleting && length === 0) {
      delay = DELETE_MS;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      };
    } else {
      next = () => setLength((l) => l + (deleting ? -1 : 1));
    }
    const id = setTimeout(next, delay);
    return () => clearTimeout(id);
  }, [reduced, roles, index, length, deleting]);

  const text = reduced ? roles[0] : roles[index].slice(0, length);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="font-medium text-accent">
        <span data-role-text>{text}</span>
        {!reduced && <span className="animate-pulse">|</span>}
      </span>
    </>
  );
}
