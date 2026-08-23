"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { TatreezStrip } from "@/components/ui/TatreezStrip";

const items = [
  { href: "/dashboard", label: "Home", Icon: Home },
  { href: "/learn", label: "Learn", Icon: BookOpen },
  { href: "/leaderboard", label: "Leaderboard", Icon: Trophy },
  { href: "/profile", label: "Profile", Icon: User },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-forest-dark text-cream min-h-screen">
      <div className="px-5 py-8 flex-1">
        <div className="font-display font-extrabold text-lg mb-10 flex items-center gap-2">
          <span aria-hidden>🇵🇸</span> Yalla Falastini
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors",
                  active ? "bg-gold text-forest-dark" : "text-cream/80 hover:bg-white/10"
                )}
              >
                <item.Icon size={18} strokeWidth={active ? 2.4 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <TatreezStrip height={10} />
    </aside>
  );
}
