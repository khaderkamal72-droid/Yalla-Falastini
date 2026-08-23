"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName || "Learner" } },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // The 0001_init.sql trigger creates the profile/xp/streak rows automatically.
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display font-extrabold text-2xl text-forest-dark mb-1">
          Yalla, let&apos;s start!
        </h1>
        <p className="text-ink-soft text-sm mb-7">
          Create your account and start your Palestinian Arabic journey.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <input
            type="text"
            required
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="rounded-2xl border-2 border-cream-soft px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-forest"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border-2 border-cream-soft px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-forest"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border-2 border-cream-soft px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-forest"
          />
          {error && <p className="text-clay text-sm font-semibold">{error}</p>}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-ink-soft mt-6">
          Already learning with us?{" "}
          <Link href="/login" className="text-forest font-bold">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
