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
import ComparisonSection from "@/components/home/ComparisonSection";
import Pricing from "@/components/home/Pricing";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { BlueprintVisualization } from "@/components/home/BlueprintVisualization";
import { InteractiveCardStack } from "@/components/home/InteractiveCardStack";

// ← NUEVA IMPORTACIÓN
import CloudHero from "@/components/home/section-layers";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">

        {/* Todo lo que ya tenías arriba */}
        <div className="relative z-0">
          <FinalHero />
        </div>

        <div className="z-999999">
          <UseCasesShowcase />
        </div>

        <div className="w-full flex justify-center pb-16 relative z-[999999]">
          <BentoGrid />
        </div>
        <CloudHero />
        <InteractiveCardStack />
        
        {/* ← NUEVO COMPONENTE */}
        
        <ProductShowcase />
        <HowWeWork />
        <ComparisonSection />
        <Pricing />
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