"use client";

import { useRef, useState } from "react";

export function AudioPlayer({ src }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    if (!src) return; // No audio wired up yet for this item — Phase 2 content.
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.onended = () => setPlaying(false);
    }
    setPlaying(true);
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => setPlaying(false));
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label="Play pronunciation"
      className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-forest text-cream flex items-center justify-center text-xl shadow-card-sm active:scale-95 transition-transform"
    >
      {playing ? "⏸" : "🔊"}
    </button>
  );
}
