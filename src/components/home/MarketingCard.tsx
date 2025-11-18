import React from 'react';
import { motion, useInView } from 'framer-motion';

type MarketingCardProps = {
  title?: string;
  bulletPoints?: string[];
};

export const MarketingCard = ({
  title = 'Digital Marketing Excellence',
  bulletPoints = [
    'Data-driven strategies that amplify your brand presence',
    'Targeted campaigns that engage your ideal audience',
    'Measurable results across all digital channels',
    'Continuous optimization for maximum ROI'
  ]
}: MarketingCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-start justify-center gap-6 w-[685.2px] h-[310px] rounded-[16px] p-8 overflow-hidden shadow-lg bg-white"
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
      <h2 className="font-semibold text-black text-[32px] leading-[38px] tracking-[-1px] m-0 text-left" style={{
        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
        fontStyle: 'normal'
      }}>
        {title}
      </h2>
      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-black/40 mt-1">•</span>
            <p className="font-normal text-black/40 text-[14px] leading-[19.6px] tracking-[-0.4px] m-0" style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontStyle: 'normal'
            }}>
              {point}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};