"use client";

import { useState } from "react";
import { AnswerOption } from "@/components/learning/AnswerOption";
import { AudioPlayer } from "@/components/learning/AudioPlayer";
import type { QuestionOption } from "@/types/database";

interface QuestionCardProps {
  promptEn: string;
  arabicText?: string | null;
  audioUrl?: string;
  options: QuestionOption[];
  onAnswered: (wasCorrect: boolean) => void;
}

export function QuestionCard({
  promptEn,
  arabicText,
  audioUrl,
  options,
  onAnswered,
}: QuestionCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  function handleSelect(option: QuestionOption) {
    if (locked) return;
    setSelectedId(option.id);
    setLocked(true);
    // Small delay so the learner sees the selection before feedback fires.
    setTimeout(() => onAnswered(option.is_correct), 400);
  }

  return (
    <div className="px-5 py-6">
      <p className="font-display font-bold text-xl text-forest-dark mb-1.5">{promptEn}</p>
      {arabicText && (
        <p className="font-arabic font-extrabold text-4xl text-forest" dir="rtl">
          {arabicText}
        </p>
      )}
      <div className="flex justify-center my-4">
        <AudioPlayer src={audioUrl} />
      </div>

      <div className="flex flex-col gap-3 mt-5">
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
