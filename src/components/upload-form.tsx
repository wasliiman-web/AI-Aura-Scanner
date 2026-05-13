"use client";

import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { AuraAnalysis } from "@/lib/types";
import { ResultCard } from "@/components/result-card";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [analysis, setAnalysis] = useState<AuraAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Upload an image first.");
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
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={onAnalyze}
        className="glass space-y-5 rounded-3xl p-5 shadow-neon sm:p-7"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-luxe-gold">AI Aura Scanner</p>
          <h2 className="mt-2 text-2xl font-semibold">Upload a photo to get an instant AI-powered aura reading.</h2>
        </div>

        <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/30 bg-white/[0.03] p-6 text-center transition hover:border-luxe-cyan/60">
          <Upload size={24} className="text-luxe-cyan" />
          <p className="text-sm text-white/80">Upload JPG, PNG, or WEBP</p>
          <input type="file" accept="image/*" onChange={onChange} className="hidden" />
          {file ? <span className="text-xs text-luxe-gold">{file.name}</span> : null}
        </label>

        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={800}
            height={420}
            unoptimized
            className="h-52 w-full rounded-2xl object-cover"
          />
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-luxe-plum to-luxe-cyan px-5 py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-60"
        >
          {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
          {isLoading ? "Analyzing Aura..." : "Analyze Aura"}
        </button>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      </motion.form>

      {isLoading ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass relative overflow-hidden rounded-3xl p-6">
          <div className="scanline" />
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-luxe-cyan">AI Reading In Progress</p>
            <div className="h-40 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 animate-pulse rounded-xl bg-white/10" />
              <div className="h-20 animate-pulse rounded-xl bg-white/10" />
            </div>
          </div>
        </motion.div>
      ) : analysis && preview ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <ResultCard analysis={analysis} imagePreview={preview} />
        </motion.div>
      ) : (
        <div className="glass flex min-h-52 items-center justify-center rounded-3xl p-6 text-center text-sm text-white/65">
          Your shareable aura card appears here after analysis.
        </div>
      )}
    </div>
  );
}
