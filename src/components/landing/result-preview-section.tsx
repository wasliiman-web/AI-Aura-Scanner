"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

const examples = [
  {
    score: 93,
    label: "Villain Arc Energy",
    verdict: "Plot twist: you were the finale all along.",
    bars: [92, 88, 95],
    gradient: "from-fuchsia-500/30 via-purple-500/20 to-transparent",
    accent: "#e879f9"
  },
  {
    score: 88,
    label: "Main Character Syndrome",
    verdict: "Everyone else is supporting cast. Sorry, rules.",
    bars: [85, 90, 86],
    gradient: "from-cyan-400/25 via-luxe-plum/25 to-transparent",
    accent: "#50D5FF"
  },
  {
    score: 96,
    label: "Solar Monarch",
    verdict: "The timeline dimmed when you stepped in frame.",
    bars: [98, 94, 97],
    gradient: "from-amber-400/25 via-luxe-gold/20 to-transparent",
    accent: "#D7A84B"
  }
];

export function ResultPreviewSection() {
  return (
    <section aria-labelledby="preview-heading" className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-luxe-cyan">Preview</p>
          <h2 id="preview-heading" className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Aura cards that stop the scroll
          </h2>
        </div>
        <p className="max-w-sm text-sm text-white/55">Example results. Yours is generated after you upload.</p>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {examples.map((card, i) => (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="glass group relative min-w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 p-5 shadow-neon sm:min-w-[320px] md:min-w-[340px]"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80`} />
            <div className="relative space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-4xl font-black tabular-nums tracking-tight" style={{ color: card.accent }}>
                    {card.score}
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Aura</p>
                </div>
                <div className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  AI
                </div>
              </div>
              <p className="text-lg font-bold leading-snug text-white">{card.score} Aura — {card.label}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/45">
                  <span>Presence</span>
                  <span>Chaos</span>
                  <span>Main character</span>
                </div>
                <div className="grid gap-2">
                  <ScoreBar value={card.bars[0]} color={card.accent} />
                  <ScoreBar value={card.bars[1]} color="#a78bfa" />
                  <ScoreBar value={card.bars[2]} color="#22d3ee" />
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed text-white/85">&ldquo;{card.verdict}&rdquo;</p>
            </div>
          </motion.article>
        ))}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative min-w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-luxe-gold/25 sm:min-w-[300px]"
        >
          <div className="relative aspect-[4/5] w-full bg-black/40">
            <Image
              src="/example-aura-user.png"
              alt="Example portrait used in a sample aura reading card"
              fill
              className="object-contain p-3"
              sizes="(max-width: 768px) 85vw, 300px"
            />
          </div>
          <div className="border-t border-white/10 p-4">
            <p className="text-2xl font-black text-luxe-gold">96</p>
            <p className="text-sm font-semibold text-white">Solar Monarch</p>
            <p className="mt-1 text-xs text-white/60">Real scan vibe — upload to match yours.</p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
