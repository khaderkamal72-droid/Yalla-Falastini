"use client";

import { useState } from "react";
import { AnswerOption } from "@/components/learning/AnswerOption";
import { AudioPlayer } from "@/components/learning/AudioPlayer";
import type { QuestionOption } from "@/types/database";

interface ListeningQuestionProps {
  promptEn: string;
  arabicText?: string | null; // used only as the TTS fallback source, not shown pre-answer
  audioUrl?: string;
  options: QuestionOption[];
  onAnswered: (wasCorrect: boolean) => void;
}

export function ListeningQuestion({
  promptEn,
  arabicText,
  audioUrl,
  options,
  onAnswered,
}: ListeningQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  function handleSelect(option: QuestionOption) {
    if (locked) return;
    setSelectedId(option.id);
    setLocked(true);
    setTimeout(() => onAnswered(option.is_correct), 400);
  }

  return (
    <div className="px-5 py-6">
      <p className="font-display font-bold text-xl text-forest-dark mb-1">{promptEn}</p>
      <p className="text-xs font-semibold text-ink-soft mb-5">Listen carefully, then choose the meaning.</p>

      <div className="flex justify-center py-6 bg-cream-soft rounded-2xl">
        <AudioPlayer src={audioUrl} fallbackText={arabicText} />
      </div>

      <div className="flex flex-col gap-3 mt-6">
        {options.map((option) => (
          <AnswerOption
            key={option.id}
            label={option.option_text}
            state={
              !locked
                ? "default"
                : option.is_correct
                ? "correct"
                : option.id === selectedId
                ? "wrong"
                : "default"
            }
            onClick={() => handleSelect(option)}
            disabled={locked}
          />
        ))}
      </div>
    </div>
  );
}
