import React from 'react';
import { UpperBento } from './UpperBento';
import { BottomBento } from './BottomBento';

type BentoGridProps = Record<string, never>;

export const BentoGrid = (_props: BentoGridProps) => {
  return (
    <div className="flex flex-col items-center w-full gap-2 mt-16 bg-[#ffffff] pt-[30px] pb-[30px]">
      <UpperBento />
      <BottomBento />
    </div>
  );
};