import { createClient } from "@/lib/supabase/server";
import { LessonRunner } from "./LessonRunner";
import type { Lesson, Question, QuestionOption, VocabularyItem } from "@/types/database";

interface LessonPageProps {
  params: { unitId: string; lessonId: string };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const supabase = createClient();

  const [{ data: lesson }, { data: vocabulary }, { data: questions }] = await Promise.all([
    supabase.from("lessons").select("*").eq("id", params.lessonId).single<Lesson>(),
    supabase
      .from("vocabulary")
      .select("*")
      .eq("lesson_id", params.lessonId)
      .order("sort_order", { ascending: true })
      .returns<VocabularyItem[]>(),
    supabase
      .from("questions")
      .select("*, question_options(*)")
      .eq("lesson_id", params.lessonId)
      .order("sort_order", { ascending: true })
      .returns<(Question & { question_options: QuestionOption[] })[]>(),
  ]);

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center px-8 text-center text-ink-soft">
        This lesson isn&apos;t available yet.
      </div>
    );
  }

  return (
    <LessonRunner
      lessonId={lesson.id}
      lessonTitle={lesson.title}
      xpReward={lesson.xp_reward}
      questions={questions ?? []}
      vocabulary={vocabulary ?? []}
      unitId={params.unitId}
    />
  );
}
