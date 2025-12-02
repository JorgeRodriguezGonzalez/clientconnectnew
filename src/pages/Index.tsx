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

// IMPORTACIÓN DEL NUEVO COMPONENTE
// (Ajusta la ruta si no lo guardaste en components/home/ScrollableWorkflow)
import ScrollableWorkflow from "@/components/home/ScrollableWorkflow"; 

import { BlueprintVisualization } from "@/components/home/BlueprintVisualization";
import { InteractiveCardStack } from "@/components/home/InteractiveCardStack";
import CloudHero from "@/components/home/section-layers";
import { Services } from "@/components/home/Services";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">

        <div className="relative z-0">
          <FinalHero />
        </div>

        <div className="z-999999">
          <UseCasesShowcase />
        </div>

        <Services />

        <div className="w-full flex justify-center pb-16 relative z-[999999]">
          <BentoGrid />
        </div>
        
        <CloudHero />
        <InteractiveCardStack />

        {/* AQUÍ ESTÁ EL COMPONENTE ACTUALIZADO CON SCROLL AUTOMÁTICO */}
        <ScrollableWorkflow />

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