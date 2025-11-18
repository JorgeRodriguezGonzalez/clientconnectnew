import React from 'react';
import { motion, useInView } from 'framer-motion';

type MarketingCardProps = {
  title?: string;
  description?: string;
};

export const MarketingCard = ({
  title = 'Digital Marketing Excellence',
  description = 'We craft data-driven strategies that amplify your brand presence, engage your target audience, and drive measurable results across all digital channels.'
}: MarketingCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-start justify-center gap-4 w-[685.2px] h-[310px] rounded-[16px] p-8 overflow-hidden shadow-lg bg-white"
      initial={{
        opacity: 0,
        y: 20
      }} 
      animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} 
      transition={{
        duration: 0.5
      }}
    >
      <h2 className="font-semibold text-black text-[32px] leading-[38px] tracking-[-1px] m-0" style={{
        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
        fontStyle: 'normal'
      }}>
        {title}
      </h2>
      <p className="font-normal text-black/60 text-[16px] leading-[24px] tracking-[-0.3px] m-0" style={{
        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
        fontStyle: 'normal'
      }}>
        {description}
      </p>
    </motion.div>
  );
};