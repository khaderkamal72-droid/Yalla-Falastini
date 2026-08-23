import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CharacterIllustration } from "@/components/learning/CharacterIllustration";

const features = [
  { icon: "🎮", label: "Fun & interactive lessons" },
  { icon: "🔊", label: "Real Palestinian pronunciation" },
  { icon: "🎁", label: "Track your progress" },
  { icon: "⭐", label: "Earn XP & achievements" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center">
      <div className="w-full max-w-md">
        <section className="bg-gradient-to-b from-forest to-forest-dark rounded-b-[40px] px-6 pt-9 pb-8 text-cream relative overflow-hidden">
          <div className="flex items-center gap-2 font-display font-bold text-sm tracking-wide relative z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-gold" aria-hidden />
            YALLA FALASTINI
          </div>

          <div className="mt-6 mb-4 h-36 rounded-2xl bg-gradient-to-br from-forest-light via-forest to-forest-dark flex items-end justify-center gap-4 relative z-10">
            <CharacterIllustration variant="male" size={90} />
            <CharacterIllustration variant="female" size={90} />
          </div>

          <h1 className="font-display font-extrabold text-3xl leading-tight relative z-10">
            Learn Palestinian
            <br />
            Arabic.
          </h1>
          <p className="text-gold-light font-semibold mt-1.5 mb-6 relative z-10">
            Play. Speak. Connect.
          </p>
        </section>

        <section className="bg-forest-dark text-cream rounded-[22px] mx-5 -mt-6 relative z-10 px-5 py-5 shadow-card">
          <h2 className="font-display text-gold-light text-sm mb-3.5">Why you&apos;ll love it</h2>
          <ul className="flex flex-col gap-1">
            {features.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm font-semibold py-1.5">
                <span className="w-8.5 h-8.5 w-[34px] h-[34px] rounded-[10px] bg-gold/20 flex items-center justify-center text-base flex-shrink-0">
                  {f.icon}
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </section>

        <section className="px-5 pt-6 pb-4">
          <Link href="/signup">
            <Button fullWidth size="lg">
              Start Learning
            </Button>
          </Link>
          <p className="text-center text-xs text-ink-soft mt-3.5">
            أهلاً وسهلاً — Ahlan wa sahlan — Welcome
          </p>
          <p className="text-center text-xs text-ink-soft mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-forest font-bold">
              Log in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
