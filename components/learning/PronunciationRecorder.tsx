"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PronunciationRecorderProps {
  onComplete?: () => void;
}

/**
 * Phase 2 component. Captures a short recording via the MediaRecorder API.
 * Wire `onComplete` to a pronunciation-scoring endpoint once one exists —
 * for the MVP this simply simulates a successful attempt.
 */
export function PronunciationRecorder({ onComplete }: PronunciationRecorderProps) {
  const [recording, setRecording] = useState(false);

  async function handleTap() {
    if (recording) return;
    setRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setTimeout(() => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
        onComplete?.();
      }, 2200);
    } catch {
      // Mic permission denied or unavailable — fail gracefully in the MVP.
      setRecording(false);
      onComplete?.();
    }
  }

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-label="Tap the mic and say it"
      className={cn(
        "w-20 h-20 rounded-full bg-clay text-cream flex items-center justify-center text-3xl shadow-card transition-transform",
        recording && "animate-pulse scale-105"
      )}
    >
      🎙️
    </button>
  );
}
