import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StreakDisplay } from "@/components/ui/StreakDisplay";
import { cn } from "@/lib/utils";
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
          className="w-9.5 h-9.5 w-[38px] h-[38px] rounded-full bg-cream-soft flex items-center justify-center"
        >
          ←
        </Link>
        <h1 className="font-display font-bold text-lg text-forest-dark">Learn</h1>
        <StreakDisplay days={streak?.current_streak ?? 0} />
      </header>

      {(units ?? []).map((unit) => {
        const lessons = [...unit.lessons].sort((a, b) => a.sort_order - b.sort_order);
        const firstIncompleteIndex = lessons.findIndex(
          (l) => progressByLesson.get(l.id)?.status !== "completed"
        );

        return (
          <div key={unit.id}>
            <p className="text-center mt-4.5 mb-1 font-display font-bold text-xs uppercase tracking-wide text-olive">
              Unit
            </p>
            <p className="text-center text-xs text-ink-soft mb-2">{unit.title}</p>

            <div className="flex flex-col items-center py-2.5 pb-6">
              {lessons.map((lesson, index) => {
                const status =
                  progressByLesson.get(lesson.id)?.status === "completed"
                    ? "done"
                    : index === firstIncompleteIndex
                    ? "current"
                    : "locked";

                return (
                  <div key={lesson.id} className="flex flex-col items-center">
                    {index > 0 && (
                      <div className="w-1 h-6.5 h-[26px] rounded bg-[repeating-linear-gradient(180deg,#B9C48E_0_4px,transparent_4px_8px)]" />
                    )}
                    <Link
                      href={status === "locked" ? "#" : `/learn/${unit.id}/${lesson.id}`}
                      aria-disabled={status === "locked"}
                      className={cn(
                        "w-[66px] h-[66px] rounded-full flex items-center justify-center text-2xl",
                        status === "done" && "bg-forest text-gold-light shadow-card",
                        status === "current" &&
                          "bg-gold text-forest-dark shadow-[0_0_0_6px_rgba(212,162,76,0.25)]",
                        status === "locked" && "bg-beige text-ink-soft opacity-60 pointer-events-none"
                      )}
                    >
                      {status === "done" ? "✓" : status === "locked" ? "🔒" : index + 1}
                    </Link>
                    <p
                      className={cn(
                        "mt-1.5 text-xs font-bold text-center max-w-[110px]",
                        status === "locked" ? "text-ink-soft opacity-70" : "text-forest-dark"
                      )}
                    >
                      {lesson.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
