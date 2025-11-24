import React from 'react';
import { motion, useInView } from 'framer-motion';
import { BrandsShowcaseCard } from './BrandsShowcaseCard';
import { SkillsShowcaseCard } from './SkillsShowcaseCard';

type UpperBentoProps = Record<string, never>;

// Componente FadeInText con glass blur
const FadeInText = ({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const directionOffset = {
    up: { y: 10, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        filter: "blur(10px)",
        ...directionOffset[direction]
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        filter: isInView ? "blur(0px)" : "blur(10px)",
        y: isInView ? 0 : directionOffset[direction].y,
        x: isInView ? 0 : directionOffset[direction].x
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut", 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const UpperBento = (_props: UpperBentoProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-[100px] px-10 py-0">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[800px] text-center px-8">
        <FadeInText delay={0.4}>
          <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900">
            Our systematic approach to marketing ensures your success from day one. We deliver measurable results through proven strategies.
          </h2>
        </FadeInText>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap items-start justify-center gap-4 w-full max-w-[1200px]">
        <BrandsShowcaseCard />
        <SkillsShowcaseCard />
      </div>
    </div>
  );
};

export default UpperBento;