"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display font-extrabold text-2xl text-forest-dark mb-1">
          Ahlan! Welcome back
        </h1>
        <p className="text-ink-soft text-sm mb-7">Log in to keep your streak going.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border-2 border-cream-soft px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-forest"
          />
          {error && <p className="text-clay text-sm font-semibold">{error}</p>}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="text-center text-sm text-ink-soft mt-6">
          New to Yalla Falastini?{" "}
          <Link href="/signup" className="text-forest font-bold">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
