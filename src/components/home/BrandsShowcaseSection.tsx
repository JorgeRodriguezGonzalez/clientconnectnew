import React from 'react';
import { SavingsCard } from './SavingsCard';
import { BrandsShowcaseCard } from './BrandsShowcaseCard';
import { SkillsShowcaseCard } from './SkillsShowcaseCard';

type BrandsShowcaseSectionProps = Record<string, never>;

export const BrandsShowcaseSection = (_props: BrandsShowcaseSectionProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-16 px-10 py-0">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[800px] text-center">
        <p 
          className="text-base md:text-[18px] font-normal leading-relaxed md:leading-[20px] text-gray-600"
          style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '0.2px' }}
        >
          Our systematic approach to marketing ensures your success from day one.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap items-start justify-center gap-8 w-full max-w-[1200px]">
        <SavingsCard />
        <BrandsShowcaseCard />
        <SkillsShowcaseCard />
      </div>
    </div>
  );
};

export default BrandsShowcaseSection;