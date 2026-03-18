import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import ComparisonSection from "@/components/home/ComparisonSection";
import FounderSection from "@/components/home/FounderSection";
import Services from "@/components/home/Services";
import { SuperHero } from "@/components/home/SuperHero";
import { FloatingBanner } from "@/components/home/floatingbanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/home/faqs";
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

        <CTASection />
        <FloatingBanner />
        <Footer />

      </main>
    </div>
  );
};

export default Index;