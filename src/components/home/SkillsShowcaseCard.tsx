import React from 'react';
import { motion, useInView } from 'framer-motion';

type SkillsShowcaseCardProps = {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
};

const skills = [
  { text: 'Website Design', position: { top: '156px', right: '24px' } },
  { text: 'SEO', position: { top: '18px', right: '20px' }, transform: 'translateY(-12px)' },
  { text: 'Google Ads', position: { top: '18px', left: '29px' } },
  { text: 'Social Media Management', position: { top: '45px', right: '56px' } },
  { text: 'CRM', position: { top: '78px', right: '53px' } },
  { text: 'Facebook Ads', position: { bottom: '61px', left: '80px' } },
  { text: 'Videography', position: { bottom: '14px', left: '50px' } },
  { text: 'Photography', position: { bottom: '85px', left: '9px' } }
] as any[];

export const SkillsShowcaseCard = ({
  title = '8 Years of Experience',
  subtitle = 'Bringing seasoned expertise to every project',
  logoSrc = '/images/client-connect-australia-logo.png'
}: SkillsShowcaseCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [hoverCount, setHoverCount] = React.useState(0);
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
      className="relative flex h-[310px] w-[326.6px] max-w-full flex-col items-center gap-1.5 overflow-hidden rounded-2xl border shadow-lg transition-all duration-500"
      style={{
        padding: '16px',
        background: isHovered 
          ? 'linear-gradient(135deg, rgba(103, 188, 183, 0.2) 0%, rgba(222, 131, 99, 0.1) 50%, rgba(255, 255, 255, 0.95) 100%)'
          : '#FFFFFF'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
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

      <div className="relative flex h-[192px] w-[294.6px] items-center justify-center overflow-hidden rounded-[12px]" style={{ backgroundColor: '#FAFAF9' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={logoSrc} 
            alt="Client Connect Australia Logo" 
            className="w-[180px] h-auto object-contain opacity-20"
          />
        </div>
        {skills.map((skill, index) => (
          <motion.div
            key={`${skill.text}-${hoverCount}`}
            className="absolute flex items-center justify-center overflow-hidden rounded-[826px] bg-white px-2.5 py-1.5 shadow-[0_10px_9px_0_rgba(0,0,0,0.12)]"
            style={{
              ...skill.position,
              ...(skill.transform && { transform: skill.transform })
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ scale: 1.1 }}
          >
            <p className="m-0 whitespace-nowrap border-0 p-0 text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-black" style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif'
            }}>
              {skill.text}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="flex w-[294.6px] h-[100px] flex-col items-start justify-start gap-2 overflow-hidden px-4 pb-6 pt-4">
        <h2 className="text-[6px] md:text-[12px] lg:text-[22px] font-bold leading-[1.1] tracking-tight text-gray-900 m-0">
          {title}
        </h2>
        <p className="text-[14px] md:text-[16px] font-medium leading-relaxed tracking-tight text-gray-600 m-0">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};