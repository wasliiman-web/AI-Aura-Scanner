"use client";

import { motion } from "framer-motion";
import { useId } from "react";

const TRAITS = ["Intimidating confidence", "Elite aura", "Emotionally unavailable", "Main character presence"];

const MINI = [
  { title: "Gym Demon", score: "91", tint: "from-emerald-400/30 to-cyan-500/10" },
  { title: "CEO Aura", score: "89", tint: "from-amber-400/25 to-luxe-plum/15" },
  { title: "NPC Energy", score: "64", tint: "from-slate-400/25 to-white/5" }
];

function AuraScoreRing({ value }: { value: number }) {
  const rid = useId();
  const gradId = `auraRingGrad-${rid.replace(/:/g, "")}`;
  const r = 46;
  const c = 2 * Math.PI * r;
  const filled = (value / 100) * c;

  return (
    <div className="relative flex h-[140px] w-[140px] shrink-0 items-center justify-center sm:h-[160px] sm:w-[160px]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500/40 via-luxe-plum/30 to-luxe-cyan/30 blur-2xl" />
      <div className="pointer-events-none absolute inset-2 rounded-full bg-fuchsia-500/20 blur-xl animate-pulse" />
      <svg className="relative h-full w-full -rotate-90 drop-shadow-[0_0_18px_rgba(232,121,249,0.45)]" viewBox="0 0 120 120" aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - filled }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="50%" stopColor="#7A3CFF" />
            <stop offset="100%" stopColor="#50D5FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function SampleAuraReadingShowcase() {
  return (
    <section aria-labelledby="sample-aura-heading" className="relative mx-auto w-full max-w-lg py-4 sm:max-w-xl sm:py-6">
      <div className="pointer-events-none absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-luxe-plum/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-luxe-cyan/15 blur-3xl" />

      <header className="relative mb-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-luxe-cyan">Example Aura Reading</p>
        <h2 id="sample-aura-heading" className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Here&apos;s what your AI aura analysis could look like.
        </h2>
      </header>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-[0_0_60px_-12px_rgba(122,60,255,0.35)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,121,249,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-[90%] -translate-x-1/2 bg-gradient-to-t from-luxe-cyan/10 to-transparent" />

        <div className="relative space-y-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">AI Aura Scanner Result</p>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
            <AuraScoreRing value={93} />
            <div className="text-center sm:text-left">
              <motion.p
                className="text-5xl font-black leading-none tracking-tight sm:text-6xl"
                initial={{ opacity: 0.5, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              >
                <span className="bg-gradient-to-br from-fuchsia-200 via-white to-luxe-cyan bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(232,121,249,0.35)]">
                  93
                </span>
                <span className="text-2xl font-bold text-white/40 sm:text-3xl">/100</span>
              </motion.p>
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="mt-3 inline-flex rounded-full border border-fuchsia-400/35 bg-fuchsia-500/15 px-4 py-1.5 text-sm font-bold text-fuchsia-100"
              >
                Villain Arc Energy
              </motion.span>
            </div>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } }
            }}
          >
            {TRAITS.map((t) => (
              <motion.span
                key={t}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 }
                }}
                className="rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-[11px] font-semibold text-white/85 sm:text-xs"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-luxe-gold/90">Final verdict</p>
            <p className="mt-2 text-center text-base font-semibold leading-snug text-white/95 sm:text-lg">
              Looks like they disappear for 3 days and return stronger.
            </p>
          </div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between text-[9px] uppercase tracking-wider text-white/35">
              <span>Chaos</span>
              <span>Main character</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-luxe-plum to-luxe-cyan"
                initial={{ width: 0 }}
                whileInView={{ width: "93%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.article>

      <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {MINI.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i }}
            whileHover={{ scale: 1.03, y: -2 }}
            className={`cursor-default overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${m.tint} p-4 text-center shadow-neon backdrop-blur-md transition-shadow hover:border-white/20 hover:shadow-[0_0_28px_-8px_rgba(122,60,255,0.35)]`}
          >
            <p className="text-2xl font-black tabular-nums text-white">{m.score}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-white/80">{m.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
