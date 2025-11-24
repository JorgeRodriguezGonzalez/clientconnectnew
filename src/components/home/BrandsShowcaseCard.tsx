import React from 'react';
import { motion, useInView } from 'framer-motion';

type BrandsShowcaseCardProps = {
  title?: string;
  description?: string;
};

export const BrandsShowcaseCard = ({
  title = '+95 Local Brands Served',
  description = 'Helping businesses across various industries achieve their goals'
}: BrandsShowcaseCardProps) => {
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
      className="relative flex flex-col items-center gap-1.5 w-[700px] h-[400px] rounded-2xl overflow-hidden border shadow-lg transition-all duration-500"
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

      <div className="relative flex flex-col items-center justify-center w-[668px] h-[260px] rounded-[12px] overflow-hidden" style={{ backgroundColor: '#FAFAF9' }}>
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
              left: '266px',
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
              left: '408px',
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
              left: '542px',
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
      
      <div className="flex flex-col items-start justify-start gap-2 w-[668px] h-[120px] px-4 pt-4 pb-6">
        <h2 className={`text-[6px] md:text-[12px] lg:text-[22px] font-bold leading-[1.1] tracking-tight m-0 transition-colors duration-500 ${
          isHovered ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
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