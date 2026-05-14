import { AmbientBackground } from "@/components/ambient-bg";
import { AdPlaceholder } from "@/components/landing/ad-placeholder";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ResultPreviewSection } from "@/components/landing/result-preview-section";
import { SidebarAd } from "@/components/landing/sidebar-ad";
import { SiteFooter } from "@/components/landing/site-footer";
import { StickyMobileAd } from "@/components/landing/sticky-mobile-ad";
import { ViralShareSection } from "@/components/landing/viral-share-section";
import { UploadForm } from "@/components/upload-form";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Rate Your Aura",
  applicationCategory: "EntertainmentApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  description:
    "Upload a photo to receive an AI-generated aura score, archetype, strengths, weaknesses, and a shareable cinematic verdict."
};

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <div className="relative min-h-screen pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-10">
        <AmbientBackground />

        <div className="mx-auto flex max-w-[1200px] gap-8 px-4 pt-6 sm:px-6 sm:pt-10 lg:gap-10">
          <div id="main-content" className="min-w-0 flex-1 space-y-12 sm:space-y-16 lg:space-y-20">
            <UploadForm />

            <ResultPreviewSection />

            <AdPlaceholder variant="inline" className="mx-auto max-w-4xl" />

            <HowItWorksSection />

            <ViralShareSection />

            <SiteFooter />
          </div>

          <SidebarAd />
        </div>
      </div>

      <StickyMobileAd />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
