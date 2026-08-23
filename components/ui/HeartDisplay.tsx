"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function HeartDisplay({ hearts, max = 5 }: { hearts: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold text-clay text-sm">
      <motion.span
        aria-hidden
        key={hearts}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.35 }}
        className="flex"
      >
        <Heart size={16} fill="currentColor" strokeWidth={0} />
      </motion.span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={hearts}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 6, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {hearts}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
