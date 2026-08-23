"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { playTickSound } from "@/lib/sounds";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  playTicks?: boolean;
  className?: string;
}

export function CountUp({ from = 0, to, duration = 1, playTicks = false, className }: CountUpProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState(String(from));

  useEffect(() => {
    let lastTick = from;
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (playTicks && Math.floor(v / 5) > Math.floor(lastTick / 5)) {
          playTickSound();
        }
        lastTick = v;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => unsubscribe();
  }, [rounded]);

  return <motion.span className={className}>{display}</motion.span>;
}
