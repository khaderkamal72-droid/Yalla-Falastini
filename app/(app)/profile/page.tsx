import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { AchievementBadge } from "@/components/learning/AchievementBadge";
import { TatreezStrip } from "@/components/ui/TatreezStrip";
import type { Profile, UserXp, UserStreak, UserAchievement, Achievement } from "@/types/database";

const iconMap: Record<string, string> = {
  sprout: "🌱",
  flame: "🔥",
  book: "📚",
  star: "💯",
};

const toneMap: Record<string, "gold" | "clay" | "forest" | "olive"> = {
  sprout: "olive",
  flame: "clay",
  book: "forest",
  star: "gold",
};

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: xp }, { data: streak }, { data: earned }, { count: lessonCount }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user?.id).single<Profile>(),
      supabase.from("user_xp").select("*").eq("user_id", user?.id).single<UserXp>(),
      supabase.from("user_streaks").select("*").eq("user_id", user?.id).single<UserStreak>(),
      supabase
        .from("user_achievements")
        .select("*, achievements(*)")
        .eq("user_id", user?.id)
        .returns<(UserAchievement & { achievements: Achievement })[]>(),
      supabase
        .from("user_lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user?.id)
        .eq("status", "completed"),
    ]);

  const displayName = profile?.display_name ?? "Learner";

  const badges =
    earned && earned.length > 0
      ? earned.map((e) => ({
          icon: iconMap[e.achievements.icon ?? ""] ?? "🏅",
          label: e.achievements.title,
          tone: toneMap[e.achievements.icon ?? ""] ?? "gold",
        }))
      : [
          { icon: "🌱", label: "First lesson", tone: "olive" as const },
          { icon: "🔥", label: "7 day streak", tone: "clay" as const },
          { icon: "📚", label: "100 words", tone: "forest" as const },
          { icon: "💯", label: "Perfect!", tone: "gold" as const },
        ];

  return (
    <div className="pb-4">
      <TatreezStrip height={6} />

      <div className="flex flex-col items-center px-5 pt-6 pb-2">
        <div className="w-[84px] h-[84px] rounded-full bg-gradient-to-br from-olive-light to-olive flex items-center justify-center font-display font-extrabold text-3xl text-forest-dark shadow-card ring-4 ring-white">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <p className="font-display font-extrabold text-xl text-forest-dark mt-2.5">
          {displayName}
        </p>
        <span className="text-xs font-bold text-gold bg-forest-dark px-3 py-1 rounded-full mt-1.5">
          Level {profile?.level ?? 1}
        </span>
        <Button variant="outline" size="sm" className="mt-3">
          Edit profile
        </Button>
      </div>

      <div className="flex gap-2.5 px-5 pt-4 pb-1">
        <StatCard emoji="⭐" value={(xp?.total_xp ?? 0).toLocaleString()} label="XP" tone="gold" />
        <StatCard emoji="🔥" value={streak?.current_streak ?? 0} label="Day streak" tone="clay" />
        <StatCard emoji="📖" value={lessonCount ?? 0} label="Lessons" tone="forest" />
      </div>

      <div className="flex items-center justify-between px-5 pt-4.5 pb-2">
        <h2 className="font-display font-bold text-base text-forest-dark">Achievements</h2>
        <a href="#" className="text-xs font-bold text-forest">
          View all
        </a>
      </div>
      <div className="flex gap-3 px-5 overflow-x-auto pb-1">
        {badges.map((badge) => (
          <AchievementBadge key={badge.label} icon={badge.icon} label={badge.label} tone={badge.tone} />
        ))}
      </div>

      <h2 className="font-display font-bold text-base text-forest-dark px-5 pt-4.5 pb-2">
        Statistics
      </h2>
      <div className="mx-5 bg-white rounded-2xl px-4 shadow-card-sm">
        {[
          { label: "Words learned", value: "87" },
          { label: "Lessons completed", value: String(lessonCount ?? 0) },
          { label: "Accuracy", value: "92%" },
        ].map((row, i, arr) => (
          <div
            key={row.label}
            className={`flex justify-between py-3 text-sm font-semibold ${
              i < arr.length - 1 ? "border-b border-cream-soft" : ""
            }`}
          >
            <span>{row.label}</span>
            <span className="font-extrabold text-forest-dark">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
