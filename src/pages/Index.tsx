import Footer from "@/components/layout/Footer";
import { FinalHero } from "@/components/home/FinalHero";
import { BentoGrid } from "@/components/home/BentoGrid";
import { AnimatedGallerySection } from "@/components/animated-gallery-section";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import { HowWeWork } from "@/components/home/HowWeWork";
import { WhySubscribeBento } from "@/components/home/WhySubscribeBento";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { UseCasesShowcase } from "@/components/home/UseCasesShowcase";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">

        {/* FinalHero debajo */}
        <div className="relative z-0">
          <FinalHero />
        </div>

        {/* UseCasesShowcase con el arco perfecto superpuesto */}
        <div className="-mt-64 z-50">
          <UseCasesShowcase />
        </div>

        {/* Resto de secciones */}
        <div className="w-full flex justify-center pb-16 relative z-[999999]">
          <BentoGrid />
        </div>

        <HowWeWork />
        <AnimatedGallerySection />
        <ServicesSection />
        <WhyUsSection />
        <WhySubscribeBento />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;