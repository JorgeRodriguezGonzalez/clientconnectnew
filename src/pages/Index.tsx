import Footer from "@/components/layout/Footer";
import { NewHero } from "@/components/home/NewHero";
import { AnimatedGallerySection } from "@/components/animated-gallery-section";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import { HowWeWork } from "@/components/home/HowWeWork";
import { WhySubscribeBento } from "@/components/home/WhySubscribeBento";
import BrandsShowcaseSection from "@/components/home/BrandsShowcaseSection";
import { TrustedBrandsSection } from "@/components/home/TrustedBrandsSection"; // ← NUEVO
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <NewHero />
        <BrandsShowcaseSection />
        <TrustedBrandsSection /> {/* ← NUEVO COMPONENTE */}
        <AnimatedGallerySection />
        <ServicesSection />
        <WhyUsSection />
        <HowWeWork />
        <WhySubscribeBento />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;