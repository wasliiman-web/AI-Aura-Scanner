"use client";

import { useInView } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { getAdSlotId, getAdsensePublisherId, type AdPlacement } from "@/lib/ads-config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const PLACEMENT_STYLE: Record<
  AdPlacement,
  { minH: string; maxW: string; innerMin: string; margin: string }
> = {
  belowHero: {
    minH: "min-h-[100px] sm:min-h-[110px]",
    maxW: "mx-auto w-full max-w-4xl",
    innerMin: "min-h-[100px] sm:min-h-[110px]",
    margin: "my-6 sm:my-8"
  },
  belowSample: {
    minH: "min-h-[120px] sm:min-h-[130px]",
    maxW: "mx-auto w-full max-w-4xl",
    innerMin: "min-h-[120px] sm:min-h-[130px]",
    margin: "my-6 sm:my-8"
  },
  inline: {
    minH: "min-h-[120px] sm:min-h-[140px]",
    maxW: "mx-auto w-full max-w-4xl",
    innerMin: "min-h-[120px] sm:min-h-[140px]",
    margin: "my-8 sm:my-10"
  },
  between: {
    minH: "min-h-[120px] sm:min-h-[140px]",
    maxW: "mx-auto w-full max-w-4xl",
    innerMin: "min-h-[120px] sm:min-h-[140px]",
    margin: "my-8 sm:my-10"
  },
  sidebar: {
    minH: "min-h-[280px] lg:min-h-[300px]",
    maxW: "w-full max-w-[300px]",
    innerMin: "min-h-[280px] lg:min-h-[300px]",
    margin: "my-0"
  },
  sticky: {
    minH: "min-h-[56px]",
    maxW: "w-full",
    innerMin: "min-h-[50px] max-h-[56px]",
    margin: "my-0"
  }
};

export interface GoogleAdProps {
  /** Maps to `NEXT_PUBLIC_ADSENSE_SLOT_*` — see `src/lib/ads-config.ts` */
  placement: AdPlacement;
  className?: string;
  /** Load immediately (sticky / sidebar) instead of waiting for scroll */
  eager?: boolean;
}

/**
 * Responsive Google AdSense display unit (`data-ad-format="auto"`).
 *
 * Paste in `.env.local`:
 * - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = your ca-pub-… publisher ID
 * - Slot keys per placement = numeric `data-ad-slot` from each ad unit (see `src/lib/ads-config.ts`)
 */
export function GoogleAd({ placement, className = "", eager = false }: GoogleAdProps) {
  const uid = useId().replace(/:/g, "");
  const insRef = useRef<HTMLModElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [softLabel, setSoftLabel] = useState(false);

  const clientId = getAdsensePublisherId();
  const slotId = getAdSlotId(placement);
  const configured = Boolean(clientId && slotId);

  const inView = useInView(wrapRef, { once: true, margin: "160px", amount: 0.02 });
  const shouldRequest = configured && (eager || inView);

  useEffect(() => {
    if (!shouldRequest || !insRef.current || pushed.current) return;

    const tryPush = (): boolean => {
      if (!insRef.current || pushed.current) return false;
      if (typeof window === "undefined" || !Array.isArray(window.adsbygoogle)) return false;
      try {
        window.adsbygoogle.push({});
        pushed.current = true;
        return true;
      } catch {
        return false;
      }
    };

    if (tryPush()) return;

    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      if (tryPush() || n > 40) window.clearInterval(id);
    }, 150);

    return () => window.clearInterval(id);
  }, [shouldRequest, clientId, slotId]);

  useEffect(() => {
    if (!configured || !shouldRequest) return;
    const t = window.setTimeout(() => setSoftLabel(true), 10000);
    return () => window.clearTimeout(t);
  }, [configured, shouldRequest]);

  const ps = PLACEMENT_STYLE[placement];
  const wrapClass = `${ps.minH} ${ps.maxW} ${ps.margin} ${className}`.trim();
  const isSticky = placement === "sticky";

  if (!configured) {
    return (
      <div
        ref={wrapRef}
        role="complementary"
        aria-label="Advertisement — add NEXT_PUBLIC_ADSENSE_CLIENT_ID and slot env vars in .env.local"
        className={`${wrapClass} rounded-2xl border border-dashed border-white/10 bg-black/20 px-4 py-8 text-center`}
        data-ad-placeholder={placement}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">Advertisement</span>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      role="complementary"
      aria-label="Advertisement"
      className={`${wrapClass} overflow-hidden ${isSticky ? "rounded-none border-x-0 border-b-0 border-t border-white/10 bg-black/85 backdrop-blur-md" : "rounded-2xl border border-white/10 bg-black/25"} content-visibility-auto`}
      data-ad-placement={placement}
    >
      <div className={`relative flex w-full items-center justify-center overflow-hidden ${ps.innerMin}`}>
        <ins
          ref={insRef}
          id={`adsense-${placement}-${uid}`}
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        {softLabel ? (
          <span className="pointer-events-none absolute bottom-1 right-2 text-[9px] text-white/25">Ad</span>
        ) : null}
      </div>
    </div>
  );
}
