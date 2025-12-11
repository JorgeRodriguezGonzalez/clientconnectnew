import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BlueprintVisualization } from '@/components/home/BlueprintVisualization';

// --- CONSTANTES DE COLOR ---
const COLORS = {
  turquoise: "rgb(103, 188, 183)",
  coral: "rgb(222, 131, 99)",
  gold: "rgb(237, 191, 134)",
};

// @component: CloudHero
const CloudHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  // --- TRAYECTORIA 1: VERTICAL (Bajada) ---
  const verticalTop = useTransform(smoothProgress, [0.1, 0.5], ["50%", "100%"]);
  const verticalOpacity = useTransform(smoothProgress, [0.1, 0.2, 0.5, 0.55], [0, 1, 1, 0]);

  // --- TRAYECTORIA 2: HORIZONTAL (Expansión) ---
  const horizontalWidth = useTransform(smoothProgress, [0.5, 0.7], ["0px", "100px"]);
  const horizontalOpacity = useTransform(smoothProgress, [0.49, 0.5, 0.75, 0.8], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="cloud" 
      className="grow relative w-full overflow-visible bg-[#FAFAFA] flex flex-col"
    >
      {/* Top Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-10" />

      <div className="relative z-[1] w-full max-w-[1280px] ml-0 mr-auto">
        <div className="relative flex flex-col lg:flex-row items-stretch">
          
          {/* Left Column */}
          <div className="relative w-full lg:w-1/2 min-h-[480px] md:min-h-[640px] lg:min-h-auto flex items-center justify-start overflow-visible self-stretch m-0 p-0">
            <div className="w-full h-full flex items-center justify-start m-0 p-0">
              <BlueprintVisualization />
            </div>
          </div>

          {/* === DIVISOR VERTICAL (Contenedor de los rayos) === */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200 z-10 overflow-visible">
             
             {/* 1. RAYO VERTICAL (2px) */}
             {/* Un poco más fino que antes, pero con presencia */}
             <motion.div 
               style={{ 
                 top: verticalTop,
                 opacity: verticalOpacity,
                 background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise})`
               }}
               // w-[2px]: Grosor medio
               // -ml-[0.5px]: Centrado perfecto sobre la línea de 1px
               className="absolute left-0 w-[1.3px] -ml-[0.5px] h-[200px] -translate-y-full blur-[0.5px]"
             />

             {/* 2. RAYO HORIZONTAL (1px) */}
             {/* El más fino de todos, "Not as thin as the horizontal" implica que este es el más delgado */}
             <motion.div 
               style={{ 
                 width: horizontalWidth,
                 opacity: horizontalOpacity,
                 background: `linear-gradient(to right, ${COLORS.turquoise}, ${COLORS.coral}, ${COLORS.gold}, transparent)`
               }}
               // h-[1px]: Grosor láser
               // bottom-0: Pegado a la línea inferior
               // -ml-[0.5px]: Conexión perfecta sin huecos
               className="absolute left-0 bottom-0 h-[1.3px] -ml-[0.5px] rounded-r-full blur-[0.5px] origin-left z-20"
             />

             {/* 3. FLASH CORNER (Micro punto) */}
             {/* Reducido para que no destaque sobre las líneas finas */}
             <motion.div
                style={{
                    opacity: useTransform(smoothProgress, [0.49, 0.5, 0.51], [0, 1, 0])
                }}
                className="absolute left-0 bottom-0 w-[4px] h-[4px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#67bcb7] blur-[1px] z-30"
              />
          </div>

          {/* Horizontal Divider (Mobile only) */}
          <div className="lg:hidden w-screen h-[1px] bg-zinc-200 mb-0 -ml-6" />

          {/* Right Column: Content */}
          <div className="py-16 lg:py-32 flex flex-col justify-center gap-4 w-full lg:w-1/2 shrink-0 lg:pl-16 relative z-10 px-6 lg:px-0" style={{ paddingLeft: 'calc(4rem + 20px)' }}>
            <div className="flex flex-col gap-6 max-w-[520px]">
              <div className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500">
                OUR APPROACH
              </div>

              <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900">
                Marketing strategies that transform your business into{' '}
                <motion.span
                  initial={{ backgroundPosition: "400% 50%" }}
                  animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                  transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity
                  }}
                  style={{
                    display: "inline-block",
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise}, rgba(255, 255, 255, 0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  market leaders
                </motion.span>
                <span className="text-gray-900">.</span>
              </h2>

              <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
                We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
};

export default CloudHero;