import { AudioPlayer } from "@/components/learning/AudioPlayer";
import type { GenderNote } from "@/types/database";

interface VocabularyCardProps {
  arabicText: string;
  transliteration: string;
  englishTranslation: string;
  genderNote?: GenderNote;
  tip?: string | null;
  audioUrl?: string | null;
}

export function VocabularyCard({
  arabicText,
  transliteration,
  englishTranslation,
  genderNote,
  tip,
  audioUrl,
}: VocabularyCardProps) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-4">
      <p className="font-arabic font-extrabold text-5xl text-forest-dark" dir="rtl">
        {arabicText}
      </p>
      <p className="font-bold text-olive mt-1.5">
        {transliteration}
        {genderNote && (
          <span className="text-ink-soft font-medium text-sm"> ({genderNote})</span>
        )}
      </p>
      <p className="text-ink-soft mt-1">{englishTranslation}</p>

      <div className="mt-5">
        <AudioPlayer src={audioUrl ?? undefined} fallbackText={arabicText} />
      </div>

      {tip && (
        <div className="mt-6 bg-beige rounded-2xl px-4 py-3.5 text-sm font-semibold text-forest-dark">
          💡 {tip}
        </div>
      )}
    </div>
  );
}
