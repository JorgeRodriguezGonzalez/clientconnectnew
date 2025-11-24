import React from 'react';
import { motion, useInView } from 'framer-motion';

type SavingsCardProps = {
  title?: string;
  amount?: string;
  description?: string;
};

export const SavingsCard = ({
  title = 'Growth',
  amount = '$1,000,000+ Profit',
  description = 'So they can reinvest where it matters the most'
}: SavingsCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoverCount, setHoverCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-center gap-1.5 w-[450px] h-[400px] rounded-2xl overflow-hidden border shadow-lg transition-all duration-500"
      style={{
        padding: '16px',
        background: isHovered 
          ? '#000000'
          : 'linear-gradient(135deg, rgba(103, 188, 183, 0.2) 0%, rgba(222, 131, 99, 0.1) 50%, rgba(255, 255, 255, 0.95) 100%)'
      }}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHoverCount(prev => prev + 1)}
    >
      {/* Spotlight Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.8), transparent 80%)`
          }}
        />
      )}

      <div className="relative flex flex-col items-center justify-center w-[418px] h-[260px] rounded-[12px] overflow-hidden" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{
          maskImage: 'linear-gradient(rgb(0, 0, 0) 68.3541%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(rgb(0, 0, 0) 68.3541%, rgba(0, 0, 0, 0) 100%)'
        }}>
          <div className="absolute top-[21px] left-[22px]">
            <p className={`text-[20px] font-semibold leading-[28px] tracking-[0.5px] whitespace-nowrap transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-black/80'
            }`} style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontStyle: 'normal'
            }}>
              {title}
            </p>
          </div>

          <svg className="absolute bottom-[-100px] left-[-167.4px] w-[494px] h-[286px]" viewBox="0 0 494 286" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
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
                delay: 0
              }} 
            />

            <motion.path 
              key={`line-${hoverCount}`}
              d="M 20.839 174.892 C 27.801 174.942 29.189 152.204 53.822 170.122 C 78.454 188.04 86.727 168.036 92.857 156.811 C 97.916 147.548 109.017 131.175 128.933 138.472 C 145.501 144.542 160.817 145.673 181.936 126.692 C 204.045 106.821 211.601 139.05 239.781 135.692 C 256.769 133.668 270.376 78.489 306.334 78.489 C 333.834 78.489 343.334 97.664 374.382 97.664 C 400.334 97.664 450.411 67.986 489.248 5.489" 
              fill="transparent" 
              stroke="rgba(103, 232, 249, 0.5)" 
              strokeWidth="2" 
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
                delay: 0.1
              }} 
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start gap-2 w-[418px] h-[120px] px-4 pt-4 pb-6">
        <h2 className={`text-[6px] md:text-[12px] lg:text-[22px] font-bold leading-[1.1] tracking-tight m-0 transition-colors duration-500 ${
          isHovered ? 'text-white' : 'text-gray-900'
        }`}>
          {amount}
        </h2>
        <p className={`text-[14px] md:text-[16px] font-medium leading-relaxed tracking-tight m-0 transition-colors duration-500 ${
          isHovered ? 'text-white' : 'text-gray-600'
        }`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};