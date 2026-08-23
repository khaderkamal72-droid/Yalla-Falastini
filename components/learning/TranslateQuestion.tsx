"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AudioPlayer } from "@/components/learning/AudioPlayer";
import { Button } from "@/components/ui/Button";
import type { QuestionOption } from "@/types/database";

interface TranslateQuestionProps {
  promptEn: string;
  arabicText?: string | null;
  transliteration?: string | null;
  audioUrl?: string;
  acceptedAnswers: QuestionOption[]; // rows with is_correct = true are the accepted variants
  onAnswered: (wasCorrect: boolean) => void;
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/[^\w\s]/g, "");
}

export function TranslateQuestion({
  promptEn,
  arabicText,
  transliteration,
  audioUrl,
  acceptedAnswers,
  onAnswered,
}: TranslateQuestionProps) {
  const [value, setValue] = useState("");
  const [locked, setLocked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  function handleSubmit() {
    if (locked || !value.trim()) return;
    const accepted = acceptedAnswers.filter((a) => a.is_correct).map((a) => normalize(a.option_text));
    const wasCorrect = accepted.includes(normalize(value));
    setCorrect(wasCorrect);
    setLocked(true);
    setTimeout(() => onAnswered(wasCorrect), 450);
  }

  return (
    <div className="px-5 py-6">
      <p className="font-display font-bold text-xl text-forest-dark mb-1.5">{promptEn}</p>
      {arabicText && (
        <div className="flex items-center gap-3 mt-3 mb-1">
          <p className="font-arabic font-extrabold text-4xl text-forest" dir="rtl">
            {arabicText}
          </p>
          <AudioPlayer src={audioUrl} fallbackText={arabicText} />
        </div>
      )}
      {transliteration && <p className="text-sm font-semibold text-ink-soft">{transliteration}</p>}

      <div className="mt-6">
        <motion.input
          animate={
            locked
              ? correct
                ? { borderColor: "#1F4A38" }
                : { x: [0, -8, 8, -6, 6, 0], borderColor: "#C1503F" }
              : { borderColor: "#E7DFC5" }
          }
          transition={{ duration: 0.4 }}
          type="text"
          value={value}
          disabled={locked}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Type the translation…"
          className="w-full border-2 rounded-2xl px-4 py-3.5 text-base font-semibold text-ink bg-white outline-none disabled:opacity-70"
        />
        {locked && !correct && (
          <p className="text-xs font-semibold text-clay mt-2">
            Correct answer: {acceptedAnswers.find((a) => a.is_correct)?.option_text}
          </p>
        )}
      </div>

      {!locked && (
        <div className="mt-5">
          <Button fullWidth onClick={handleSubmit} disabled={!value.trim()}>
            Check
          </Button>
        </div>
      )}
    </div>
  );
}
