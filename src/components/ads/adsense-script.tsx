import Script from "next/script";
import { getAdsensePublisherId } from "@/lib/ads-config";

/**
 * Loads the global AdSense script once (per Google’s single-tag pattern).
 * Publisher ID: set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` in `.env.local` (see `src/lib/ads-config.ts`).
 */
export function AdSenseScript() {
  const clientId = getAdsensePublisherId();
  if (!clientId) return null;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
