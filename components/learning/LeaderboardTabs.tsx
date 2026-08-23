"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TABS = ["This week", "This month", "All time"] as const;

export function LeaderboardTabs({
  onChange,
}: {
  onChange?: (tab: (typeof TABS)[number]) => void;
}) {
  const [active, setActive] = useState<(typeof TABS)[number]>("This week");

  return (
    <div className="flex gap-2 px-5 pt-2 pb-1">
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => {
              setActive(tab);
              onChange?.(tab);
            }}
            className="relative flex-1 text-center py-2.5 rounded-full text-xs font-bold overflow-hidden"
          >
            {isActive && (
              <motion.span
                layoutId="leaderboard-tab-active"
                className="absolute inset-0 bg-forest rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={"relative z-10 " + (isActive ? "text-cream" : "text-ink-soft")}>
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
