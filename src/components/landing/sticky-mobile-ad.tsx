import { AdPlaceholder } from "@/components/landing/ad-placeholder";

export function StickyMobileAd() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <AdPlaceholder variant="sticky" className="rounded-none border-x-0 border-b-0" aria-label="Mobile advertisement placeholder" />
    </div>
  );
}
