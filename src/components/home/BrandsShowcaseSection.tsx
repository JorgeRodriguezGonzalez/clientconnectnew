import React from 'react';
import { SavingsCard } from './SavingsCard';
import { BrandsShowcaseCard } from './BrandsShowcaseCard';
import { SkillsShowcaseCard } from './SkillsShowcaseCard';

type BrandsShowcaseSectionProps = Record<string, never>;

export const BrandsShowcaseSection = (_props: BrandsShowcaseSectionProps) => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center gap-16 px-10 py-32">
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