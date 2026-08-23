"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartDisplay } from "@/components/ui/HeartDisplay";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/learning/QuestionCard";
import { VocabularyCard } from "@/components/learning/VocabularyCard";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
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
    if (wasCorrect) setCorrectCount((c) => c + 1);
    else setHearts((h) => Math.max(0, h - 1));
    setShowSuccess(true);
  }

  async function handleContinue() {
    setShowSuccess(false);
    const nextStep = step + 1;
    if (nextStep >= totalSteps) {
      const score = questions.length
        ? Math.round((correctCount / questions.length) * 100)
        : 100;
      await completeLesson(score);
      setFinished(true);
      return;
    }
    setStep(nextStep);
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-8 text-center py-16">
        <div className="text-5xl mb-3">🎉</div>
        <h1 className="font-display font-extrabold text-2xl text-forest-dark mb-1">
          Yalla! Lesson complete
        </h1>
        <p className="text-gold font-bold mb-8">+{xpReward} XP earned</p>
        <Button fullWidth onClick={() => router.push("/learn")}>
          Back to path
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 relative">
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

      {isVocabStep && currentVocab && (
        <VocabularyCard
          arabicText={currentVocab.arabic_text}
          transliteration={currentVocab.transliteration}
          englishTranslation={currentVocab.english_translation}
          genderNote={currentVocab.gender_note}
          tip={currentVocab.tip}
          audioUrl={currentVocab.audio_url}
        />
      )}

      {!isVocabStep && currentQuestion && !showSuccess && (
        <QuestionCard
          promptEn={currentQuestion.prompt_en}
          arabicText={currentQuestion.arabic_text}
          options={currentQuestion.question_options}
          onAnswered={handleAnswered}
        />
      )}

      {(isVocabStep || showSuccess) && (
        <div className="mt-auto px-6 pb-8 pt-4">
          <Button fullWidth onClick={isVocabStep ? handleContinue : handleContinue}>
            Continue
          </Button>
        </div>
      )}

      {showSuccess && (
        <div className="absolute inset-x-0 bottom-0 bg-forest text-cream rounded-t-[26px] px-6 pt-6 pb-7 flex flex-col items-center shadow-card">
          <div className="text-3xl">✓</div>
          <p className="font-display font-extrabold text-lg mt-1">
            {correctCount > 0 ? "Correct!" : "Good try!"}
          </p>
          <p className="text-gold-light font-bold text-sm mb-4">+10 XP</p>
          <Button variant="gold" fullWidth onClick={handleContinue}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
