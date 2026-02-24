import HomeFeatureSections from "@/components/home/HomeFeatureSections";
import HomeMainVisual from "@/components/home/HomeMainVisual";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import ContactCta from "@/components/layout/ContactCta";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <main>
      <Analytics />
      <HomeMainVisual />
      <HomeFeatureSections />
      <HomeNewsSection />
      <ContactCta />
    </main>
  );
}
