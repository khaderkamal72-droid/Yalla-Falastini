import { createClient } from "@/lib/supabase/server";
import { LeaderboardCard } from "@/components/learning/LeaderboardCard";
import { LeaderboardTabs } from "@/components/learning/LeaderboardTabs";
import { TatreezStrip } from "@/components/ui/TatreezStrip";
import type { LeaderboardRow } from "@/types/database";

export default async function LeaderboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // NOTE: leaderboard_view currently reflects all-time XP only. The tab
  // selector above is interactive, but wiring "This week" / "This month" to
  // real windowed totals needs a dedicated view (e.g. summing xp_events
  // within the period) — a good next step once that table exists.
  const { data: rows } = await supabase
    .from("leaderboard_view")
    .select("*")
    .order("total_xp", { ascending: false })
    .limit(20)
    .returns<LeaderboardRow[]>();

  return (
    <div className="pb-4">
      <TatreezStrip height={6} />

      <h1 className="font-display font-bold text-lg text-forest-dark px-5 pt-5 pb-2">
        Leaderboard
      </h1>

      <LeaderboardTabs />

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
