export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-16 top-8 h-56 w-56 animate-floaty rounded-full bg-luxe-plum/30 blur-3xl" />
      <div className="absolute right-0 top-24 h-48 w-48 animate-pulseGlow rounded-full bg-luxe-cyan/25 blur-3xl" />
      <div className="absolute bottom-8 left-1/3 h-64 w-64 rounded-full bg-luxe-gold/20 blur-3xl" />
    </div>
  );
}
