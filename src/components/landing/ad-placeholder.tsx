type AdVariant = "horizontal" | "inline" | "sidebar" | "sticky";

const variantClasses: Record<AdVariant, string> = {
  horizontal:
    "min-h-[90px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-6 text-center text-xs text-white/40",
  inline:
    "min-h-[120px] w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-8 text-center text-xs text-white/40",
  sidebar:
    "min-h-[280px] w-full max-w-[300px] rounded-2xl border border-white/10 bg-black/30 px-3 py-6 text-center text-xs text-white/40",
  sticky:
    "flex h-14 w-full items-center justify-center border-t border-white/10 bg-black/80 text-[10px] uppercase tracking-widest text-white/45 backdrop-blur-md"
};

interface AdPlaceholderProps {
  variant?: AdVariant;
  className?: string;
  /** Reserve space for Google AdSense / programmatic slots */
  "aria-label"?: string;
}

export function AdPlaceholder({ variant = "horizontal", className = "", "aria-label": ariaLabel }: AdPlaceholderProps) {
  return (
    <aside
      role="complementary"
      aria-label={ariaLabel ?? "Advertisement placeholder"}
      className={`ad-slot ${variantClasses[variant]} ${className}`.trim()}
      data-ad-slot={variant}
    >
      <span className="font-medium tracking-wide text-white/50">Advertisement</span>
    </aside>
  );
}
