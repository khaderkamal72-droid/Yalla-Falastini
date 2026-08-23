export function AchievementBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex-shrink-0 w-[78px] text-center">
      <div className="w-15 h-15 w-[60px] h-[60px] rounded-2xl mx-auto mb-1.5 flex items-center justify-center text-2xl bg-beige border-2 border-gold bg-tatreez-strip bg-[length:16px_16px]">
        {icon}
      </div>
      <div className="text-[10.5px] font-bold text-forest-dark leading-tight">{label}</div>
    </div>
  );
}
