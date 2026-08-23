interface StatCardProps {
  emoji: string;
  value: string | number;
  label: string;
  tone?: "gold" | "forest" | "clay" | "olive";
}

const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  gold: "bg-gold/15 text-gold",
  forest: "bg-forest/12 text-forest",
  clay: "bg-clay/12 text-clay",
  olive: "bg-olive/15 text-olive",
};

export function StatCard({ emoji, value, label, tone = "forest" }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl px-3 py-3.5 text-center shadow-card-sm">
      <div
        className={
          "w-9 h-9 rounded-full mx-auto flex items-center justify-center text-base " +
          toneStyles[tone]
        }
      >
        {emoji}
      </div>
      <div className="font-display font-extrabold text-lg text-forest-dark mt-1.5">
        {value}
      </div>
      <div className="text-[11px] font-semibold text-ink-soft">{label}</div>
    </div>
  );
}
