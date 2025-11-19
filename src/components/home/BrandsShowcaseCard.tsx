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
      className="relative flex flex-col items-center gap-1.5 w-[685.2px] h-[310px] rounded-[16px] overflow-hidden shadow-lg"
      style={{ 
        backgroundColor: '#FAFDFF',
        border: '0.7px solid #DAE6FE',
        padding: '16px'
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
      onHoverStart={() => setHoverCount(prev => prev + 1)}
    >
      <div className="relative flex flex-col items-center justify-center w-[673.2px] h-[192px] bg-[#F5F5F5] rounded-[12px] overflow-hidden">
        <div className="relative w-full h-full">
          {/* Imagen 1 - Izquierda (desde la izquierda) */}
          <motion.div 
            key={`img1-${hoverCount}`}
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
          
          {/* Imagen 2 - Segunda desde izquierda (desde arriba) */}
          <motion.div 
            key={`img2-${hoverCount}`}
            className="absolute w-[120px] h-[204px] overflow-visible" 
            style={{
              top: '51px',
              left: '140px',
              transformOrigin: '60px 102px'
            }} 
            initial={{
              y: -20,
              opacity: 0.8
            }} 
            animate={{
              y: 0,
              opacity: 1
            }} 
            transition={{
              duration: 0.6,
              delay: 0.15
            }}
          >
            <img src="https://framerusercontent.com/images/QhYCPWusAHYNzw5EQ6zVaQ50.png?scale-down-to=512" alt="Website preview" className="w-full h-full object-cover" style={{
              objectPosition: '50% 50%'
            }} />
          </motion.div>
          
          {/* Imagen 3 - Centro (desde abajo) */}
          <motion.div 
            key={`img3-${hoverCount}`}
            className="absolute w-[136px] h-[250px] overflow-visible rounded-[9px]" 
            style={{
              top: '8px',
              left: '268.6px',
              transformOrigin: '68px 125px',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 56px 47px 0px'
            }} 
            initial={{
              y: 20,
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
          
          {/* Imagen 4 - Segunda desde derecha (desde arriba) */}
          <motion.div 
            key={`img4-${hoverCount}`}
            className="absolute w-[120px] h-[204px] overflow-visible" 
            style={{
              top: '51px',
              left: '415px',
              transformOrigin: '60px 102px'
            }} 
            initial={{
              y: -20,
              opacity: 0.8
            }} 
            animate={{
              y: 0,
              opacity: 1
            }} 
            transition={{
              duration: 0.6,
              delay: 0.25
            }}
          >
            <img src="https://framerusercontent.com/images/Cs7myyCzaXS8LyQHqBxdAlCZ8.png?scale-down-to=512" alt="Website preview" className="w-full h-full object-cover" style={{
              objectPosition: '50% 50%'
            }} />
          </motion.div>
          
          {/* Imagen 5 - Derecha (desde la derecha) */}
          <motion.div 
            key={`img5-${hoverCount}`}
            className="absolute w-[120px] h-[204px] overflow-visible" 
            style={{
              top: '51px',
              left: '549.6px',
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
              delay: 0.3
            }}
          >
            <img src="https://framerusercontent.com/images/QhYCPWusAHYNzw5EQ6zVaQ50.png?scale-down-to=512" alt="Website preview" className="w-full h-full object-cover" style={{
              objectPosition: '50% 50%'
            }} />
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col items-start justify-start gap-2 w-[673.2px] h-[100px] px-4 pt-4 pb-6">
        <h2 className="font-semibold text-black/90 text-[22px] leading-[30px] tracking-[0.5px] m-0" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif',
          fontStyle: 'normal'
        }}>
          {title}
        </h2>
        <p className="font-normal text-black/60 text-[16px] leading-[22.4px] tracking-[-0.4px] m-0" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif',
          fontStyle: 'normal'
        }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};