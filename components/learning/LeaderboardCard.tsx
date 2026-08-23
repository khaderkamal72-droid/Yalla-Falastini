import { cn } from "@/lib/utils";

interface LeaderboardCardProps {
  rank: number;
  name: string;
  xp: number;
  isCurrentUser?: boolean;
}

const medals: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export function LeaderboardCard({ rank, name, xp, isCurrentUser }: LeaderboardCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 shadow-card-sm",
        isCurrentUser ? "bg-forest text-cream shadow-card" : "bg-white text-ink"
      )}
    >
      <div className="w-6 text-center font-extrabold">{medals[rank] ?? rank}</div>
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
