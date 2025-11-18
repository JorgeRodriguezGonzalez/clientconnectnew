import React from 'react';
import { motion, useInView } from 'framer-motion';

type SkillsShowcaseCardProps = {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
};

const skills = [
  { text: 'Website Design', position: { top: '156px', right: '24px' } },
  { text: 'SEO', position: { top: '88px', right: '20px' }, transform: 'translateY(-12px)' },
  { text: 'Google Ads', position: { top: '58px', left: '29px' } },
  { text: 'Social Media Management', position: { top: '45px', right: '56px' } },
  { text: 'CRM', position: { top: '8px', right: '53px' } },
  { text: 'Facebook Ads', position: { bottom: '31px', left: '80px' } },
  { text: 'Videography', position: { bottom: '14px', left: '50px' } },
  { text: 'Photography', position: { bottom: '55px', left: '9px' } }
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

  return (
    <motion.div 
      ref={ref}
      className="relative flex h-[310px] w-[326.6px] max-w-full flex-col items-center gap-1.5 overflow-hidden rounded-[16px] p-1.5 shadow-lg"
      style={{ 
        background: 'linear-gradient(135deg, rgb(50, 90, 160) 0%, rgb(70, 130, 200) 100%)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => {
        setIsHovered(true);
        setHoverCount(prev => prev + 1);
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative flex h-[192px] w-[314.6px] items-center justify-center overflow-hidden rounded-[12px] bg-[#f5f5f5]">
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
      
      <div className="flex w-[314.6px] h-[100px] flex-col items-start justify-start gap-2 overflow-hidden px-4 pb-6 pt-4">
        <p className="m-0 w-[282.6px] break-words border-0 p-0 text-[18px] font-medium leading-[17px] tracking-[-0.6px] text-white" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
        }}>
          {title}
        </p>
        <p className="m-0 w-[282.6px] break-words border-0 p-0 text-[14px] font-normal leading-[19.6px] tracking-[-0.4px] text-white/70" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
        }}>
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};