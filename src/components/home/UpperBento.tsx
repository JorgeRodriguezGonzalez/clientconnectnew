import React from 'react';
import { BrandsShowcaseCard } from './BrandsShowcaseCard';
import { SkillsShowcaseCard } from './SkillsShowcaseCard';

type UpperBentoProps = Record<string, never>;

export const UpperBento = (_props: UpperBentoProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-16 px-10 py-0">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[600px] text-center px-8">
        <p 
          className="text-[32px] leading-[35.2px] font-medium tracking-[-0.2px] text-gray-700"
          style={{ fontFamily: '"Inter Display", sans-serif' }}
        >
          Our systematic approach to marketing ensures your success from day one. We deliver measurable results through proven strategies.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap items-start justify-center gap-8 w-full max-w-[1200px]">
        <BrandsShowcaseCard />
        <SkillsShowcaseCard />
      </div>
    </div>
  );
};

export default UpperBento;