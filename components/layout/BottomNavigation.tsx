"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Home", Icon: Home },
  { href: "/learn", label: "Learn", Icon: BookOpen },
  { href: "/leaderboard", label: "Leaders", Icon: Trophy },
  { href: "/profile", label: "Profile", Icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden flex justify-around items-center px-1.5 pt-2.5 pb-3.5 bg-white border-t border-forest/10 sticky bottom-0">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center gap-0.5 text-[10.5px] font-bold px-3 py-1.5 rounded-xl"
          >
            {active && (
              <motion.span
                layoutId="bottom-nav-active"
                className="absolute inset-0 bg-forest/10 rounded-xl"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <item.Icon
              size={20}
              strokeWidth={active ? 2.4 : 2}
              className={cn("relative z-10", active ? "text-forest" : "text-ink-soft")}
            />
            <span className={cn("relative z-10", active ? "text-forest" : "text-ink-soft")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
