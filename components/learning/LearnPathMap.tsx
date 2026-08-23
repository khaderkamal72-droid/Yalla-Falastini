import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Lesson, Unit, UserLessonProgress } from "@/types/database";

interface LearnPathMapProps {
  units: (Unit & { lessons: Lesson[] })[];
  progressByLesson: Map<string, UserLessonProgress>;
}

const UNIT_THEMES = [
  { from: "#5B8C51", to: "#3D6B37" }, // forest green
  { from: "#3E8A9C", to: "#2A6270" }, // teal
  { from: "#C97B4A", to: "#A05A32" }, // clay / terracotta
  { from: "#9163A0", to: "#6D4780" }, // plum
  { from: "#C9A23F", to: "#A17E2A" }, // gold
];

const NODE_SIZE = 66;
const NODE_GAP_Y = 100;
const PATH_WIDTH = 300;
const CENTER_X = PATH_WIDTH / 2;
const AMPLITUDE = 76;
// Repeating S-curve offsets, like classic level-map games.
const OFFSET_PATTERN = [0, 0.85, 1.5, 0.85, 0, -0.85, -1.5, -0.85];

function offsetForStep(step: number) {
  return OFFSET_PATTERN[step % OFFSET_PATTERN.length] * AMPLITUDE;
}

export function LearnPathMap({ units, progressByLesson }: LearnPathMapProps) {
  let globalStep = 0;
  // Once we hit the first lesson (across all units) that isn't completed,
  // everything after it — including entire later units — is locked.
  let unlockedSoFar = true;

  return (
    <div className="relative pb-10">
      {units.map((unit, unitIdx) => {
        const lessons = [...unit.lessons].sort((a, b) => a.sort_order - b.sort_order);
        const theme = UNIT_THEMES[unitIdx % UNIT_THEMES.length];
        const unitFullyLocked = !unlockedSoFar;

        const points = lessons.map((_, i) => ({
          x: CENTER_X + offsetForStep(globalStep + i),
          y: i * NODE_GAP_Y + NODE_SIZE / 2 + 6,
        }));
        const pathHeight = Math.max(lessons.length * NODE_GAP_Y, NODE_SIZE + 12);

        let pathD = "";
        points.forEach((p, i) => {
          if (i === 0) {
            pathD += `M ${p.x} ${p.y}`;
          } else {
            const prev = points[i - 1];
            const midY = (prev.y + p.y) / 2;
            pathD += ` C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
          }
        });

        globalStep += lessons.length;

        return (
          <div key={unit.id} className="mb-4">
            {/* Unit banner */}
            <div
              className="mx-4 rounded-2xl px-5 py-4 mb-9 shadow-card flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">
                  Unit {unitIdx + 1}
                </p>
                <p className="font-display font-extrabold text-lg text-white mt-0.5">
                  {unit.title}
                </p>
              </div>
              <div className="text-3xl">{unitFullyLocked ? "🔒" : "📖"}</div>
            </div>

            {/* Winding path */}
            <div className="relative mx-auto" style={{ width: PATH_WIDTH, height: pathHeight }}>
              <svg
                className="absolute inset-0 pointer-events-none"
                width={PATH_WIDTH}
                height={pathHeight}
                viewBox={`0 0 ${PATH_WIDTH} ${pathHeight}`}
              >
                <path
                  d={pathD}
                  fill="none"
                  stroke="#DCD2AE"
                  strokeWidth={9}
                  strokeLinecap="round"
                  strokeDasharray="1 20"
                />
              </svg>

              {lessons.map((lesson, i) => {
                const isCompleted = progressByLesson.get(lesson.id)?.status === "completed";
                const status = isCompleted ? "done" : unlockedSoFar ? "current" : "locked";
                if (!isCompleted) unlockedSoFar = false; // lock everything from here on
                const p = points[i];

                return (
                  <div
                    key={lesson.id}
                    className="absolute flex flex-col items-center"
                    style={{ left: p.x - NODE_SIZE / 2, top: p.y - NODE_SIZE / 2, width: NODE_SIZE }}
                  >
                    {status === "current" && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-forest-dark text-cream text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full whitespace-nowrap shadow-card-sm animate-bounce">
                        Start
                      </div>
                    )}
                    <Link
                      href={status === "locked" ? "#" : `/learn/${unit.id}/${lesson.id}`}
                      aria-disabled={status === "locked"}
                      className={cn(
                        "rounded-full flex items-center justify-center text-[26px] border-b-[5px] transition-transform active:scale-95 active:border-b-2",
                        status === "locked" && "pointer-events-none"
                      )}
                      style={{
                        width: NODE_SIZE,
                        height: NODE_SIZE,
                        background:
                          status === "done" ? theme.to : status === "current" ? "#F4C752" : "#E7DFC5",
                        borderColor:
                          status === "done"
                            ? "rgba(0,0,0,0.22)"
                            : status === "current"
                            ? "#C99A2E"
                            : "rgba(0,0,0,0.08)",
                        color: status === "locked" ? "#A79E7C" : status === "current" ? "#3D2B14" : "#fff",
                      }}
                    >
                      {status === "done" ? "✓" : status === "locked" ? "🔒" : "⭐"}
                    </Link>
                    <p
                      className={cn(
                        "mt-2 text-[11px] font-bold text-center leading-tight",
                        status === "locked" ? "text-ink-soft opacity-60" : "text-forest-dark"
                      )}
                      style={{ maxWidth: 92 }}
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
