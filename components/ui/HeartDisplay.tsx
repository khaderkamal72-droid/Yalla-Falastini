"use client";

import { motion, AnimatePresence } from "framer-motion";

export function HeartDisplay({ hearts, max = 5 }: { hearts: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-bold text-clay text-sm">
      <motion.span
        aria-hidden
        key={hearts}
        initial={{ scale: 1, x: 0 }}
        animate={{ scale: [1, 1.3, 0.9, 1], x: [0, -4, 4, -2, 0] }}
        transition={{ duration: 0.4 }}
      >
        ❤️
      </motion.span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={hearts}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {hearts}
        </motion.span>
      </AnimatePresence>
      <span className="text-ink-soft font-medium">/{max}</span>
    </span>
  );
}
