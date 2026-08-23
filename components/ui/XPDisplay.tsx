export function XPDisplay({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-display font-bold text-gold">
      <span aria-hidden>⭐</span>
      {xp.toLocaleString()} XP
    </span>
  );
}
