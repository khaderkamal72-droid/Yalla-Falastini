export function StreakDisplay({ days }: { days: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-beige text-forest-dark font-bold text-sm px-3 py-1.5 rounded-full">
      <span aria-hidden>🔥</span>
      {days}
    </span>
  );
}
