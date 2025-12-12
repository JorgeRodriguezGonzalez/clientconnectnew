import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValueEvent } from 'framer-motion';
import { BlueprintVisualization } from '@/components/home/BlueprintVisualization';

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", // Modificado de coral a emerald-400
  gold: "rgb(237, 191, 134)",
  red: "#9A3426" 
};

// @component: CloudHero
const CloudHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showRobot, setShowRobot] = useState(false); 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  // --- DETECTOR DE SCROLL PARA ACTIVAR ROBOT ---
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.3 && !showRobot) {
      setShowRobot(true);
    } else if (latest < 0.3 && showRobot) {
      setShowRobot(false);
    }
  });

  // --- TRAYECTORIA 1: VERTICAL (Bajada) ---
  const verticalTop = useTransform(smoothProgress, [0.38, 0.78], ["72%", "100%"]);
  const verticalOpacity = useTransform(smoothProgress, [0.38, 0.45, 0.75, 0.8], [0, 1, 1, 0]);

  // Color del rayo: Rojo -> Gradiente Original
  const beamColor1 = useTransform(smoothProgress, [0.38, 0.6], [COLORS.red, COLORS.gold]);
  // Aquí sustituimos coral por emerald
  const beamColor2 = useTransform(smoothProgress, [0.38, 0.6], [COLORS.red, COLORS.emerald]);
  const beamColor3 = useTransform(smoothProgress, [0.38, 0.6], [COLORS.red, COLORS.cyan]); 
  
  const verticalGradient = useMotionTemplate`linear-gradient(to bottom, transparent, ${beamColor1}, ${beamColor2}, ${beamColor3})`;

  // --- TRAYECTORIA 2: HORIZONTAL (Expansión) ---
  const horizontalWidth = useTransform(smoothProgress, [0.7, 0.9], ["0px", "130px"]);
  const horizontalOpacity = useTransform(smoothProgress, [0.69, 0.7, 0.9, 0.95], [0, 1, 1, 0]);

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

          {/* === DIVISOR VERTICAL === */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200 z-10 overflow-visible">
             
             {/* --- ICONO ROBOT ERROR CENTRADO --- */}
             <motion.div 
                style={{ x: "-50%", y: "-50%" }} 
                initial={{ scale: 0, opacity: 0, rotate: -15 }} 
                
                // ANIMACIÓN CONDICIONAL (Disparador)
                animate={showRobot ? {
                  scale: 1,
                  opacity: 1,
                  rotate: [-15, 15, -5, 0], 
                  borderColor: ["#e4e4e7", "#9A3426", "#e4e4e7"], 
                  color: ["#6b7280", "#9A3426", "#6b7280"],       
                  backgroundColor: ["#ffffff", "#FFE5DF", "#ffffff"], 
                  boxShadow: ["0 1px 2px 0 rgba(0,0,0,0.05)", "0 0 10px rgba(154,52,38,0.2)", "0 1px 2px 0 rgba(0,0,0,0.05)"]
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

                className="absolute top-1/2 left-1/2 z-40 p-1 rounded-lg border flex items-center justify-center"
             >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-8 h-8 -mt-[2px]" 
                >
                  <rect x="4" y="8" width="16" height="12" rx="2" />
                  <path d="M12 5v3" /> 
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M7.5 11l2 2" />
                  <path d="M9.5 11l-2 2" />
                  <path d="M14.5 11l2 2" />
                  <path d="M16.5 11l-2 2" />
                  <path d="M9 17h6" />
                </svg>
             </motion.div>
             
             {/* 1. RAYO VERTICAL */}
             <motion.div 
               style={{ 
                 top: verticalTop,
                 opacity: verticalOpacity,
                 background: verticalGradient
               }}
               className="absolute left-0 w-[1.6px] -ml-[0.5px] h-[200px] -translate-y-full blur-[0.5px]"
             />

             {/* 2. RAYO HORIZONTAL - Actualizado con emerald */}
             <motion.div 
               style={{ 
                 width: horizontalWidth,
                 opacity: horizontalOpacity,
                 background: `linear-gradient(to right, ${COLORS.cyan}, ${COLORS.emerald}, ${COLORS.gold})`
               }}
               className="absolute left-0 bottom-0 h-[2.3px] -ml-[0.5px] rounded-r-full blur-[0.5px] origin-left z-20"
             />

             {/* 3. FLASH CORNER */}
             <motion.div
                style={{ opacity: flashOpacity }}
                className="absolute left-0 bottom-0 w-[4px] h-[4px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#06b6d4] blur-[1px] z-30"
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
                We find the{' '}
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
                    // Gradiente actualizado con COLORS.emerald
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.gold}, ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  structural flaws
                </motion.span>
                {' '}in your digital ecosystem.
              </h2>

              {/* TEXT */}
              <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
              We dive deep into the code to find what others miss. From broken SEO hierarchies and slow rendering times to unoptimized mobile architectures, we identify the precise technical bottlenecks and strategy errors that are costing you conversions.
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