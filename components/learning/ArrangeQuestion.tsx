"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioPlayer } from "@/components/learning/AudioPlayer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ArrangeQuestionProps {
  promptEn: string;
  arabicText: string; // the full correct sentence, space-separated words
  transliteration?: string | null;
  audioUrl?: string;
  onAnswered: (wasCorrect: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ArrangeQuestion({
  promptEn,
  arabicText,
  transliteration,
  audioUrl,
  onAnswered,
}: ArrangeQuestionProps) {
  const correctWords = useMemo(() => arabicText.trim().split(/\s+/), [arabicText]);
  const [bank, setBank] = useState(() => shuffle(correctWords).map((w, i) => ({ id: `${w}-${i}`, word: w })));
  const [chosen, setChosen] = useState<{ id: string; word: string }[]>([]);
  const [locked, setLocked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  function pick(tile: { id: string; word: string }) {
    if (locked) return;
    setChosen((c) => [...c, tile]);
    setBank((b) => b.filter((t) => t.id !== tile.id));
  }

  function unpick(tile: { id: string; word: string }) {
    if (locked) return;
    setBank((b) => [...b, tile]);
    setChosen((c) => c.filter((t) => t.id !== tile.id));
  }

  function handleCheck() {
    if (locked || chosen.length !== correctWords.length) return;
    const wasCorrect = chosen.map((t) => t.word).join(" ") === correctWords.join(" ");
    setCorrect(wasCorrect);
    setLocked(true);
    setTimeout(() => onAnswered(wasCorrect), 500);
  }

  return (
    <div className="px-5 py-6">
      <p className="font-display font-bold text-xl text-forest-dark mb-1.5">{promptEn}</p>
      <p className="text-xs font-semibold text-ink-soft mb-4">Tap the words in the right order.</p>

      <div className="flex items-center gap-3 mb-5">
        <AudioPlayer src={audioUrl} fallbackText={arabicText} />
        {transliteration && <p className="text-sm font-semibold text-ink-soft">{transliteration}</p>}
      </div>

      {/* Answer row */}
      <div
        className={cn(
          "min-h-[58px] rounded-2xl border-2 border-dashed px-3 py-2.5 flex flex-wrap gap-2 items-center",
          locked && correct && "border-forest bg-forest/5",
          locked && !correct && "border-clay bg-clay/5",
          !locked && "border-cream-soft"
        )}
        dir="rtl"
      >
        <AnimatePresence initial={false}>
          {chosen.map((tile) => (
            <motion.button
              key={tile.id}
              layout
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              disabled={locked}
              onClick={() => unpick(tile)}
              className="font-arabic font-bold text-lg text-forest-dark bg-white border-2 border-forest/20 rounded-xl px-3 py-1.5 shadow-card-sm"
            >
              {tile.word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 mt-5" dir="rtl">
        <AnimatePresence initial={false}>
          {bank.map((tile) => (
            <motion.button
              key={tile.id}
              layout
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={() => pick(tile)}
              className="font-arabic font-bold text-lg text-ink bg-cream-soft rounded-xl px-3 py-1.5 border-2 border-transparent hover:border-olive-light"
            >
              {tile.word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {!locked && (
        <div className="mt-6">
          <Button fullWidth onClick={handleCheck} disabled={chosen.length !== correctWords.length}>
            Check
          </Button>
        </div>
      )}
    </div>
  );
}
