import React from 'react';
import { motion, useInView } from 'framer-motion';

type BrandsShowcaseCardProps = {
  title?: string;
  description?: string;
};

export const BrandsShowcaseCard = ({
  title = '95+ Brands Served',
  description = 'Helping businesses across various industries achieve their goals'
}: BrandsShowcaseCardProps) => {
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
        boxShadow: 'rgba(0, 0, 0, 0) 0px 24px 32px 0px'
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
        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 24px 32px 0px'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-center justify-center w-[314.6px] h-[262px] bg-[#F5F5F5] rounded-[22px] overflow-hidden">
        <div className="relative w-full h-full">
          <motion.div 
            className="absolute w-[146px] h-[249px] overflow-visible" 
            style={{
              top: '90.6px',
              left: '5.6px',
              transformOrigin: '73px 124.6px'
            }} 
            initial={{
              x: -20,
              opacity: 0.8
            }} 
            animate={{
              x: (hasAnimated || isHovered) ? 0 : -20,
              opacity: (hasAnimated || isHovered) ? 1 : 0.8
            }} 
            transition={{
              duration: 0.6,
              delay: 0.1
            }}
          >
            <img src="https://framerusercontent.com/images/Cs7myyCzaXS8LyQHqBxdAlCZ8.png?scale-down-to=512" alt="Website preview" className="w-full h-full object-cover" style={{
              objectPosition: '50% 50%'
            }} />
          </motion.div>
          
          <motion.div 
            className="absolute w-[146px] h-[248px] overflow-visible" 
            style={{
              top: '92px',
              left: '164.8px',
              transformOrigin: '73px 124px'
            }} 
            initial={{
              x: 20,
              opacity: 0.8
            }} 
            animate={{
              x: (hasAnimated || isHovered) ? 0 : 20,
              opacity: (hasAnimated || isHovered) ? 1 : 0.8
            }} 
            transition={{
              duration: 0.6,
              delay: 0.1
            }}
          >
            <img src="https://framerusercontent.com/images/QhYCPWusAHYNzw5EQ6zVaQ50.png?scale-down-to=512" alt="Website preview" className="w-full h-full object-cover" style={{
              objectPosition: '50% 50%'
            }} />
          </motion.div>
          
          <motion.div 
            className="absolute w-[156px] h-[287px] overflow-visible rounded-[9px]" 
            style={{
              top: '48.6px',
              left: '79.4px',
              transformOrigin: '78px 143.6px',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 56px 47px 0px'
            }} 
            initial={{
              y: -10,
              opacity: 0
            }} 
            animate={{
              y: (hasAnimated || isHovered) ? 0 : -10,
              opacity: (hasAnimated || isHovered) ? 1 : 0
            }} 
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
          >
            <img src="https://framerusercontent.com/images/pb1l1eWieWRyif3smeXnmDu1jnY.png?scale-down-to=512" alt="Website preview" className="w-full h-full object-cover rounded-[9px]" style={{
              objectPosition: '50% 0%'
            }} />
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col items-start justify-center gap-2 w-[314.6px] h-[100.2px] px-4 pt-5 pb-4">
        <h2 className="font-medium text-black text-[18px] leading-[17px] tracking-[-0.6px] m-0" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif',
          fontStyle: 'normal'
        }}>
          {title}
        </h2>
        <p className="font-normal text-black/40 text-[14px] leading-[19.6px] tracking-[-0.4px] m-0" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif',
          fontStyle: 'normal'
        }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};