"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface TabTransitionProps {
  activeKey: string;
  children: React.ReactNode;
}

export function TabTransition({ activeKey, children }: TabTransitionProps) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeKey}
        initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex-1 flex flex-col min-w-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
