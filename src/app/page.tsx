import { AmbientBackground } from "@/components/ambient-bg";
import { UploadForm } from "@/components/upload-form";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
      <AmbientBackground />

      <section className="mb-8 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="glass rounded-2xl p-5 sm:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-luxe-gold">Aura Rate AI</p>
          <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-white/95 sm:text-xl">
            Discover your aura score, achetype and main character energy.
          </p>
        </div>

        <aside className="glass rounded-2xl border border-luxe-cyan/30 p-5 text-sm shadow-neon sm:p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-luxe-cyan">Example Aura Reading</p>
          <Image
            src="/example-aura-user.png"
            alt="Sample aura portrait"
            width={420}
            height={260}
            quality={100}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="mt-3 w-full rounded-xl bg-black/20 object-contain"
            priority
          />
          <p className="mt-2 text-2xl font-semibold text-luxe-gold">96/100</p>
          <p className="text-base font-medium">Solar Monarch</p>
          <p className="mt-2 text-white/80">Strengths: Commanding presence, cinematic confidence, icon-level composure.</p>
          <p className="mt-1 text-white/70">Weaknesses: Main-character syndrome, dramatic entrances only.</p>
          <p className="mt-2 text-white/90">Verdict: You opened your arms and the whole timeline knew exactly who the lead was.</p>
        </aside>
      </section>

      <section className="pb-2">
        <UploadForm />
      </section>

      <section className="mt-10 space-y-5 pb-8">
        <div className="glass rounded-2xl p-5 sm:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold">How Aura Analysis Works</p>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            Every reading is based on visual storytelling cues in your photo: expression confidence, eye focus, posture dominance, styling contrast, lighting drama,
            color mood, background context, and overall scene presence. The AI interprets how strongly your image communicates main-character energy and assigns a
            0-100 aura score based on intensity, coherence, and memorability.
          </p>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            It then matches your dominant vibe to one of six archetypes. For example, direct confident framing with strong contrast may lean <span className="text-luxe-gold">Solar Monarch</span>,
            while softer mystery and low-key elegance may map to <span className="text-luxe-gold">Velvet Mystic</span>. Each result also includes strengths (what boosts your aura signal),
            weaknesses (what reduces impact), and a cinematic verdict written in a short TikTok-style narrator voice for shareability.
          </p>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            The system is style-oriented, not identity judgment. It does not determine personal worth, attractiveness, or real-world capability. Think of it as a creative
            aura interpretation engine designed for fun, storytelling, and content creation.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-luxe-cyan">Aura Scale (0-100)</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>
                <span className="text-luxe-gold">90-100:</span> Legendary main-character energy
              </li>
              <li>
                <span className="text-luxe-gold">80-89:</span> Magnetic, camera-ready presence
              </li>
              <li>
                <span className="text-luxe-gold">70-79:</span> Strong aura with room to sharpen
              </li>
              <li>
                <span className="text-luxe-gold">60-69:</span> Emerging energy, still building contrast
              </li>
              <li>
                <span className="text-luxe-gold">&lt;60:</span> Low signal; lighting/style upgrade recommended
              </li>
            </ul>
          </article>

          <article className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-luxe-cyan">Archetype Meanings</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>
                <span className="text-luxe-gold">Solar Monarch:</span> Dominant leader aura
              </li>
              <li>
                <span className="text-luxe-gold">Velvet Mystic:</span> Quiet, hypnotic elegance
              </li>
              <li>
                <span className="text-luxe-gold">Neon Prophet:</span> Bold trend-setter energy
              </li>
              <li>
                <span className="text-luxe-gold">Midnight Strategist:</span> Sharp and controlled presence
              </li>
              <li>
                <span className="text-luxe-gold">Stardust Rebel:</span> Unpredictable creative fire
              </li>
              <li>
                <span className="text-luxe-gold">Ethereal Guardian:</span> Calm, trusted, protective vibe
              </li>
            </ul>
          </article>

          <article className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-luxe-cyan">What The Result Includes</p>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li>
                <span className="text-luxe-gold">Aura score:</span> Overall presence intensity
              </li>
              <li>
                <span className="text-luxe-gold">Archetype:</span> Your dominant character style
              </li>
              <li>
                <span className="text-luxe-gold">Strengths:</span> Traits that elevate your vibe
              </li>
              <li>
                <span className="text-luxe-gold">Weaknesses:</span> Traits that weaken your impact
              </li>
              <li>
                <span className="text-luxe-gold">Cinematic verdict:</span> Viral, TikTok-style one-liner
              </li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
