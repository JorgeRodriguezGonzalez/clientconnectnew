import Footer from "@/components/layout/Footer";
import { NewHero } from "@/components/home/NewHero";
import { TextAndImage } from "@/components/home/TextAndImage";
import { AnimatedGallerySection } from "@/components/animated-gallery-section";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import { HowWeWork } from "@/components/home/HowWeWork";
import { WhySubscribeBento } from "@/components/home/WhySubscribeBento";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 -mt-4">
        <NewHero />
        <div className="w-full flex justify-center px-10 -mt-[250px] pb-16 relative z-[999999]">
          <TextAndImage />
        </div>
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