"use client";

// Lightweight, dependency-free sound effects synthesized with the Web Audio API.
// No audio files to load, no network requests — these fire instantly.

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = "sine",
  gainPeak = 0.16
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, ctx.currentTime + start);
  gain.gain.linearRampToValueAtTime(gainPeak, ctx.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.05);
}

/** Bright ascending three-note chime — correct answer. */
export function playCorrectSound() {
  const ctx = getCtx();
  if (!ctx) return;
  tone(ctx, 523.25, 0, 0.12); // C5
  tone(ctx, 659.25, 0.09, 0.12); // E5
  tone(ctx, 783.99, 0.18, 0.24); // G5
}

/** Low descending buzz — wrong answer. */
export function playWrongSound() {
  const ctx = getCtx();
  if (!ctx) return;
  tone(ctx, 220, 0, 0.16, "sawtooth", 0.1);
  tone(ctx, 174.61, 0.12, 0.22, "sawtooth", 0.1);
}

/** Four-note fanfare — full lesson complete. */
export function playLessonCompleteSound() {
  const ctx = getCtx();
  if (!ctx) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => tone(ctx, freq, i * 0.11, 0.3));
}

/** Soft tick — light UI taps (e.g. XP counting up). */
export function playTickSound() {
  const ctx = getCtx();
  if (!ctx) return;
  tone(ctx, 880, 0, 0.045, "sine", 0.07);
}

/** Warm low thud — losing a heart. */
export function playHeartLossSound() {
  const ctx = getCtx();
  if (!ctx) return;
  tone(ctx, 150, 0, 0.18, "triangle", 0.14);
}
