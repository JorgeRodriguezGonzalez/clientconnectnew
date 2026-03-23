import { lazy, Suspense, useRef, useState, useEffect, ComponentType } from "react";
import { SuperHero } from "@/components/home/SuperHero";
import { FloatingBanner } from "@/components/home/floatingbanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import SEOHead from "@/components/seo/SEOHead";

// --- Lazy imports: these chunks (and their videos) only load when needed ---
const FounderSection = lazy(() => import("@/components/home/FounderSection"));
const Services = lazy(() => import("@/components/home/Services"));
const ZoomParallax = lazy(() => import("@/components/home/ZoomParallax"));
const InteractivePath = lazy(() => import("@/components/home/InteractivePath"));
const WhatWeDoSection2 = lazy(() => import("@/components/home/WhatWeDoSection2").then(m => ({ default: m.WhatWeDoSection2 })));
const ComparisonSection = lazy(() => import("@/components/home/ComparisonSection"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/home/faqs"));

// --- LazySection: only mounts the component when near the viewport ---
function LazySection({ 
  children, 
  rootMargin = "600px",
  minHeight = "200px" 
}: { 
  children: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible && (
        <Suspense fallback={null}>
          {children}
        </Suspense>
      )}
    </div>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Client Connect Australia | Sydney Digital Marketing Agency"
        description="Sydney digital marketing agency helping local businesses grow with SEO, Google Ads, web design & social media. Results-driven strategies for tradies & service businesses."
        path="/"
      />
      <main className="flex-1">
        <Header />
        <SuperHero />

        {/* Sections load progressively as user scrolls */}
        <LazySection rootMargin="400px" minHeight="600px">
          <FounderSection />
        </LazySection>

        <LazySection rootMargin="400px" minHeight="500px">
          <Services />
        </LazySection>

        <LazySection rootMargin="400px" minHeight="500px">
          <ZoomParallax />
        </LazySection>

        <LazySection rootMargin="400px" minHeight="400px">
          <InteractivePath />
        </LazySection>

        <LazySection rootMargin="400px" minHeight="400px">
          <WhatWeDoSection2 />
        </LazySection>

        <LazySection rootMargin="400px" minHeight="400px">
          <ComparisonSection />
        </LazySection>

        <LazySection rootMargin="300px" minHeight="400px">
          <TestimonialsSection />
        </LazySection>

        <LazySection rootMargin="300px" minHeight="300px">
          <FAQSection />
        </LazySection>

        <CTASection />

        <FloatingBanner />
        <Footer />
      </main>
    </div>
  );
};

export default Index;