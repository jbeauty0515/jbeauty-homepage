import Hero from "@/components/common/Hero";
import CompanyAbout from "@/components/company/CompanyAbout";
import CompanyPartners from "@/components/company/CompanyPartners";
import CompanyProfile from "@/components/company/CompanyProfile";
import ContactCta from "@/components/layout/ContactCta";

export default function CompanyPage() {
  return (
    <>
      <Hero
        title="COMPANY"
        subTitle="会社について"
        imageSrc="/assets/images/sub-visual-company.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
        ]}
      />
      <CompanyAbout />
      <CompanyProfile />
      <CompanyPartners />
      <ContactCta />
    </>
  );
}
