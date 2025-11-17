import React from 'react';
import { motion, useInView } from 'framer-motion';

type BentoGridProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

const BrandsShowcaseSection = () => {
  const brands = [
    { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' },
    { name: 'Microsoft', logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  ];

  return (
    <div className="w-full max-w-[1040px] mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Trusted by Leading Brands
        </h3>
      </motion.div>
      
      <div className="flex items-center justify-center gap-12 flex-wrap">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const BentoGrid = ({
  title = 'Strategic Digital Marketing',
  description = 'We combine data-driven insights with creative excellence to deliver marketing campaigns that drive real results. Our approach focuses on understanding your audience and crafting messages that resonate.',
  imageUrl = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
}: BentoGridProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="flex flex-col items-center w-full">
      <BrandsShowcaseSection />
      
      <motion.div 
        ref={ref}
        className="relative flex items-center gap-8 w-full max-w-[1040px] min-h-[280px] bg-white rounded-[28px] p-8 z-[999999]"
        style={{
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1), 0 -10px 15px -3px rgb(0 0 0 / 0.1)'
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
      >
        {/* Left side - Text content */}
        <div className="flex flex-col justify-center gap-4 flex-1">
          <h2 
            className="text-[32px] font-semibold text-black leading-[38px] tracking-[-1px] m-0"
            style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif'
            }}
          >
            {title}
          </h2>
          <p 
            className="text-[16px] font-normal text-black/60 leading-[24px] tracking-[-0.2px] m-0"
            style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif'
            }}
          >
            {description}
          </p>
        </div>

        {/* Right side - Image */}
        <motion.div 
          className="relative w-[400px] h-[216px] rounded-[20px] overflow-hidden bg-[#f5f5f5] flex-shrink-0"
          initial={{
            x: 20,
            opacity: 0
          }}
          animate={isInView ? {
            x: 0,
            opacity: 1
          } : {
            x: 20,
            opacity: 0
          }}
          transition={{
            duration: 0.6,
            delay: 0.2
          }}
        >
          <img 
            src={imageUrl} 
            alt="Digital Marketing" 
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};