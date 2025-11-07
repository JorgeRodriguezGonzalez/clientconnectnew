import React from 'react';
import { SavingsCard } from './SavingsCard';
import { BrandsShowcaseCard } from './BrandsShowcaseCard';
import { SkillsShowcaseCard } from './SkillsShowcaseCard';

type BrandsShowcaseSectionProps = Record<string, never>;

// @component: BrandsShowcaseSection
export const BrandsShowcaseSection = (_props: BrandsShowcaseSectionProps) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-16 px-10 py-32">
      {/* Cards Grid */}
      <div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-[1200px]">
        <SavingsCard 
          title="Savings"
          badge="Highest (This month)"
          amount="$100,000+ Saved for Brands"
          description="so they can reinvest where it matters the most"
        />
        
        <BrandsShowcaseCard 
          title="95+ Brands Served"
          description="Helping businesses across various industries achieve their goals"
        />
        
        <SkillsShowcaseCard 
          title="8 Years of Experience"
          subtitle="Bringing seasoned expertise to every project"
          yearNumber="8"
        />
      </div>
    </div>
  );
};

export default BrandsShowcaseSection;