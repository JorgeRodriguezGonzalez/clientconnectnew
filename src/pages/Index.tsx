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
import BoxCards from "@/components/home/BoxCards";
import { FounderSection } from "@/components/home/FounderSection";

// IMPORTACIÓN DE LOS NUEVOS COMPONENTES
import OurStepsVersion2 from "@/components/home/OurStepsVersion2";
import OurSteps from "@/components/home/OurSteps";
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
          <FounderSection />
        </div>
        <CloudHero />
        <BoxCards />
        <div className="w-full flex justify-center pb-16 relative z-[999999]">
          <BentoGrid />
        </div>
        <Services />
        
        
        <OurStepsVersion2 />
        <ComparisonSection />
        <Pricing />

        <TestimonialsSection />
        <CTASection />

      </main>

      <Footer />
    </div>
  );
};

export default Index;