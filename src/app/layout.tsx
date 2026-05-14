import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { AdSenseScript } from "@/components/ads/adsense-script";
import "@/styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

const siteName = "Rate Your Aura";
const siteDescription =
  "Upload a photo and get your AI aura score, archetype, and main character energy. Share-ready results in seconds.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

/** Same value as AdSense snippet `?client=` — used for script + ownership meta (set in `.env.local` / Vercel). */
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — AI Aura Scanner`,
    template: `%s | ${siteName}`
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    title: `${siteName} — AI Rates Your Aura`,
    description: siteDescription,
    siteName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — AI Rates Your Aura`,
    description: siteDescription
  },
  robots: {
    index: true,
    follow: true
  },
  ...(adsenseClientId
    ? {
        other: {
          "google-adsense-account": adsenseClientId
        }
      }
    : {})
};

export const viewport: Viewport = {
  themeColor: "#05020A",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans antialiased">
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
