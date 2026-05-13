"use client";

import html2canvas from "html2canvas";
import { Download, Share2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { AuraAnalysis } from "@/lib/types";

interface ResultCardProps {
  analysis: AuraAnalysis;
  imagePreview: string;
}

export function ResultCard({ analysis, imagePreview }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const theme = getThemeFromScore(analysis.score);
  const shareText = `My aura is ${analysis.score}/100 (${analysis.archetype}). ${analysis.cinematicVerdict}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#09050f",
        scale: 2
      });
      const link = document.createElement("a");
      link.download = "my-aura-rating.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="space-y-4">
      <div
        ref={cardRef}
        className={`glass relative overflow-hidden rounded-3xl border p-5 sm:p-7 ${theme.containerClass}`}
      >
        <div className={`absolute inset-0 opacity-55 ${theme.overlayClass}`} />
        <div className="relative space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
            <Sparkles size={13} />
            AI Aura Reading
          </p>

          <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
            <Image
              src={imagePreview}
              alt="Uploaded portrait"
              width={112}
              height={112}
              unoptimized
              className="h-28 w-full rounded-2xl object-cover sm:w-28"
            />
            <div className="space-y-2">
              <p className={`text-4xl font-semibold leading-none ${theme.scoreClass}`}>{analysis.score}/100</p>
              <p className="text-xl font-medium">{analysis.archetype}</p>
              <p className="text-sm text-white/80">{analysis.cinematicVerdict}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-luxe-cyan">Strengths</p>
              <ul className="space-y-1 text-sm text-white/90">
                {analysis.strengths.map((item) => (
                  <li key={item}>+ {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wider text-pink-300">Weaknesses</p>
              <ul className="space-y-1 text-sm text-white/90">
                {analysis.weaknesses.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isExporting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-luxe-gold/60 bg-luxe-gold/10 px-4 py-3 text-sm font-medium transition hover:bg-luxe-gold/20 disabled:opacity-60"
      >
        <Download size={16} />
        {isExporting ? "Preparing Card..." : "Download Shareable Card"}
      </button>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <a
          href={`https://www.tiktok.com/upload?caption=${encodedText}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-3 py-2 text-xs hover:bg-white/[0.08]"
        >
          TikTok
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-3 py-2 text-xs hover:bg-white/[0.08]"
        >
          X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-3 py-2 text-xs hover:bg-white/[0.08]"
        >
          FB
        </a>
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1 rounded-xl border border-luxe-gold/40 bg-luxe-gold/10 px-3 py-2 text-xs hover:bg-luxe-gold/20"
        >
          <Share2 size={13} />
          {copied ? "Copied" : "Copy Text"}
        </button>
      </div>
    </section>
  );
}

function getThemeFromScore(score: number): { containerClass: string; overlayClass: string; scoreClass: string } {
  if (score >= 90) {
    return {
      containerClass: "border-luxe-gold/40 shadow-gold",
      overlayClass: "bg-[radial-gradient(circle_at_30%_15%,rgba(215,168,75,0.35),transparent_45%),linear-gradient(135deg,#1A1308_0%,#09050F_100%)]",
      scoreClass: "text-luxe-gold"
    };
  }
  if (score >= 80) {
    return {
      containerClass: "border-luxe-cyan/35 shadow-neon",
      overlayClass: "bg-[radial-gradient(circle_at_20%_20%,rgba(80,213,255,0.28),transparent_45%),linear-gradient(135deg,#070B12_0%,#09050F_100%)]",
      scoreClass: "text-luxe-cyan"
    };
  }
  return {
    containerClass: "border-luxe-plum/40 shadow-neon",
    overlayClass: "bg-[radial-gradient(circle_at_70%_30%,rgba(122,60,255,0.3),transparent_48%),linear-gradient(135deg,#140A22_0%,#09050F_100%)]",
    scoreClass: "text-purple-300"
  };
}
