import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StreakDisplay } from "@/components/ui/StreakDisplay";
import { LearnPathMap } from "@/components/learning/LearnPathMap";
import type { Lesson, Unit, UserLessonProgress, UserStreak } from "@/types/database";

export default async function LearnPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: units }, { data: streak }] = await Promise.all([
    supabase
      .from("units")
      .select("*, lessons(*)")
      .order("sort_order", { ascending: true })
      .returns<(Unit & { lessons: Lesson[] })[]>(),
    supabase.from("user_streaks").select("*").eq("user_id", user?.id).single<UserStreak>(),
  ]);

  const { data: progressRows } = await supabase
    .from("user_lesson_progress")
    .select("*")
    .eq("user_id", user?.id)
    .returns<UserLessonProgress[]>();

  const progressByLesson = new Map((progressRows ?? []).map((p) => [p.lesson_id, p]));

  return (
    <div className="pb-6">
      <header className="flex items-center justify-between px-5 pt-5 pb-2">
        <Link
          href="/dashboard"
          className="w-[38px] h-[38px] rounded-full bg-cream-soft flex items-center justify-center"
        >
          ←
        </Link>
        <h1 className="font-display font-bold text-lg text-forest-dark">Learn</h1>
        <StreakDisplay days={streak?.current_streak ?? 0} />
      </header>

      <LearnPathMap units={units ?? []} progressByLesson={progressByLesson} />
    </div>
  );
}
