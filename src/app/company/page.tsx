import CompanyAbout from "@/components/company/CompanyAbout";
import CompanyHero from "@/components/company/CompanyHero";
import CompanyPartners from "@/components/company/CompanyPartners";
import CompanyProfile from "@/components/company/CompanyProfile";
import ContactCta from "@/components/layout/ContactCta";

export default function CompanyPage() {
    return (
      <>
        <CompanyHero 
          title="COMPANY"
          subTitle="会社について"
          imageSrc="/assets/images/sub-visual-company.jpg"
        />
        <CompanyAbout />
        <CompanyProfile />
        <CompanyPartners /> 
        <ContactCta />
      </>
    );
  }
  