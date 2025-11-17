import React from 'react';
import { motion, useInView } from 'framer-motion';

type SavingsCardProps = {
  title?: string;
  badge?: string;
  amount?: string;
  description?: string;
};

export const SavingsCard = ({
  title = 'Growth',
  badge = 'Highest (This month)',
  amount = '$100,000+ Saved for Brands',
  description = 'so they can reinvest where it matters the most'
}: SavingsCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoverCount, setHoverCount] = React.useState(0);

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-center gap-1.5 w-[326.6px] h-[380px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[28px] p-1.5 overflow-hidden" 
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
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
        transition: {
          duration: 0.3
        }
      }}
      onHoverStart={() => setHoverCount(prev => prev + 1)}
    >
      <div className="relative flex flex-col items-center justify-center w-[314.6px] h-[262px] bg-white/5 backdrop-blur-sm rounded-[22px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 68.3541%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(rgb(0, 0, 0) 68.3541%, rgba(0, 0, 0, 0) 100%)'
        }}>
          <div className="absolute top-[21px] left-[22px]">
            <p className="text-[28px] font-light text-black leading-[33.6px] whitespace-nowrap" style={{
              fontFamily: '"Inter Display", sans-serif',
              letterSpacing: '-0.8px',
              fontWeight: 300
            }}>
              {title}
            </p>
          </div>

          <div className="absolute top-[32px] right-[22px]">
            <p className="text-[12.6px] font-normal text-cyan-300 leading-[15.2px] whitespace-nowrap" style={{
              fontFamily: '"Inter Display", sans-serif',
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
                <stop offset="0" stopColor="rgba(6, 182, 212, 0.6)" stopOpacity="0.6" />
                <stop offset="1" stopColor="rgba(6, 182, 212, 0)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path 
              key={`chart-${hoverCount}`}
              d="M 489.248 5.489 L 489.248 283.23 L 4.869 279.745 L 3.089 174.764 L 20.839 174.892 C 27.801 174.942 29.189 152.204 53.822 170.122 C 78.454 188.04 86.727 168.036 92.857 156.811 C 97.916 147.548 109.017 131.175 128.933 138.472 C 145.501 144.542 160.817 145.673 181.936 126.692 C 204.045 106.821 211.601 139.05 239.781 135.692 C 256.769 133.668 270.376 78.489 306.334 78.489 C 333.834 78.489 343.334 97.664 374.382 97.664 C 400.334 97.664 450.411 67.986 489.248 5.489 Z" 
              fill="url(#chartGradient)" 
              stroke="rgb(103, 232, 249)" 
              strokeWidth="1.77" 
              strokeMiterlimit="10" 
              initial={{
                pathLength: 0,
                opacity: 0
              }} 
              animate={{
                pathLength: 1,
                opacity: 1
              }} 
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                delay: 0.2
              }} 
            />

            {/* Línea curva animada (azul eléctrico) - solo la curva superior */}
            <motion.path 
              key={`line-${hoverCount}`}
              d="M 53.822 170.122 C 78.454 188.04 86.727 168.036 92.857 156.811 C 97.916 147.548 109.017 131.175 128.933 138.472 C 145.501 144.542 160.817 145.673 181.936 126.692 C 204.045 106.821 211.601 139.05 239.781 135.692 C 256.769 133.668 270.376 78.489 306.334 78.489 C 333.834 78.489 343.334 97.664 374.382 97.664 C 400.334 97.664 450.411 67.986 489.248 5.489" 
              fill="transparent" 
              stroke="rgba(103, 232, 249, 0.5)" 
              strokeWidth="3" 
              strokeMiterlimit="10" 
              strokeDasharray="9.07,9.07" 
              initial={{
                pathLength: 0
              }} 
              animate={{
                pathLength: 1
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
            fontFamily: '"Inter Display", sans-serif',
            letterSpacing: '-0.6px'
          }}>
            {amount}
          </p>
        </div>
        <div className="w-[282.6px]">
          <p className="text-[14px] font-normal text-black/40 leading-[19.6px]" style={{
            fontFamily: '"Inter Display", sans-serif',
            letterSpacing: '-0.4px'
          }}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};