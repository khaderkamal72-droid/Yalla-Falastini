import { cn } from "@/lib/utils";

interface CharacterIllustrationProps {
  variant: "male" | "female";
  size?: number;
  className?: string;
}

/**
 * Original character system for Yalla Falastini — not modeled on any
 * existing mascot. Rendered as inline SVG placeholders with a keffiyeh
 * pattern (male) and tatreez-inspired collar (female) so the app ships
 * without external art dependencies. Swap the <svg> body for commissioned
 * illustrations when ready; the component contract stays the same.
 */
export function CharacterIllustration({
  variant,
  size = 64,
  className,
}: CharacterIllustrationProps) {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={variant === "male" ? "Yalla Falastini male character" : "Yalla Falastini female character"}
    >
      {variant === "male" ? (
        <svg viewBox="0 0 64 64" width="70%" height="70%">
          <circle cx="32" cy="24" r="14" fill="#EAC57E" />
          <path d="M14 22 Q32 6 50 22 L50 30 Q32 20 14 30 Z" fill="#F4EEDD" stroke="#1F4A38" strokeWidth="1.5" />
          <rect x="18" y="38" width="28" height="22" rx="8" fill="#8A9A5B" />
        </svg>
      ) : (
        <svg viewBox="0 0 64 64" width="70%" height="70%">
          <circle cx="32" cy="24" r="14" fill="#F4EEDD" />
          <path d="M14 26 Q32 10 50 26 Q52 44 44 50 Q32 56 20 50 Q12 44 14 26 Z" fill="#D4A24C" />
          <path d="M18 44 l28 0 M18 48 l28 0" stroke="#C1503F" strokeWidth="1.5" opacity="0.7" />
        </svg>
      )}
    </div>
  );
}
