import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  trackClassName?: string;
  fillClassName?: string;
  height?: number;
}

export function ProgressBar({
  value,
  trackClassName,
  fillClassName,
  height = 8,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("w-full rounded-full overflow-hidden bg-forest/15", trackClassName)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full bg-gold transition-all duration-500", fillClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
