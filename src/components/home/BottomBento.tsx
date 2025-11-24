import React from 'react';
import { SavingsCard } from './SavingsCard';
import { MarketingCard } from './MarketingCard';

type BottomBentoProps = Record<string, never>;

export const BottomBento = (_props: BottomBentoProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-16 px-10 py-0">
      {/* Cards Grid */}
      <div className="flex flex-wrap items-start justify-center gap-4 w-full max-w-[1200px]">
        <SavingsCard />
        <MarketingCard />
      </div>
    </div>
  );
};

export default BottomBento;