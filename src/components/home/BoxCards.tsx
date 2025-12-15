import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { InteractiveCardStack } from '@/components/home/InteractiveCardStack';

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  coral: "rgb(222, 131, 99)", 
  gold: "rgb(237, 191, 134)",
  emerald: "#34d399", 
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
  const [showIcon, setShowIcon] = useState(false); 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  // --- DETECTOR DE SCROLL PARA ACTIVAR LA "C" Y LOS MENSAJES ---
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.3 && !showIcon) {
      setShowIcon(true);
    } else if (latest < 0.3 && showIcon) {
      setShowIcon(false);
    }
  });

  // --- TRAYECTORIA DEL RAYO ---
  const beamTop = useTransform(smoothProgress, [0, 0.3], ["0%", "50%"]);
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
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
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
          <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-[1px] bg-zinc-200 z-20 overflow-visible">
             
             {/* --- MENSAJE SUPERIOR DERECHA (Improvement 1) --- */}
             {/* Posición: A la derecha (left-35px) y desplazado hacia arriba (-90px) */}
             <motion.div
               initial={{ opacity: 0, x: -10, y: 10 }}
               animate={showIcon ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: 10 }}
               transition={{ delay: 0.1, duration: 0.4 }}
               className="absolute top-[calc(50%-90px)] left-[35px] flex items-center z-30 pointer-events-none"
             >
                {/* SVG Curve Connector: Viene desde abajo-izquierda (la linea central) hacia arriba-derecha */}
                <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -left-[35px] top-[14px] text-zinc-300 pointer-events-none">
                   {/* Punto de inicio cerca del cuadrado C */}
                   <circle cx="0" cy="38" r="1.5" fill={COLORS.emerald} />
                   {/* Curva hacia el badge */}
                   <path d="M 0 38 Q 15 38 35 20" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>

                <motion.div 
                  animate={showIcon ? {
                    borderColor: [COLORS.emerald, COLORS.cyan, COLORS.emerald],
                    color: ["#064e3b", "#0e7490", "#064e3b"], 
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="px-2.5 py-1 bg-white/80 backdrop-blur-sm border rounded shadow-sm text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                >
                  100% Core Vitals
                </motion.div>
             </motion.div>

             {/* --- ICONO "C" CENTRADO --- */}
             <motion.div 
                style={{ x: "-50%", y: "-50%" }} 
                initial={{ scale: 0, opacity: 0, rotate: -15 }} 
                animate={showIcon ? {
                  scale: 1,
                  opacity: 1,
                  rotate: [-15, 15, -5, 0], 
                  borderColor: ["#e4e4e7", COLORS.cyan, COLORS.emerald, "#e4e4e7"], 
                  color: ["#6b7280", COLORS.cyan, COLORS.emerald, "#6b7280"],       
                  backgroundColor: ["#ffffff", "#ECFEFF", "#ECFDF5", "#ffffff"], 
                  boxShadow: ["0 1px 2px 0 rgba(0,0,0,0.05)", `0 0 10px ${COLORS.cyan}40`, `0 0 10px ${COLORS.emerald}40`, "0 1px 2px 0 rgba(0,0,0,0.05)"]
                } : {
                  scale: 0,
                  opacity: 0,
                  rotate: -15, 
                  borderColor: "#e4e4e7",
                  color: "#6b7280",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 0 0 transparent"
                }}
                transition={{
                  scale: { duration: 0.4, ease: "backOut" },
                  opacity: { duration: 0.3 },
                  rotate: { duration: 1.2, ease: "easeInOut" }, 
                  borderColor: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                  color: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                  backgroundColor: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/2 left-0 z-40 p-1 rounded-lg border flex items-center justify-center bg-white"
             >
                <div className="w-8 h-8 flex items-center justify-center -mt-[2px]">
                   <span className="font-bold text-2xl leading-none">C</span>
                </div>
             </motion.div>

             {/* --- MENSAJE INFERIOR DERECHA (Improvement 2) --- */}
             {/* Posición: A la derecha (left-35px) y desplazado hacia abajo (+90px) */}
             <motion.div
               initial={{ opacity: 0, x: -10, y: -10 }}
               animate={showIcon ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: -10 }}
               transition={{ delay: 0.2, duration: 0.4 }}
               className="absolute top-[calc(50%+90px)] left-[35px] flex items-center z-30 pointer-events-none"
             >
                {/* SVG Curve Connector: Viene desde arriba-izquierda (la linea central) hacia abajo-derecha */}
                <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -left-[35px] -top-[12px] text-zinc-300 pointer-events-none">
                   {/* Punto de inicio cerca del cuadrado C */}
                   <circle cx="0" cy="2" r="1.5" fill={COLORS.cyan} />
                   {/* Curva hacia el badge */}
                   <path d="M 0 2 Q 15 2 35 20" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>

                <motion.div 
                   animate={showIcon ? {
                    borderColor: [COLORS.cyan, COLORS.emerald, COLORS.cyan],
                    color: ["#0e7490", "#064e3b", "#0e7490"],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="px-2.5 py-1 bg-white/80 backdrop-blur-sm border rounded shadow-sm text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                >
                  SEO Architecture
                </motion.div>
             </motion.div>

             {/* RAYO VERTICAL */}
             <motion.div 
               style={{ 
                 top: beamTop,
                 opacity: beamOpacity,
                 background: `linear-gradient(to bottom, transparent, ${COLORS.emerald}, ${COLORS.cyan})`
               }}
               className="absolute left-0 w-[1.6px] -ml-[1px] h-[200px] -translate-y-full blur-[0.5px]"
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