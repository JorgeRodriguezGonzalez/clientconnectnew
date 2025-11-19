import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';

type UseCaseItem = { id: number; icon: string; title: string; description: string };
type UseCasesShowcaseProps = {
  subText?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  useCases?: UseCaseItem[];
};

const defaultUseCases: UseCaseItem[] = [ /* ... igual que antes ... */ ];

// COMPONENTE CORREGIDO
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

  // Estado individual para cada overlay (forzamos replay al hover)
  const [hoverStates, setHoverStates] = useState({
    left: false,
    small: false,
    right: false,
    logo: false,
    bottom: false,
  });

  return (
    <section ref={ref} className="relative overflow-hidden py-28 px-4 w-full bg-white mb-[50px]">
      <div className="max-w-[1225px] mx-auto">
        <div className="flex items-center justify-between gap-20 relative flex-col lg:flex-row">

          {/* LEFT PART - IMÁGENES */}
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

            {/* 1. Izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isInView && !hoverStates.left
                  ? { opacity: 1, x: 0 }
                  : hoverStates.left
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -50 }
              }
              transition={hoverStates.left ? { delay: 0, duration: 0.6 } : { delay: 0.6, duration: 0.6 }}
              onMouseEnter={() => setHoverStates(s => ({ ...s, left: true }))}
              onMouseLeave={() => setHoverStates(s => ({ ...s, left: false }))}
              className="absolute top-[106px] left-5 w-[406px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c445_kloudera-home-one-cases-image.svg" alt="Overlay 1" className="w-full h-auto object-cover" width={398} height={160} />
            </motion.div>

            {/* 2. Pequeña (scale) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView && !hoverStates.small
                  ? { opacity: 1, scale: 1 }
                  : hoverStates.small
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={hoverStates.small ? { delay: 0, duration: 0.6 } : { delay: 0.7, duration: 0.6 }}
              onMouseEnter={() => setHoverStates(s => ({ ...s, small: true }))}
              onMouseLeave={() => setHoverStates(s => ({ ...s, small: false }))}
              className="absolute top-[106px] right-[-30px] w-[69px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c446_kloudera-home-one-cases-image.svg" alt="Overlay 2" className="w-full h-auto object-cover" width={67} height={68} />
            </motion.div>

            {/* 3. Derecha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                isInView && !hoverStates.right
                  ? { opacity: 1, x: 0 }
                  : hoverStates.right
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 50 }
              }
              transition={hoverStates.right ? { delay: 0, duration: 0.6 } : { delay: 0.8, duration: 0.6 }}
              onMouseEnter={() => setHoverStates(s => ({ ...s, right: true }))}
              onMouseLeave={() => setHoverStates(s => ({ ...s, right: false }))}
              className="absolute top-[238px] right-[-104px] w-[431px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c447_kloudera-home-one-cases-image.svg" alt="Overlay 3" className="w-full h-auto object-cover" width={435} height={301} />
            </motion.div>

            {/* 4. Logo con rotación */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={
                isInView && !hoverStates.logo
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : hoverStates.logo
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0.8, rotate: -180 }
              }
              transition={hoverStates.logo ? { delay: 0, duration: 0.8 } : { delay: 0.9, duration: 0.8 }}
              onMouseEnter={() => setHoverStates(s => ({ ...s, logo: true }))}
              onMouseLeave={() => setHoverStates(s => ({ ...s, logo: false }))}
              className="absolute top-[323px] left-[45px] w-[109px] h-[109px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center p-5">
                <img src="/images/client-connect-australia-logo.png" alt="Client Connect Australia" className="w-full h-full object-contain" />
              </div>
            </motion.div>

            {/* 5. Inferior */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView && !hoverStates.bottom
                  ? { opacity: 1, y: 0 }
                  : hoverStates.bottom
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 50 }
              }
              transition={hoverStates.bottom ? { delay: 0, duration: 0.6 } : { delay: 1.0, duration: 0.6 }}
              onMouseEnter={() => setHoverStates(s => ({ ...s, bottom: true }))}
              onMouseLeave={() => setHoverStates(s => ({ ...s, bottom: false }))}
              className="absolute bottom-0 left-0 w-[406px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c449_kloudera-home-one-cases-image.svg" alt="Overlay 5" className="w-full h-auto object-cover" width={398} height={160} />
            </motion.div>
          </div>

          {/* RIGHT PART - Contenido (sin tocar) */}
          <div className="flex flex-col items-start gap-3 flex-1 max-w-[520px] w-full">
            {/* ... todo el contenido de la derecha exactamente igual que tenías ... */}
            {/* (lo omito aquí por brevedad, pero va tal cual estaba) */}
          </div>
        </div>
      </div>
    </section>
  );
};