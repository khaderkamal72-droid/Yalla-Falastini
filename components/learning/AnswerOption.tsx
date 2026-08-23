import { cn } from "@/lib/utils";

type OptionState = "default" | "correct" | "wrong";

interface AnswerOptionProps {
  label: string;
  state?: OptionState;
  disabled?: boolean;
  onClick?: () => void;
}

const stateStyles: Record<OptionState, string> = {
  default: "border-cream-soft bg-white text-ink hover:border-olive-light",
  correct: "border-forest bg-forest/10 text-forest-dark",
  wrong: "border-clay bg-clay/10 text-clay",
};

export function AnswerOption({ label, state = "default", disabled, onClick }: AnswerOptionProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "border-2 rounded-2xl px-4 py-4 text-left font-semibold text-[15px] transition-colors",
        stateStyles[state]
      )}
    >
      {label}
    </button>
  );
}
