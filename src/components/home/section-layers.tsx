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

  // Detectamos el scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Suavizado para movimiento fluido
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  // --- TRAYECTORIA 1: VERTICAL (Bajada) ---
  // Rango: 0.1 -> 0.5
  const verticalTop = useTransform(smoothProgress, [0.1, 0.5], ["50%", "100%"]);
  // La opacidad se mantiene hasta un poco DESPUÉS de tocar el suelo (0.55) para solaparse
  const verticalOpacity = useTransform(smoothProgress, [0.1, 0.2, 0.5, 0.55], [0, 1, 1, 0]);

  // --- TRAYECTORIA 2: HORIZONTAL (Expansión) ---
  // Rango: 0.5 -> 0.8 (Empieza EXACTAMENTE cuando el vertical termina)
  
  // CORRECCIÓN CLAVE: Solo animamos el ancho, no la posición X.
  // Crece desde 0px hasta 80px hacia la derecha.
  const horizontalWidth = useTransform(smoothProgress, [0.5, 0.7], ["0px", "80px"]);
  
  // Opacidad: Empieza un poco ANTES (0.48) para asegurar la fusión en la esquina
  const horizontalOpacity = useTransform(smoothProgress, [0.48, 0.5, 0.75, 0.8], [0, 1, 1, 0]);

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
          
          {/* Left Column: BlueprintVisualization */}
          <div className="relative w-full lg:w-1/2 min-h-[480px] md:min-h-[640px] lg:min-h-auto flex items-center justify-start overflow-visible self-stretch m-0 p-0">
            <div className="w-full h-full flex items-center justify-start m-0 p-0">
              <BlueprintVisualization />
            </div>
          </div>

          {/* --- DIVISOR VERTICAL --- */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200 z-10 overflow-hidden">
             {/* BEAM VERTICAL */}
             <motion.div 
               style={{ 
                 top: verticalTop,
                 opacity: verticalOpacity,
                 background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise})`
               }}
               // translate-y-full: la parte inferior del div es la que guía el movimiento
               className="absolute left-0 w-[3px] -ml-[1px] h-[200px] -translate-y-full blur-[1px]"
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

      {/* --- BOTTOM BORDER --- */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10">
          
          {/* BEAM HORIZONTAL */}
          {/* CORRECCIÓN: Eliminado translate X. Ahora está anclado fijamente al 50% */}
          <motion.div 
            style={{ 
              left: "50%", 
              width: horizontalWidth,
              opacity: horizontalOpacity,
              background: `linear-gradient(to right, ${COLORS.turquoise}, ${COLORS.coral}, ${COLORS.gold}, transparent)`
            }}
            // -ml-[1px]: Mueve el inicio 1 pixel a la izquierda para solaparse con la línea vertical
            // origin-left: Asegura que crezca hacia la derecha desde ese punto fijo
            className="hidden lg:block absolute top-0 h-[3px] -mt-[1px] -ml-[1px] rounded-r-full blur-[1px] origin-left"
          />
          
          {/* PUNTO DE INTERSECCIÓN (Flash Corner) */}
          {/* Un pequeño punto brillante estático en la esquina para ocultar cualquier imperfección visual */}
          <motion.div
            style={{
                opacity: useTransform(smoothProgress, [0.49, 0.5, 0.51], [0, 1, 0])
            }}
            // left-1/2 y -translate-x-1/2 lo centra matemáticamente perfecto en la línea
            className="hidden lg:block absolute left-1/2 top-0 w-[8px] h-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#67bcb7] blur-[3px] z-20"
          />
      </div>
    </section>
  );
};

export default CloudHero;