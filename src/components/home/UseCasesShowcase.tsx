import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';

type UseCaseItem = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

type UseCasesShowcaseProps = {
  subText?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  useCases?: UseCaseItem[];
};

const defaultUseCases: UseCaseItem[] = [/* ... mismo que antes ... */];

export const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const {
    subText = 'our approach',
    heading = 'Marketing strategies that transform your business into',
    highlightText = 'market leaders',
    description = 'We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.',
    useCases = defaultUseCases
  } = props;

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Estado para forzar re-render y re-trigger de animaciones en hover
  const [hoverTrigger, setHoverTrigger] = useState(0);

  const triggerHover = () => setHoverTrigger(prev => prev + 1);

  // Animaciones base (las que ya tenías al entrar en viewport)
  const fadeFromLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const fadeFromRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const fadeFromBottom = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const fadeScale = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 }
  };

  const fadeScaleRotate = {
    initial: { opacity: 0, scale: 0.8, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-28 px-4 w-full bg-white mb-[50px]">
      <div className="max-w-[1225px] mx-auto">
        <div className="flex items-center justify-between gap-20 relative flex-col lg:flex-row">
          {/* Left Part - Images */}
          <div className="relative flex-1 max-w-[495px] z-10 w-full">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c444_kloudera-home-one-cases-image.svg"
                alt="Main showcase"
                className="w-full h-auto object-cover"
                width={495}
                height={660}
              />
            </div>

            {/* Imagen izquierda - fade from left */}
            <motion.div
              key={`left-${hoverTrigger}`}
              onMouseEnter={triggerHover}
              {...fadeFromLeft}
              initial={isInView ? fadeFromLeft.initial : undefined}
              animate={isInView ? fadeFromLeft.animate : undefined}
              transition={isInView ? { delay: 0.6, ...fadeFromLeft.transition } : { delay: 0 }}
              whileHover={{ x: 0, opacity: 1, transition: { delay: 0 } }}
              className="absolute top-[106px] left-5 w-[406px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c445_kloudera-home-one-cases-image.svg"
                alt="Overlay 1"
                className="w-full h-auto object-cover"
                width={398}
                height={160}
              />
            </motion.div>

            {/* Imagen pequeña - fade + scale */}
            <motion.div
              key={`small-${hoverTrigger}`}
              onMouseEnter={triggerHover}
              {...fadeScale}
              initial={isInView ? fadeScale.initial : undefined}
              animate={isInView ? fadeScale.animate : undefined}
              transition={isInView ? { delay: 0.7, ...fadeScale.transition } : { delay: 0 }}
              whileHover={{ scale: 1, opacity: 1, transition: { delay: 0 } }}
              className="absolute top-[106px] right-[-30px] w-[69px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c446_kloudera-home-one-cases-image.svg"
                alt="Overlay 2"
                className="w-full h-auto object-cover"
                width={67}
                height={68}
              />
            </motion.div>

            {/* Imagen derecha - fade from right */}
            <motion.div
              key={`right-${hoverTrigger}`}
              onMouseEnter={triggerHover}
              {...fadeFromRight}
              initial={isInView ? fadeFromRight.initial : undefined}
              animate={isInView ? fadeFromRight.animate : undefined}
              transition={isInView ? { delay: 0.8, ...fadeFromRight.transition } : { delay: 0 }}
              whileHover={{ x: 0, opacity: 1, transition: { delay: 0 } }}
              className="absolute top-[238px] right-[-104px] w-[431px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c447_kloudera-home-one-cases-image.svg"
                alt="Overlay 3"
                className="w-full h-auto object-cover"
                width={435}
                height={301}
              />
            </motion.div>

            {/* Logo con círculo - fade + scale + rotate */}
            <motion.div
              key={`logo-${hoverTrigger}`}
              onMouseEnter={triggerHover}
              {...fadeScaleRotate}
              initial={isInView ? fadeScaleRotate.initial : undefined}
              animate={isInView ? fadeScaleRotate.animate : undefined}
              transition={isInView ? { delay: 0.9, ...fadeScaleRotate.transition } : { delay: 0 }}
              whileHover={{ scale: 1, opacity: 1, rotate: 0, transition: { delay: 0 } }}
              className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center p-5">
                <img src="/images/client-connect-australia-logo.png" alt="Client Connect Australia" className="w-full h-full object-contain" />
              </div>
            </motion.div>

            {/* Imagen inferior - fade from bottom */}
            <motion.div
              key={`bottom-${hoverTrigger}`}
              onMouseEnter={triggerHover}
              {...fadeFromBottom}
              initial={isInView ? fadeFromBottom.initial : undefined}
              animate={isInView ? fadeFromBottom.animate : undefined}
              transition={isInView ? { delay: 1.0, ...fadeFromBottom.transition } : { delay: 0 }}
              whileHover={{ y: 0, opacity: 1, transition: { delay: 0 } }}
              className="absolute bottom-0 left-0 w-[406px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c449_kloudera-home-one-cases-image.svg"
                alt="Overlay 5"
                className="w-full h-auto object-cover"
                width={398}
                height={160}
              />
            </motion.div>
          </div>

          {/* Right Part - Content (sin cambios) */}
          <div className="flex flex-col items-start gap-3 flex-1 max-w-[520px] w-full">
            {/* ... todo el contenido de la derecha permanece igual ... */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-['Inter_Tight',sans-serif] text-[#5200EE] text-sm font-medium tracking-[2.2px] uppercase mb-2.5"
              >
                {subText}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="m-0 mb-5 font-medium text-[40px] leading-[50px] font-['Inter_Tight',sans-serif] text-[#071332] tracking-[-0.8px]"
              >
                {heading}{' '}
                <span className="bg-gradient-to-r from-[#3CA1FF] via-[#6E24FB] via-[#C61EE8] to-[#FF6948] bg-clip-text text-transparent">
                  {highlightText}
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="m-0 font-['DM_Sans',sans-serif] text-[#4B497E] text-base leading-[25px] font-medium tracking-[-0.2px]"
              >
                {description}
              </motion.p>
            </div>

            <div className="w-full pt-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className={`py-[26px] ${index === useCases.length - 1 ? '' : 'border-b border-[#BEBDD2]'}`}
                >
                  <div className="flex items-center gap-5">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#5200EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={useCase.icon} />
                    </svg>
                    <div className="font-['Inter_Tight',sans-serif] text-[#071332] text-xl leading-[30px] font-medium tracking-[-0.2px]">
                      {useCase.title}
                    </div>
                  </div>
                  <div className="mt-[14px] ml-12">
                    <p className="m-0 font-['DM_Sans',sans-serif] text-[#4B497E] text-base leading-[25px] font-medium tracking-[-0.2px]">
                      {useCase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};