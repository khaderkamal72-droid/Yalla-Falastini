"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#D4A24C", "#1F4A38", "#C1503F", "#8A9A5B", "#EAC57E", "#FBF7EC"];

export function Confetti({ count = 70 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.35,
        duration: 1.6 + Math.random() * 1.3,
        rotate: (Math.random() - 0.5) * 720,
        color: COLORS[i % COLORS.length],
        w: 5 + Math.random() * 5,
        h: 9 + Math.random() * 7,
        drift: (Math.random() - 0.5) * 140,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[60]" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -24, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "108vh",
            x: `calc(${p.x}vw + ${p.drift}px)`,
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 0,
            width: p.w,
            height: p.h,
            background: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
