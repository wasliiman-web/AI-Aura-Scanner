"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";

function FakePost({ user, aura, text }: { user: string; aura: string; text: string }) {
  return (
    <div className="glass overflow-hidden rounded-3xl border border-white/10">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-luxe-plum to-luxe-cyan" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{user}</p>
          <p className="text-[11px] text-white/45">TikTok · For You</p>
        </div>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-luxe-cyan">
          {aura}
        </span>
      </div>
      <div className="aspect-[9/12] max-h-[220px] bg-gradient-to-b from-luxe-800 to-black">
        <div className="flex h-full flex-col justify-end p-4">
          <p className="text-lg font-black text-white drop-shadow-lg">{text}</p>
          <p className="mt-1 text-xs text-white/70">#AuraCheck #RateYourAura</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-white/55">
        <div className="flex items-center gap-4">
          <Heart className="h-5 w-5" />
          <MessageCircle className="h-5 w-5" />
          <Share2 className="h-5 w-5" />
        </div>
        <span className="text-[11px]">12.4K</span>
      </div>
    </div>
  );
}

export function ViralShareSection() {
  return (
    <section aria-labelledby="viral-heading" className="scroll-mt-24">
      <div className="mb-6 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-luxe-gold">Go viral</p>
        <h2 id="viral-heading" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Built for TikTok energy
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/60 sm:mx-0">
          Compare aura scores with friends. Post your results. Let the comments section debate your archetype.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <FakePost user="aura.archive" aura="93 aura" text="Villain arc energy is crazy." />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
          <FakePost user="mainchar.online" aura="88 aura" text="The AI said main character syndrome… accurate." />
        </motion.div>
      </div>
    </section>
  );
}
