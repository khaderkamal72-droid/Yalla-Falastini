import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/ui/StatCard";
import { LessonCard } from "@/components/learning/LessonCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { UserXp, UserStreak, Profile, VocabularyItem } from "@/types/database";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Each query is scoped to the signed-in user by RLS — no user_id filter needed
  // beyond what the policies already enforce, but we pass it for clarity/index use.
  const [{ data: profile }, { data: xp }, { data: streak }, { data: recentVocab }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user?.id).single<Profile>(),
      supabase.from("user_xp").select("*").eq("user_id", user?.id).single<UserXp>(),
      supabase.from("user_streaks").select("*").eq("user_id", user?.id).single<UserStreak>(),
      supabase
        .from("vocabulary")
        .select("*")
        .order("sort_order", { ascending: true })
        .limit(2)
        .returns<VocabularyItem[]>(),
    ]);

  const displayName = profile?.display_name ?? "Learner";
  const totalXp = xp?.total_xp ?? 0;
  const currentStreak = streak?.current_streak ?? 0;

  return (
    <div className="pb-4">
      <header className="flex items-center justify-between px-5 pt-5 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-11.5 h-11.5 w-[46px] h-[46px] rounded-full bg-gradient-to-br from-olive-light to-olive flex items-center justify-center font-display font-bold text-forest-dark text-lg">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-display font-bold text-lg text-forest-dark">
              Ahlan, {displayName}! 👋
            </p>
            <p className="text-xs text-ink-soft">Let&apos;s keep the good work going</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-cream-soft flex items-center justify-center text-lg">
          🔔
        </div>
      </header>

      <div className="flex gap-2.5 px-5 pt-1.5 pb-1">
        <StatCard emoji="🔥" value={currentStreak} label="Day streak" />
        <StatCard emoji="⭐" value={totalXp.toLocaleString()} label="XP" />
        <StatCard emoji="❤️" value="5/5" label="Hearts" />
      </div>

      <h2 className="font-display font-bold text-base text-forest-dark px-5 pt-4.5 pb-2">
        Continue learning
      </h2>
      {/* Replace with the learner's actual in-progress lesson from user_lesson_progress */}
      <LessonCard lessonNumber={3} title="Greetings" progressPct={75} />

      <div className="mx-5 mt-3.5 bg-beige rounded-2xl px-4 py-3.5 flex items-center gap-3">
        <div className="text-2xl">🎁</div>
        <div className="flex-1">
          <p className="font-bold text-[13.5px] text-forest-dark">Complete 2 lessons today</p>
          <div className="mt-1.5">
            <ProgressBar value={50} height={6} trackClassName="bg-forest/15" fillClassName="bg-forest" />
          </div>
        </div>
        <p className="font-bold text-sm text-forest-dark">1/2</p>
      </div>

      <h2 className="font-display font-bold text-base text-forest-dark px-5 pt-4.5 pb-2">
        Recently learned
      </h2>
      <div className="flex gap-2.5 px-5">
        {(recentVocab ?? []).map((word) => (
          <div key={word.id} className="flex-1 bg-white rounded-2xl px-3 py-3 text-center shadow-card-sm">
            <p className="font-arabic font-bold text-xl text-forest-dark" dir="rtl">
              {word.arabic_text}
            </p>
            <p className="text-[11.5px] font-bold text-olive mt-0.5">{word.transliteration}</p>
            <p className="text-[11px] text-ink-soft">{word.english_translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
