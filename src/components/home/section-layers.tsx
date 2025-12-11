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
  const verticalTop = useTransform(smoothProgress, [0.3, 0.7], ["50%", "100%"]);
  const verticalOpacity = useTransform(smoothProgress, [0.3, 0.4, 0.7, 0.75], [0, 1, 1, 0]);

  // --- TRAYECTORIA 2: HORIZONTAL (Expansión) ---
  const horizontalWidth = useTransform(smoothProgress, [0.7, 0.9], ["0px", "145px"]);
  
  // CAMBIO 1: Corte abrupto de opacidad.
  // Pasa de 1 a 0 casi instantáneamente al llegar al 0.9 (final del recorrido)
  // [0.69 -> 0.7] = Aparece
  // [0.7 -> 0.9] = Visible
  // [0.9 -> 0.901] = Desaparece de golpe
  const horizontalOpacity = useTransform(smoothProgress, [0.69, 0.7, 0.9, 0.901], [0, 1, 1, 0]);

  // --- FLASH (Punto de impacto) ---
  const flashOpacity = useTransform(smoothProgress, [0.69, 0.7, 0.71], [0, 1, 0]);

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
             
             {/* 1. RAYO VERTICAL */}
             <motion.div 
               style={{ 
                 top: verticalTop,
                 opacity: verticalOpacity,
                 background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise})`
               }}
               className="absolute left-0 w-[1.2px] -ml-[0.5px] h-[200px] -translate-y-full blur-[0.5px]"
             />

             {/* 2. RAYO HORIZONTAL */}
             <motion.div 
               style={{ 
                 width: horizontalWidth,
                 opacity: horizontalOpacity,
                 // CAMBIO 2: Eliminado 'transparent' del final del gradiente.
                 // Ahora termina sólido en Gold, evitando que se vea "fino" en la punta.
                 background: `linear-gradient(to right, ${COLORS.turquoise}, ${COLORS.coral}, ${COLORS.gold})`
               }}
               className="absolute left-0 bottom-0 h-[2.1px] -ml-[0.5px] rounded-r-full blur-[0.5px] origin-left z-20"
             />

             {/* 3. FLASH CORNER */}
             <motion.div
                style={{ opacity: flashOpacity }}
                className="absolute left-0 bottom-0 w-[4px] h-[4px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#67bcb7] blur-[1px] z-30"
              />
          </div>

          {/* Horizontal Divider (Mobile only) */}
          <div className="lg:hidden w-screen h-[1px] bg-zinc-200 mb-0 -ml-6" />

          {/* Right Column: Content */}
          <div className="py-16 lg:py-32 flex flex-col justify-center gap-4 w-full lg:w-1/2 shrink-0 lg:pl-16 relative z-10 px-6 lg:px-0" style={{ paddingLeft: 'calc(4rem + 20px)' }}>
            <div className="flex flex-col gap-6 max-w-[520px]">
              
              {/* SUBTITLE */}
              <div className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500">
                SYSTEM DIAGNOSIS
              </div>

              {/* TITLE */}
              <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900">
                We uncover the{' '}
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
                  invisible faults
                </motion.span>
                {' '}in your digital ecosystem.
              </h2>

              {/* TEXT */}
              <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
                From technical SEO bottlenecks to cracks in your content strategy, we audit every layer of your online presence. We identify exactly what is broken—so we can engineer the perfect fix.
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