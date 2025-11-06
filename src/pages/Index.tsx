import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HeroNew } from "@/components/home/HeroNew";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import HowWeWork from "@/components/home/HowWeWork";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroNew />
        <ServicesSection />
        <WhyUsSection />
        <HowWeWork />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;