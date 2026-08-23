export function HeartDisplay({ hearts, max = 5 }: { hearts: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-bold text-clay text-sm">
      <span aria-hidden>❤️</span>
      {hearts}
      <span className="text-ink-soft font-medium">/{max}</span>
    </span>
  );
}
