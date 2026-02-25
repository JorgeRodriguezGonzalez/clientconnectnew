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
import FounderSection from "@/components/home/FounderSection";
import OurStepsVersion2 from "@/components/home/OurStepsVersion2";
import OurSteps from "@/components/home/OurSteps";
import ScrollableWorkflow from "@/components/home/ScrollableWorkflow";
import { BlueprintVisualization } from "@/components/home/BlueprintVisualization";
import { InteractiveCardStack } from "@/components/home/InteractiveCardStack";
import CloudHero from "@/components/home/section-layers";
import { Services } from "@/components/home/Services";
import { SuperHero } from "@/components/home/SuperHero";
import { FloatingBanner } from "@/components/home/floatingbanner";
import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import FAQSection from "@/components/home/faqs";
import CaseStudiesSection from "@/components/home/case-studies";
import HowWeDoIt from "@/components/home/HowWeDoIt";
import InteractivePath from "@/components/home/InteractivePath";
import { WhatWeDoSection2 } from "@/components/home/WhatWeDoSection2";
import ZoomParallax from "@/components/home/ZoomParallax";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Header />
        <SuperHero />

        <FounderSection />

        <InteractivePath />

        <ServicesSection />
        <ZoomParallax />
        <Services />

        <WhatWeDoSection2 />

        <CaseStudiesSection />

        <HowWeDoIt />
        <CloudHero />
        <BoxCards />

        <OurStepsVersion2 />

        <ComparisonSection />
        <Pricing />
        <FAQSection />
        <div className="w-full flex justify-center pb-16 relative z-[999999]">
          <BentoGrid />
        </div>

        <TestimonialsSection />
        <CTASection />
        <FloatingBanner />
        <Footer />

      </main>
    </div>
  );
};

export default Index;