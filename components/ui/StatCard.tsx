interface StatCardProps {
  emoji: string;
  value: string | number;
  label: string;
}

export function StatCard({ emoji, value, label }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl px-3 py-3 text-center shadow-card-sm">
      <div className="text-lg">{emoji}</div>
      <div className="font-display font-extrabold text-lg text-forest-dark mt-0.5">
        {value}
      </div>
      <div className="text-[11px] font-semibold text-ink-soft">{label}</div>
    </div>
  );
}
