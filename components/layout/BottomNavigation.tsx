"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Home", icon: "🏠" },
  { href: "/learn", label: "Learn", icon: "📖" },
  { href: "/leaderboard", label: "Leaders", icon: "🏆" },
  { href: "/profile", label: "Profile", icon: "👤" },
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
            className={cn(
              "flex flex-col items-center gap-0.5 text-[10.5px] font-bold px-2.5 py-1 rounded-xl",
              active ? "text-forest bg-forest/10" : "text-ink-soft"
            )}
          >
            <span className="text-lg" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
