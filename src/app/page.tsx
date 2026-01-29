import HomeFeatureSections from "@/components/home/HomeFeatureSections";
import HomeMainVisual from "@/components/home/HomeMainVisual";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import ContactCta from "@/components/layout/ContactCta";

export default function Home() {
  return (
    <main>
         <HomeMainVisual />
         <HomeFeatureSections />
         <HomeNewsSection />
         <ContactCta />
    </main>
  );
}
