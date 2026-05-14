import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 py-10" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm font-semibold text-white">Rate Your Aura</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/55">
          <Link href="/privacy" className="transition hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-white">
            Terms
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </nav>
        <p className="text-xs text-white/40">© {year} Rate Your Aura. For entertainment.</p>
      </div>
    </footer>
  );
}
