"use client";

import { motion } from "framer-motion";
import { Loader2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { AuraAnalysis } from "@/lib/types";
import { GoogleAd } from "@/components/ads/google-ad";
import { SampleAuraReadingShowcase } from "@/components/landing/sample-aura-reading-showcase";
import { ResultCard } from "@/components/result-card";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [analysis, setAnalysis] = useState<AuraAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
      setError("Only JPG, PNG, and WEBP are supported.");
      setFile(null);
      setPreview("");
      return;
    }
    if (selected.size > MAX_IMAGE_BYTES) {
      setError("Image is too large. Upload a file under 4MB.");
      setFile(null);
      setPreview("");
      return;
    }

    setFile(selected);
    setAnalysis(null);
    setError("");
    setPreview(URL.createObjectURL(selected));
  };

  const onAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Pick a photo to scan.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("AI analysis failed.");

      const data = (await response.json()) as AuraAnalysis;
      setAnalysis(data);
    } catch {
      setError("Could not analyze this image. Try another photo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <motion.section
        aria-labelledby="hero-heading"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 shadow-neon sm:rounded-[2rem] sm:p-8 md:p-10"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-luxe-plum/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-luxe-cyan/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-luxe-gold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Rate Your Aura
          </p>
          <h1 id="hero-heading" className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">AI Rates </span>
            <span className="bg-gradient-to-r from-luxe-cyan via-luxe-plum to-luxe-gold bg-clip-text text-transparent">Your Aura</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base font-medium leading-snug text-white/75 sm:text-lg">
            Upload a photo and discover your aura score, archetype, and main character energy.
          </p>
        </div>

        <form onSubmit={onAnalyze} className="relative mx-auto mt-8 max-w-xl space-y-5" aria-label="Upload photo for aura scan">
          <label
            htmlFor="aura-file"
            className="group flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-white/25 bg-black/25 px-6 py-10 text-center transition hover:border-luxe-cyan/60 hover:bg-black/35 sm:min-h-[260px]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-luxe-plum/50 to-luxe-cyan/30 text-white shadow-neon transition group-hover:scale-105">
              <Upload className="h-8 w-8" strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Drop your photo here</p>
              <p className="mt-1 text-sm text-white/55">JPG · PNG · WEBP · max 4MB</p>
            </div>
            <input id="aura-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={onChange} className="sr-only" />
            {file ? <span className="text-xs font-medium text-luxe-gold">{file.name}</span> : null}
          </label>

          {preview ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image
                src={preview}
                alt="Your selected photo preview"
                width={800}
                height={420}
                unoptimized
                className="max-h-48 w-full object-contain sm:max-h-56"
              />
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-cta-glow relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-luxe-plum via-fuchsia-500 to-luxe-cyan px-6 py-5 text-lg font-black text-black shadow-gold transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
              {isLoading ? "Scanning…" : "Scan My Aura"}
            </span>
          </button>

          <p className="text-center text-xs font-medium text-white/45">10,000+ aura scans completed</p>

          {error ? (
            <p className="text-center text-sm font-medium text-rose-300" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </motion.section>

      <GoogleAd placement="belowHero" />

      <SampleAuraReadingShowcase />

      <GoogleAd placement="belowSample" />

      <section ref={resultsRef} id="aura-result" aria-live="polite" className="scroll-mt-28">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
          >
            <div className="scanline" />
            <div className="relative space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-luxe-cyan">AI reading in progress</p>
              <div className="h-44 animate-pulse rounded-2xl bg-white/10" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="h-20 animate-pulse rounded-xl bg-white/10" />
                <div className="h-20 animate-pulse rounded-xl bg-white/10" />
                <div className="hidden h-20 animate-pulse rounded-xl bg-white/10 sm:block" />
              </div>
            </div>
          </motion.div>
        ) : analysis && preview ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <ResultCard analysis={analysis} imagePreview={preview} />
          </motion.div>
        ) : (
          <div className="glass rounded-3xl border border-dashed border-white/15 px-6 py-10 text-center">
            <p className="text-sm font-medium text-white/55">Your aura card shows up here right after the scan.</p>
            <p className="mt-1 text-xs text-white/40">Upload above — takes seconds.</p>
          </div>
        )}
      </section>
    </div>
  );
}
