import { createClient } from "@/lib/supabase/server";
import { LeaderboardCard } from "@/components/learning/LeaderboardCard";
import type { LeaderboardRow } from "@/types/database";

export default async function LeaderboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rows } = await supabase
    .from("leaderboard_view")
    .select("*")
    .order("total_xp", { ascending: false })
    .limit(20)
    .returns<LeaderboardRow[]>();

  return (
    <div className="pb-4">
      <h1 className="font-display font-bold text-lg text-forest-dark px-5 pt-5 pb-2">
        Leaderboard
      </h1>

      <div className="flex gap-2 px-5 pt-2 pb-1">
        {["This week", "This month", "All time"].map((tab, i) => (
          <div
            key={tab}
            className={`flex-1 text-center py-2.5 rounded-full text-xs font-bold ${
              i === 0 ? "bg-forest text-cream" : "bg-cream-soft text-ink-soft"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-5 pt-3">
        {(rows ?? []).map((row, index) => (
          <LeaderboardCard
            key={row.user_id}
            rank={index + 1}
            name={row.display_name}
            xp={row.total_xp}
            isCurrentUser={row.user_id === user?.id}
          />
        ))}
      </div>

      <p className="text-center text-xs font-semibold text-ink-soft px-5 pt-4">
        Keep learning and climb the leaderboard 🚀
      </p>
    </div>
  );
}
