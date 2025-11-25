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

// ← NUEVA IMPORTACIÓN
import { BlueprintVisualization } from "@/components/home/BlueprintVisualization";

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

        {/* ← NUEVA SECCIÓN: Blueprint 3D con hover */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Arquitectura moderna desde cero
              </h2>
              <p className="text-xl text-muted-foreground">
                Diseñado con las mejores prácticas y tecnologías actuales para un rendimiento imbatible.
              </p>
            </div>

            {/* Aquí va la ilustración interactiva */}
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <BlueprintVisualization />
              </div>
            </div>
          </div>
        </section>

        {/* ← El resto sigue exactamente igual */}
        

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