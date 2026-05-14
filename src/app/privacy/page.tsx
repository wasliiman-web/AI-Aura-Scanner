import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Rate Your Aura",
  description: "Privacy policy for Rate Your Aura."
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-white/85">
      <p className="text-xs uppercase tracking-widest text-luxe-cyan">Legal</p>
      <h1 className="mt-2 text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-6 text-sm leading-relaxed">
        This is a placeholder privacy policy. Replace with your final policy before launch. Describe what data you collect
        (for example uploaded images processed for aura readings), retention, third parties such as OpenAI, analytics, and
        advertising partners.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-luxe-cyan hover:underline">
        ← Back home
      </Link>
    </main>
  );
}
