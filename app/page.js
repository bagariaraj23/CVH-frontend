import { Hero } from "./components/Hero";
import { FeaturesSection } from "./components/FeaturesSection";
import FAQComponent from "./components/FAQComponent";
import { CoreServices } from "./components/CoreServices";
import { PatientTestimonials } from "./components/PatientTestimonials";
import ContactCardSection from "./components/ContactCardSection";
import InfoCardSection from "./components/InfoCardSection";
import { TestimonialsAndDataEntry } from "./components/TestimonialsAndDataEntry";
import { CoreBenefitsSection } from "./components/CoreBenefitsSection";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TestimonialsAndDataEntry />
      <CoreBenefitsSection />
      <InfoCardSection />
      <CoreServices />
      <ContactCardSection />
      <PatientTestimonials />
      <FeaturesSection />
      <FAQComponent />
      <StickyCTA />
      <Footer />
    </>
  );
}
