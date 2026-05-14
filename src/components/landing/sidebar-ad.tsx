import { GoogleAd } from "@/components/ads/google-ad";

export function SidebarAd() {
  return (
    <aside className="hidden w-[300px] shrink-0 xl:block" aria-label="Sidebar advertisements">
      <div className="sticky top-24">
        <GoogleAd placement="sidebar" eager className="!my-0" />
      </div>
    </aside>
  );
}
