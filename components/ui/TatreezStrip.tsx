interface TatreezStripProps {
  height?: number;
  className?: string;
}

/**
 * A thin repeating diamond/cross-stitch strip inspired by traditional
 * Palestinian tatreez embroidery. Pure CSS gradients — no image assets.
 */
export function TatreezStrip({ height = 10, className = "" }: TatreezStripProps) {
  return (
    <div
      className={className}
      style={{
        height,
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0 6px, #C1503F 6px 8px, transparent 8px 14px), " +
          "repeating-linear-gradient(-45deg, transparent 0 6px, #1F4A38 6px 8px, transparent 8px 14px)",
        backgroundColor: "#EAC57E",
      }}
      aria-hidden
    />
  );
}
