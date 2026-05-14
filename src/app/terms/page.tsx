import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms | Rate Your Aura",
  description: "Terms of use for Rate Your Aura."
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-white/85">
      <p className="text-xs uppercase tracking-widest text-luxe-cyan">Legal</p>
      <h1 className="mt-2 text-3xl font-bold text-white">Terms of Use</h1>
      <p className="mt-6 text-sm leading-relaxed">
        This is a placeholder terms page. Replace with your final terms. Clarify that aura readings are for entertainment,
        not professional advice, and outline acceptable use of uploads and sharing.
      </p>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-luxe-cyan hover:underline">
        ← Back home
      </Link>
    </main>
  );
}
