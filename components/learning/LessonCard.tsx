import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CharacterIllustration } from "@/components/learning/CharacterIllustration";

interface LessonCardProps {
  lessonNumber: number;
  title: string;
  progressPct: number;
  onContinue?: () => void;
}

export function LessonCard({ lessonNumber, title, progressPct, onContinue }: LessonCardProps) {
  return (
    <div className="mx-5 bg-gradient-to-br from-forest to-forest-dark rounded-[20px] p-4 shadow-card flex gap-3.5 items-center">
      <CharacterIllustration variant="female" size={58} className="rounded-2xl bg-white/10 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gold-light">
          Lesson {lessonNumber}
        </p>
        <p className="font-display font-bold text-base text-cream mt-0.5 mb-2">{title}</p>
        <ProgressBar
          value={progressPct}
          trackClassName="bg-white/20"
          fillClassName="bg-gold"
        />
        <p className="text-[11px] font-semibold text-gold-light mt-1.5 mb-2">
          {progressPct}% complete
        </p>
        <Button variant="gold" size="sm" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
