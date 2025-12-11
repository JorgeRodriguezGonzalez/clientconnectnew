import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { InteractiveCardStack } from '@/components/home/InteractiveCardStack';

// --- CONSTANTES DE COLOR ---
const COLORS = {
  turquoise: "rgb(103, 188, 183)",
  coral: "rgb(222, 131, 99)",
  gold: "rgb(237, 191, 134)",
};

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// @component: BoxCards
const BoxCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // CAMBIO AQUÍ:
    // "start 60%": El scroll empieza cuando el tope del componente llega al 60% de la altura de la ventana.
    // Antes estaba en 80% (muy abajo) y originalmente en "center" (50%).
    // 60% es el punto medio perfecto para que no sea ni muy pronto ni muy tarde.
    offset: ["start 60%", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  // --- TRAYECTORIA DEL RAYO ---
  // Mantenemos [0, 0.3] para que la acción sea rápida una vez que empieza.
  const beamTop = useTransform(smoothProgress, [0, 0.3], ["0%", "50%"]);
  
  // Opacidad
  const beamOpacity = useTransform(smoothProgress, [0, 0.05, 0.3, 0.35], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      id="box-cards" 
      className="grow relative w-full overflow-x-hidden bg-[#FAFAFA] flex flex-col"
    >
      <div className="relative z-[1] w-full max-w-[1280px] ml-0 mr-auto">
        <div className="relative flex flex-col lg:flex-row items-stretch">
          
          {/* Left Column: Content (60%) */}
          <div className="py-16 lg:py-32 flex flex-col justify-center gap-4 w-full lg:w-[60%] shrink-0 lg:pr-16 relative z-10 px-6 lg:px-0" style={{ paddingRight: 'calc(4rem + 20px)' }}>
            <div className="flex flex-col gap-6 max-w-[520px] ml-auto"> 
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
                    backgroundImage: "linear-gradient(45deg, rgba(255, 255, 255, 0), rgb(237, 191, 134), rgb(222, 131, 99), rgb(103, 188, 183), rgba(255, 255, 255, 0))",
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

          {/* === DIVISOR VERTICAL (Desktop only) -> 60% === */}
          <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-[1px] bg-zinc-200 z-10 overflow-hidden">
             {/* RAYO VERTICAL */}
             <motion.div 
               style={{ 
                 top: beamTop,
                 opacity: beamOpacity,
                 background: `linear-gradient(to bottom, transparent, ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise})`
               }}
               className="absolute left-0 w-[4.4px] -ml-[0.5px] h-[200px] -translate-y-full blur-[0.5px]"
             />
          </div>

          {/* Horizontal Divider (Mobile only) */}
          <div className="lg:hidden w-screen h-[1px] bg-zinc-200 mb-0 -ml-6" />

          {/* Right Column: InteractiveCardStack (40%) */}
          <div className="relative w-full lg:w-[40%] min-h-[480px] md:min-h-[640px] lg:min-h-auto flex flex-col justify-start items-center overflow-visible self-stretch m-0 p-0">
            <div className="absolute inset-y-0 left-0 w-screen z-0">
              <BackgroundStripes />
            </div>

            <div className="relative w-full h-full flex items-start justify-center pt-24 lg:pt-40 z-10 translate-x-8 lg:translate-x-16">
              <InteractiveCardStack />
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
};

export default BoxCards;