import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BlueprintVisualization } from '@/components/home/BlueprintVisualization';

// --- CONSTANTES DE COLOR (Iguales a Pricing.tsx) ---
const COLORS = {
  turquoise: "rgb(103, 188, 183)", // #67bcb7
  coral: "rgb(222, 131, 99)",     // #de8363
  gold: "rgb(237, 191, 134)",     // #edbf86
};

// @component: CloudHero
const CloudHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Detectar el progreso del scroll dentro de esta sección
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // La animación ocurre mientras la sección cruza el centro de la pantalla
  });

  // Suavizar el scroll para que el movimiento de la luz sea fluido
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- TRAYECTORIAS ---

  // 1. Trayectoria Vertical (Bajando por la línea central)
  // Ocurre durante la primera mitad del progreso (0 -> 0.6)
  // Empieza en el 50% de la altura (centro) y baja hasta el 100% (borde inferior)
  const verticalTop = useTransform(smoothProgress, [0.1, 0.5], ["50%", "100%"]);
  const verticalOpacity = useTransform(smoothProgress, [0.1, 0.15, 0.45, 0.5], [0, 1, 1, 0]);

  // 2. Trayectoria Horizontal (Moviéndose a la derecha en el borde inferior)
  // Ocurre justo después de la vertical (0.5 -> 0.8)
  // Empieza en el 50% del ancho (donde intersecta la vertical) y se mueve 50px a la derecha
  const horizontalLeft = useTransform(smoothProgress, [0.49, 0.8], ["50%", "calc(50% + 50px)"]);
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
          
          {/* Left Column: BlueprintVisualization */}
          <div className="relative w-full lg:w-1/2 min-h-[480px] md:min-h-[640px] lg:min-h-auto flex items-center justify-start overflow-visible self-stretch m-0 p-0">
            <div className="w-full h-full flex items-center justify-start m-0 p-0">
              <BlueprintVisualization />
            </div>
          </div>

          {/* --- DIVISOR VERTICAL (Con efecto Glowing) --- */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200 z-10 overflow-hidden">
             {/* El "Beam" de luz vertical */}
             <motion.div 
               style={{ 
                 top: verticalTop,
                 opacity: verticalOpacity,
                 // Gradiente vertical simulando la energía bajando
                 background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise}, transparent)`
               }}
               className="absolute left-0 w-[2px] -ml-[0.5px] h-[150px] -translate-y-full"
             />
          </div>

          {/* Horizontal Divider (Mobile only) */}
          <div className="lg:hidden w-screen h-[1px] bg-zinc-200 mb-0 -ml-6" />

          {/* Right Column: Content */}
          <div className="py-16 lg:py-32 flex flex-col justify-center gap-4 w-full lg:w-1/2 shrink-0 lg:pl-16 relative z-10 px-6 lg:px-0" style={{ paddingLeft: 'calc(4rem + 20px)' }}>
            <div className="flex flex-col gap-6 max-w-[520px]">
              {/* OUR APPROACH */}
              <div className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500">
                OUR APPROACH
              </div>

              {/* Main Heading with gradient highlight */}
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

              {/* Description */}
              <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
                We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM BORDER (Con efecto Glowing) --- */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10 overflow-hidden">
          {/* El "Beam" de luz horizontal */}
          <motion.div 
            style={{ 
              left: horizontalLeft,
              opacity: horizontalOpacity,
              // Gradiente horizontal hacia la derecha
              background: `linear-gradient(to right, ${COLORS.turquoise}, ${COLORS.coral}, ${COLORS.gold}, transparent)`
            }}
            className="hidden lg:block absolute top-0 h-[3px] -mt-[1px] w-[100px] rounded-full blur-[1px]"
          />
      </div>
    </section>
  );
};

export default CloudHero;