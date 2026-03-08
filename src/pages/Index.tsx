import { BentoGrid } from "@/components/home/BentoGrid";
import { AnimatedGallerySection } from "@/components/animated-gallery-section";

import { HowWeWork } from "@/components/home/HowWeWork";
import { WhySubscribeBento } from "@/components/home/WhySubscribeBento";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { UseCasesShowcase } from "@/components/home/UseCasesShowcase";
import ComparisonSection from "@/components/home/ComparisonSection";
import Pricing from "@/components/home/Pricing";
import BoxCards from "@/components/home/BoxCards";
import FounderSection from "@/components/home/FounderSection";
import OurSteps from "@/components/home/OurSteps";
import ScrollableWorkflow from "@/components/home/ScrollableWorkflow";
import { BlueprintVisualization } from "@/components/home/BlueprintVisualization";
import { InteractiveCardStack } from "@/components/home/InteractiveCardStack";
import CloudHero from "@/components/home/section-layers";
import Services from "@/components/home/Services";
import { SuperHero } from "@/components/home/SuperHero";
import { FloatingBanner } from "@/components/home/floatingbanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
        <Services />
        <ZoomParallax />
        <InteractivePath />

        <WhatWeDoSection2 />

        <ComparisonSection />
        <TestimonialsSection />
        <FAQSection />

        <CaseStudiesSection />

        <CTASection />
        <FloatingBanner />
        <Footer />

      </main>
    </div>
  );
};

export default Index;