import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
type Biomarker = string;
type VitalArea = {
  id: string;
  title: string;
  description: string;
  biomarkerCount: number;
  biomarkers: Biomarker[];
  imageUrl: string;
  imagePosition?: 'left' | 'right' | 'center';
};

// Data
const VITAL_AREAS: VitalArea[] = [{
  id: 'heart-health',
  title: 'Heart Health',
  description: 'Assess how well your heart is pumping oxygen and nutrients throughout your body.',
  biomarkerCount: 9,
  biomarkers: ['LDL Cholesterol', 'HDL Cholesterol', 'Non-HDL Cholesterol', 'Apolipoprotein B'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-1--large',
  imagePosition: 'left'
}, {
  id: 'metabolism-health',
  title: 'Metabolism',
  description: 'Make sure every organ is getting the energy supply and cell repair it needs.',
  biomarkerCount: 4,
  biomarkers: ['Hemoglobin A1c', 'Fasting Insulin', 'Uric Acid', 'Glucose'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-1--large',
  imagePosition: 'right'
}, {
  id: 'hormone-health',
  title: 'Hormones',
  description: 'See if your endocrine system is in balance through energy, mood, and sexual health markers.',
  biomarkerCount: 8,
  biomarkers: ['Estradiol', 'Luteinizing Hormone', 'Follicle Stimulating Hormone', 'SHBG'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-2--large',
  imagePosition: 'left'
}, {
  id: 'inflammation-stress',
  title: 'Inflammation & Stress',
  description: 'Check inflammation markers to see if your body is responding well to stress.',
  biomarkerCount: 2,
  biomarkers: ['Cortisol', 'DHEA-Sulfate'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-2--large',
  imagePosition: 'center'
}, {
  id: 'thyroid',
  title: 'Thyroid',
  description: 'Spot any hormonal imbalances through markers that show an over- or under-active thyroid.',
  biomarkerCount: 5,
  biomarkers: ['Thyroid-Stimulating Hormone', 'Thyroxine (T4)', 'Free Triiodothyronine (T3)'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-2--large',
  imagePosition: 'right'
}, {
  id: 'kidney-health',
  title: 'Kidney',
  description: 'See if your kidneys are filtering waste efficiently with protein byproduct markers.',
  biomarkerCount: 4,
  biomarkers: ['Blood Urea Nitrogen', 'BUN/Creatinine Ratio', 'Creatinine', 'eGFR'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-3--large',
  imagePosition: 'left'
}, {
  id: 'liver-health',
  title: 'Liver',
  description: 'Check liver enzymes to assess how well it’s working for digestion and detoxification.',
  biomarkerCount: 9,
  biomarkers: ['Albumin', 'Alanine Transaminase', 'Alkaline Phosphatase', 'Total Protein'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-3--large',
  imagePosition: 'right'
}, {
  id: 'immune-defense',
  title: 'Immune Defense',
  description: 'Get a read on your body’s readiness to fight infections and recover.',
  biomarkerCount: 12,
  biomarkers: ['White Blood Cell Count', 'Basophils', 'Eosinophils', 'Lymphocytes'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-4--large',
  imagePosition: 'left'
}, {
  id: 'nutrients',
  title: 'Nutrients',
  description: 'See if your nutrient levels are what they should be for your overall health.',
  biomarkerCount: 16,
  biomarkers: ['Vitamin D', 'Homocysteine', 'Iron', 'Magnesium', 'Sodium', 'Potassium'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-4--large',
  imagePosition: 'center'
}, {
  id: 'blood-health',
  title: 'Blood',
  description: 'Assess cellular function by looking at red blood cell and platelet counts.',
  biomarkerCount: 9,
  biomarkers: ['Hematocrit', 'Hemoglobin', 'Platelet Count', 'Red Blood Cell Count'],
  imageUrl: 'https://res.cloudinary.com/forhims/image/upload/q_auto,f_auto,dpr_2/v1761690556/dba/herbarium/cat/hims/hims--vital-areas-item-4--large',
  imagePosition: 'right'
}];

// Helper to determine background position based on index or prop
const getBackgroundPosition = (position: string) => {
  switch (position) {
    case 'left':
      return '0% 50%';
    case 'right':
      return '100% 50%';
    case 'center':
      return '50% 50%';
    default:
      return 'center';
  }
};

export const Services = () => {
  const [activeTab, setActiveTab] = useState(VITAL_AREAS[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(`card-${id}`);
    if (element && scrollContainerRef.current) {
      const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;
      const elementLeft = element.getBoundingClientRect().left;
      const offset = elementLeft - containerLeft + scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
    }
  };

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

      // Find the card closest to the center
      let closestCardId = activeTab;
      let minDistance = Infinity;
      VITAL_AREAS.forEach(area => {
        const card = document.getElementById(`card-${area.id}`);
        if (card) {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          if (distance < minDistance && distance < rect.width) {
            minDistance = distance;
            closestCardId = area.id;
          }
        }
      });
      if (closestCardId !== activeTab) {
        setActiveTab(closestCardId);

        // Also scroll the tab into view
        const tabBtn = document.getElementById(`tab-${closestCardId}`);
        if (tabBtn && tabsContainerRef.current) {
          tabBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, {
        passive: true
      });
      // Initial check
      handleScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeTab]);

  return (
    <div className="w-full bg-[#FCF9F4] min-h-screen py-20 px-4 md:px-8 font-sans text-neutral-900 selection:bg-neutral-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section - Matched to Bento Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16 pb-6 border-b border-neutral-900/10">
          <div className="lg:w-1/2 flex flex-col gap-2">
             <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">
               Vital Analysis
            </span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 md:text-5xl">
              Insights into <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9E4952] via-[#B76D57] to-[#DC926E] pb-2">
                10 vital areas
              </span>{" "}
            </h2>
          </div>
          <div className="lg:w-[427px] lg:ml-auto lg:pb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-900 mb-2">
              Measure what matters.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
              Gain a holistic, in-depth view of how your heart, metabolism, and vital systems work together.
            </p>
          </div>
        </div>

        {/* Tabs Navigation - Matched to Bento Meta/Tags */}
        <div className="relative mb-12">
          <div ref={tabsContainerRef} className="flex overflow-x-auto scrollbar-hide gap-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0 mask-gradient-right" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
            {VITAL_AREAS.map(area => (
              <button key={area.id} id={`tab-${area.id}`} onClick={() => scrollToCard(area.id)} className={cn("relative px-4 py-3 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-colors duration-200 flex-shrink-0 z-10", activeTab === area.id ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900")}>
                {activeTab === area.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.08)] -z-10" transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6
            }} />}
                {area.title}
              </button>
            ))}
            {/* Background track for tabs */}
            <div className="absolute inset-0 bg-[#F5F0E8] rounded-full -z-20 h-full w-[970px] max-w-full pointer-events-none" />
          </div>
        </div>

        {/* Carousel Section */}
        <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-12 pt-4 -mx-4 px-4 md:-mx-8 md:px-8 snap-x snap-mandatory scrollbar-hide" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
          {VITAL_AREAS.map(area => (
            <div key={area.id} id={`card-${area.id}`} className="flex-shrink-0 snap-start w-[345px] sm:w-[380px] md:w-[440px]">
              <div className="group relative h-[520px] w-full overflow-hidden rounded-2xl bg-neutral-900 text-white transition-transform duration-500">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105" style={{
              backgroundImage: `url('${area.imageUrl}')`,
              backgroundSize: 'auto 100%',
              backgroundPosition: getBackgroundPosition(area.imagePosition || 'center'),
              backgroundRepeat: 'no-repeat'
            }} />
                
                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-between p-6 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  {/* Card Header */}
                  <div className="space-y-3 pt-2">
                    {/* Matched to Bento Main Title Style but for cards */}
                    <h3 className="text-3xl font-black tracking-tight leading-none text-white">
                      {area.title === "Inflammation & Stress" ? <>Inflammation<br />& Stress</> : area.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/80 max-w-[90%]">
                      {area.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="space-y-4 pb-2">
                    {/* Matched to Bento Small Tags */}
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 px-1">
                      Includes {area.biomarkerCount} biomarkers
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {/* Check Icon Circle */}
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mr-1 border border-white/10">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                      </div>
                      
                      {area.biomarkers.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/10 text-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer to allow last card to be centered/visible properly if needed */}
          <div className="flex-shrink-0 w-4 md:w-8" /> 
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-8 md:mt-16 border-t border-neutral-900/10 pt-8">
          <a href="#" className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200" onClick={e => e.preventDefault()}>
            <span className="text-xs font-semibold uppercase tracking-wide">Meet the biomarkers</span>
            <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
          </a>
        </div>

      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .mask-gradient-right {
          mask-image: linear-gradient(to right, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
        }
      `}</style>
    </div>
  );
};