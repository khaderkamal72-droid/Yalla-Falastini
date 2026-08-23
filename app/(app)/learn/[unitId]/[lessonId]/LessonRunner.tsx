"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartDisplay } from "@/components/ui/HeartDisplay";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/learning/QuestionCard";
import { VocabularyCard } from "@/components/learning/VocabularyCard";
import { Button } from "@/components/ui/Button";
import { Confetti } from "@/components/ui/Confetti";
import { CountUp } from "@/components/ui/CountUp";
import { createClient } from "@/lib/supabase/client";
import { playCorrectSound, playWrongSound, playHeartLossSound, playLessonCompleteSound } from "@/lib/sounds";
import type { Question, QuestionOption, VocabularyItem } from "@/types/database";

interface LessonRunnerProps {
  lessonId: string;
  lessonTitle: string;
  xpReward: number;
  questions: (Question & { question_options: QuestionOption[] })[];
  vocabulary: VocabularyItem[];
  unitId: string;
}

export function LessonRunner({
  lessonId,
  lessonTitle,
  xpReward,
  questions,
  vocabulary,
  unitId,
}: LessonRunnerProps) {
  const router = useRouter();
  const supabase = createClient();

  // Vocabulary cards are shown first (teach), then quiz questions (test).
  const totalSteps = vocabulary.length + questions.length;
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [finished, setFinished] = useState(false);

  const isVocabStep = step < vocabulary.length;
  const currentVocab = isVocabStep ? vocabulary[step] : null;
  const currentQuestion = !isVocabStep ? questions[step - vocabulary.length] : null;

  async function completeLesson(score: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("user_lesson_progress").upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        status: "completed",
        score,
        progress_pct: 100,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );

    // Bump total XP. In production, do this atomically via a Postgres function
    // (e.g. `increment_xp(user_id, amount)`) to avoid read-then-write races.
    const { data: xpRow } = await supabase
      .from("user_xp")
      .select("total_xp")
      .eq("user_id", user.id)
      .single();
    await supabase
      .from("user_xp")
      .update({ total_xp: (xpRow?.total_xp ?? 0) + xpReward })
      .eq("user_id", user.id);
  }

  function handleAnswered(wasCorrect: boolean) {
    setLastAnswerCorrect(wasCorrect);
    if (wasCorrect) {
      setCorrectCount((c) => c + 1);
      playCorrectSound();
    } else {
      setHearts((h) => Math.max(0, h - 1));
      playWrongSound();
      setTimeout(() => playHeartLossSound(), 120);
    }
    setShowSuccess(true);
  }

  async function handleContinue() {
    setShowSuccess(false);
    setLastAnswerCorrect(null);
    const nextStep = step + 1;
    if (nextStep >= totalSteps) {
      const score = questions.length
        ? Math.round((correctCount / questions.length) * 100)
        : 100;
      await completeLesson(score);
      playLessonCompleteSound();
      setFinished(true);
      return;
    }
    setStep(nextStep);
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-8 text-center py-16 relative overflow-hidden">
        <Confetti />
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="text-6xl mb-3"
        >
          🎉
        </motion.div>
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-display font-extrabold text-2xl text-forest-dark mb-1"
        >
          Yalla! Lesson complete
        </motion.h1>
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gold font-extrabold text-lg mb-8 flex items-center gap-1"
        >
          +<CountUp to={xpReward} duration={0.8} playTicks /> XP earned
        </motion.p>
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="w-full"
        >
          <Button fullWidth onClick={() => router.push("/learn")}>
            Back to path
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 relative overflow-hidden">
      <div className="flex items-center gap-3 px-5 pt-4 pb-1">
        <button
          onClick={() => router.push(`/learn`)}
          aria-label="Close lesson"
          className="text-xl text-ink-soft"
        >
          ✕
        </button>
        <ProgressBar value={(step / totalSteps) * 100} trackClassName="bg-cream-soft" />
        <HeartDisplay hearts={hearts} />
      </div>

      <AnimatePresence mode="wait">
        {isVocabStep && currentVocab && !showSuccess && (
          <motion.div
            key={`vocab-${currentVocab.id}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
          >
            <VocabularyCard
              arabicText={currentVocab.arabic_text}
              transliteration={currentVocab.transliteration}
              englishTranslation={currentVocab.english_translation}
              genderNote={currentVocab.gender_note}
              tip={currentVocab.tip}
              audioUrl={currentVocab.audio_url}
            />
          </motion.div>
        )}

        {!isVocabStep && currentQuestion && !showSuccess && (
          <motion.div
            key={`question-${currentQuestion.id}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
          >
            <QuestionCard
              promptEn={currentQuestion.prompt_en}
              arabicText={currentQuestion.arabic_text}
              audioUrl={currentQuestion.audio_url ?? undefined}
              options={currentQuestion.question_options}
              onAnswered={handleAnswered}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isVocabStep && !showSuccess && (
        <div className="mt-auto px-6 pb-8 pt-4">
          <Button fullWidth onClick={handleContinue}>
            Continue
          </Button>
        </div>
      )}

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className={
              "absolute inset-x-0 bottom-0 rounded-t-[26px] px-6 pt-6 pb-7 flex flex-col items-center shadow-card " +
              (lastAnswerCorrect ? "bg-forest text-cream" : "bg-clay text-cream")
            }
          >
            <motion.div
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.05 }}
              className="text-3xl"
            >
              {lastAnswerCorrect ? "✓" : "✕"}
            </motion.div>
            <p className="font-display font-extrabold text-lg mt-1">
              {lastAnswerCorrect ? "Correct!" : "Not quite"}
            </p>
            <p className="text-gold-light font-bold text-sm mb-4">
              {lastAnswerCorrect ? "+10 XP" : "Keep going!"}
            </p>
            <Button variant="gold" fullWidth onClick={handleContinue}>
              Continue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
