import { Hero } from "./components/Hero";
import { FeaturesSection } from "./components/FeaturesSection";
import SliderSection from "./components/SliderSection";
import FAQComponent from "./components/FAQComponent";
import { CoreServices } from "./components/CoreServices";
import { PatientTestimonials } from "./components/PatientTestimonials";
import { ServicesOverview } from "./components/ServicesOverview";
import ContactCardSection from "./components/ContactCardSection";
import InfoCardSection from "./components/InfoCardSection";
import ChatbotStartPage from "./components/ChatbotStartPage";
import Testimonials from "./user/testimonials/page";
import { TestimonialsAndDataEntry } from "./components/TestimonialsAndDataEntry";
import { CoreBenefitsSection } from "./components/CoreBenefitsSection";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";
// import Header from "./components/Header";

export default function Home() {
  return (
    <>
    <Header/>
    <Hero/>
    <TestimonialsAndDataEntry/>
    <CoreBenefitsSection/>
      {/* <SliderSection /> */}

      

      <InfoCardSection />
      <CoreServices />
      <ContactCardSection />
      <PatientTestimonials />
      <FeaturesSection />
      <FAQComponent />
      <StickyCTA/>
      <Footer/>
    </>
  );
}
