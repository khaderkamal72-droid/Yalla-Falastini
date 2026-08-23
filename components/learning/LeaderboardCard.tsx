import { cn } from "@/lib/utils";

interface LeaderboardCardProps {
  rank: number;
  name: string;
  xp: number;
  isCurrentUser?: boolean;
}

const rankStyles: Record<number, { badge: string; ring: string }> = {
  1: { badge: "bg-gold text-forest-dark", ring: "ring-2 ring-gold" },
  2: { badge: "bg-[#C7CDD6] text-forest-dark", ring: "ring-2 ring-[#C7CDD6]" },
  3: { badge: "bg-[#D9A066] text-forest-dark", ring: "ring-2 ring-[#D9A066]" },
};

export function LeaderboardCard({ rank, name, xp, isCurrentUser }: LeaderboardCardProps) {
  const medal = rankStyles[rank];
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 shadow-card-sm",
        isCurrentUser ? "bg-forest text-cream shadow-card" : "bg-white text-ink"
      )}
    >
      <div className="w-6 text-center font-extrabold text-sm">
        {rank <= 3 ? (
          <span className={cn("inline-flex items-center justify-center w-6 h-6 rounded-full text-xs", medal.badge)}>
            {rank}
          </span>
        ) : (
          rank
        )}
      </div>

      <div
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0",
          medal ? cn("bg-gradient-to-br from-olive-light to-olive text-forest-dark", medal.ring) : "bg-cream-soft text-forest-dark",
          isCurrentUser && "bg-gold text-forest-dark"
        )}
      >
        {initial}
      </div>

      <div className="flex-1 font-bold text-sm truncate">
        {name}
        {isCurrentUser && " (You)"}
      </div>
      <div className={cn("font-extrabold text-sm", isCurrentUser ? "text-gold-light" : "text-gold")}>
        {xp.toLocaleString()} XP
      </div>
    </div>
  );
}
