"use client";

import { useRef, useState } from "react";

interface AudioPlayerProps {
  src?: string | null;
  /** Arabic text to fall back to browser text-to-speech when no audio file exists yet. */
  fallbackText?: string | null;
}

export function AudioPlayer({ src, fallbackText }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function playFile(url: string) {
    if (!audioRef.current || audioRef.current.src !== url) {
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setPlaying(false);
      audioRef.current.onerror = () => {
        setPlaying(false);
        // If the file fails to load (e.g. not uploaded yet), fall back to TTS.
        if (fallbackText) speak(fallbackText);
      };
    }
    setPlaying(true);
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => setPlaying(false));
  }

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setPlaying(false);
      return;
    }
    window.speechSynthesis.cancel(); // stop anything already playing
    const utterance = new SpeechSynthesisUtterance(text);
    // Arabic (Levantine isn't a distinct browser voice, so "ar" covers the closest available voice).
    utterance.lang = "ar";
    utterance.rate = 0.85;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  }

  function handlePlay() {
    if (src) {
      playFile(src);
    } else if (fallbackText) {
      speak(fallbackText);
    }
  }

  const disabled = !src && !fallbackText;

  return (
    <button
      type="button"
      onClick={handlePlay}
      disabled={disabled}
      aria-label="Play pronunciation"
      className="w-[52px] h-[52px] rounded-full bg-forest text-cream flex items-center justify-center text-xl shadow-card-sm active:scale-95 transition-transform disabled:opacity-40 disabled:active:scale-100"
    >
      {playing ? "⏸" : "🔊"}
    </button>
  );
}
