import { GoogleAd } from "@/components/ads/google-ad";

export function StickyMobileAd() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <GoogleAd placement="sticky" eager className="!my-0 !max-w-none" />
    </div>
  );
}
