/**
 * Google AdSense configuration (public env vars — safe for browser).
 *
 * ---------------------------------------------------------------------------
 * 1) PUBLISHER ID (ca-pub-…)
 * ---------------------------------------------------------------------------
 * In Google AdSense: Account → Account information → Publisher ID
 *
 * Add to `.env.local`:
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
 *
 * ---------------------------------------------------------------------------
 * 2) AD SLOT IDs (numeric strings from each ad unit’s snippet)
 * ---------------------------------------------------------------------------
 * In AdSense: Ads → Overview → By ad unit → choose unit → Get code
 * Copy the `data-ad-slot="1234567890"` value (numbers only) for each placement.
 *
 *   NEXT_PUBLIC_ADSENSE_SLOT_BELOW_HERO=1234567890
 *   NEXT_PUBLIC_ADSENSE_SLOT_BELOW_SAMPLE=1234567890
 *   NEXT_PUBLIC_ADSENSE_SLOT_INLINE=1234567890
 *   NEXT_PUBLIC_ADSENSE_SLOT_BETWEEN=1234567890
 *   NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=1234567890
 *   NEXT_PUBLIC_ADSENSE_SLOT_STICKY=1234567890
 *
 * You can reuse one slot across placements while testing; for revenue, use
 * separate units per placement in AdSense.
 *
 * Site ownership: the root layout emits
 *   <meta name="google-adsense-account" content="…" />
 * when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set (same value as here — no duplicate literals).
 * ---------------------------------------------------------------------------
 */

export type AdPlacement =
  | "belowHero"
  | "belowSample"
  | "inline"
  | "between"
  | "sidebar"
  | "sticky";

const SLOT_ENV_KEYS: Record<AdPlacement, string> = {
  belowHero: "NEXT_PUBLIC_ADSENSE_SLOT_BELOW_HERO",
  belowSample: "NEXT_PUBLIC_ADSENSE_SLOT_BELOW_SAMPLE",
  inline: "NEXT_PUBLIC_ADSENSE_SLOT_INLINE",
  between: "NEXT_PUBLIC_ADSENSE_SLOT_BETWEEN",
  sidebar: "NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR",
  sticky: "NEXT_PUBLIC_ADSENSE_SLOT_STICKY"
};

export function getAdsensePublisherId(): string | undefined {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
}

export function getAdSlotId(placement: AdPlacement): string | undefined {
  const key = SLOT_ENV_KEYS[placement];
  return process.env[key]?.trim();
}

/** True when publisher ID is set (script can load). Slots are checked per placement. */
export function isAdsensePublisherConfigured(): boolean {
  return Boolean(getAdsensePublisherId());
}
