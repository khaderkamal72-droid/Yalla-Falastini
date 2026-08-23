import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  icon: string;
  label: string;
  tone?: "gold" | "clay" | "forest" | "olive";
  earned?: boolean;
}

const toneStyles: Record<NonNullable<AchievementBadgeProps["tone"]>, string> = {
  gold: "from-gold to-gold-light border-gold",
  clay: "from-clay to-[#D97256] border-clay",
  forest: "from-forest to-forest-light border-forest",
  olive: "from-olive to-olive-light border-olive",
};

export function AchievementBadge({ icon, label, tone = "gold", earned = true }: AchievementBadgeProps) {
  return (
    <div className="flex-shrink-0 w-[78px] text-center">
      <div
        className={cn(
          "w-[60px] h-[60px] rounded-2xl mx-auto mb-1.5 flex items-center justify-center text-2xl border-2 shadow-card-sm",
          earned ? cn("bg-gradient-to-br text-white", toneStyles[tone]) : "bg-beige border-cream-soft opacity-50"
        )}
      >
        {icon}
      </div>
      <div className="text-[10.5px] font-bold text-forest-dark leading-tight">{label}</div>
    </div>
  );
}
