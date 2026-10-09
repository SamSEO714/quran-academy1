import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { Attribution } from "@/components/Attribution";
import { Tracking } from "@/components/Tracking";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      {/* keeps the fixed phone bar from covering the end of the footer */}
      <div className="h-[4.25rem] bg-ink sm:hidden" aria-hidden="true" />
      <MobileCta />
      <Attribution />
      <Tracking />
    </>
  );
}
