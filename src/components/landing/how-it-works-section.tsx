"use client";

import { motion } from "framer-motion";
import { Camera, Cpu, Trophy } from "lucide-react";

const steps = [
  { title: "Upload photo", sub: "JPG, PNG, WEBP", icon: Camera },
  { title: "AI analyzes aura", sub: "Seconds, not minutes", icon: Cpu },
  { title: "Get your score", sub: "Share-ready card", icon: Trophy }
];

export function HowItWorksSection() {
  return (
    <section aria-labelledby="how-heading" className="scroll-mt-24">
      <div className="mb-6 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-luxe-cyan">How it works</p>
        <h2 id="how-heading" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Three taps. One aura moment.
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1 }}
            className="glass flex flex-col items-center rounded-3xl border border-white/10 px-4 py-8 text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-luxe-plum/40 to-luxe-cyan/30 text-white shadow-neon">
              <step.icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <p className="text-lg font-bold text-white">{step.title}</p>
            <p className="mt-1 text-sm text-white/50">{step.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
