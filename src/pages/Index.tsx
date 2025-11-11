import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GoogleGeminiEffectDemo } from "@/components/home/googlegeminieffectdemo"; // ← Añade .tsx
import { AnimatedGallerySection } from "@/components/animated-gallery-section";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import { HowWeWork } from "@/components/home/HowWeWork";
import { WhySubscribeBento } from "@/components/home/WhySubscribeBento";
import BrandsShowcaseSection from "@/components/home/BrandsShowcaseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GoogleGeminiEffectDemo />
        <AnimatedGallerySection />
        <ServicesSection />
        <WhyUsSection />
        <HowWeWork />
        <WhySubscribeBento />
        <BrandsShowcaseSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;