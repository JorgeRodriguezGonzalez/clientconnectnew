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
  const [hoverCount, setHoverCount] = React.useState(0);

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-center gap-1.5 w-[326.6px] h-[280px] bg-white rounded-[28px] p-1.5 overflow-hidden border-[1.77px] border-[#4b5563]" 
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
      onHoverStart={() => setHoverCount(prev => prev + 1)}
    >
      <div className="relative flex flex-col items-center justify-center w-[314.6px] h-[192px] bg-[#F5F5F5] rounded-[22px] overflow-hidden">
        <div className="relative w-full h-full">
          <motion.div 
            key={`left-${hoverCount}`}
            className="absolute w-[120px] h-[205px] overflow-visible" 
            style={{
              top: '50px',
              left: '5.6px',
              transformOrigin: '60px 102.5px'
            }} 
            initial={{
              x: -20,
              opacity: 0.8
            }} 
            animate={{
              x: 0,
              opacity: 1
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
            key={`right-${hoverCount}`}
            className="absolute w-[120px] h-[204px] overflow-visible" 
            style={{
              top: '51px',
              left: '191px',
              transformOrigin: '60px 102px'
            }} 
            initial={{
              x: 20,
              opacity: 0.8
            }} 
            animate={{
              x: 0,
              opacity: 1
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
            key={`center-${hoverCount}`}
            className="absolute w-[136px] h-[250px] overflow-visible rounded-[9px]" 
            style={{
              top: '8px',
              left: '89.4px',
              transformOrigin: '68px 125px',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 56px 47px 0px'
            }} 
            initial={{
              y: -10,
              opacity: 0
            }} 
            animate={{
              y: 0,
              opacity: 1
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
      
      <div className="flex flex-col items-start justify-center gap-2 w-[314.6px] h-[70px] px-4 pt-3 pb-3">
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