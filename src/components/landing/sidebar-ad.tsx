import { AdPlaceholder } from "@/components/landing/ad-placeholder";

export function SidebarAd() {
  return (
    <aside className="hidden w-[300px] shrink-0 xl:block" aria-label="Sidebar advertisements">
      <div className="sticky top-24">
        <AdPlaceholder variant="sidebar" />
      </div>
    </aside>
  );
}
