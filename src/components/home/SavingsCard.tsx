import React from 'react';
import { motion, useInView } from 'framer-motion';

type SavingsCardProps = {
  title?: string;
  badge?: string;
  amount?: string;
  description?: string;
};

export const SavingsCard = ({
  title = 'Savings',
  badge = 'Highest (This month)',
  amount = '$100,000+ Saved for Brands',
  description = 'so they can reinvest where it matters the most'
}: SavingsCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-center gap-1.5 w-[326.6px] h-[380px] bg-white rounded-[28px] p-1.5 overflow-hidden" 
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.03) 0px 24px 32px 0px'
      }} 
      initial={{
        opacity: 0,
        y: 20
      }} 
      animate={hasAnimated ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} 
      transition={{
        duration: 0.5
      }} 
      whileHover={{
        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 28px 40px 0px',
        transition: {
          duration: 0.2
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-center justify-center w-[314.6px] h-[262px] bg-[#F5F5F5] rounded-[22px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 68.3541%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(rgb(0, 0, 0) 68.3541%, rgba(0, 0, 0, 0) 100%)'
        }}>
          <div className="absolute top-[21px] left-[22px]">
            <p className="text-[28px] font-semibold text-black leading-[33.6px] whitespace-nowrap" style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.8px'
            }}>
              {title}
            </p>
          </div>

          <div className="absolute top-[32px] right-[22px]">
            <p className="text-[12.6px] font-normal text-[#348425] leading-[15.2px] whitespace-nowrap" style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.4px'
            }}>
              {badge}
            </p>
          </div>

          <svg className="absolute bottom-[-77px] left-[-167.4px] w-[494px] h-[286px]" viewBox="0 0 494 286" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            imageRendering: 'auto'
          }}>
            <defs>
              <linearGradient id="chartGradient" x1="0.4994780349390567" x2="0.5005219650609433" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(40, 176, 19, 0.68)" stopOpacity="0.68" />
                <stop offset="1" stopColor="rgba(42,176,20,0)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M 53.822 170.122 C 29.189 152.204 27.801 174.942 20.839 174.892 L 3.089 174.764 L 4.869 279.745 L 489.248 283.23 L 489.248 5.489 C 450.411 67.986 400.334 97.664 374.382 97.664 C 343.334 97.664 333.834 78.489 306.334 78.489 C 270.376 78.489 256.769 133.668 239.781 135.692 C 211.601 139.05 204.045 106.821 181.936 126.692 C 160.817 145.673 145.501 144.542 128.933 138.472 C 109.017 131.175 97.916 147.548 92.857 156.811 C 86.727 168.036 78.454 188.04 53.822 170.122 Z" 
              fill="url(#chartGradient)" 
              stroke="rgb(123,188,112)" 
              strokeWidth="2.77" 
              strokeMiterlimit="10" 
              initial={{
                pathLength: 0,
                opacity: 0
              }} 
              animate={{
                pathLength: (hasAnimated || isHovered) ? 1 : 0,
                opacity: (hasAnimated || isHovered) ? 1 : 0
              }} 
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                delay: 0.2
              }} 
            />
          </svg>

          <svg className="absolute top-[49px] left-[-15px] w-[343px] h-[7px]" viewBox="0 0 343 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M 2.33 3.5 L 367.931 3.5" 
              fill="transparent" 
              stroke="rgb(138,196,128)" 
              strokeWidth="3" 
              strokeMiterlimit="10" 
              strokeDasharray="9.07,9.07" 
              initial={{
                pathLength: 0
              }} 
              animate={{
                pathLength: (hasAnimated || isHovered) ? 1 : 0
              }} 
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delay: 0.5
              }} 
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-2 w-[314.6px] h-[100.2px] px-4 pt-5 pb-4">
        <div className="w-[282.6px]">
          <p className="text-[18px] font-medium text-black leading-[17px]" style={{
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.6px'
          }}>
            {amount}
          </p>
        </div>
        <div className="w-[282.6px]">
          <p className="text-[14px] font-normal text-black/40 leading-[19.6px]" style={{
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.4px'
          }}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};