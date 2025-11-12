import React from 'react';
import { SavingsCard } from './SavingsCard';
import { BrandsShowcaseCard } from './BrandsShowcaseCard';
import { SkillsShowcaseCard } from './SkillsShowcaseCard';

type BrandsShowcaseSectionProps = Record<string, never>;

export const BrandsShowcaseSection = (_props: BrandsShowcaseSectionProps) => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center gap-16 px-10 py-32">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[800px] text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          This is How We Do It
        </h2>
        <p className="text-lg md:text-xl text-gray-600">
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