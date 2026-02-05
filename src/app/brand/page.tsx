import Brand from "@/components/brand/Brand";
import Hero from "@/components/common/Hero";
import ContactCta from "@/components/layout/ContactCta";

export default function BrandPage() {
  return (
    <>
      <Hero
        title="BRAND"
        subTitle="ブランドについて"
        imageSrc="/assets/images/sub-visual-brand.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brand", href: "/brand" },
        ]}
      />
      <Brand />
      <ContactCta />
    </>
  );
}
