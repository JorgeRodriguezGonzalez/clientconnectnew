import React from 'react';
import { motion, useInView } from 'framer-motion';

type SkillsShowcaseCardProps = {
  title?: string;
  subtitle?: string;
  yearNumber?: string;
};

const skills = [
  { text: 'Mobile App Design', position: { top: '156px', right: '-14px' } },
  { text: 'Webflow Development', position: { top: '88px', right: '-2px' }, transform: 'translateY(-12px)' },
  { text: 'Framer Development', position: { top: '58px', left: '29px' } },
  { text: 'Social Media Posts', position: { top: '45px', right: '56px' } },
  { text: 'Web Designs', position: { top: '8px', right: '53px' } },
  { text: 'Pitch Decks', position: { bottom: '31px', left: '11px' } },
  { text: 'Email Designs', position: { bottom: '14px', left: '50px' } },
  { text: 'Branding', position: { bottom: '55px', left: '9px' } },
  { text: 'Copywriting', position: { top: '103px', left: '49px' } },
  { text: 'Logos', position: { top: '47px', left: '18px' } },
  { text: 'Landing pages', position: { top: '18px', left: '46px' } },
  { text: 'Creative Strategy', position: { bottom: '45px', right: '29px' } }
] as any[];

export const SkillsShowcaseCard = ({
  title = '8 Years of Experience',
  subtitle = 'Bringing seasoned expertise to every project',
  yearNumber = '8'
}: SkillsShowcaseCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [hoverCount, setHoverCount] = React.useState(0);

  return (
    <motion.div 
      ref={ref}
      className="relative flex h-[280px] w-[326.6px] max-w-full flex-col items-center gap-1.5 overflow-hidden rounded-[28px] bg-white p-1.5 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => {
        setIsHovered(true);
        setHoverCount(prev => prev + 1);
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative flex h-[192px] w-[314.6px] items-center justify-center overflow-hidden rounded-[22px] bg-[#f5f5f5]">
        <div className="absolute bottom-[-93px] left-[41.8px] h-[280px] w-[175px] overflow-hidden" style={{ transform: 'scale(0.9)' }}>
          <div className="absolute bottom-[-24px] left-[87.5px] top-[-68px] h-[372px] w-[174.5px]" style={{ transform: 'translateX(-87.25px)' }}>
            <p className="m-0 whitespace-nowrap border-0 p-0 text-[310px] font-normal leading-[372px] tracking-[-9.3px] text-black/20" style={{
              fontFamily: '"Euclid Circular B Bold", "Euclid Circular B Bold Placeholder", sans-serif',
              WebkitTextStroke: '0px rgba(0, 0, 0, 0.2)'
            }}>
              {yearNumber}
            </p>
          </div>
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
      
      <div className="flex w-[314.6px] flex-col items-start justify-center gap-2 overflow-hidden px-4 pb-3 pt-3">
        <p className="m-0 w-[282.6px] break-words border-0 p-0 text-[18px] font-medium leading-[17px] tracking-[-0.6px] text-black" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
        }}>
          {title}
        </p>
        <p className="m-0 w-[282.6px] break-words border-0 p-0 text-[14px] font-normal leading-[19.6px] tracking-[-0.4px] text-black/40" style={{
          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
        }}>
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};