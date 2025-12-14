import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValueEvent } from 'framer-motion';
import { BlueprintVisualization } from '@/components/home/BlueprintVisualization';
import { ArrowRight, Sparkles } from 'lucide-react';

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  gold: "rgb(237, 191, 134)", 
  red: "#9A3426",       // Rojo oscuro para el UI del robot
  brightRed: "#EF5350"  // Rojo suave para el rayo
};

// --- WIDGET DE AUDITORÍA (Estilo Blueprint/Industrial) ---
const AuditWidget = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-8 w-full max-w-md relative"
    >
      <div className="relative group p-[1px] bg-zinc-800 shadow-xl overflow-hidden rounded-none">
        {/* Glow effect sutil detrás */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative bg-[#09090b] p-5 flex flex-col gap-4 rounded-none">
          
          {/* Header del Widget */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-none">
                <Sparkles size={14} className="text-zinc-400" />
              </div>
              <span className="text-sm font-medium text-zinc-200">Get Your Free Strategy Audit</span>
            </div>
            <div className="flex items-center gap-1.5">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wide">Available</span>
            </div>
          </div>

          {/* Input Area */}
          <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="url" 
              placeholder="www.yourwebsite.com" 
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-sm pl-4 pr-28 py-3 outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600 rounded-none"
            />
            <button 
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-white hover:bg-zinc-200 text-black text-xs font-bold px-3 transition-colors flex items-center gap-1 rounded-none"
            >
              Analyze
              <ArrowRight size={12} strokeWidth={3} />
            </button>
          </form>
          
          <p className="text-[11px] text-zinc-500 leading-tight">
            Get a comprehensive report on SEO, performance, and conversion bottlenecks.
          </p>
        </div>
      </div>
    </motion.div>
  );
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

  // Colores del rayo
  const beamColor1 = useTransform(smoothProgress, [0.38, 0.5, 0.75], [COLORS.brightRed, COLORS.brightRed, COLORS.cyan]);
  const beamColor2 = useTransform(smoothProgress, [0.38, 0.5, 0.75], [COLORS.brightRed, COLORS.brightRed, COLORS.emerald]);
  const beamColor3 = useTransform(smoothProgress, [0.38, 0.5, 0.75], [COLORS.brightRed, COLORS.brightRed, COLORS.cyan]); 
  
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 -mt-[2px]">
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

             {/* 2. RAYO HORIZONTAL */}
             <motion.div 
               style={{ 
                 width: horizontalWidth,
                 opacity: horizontalOpacity,
                 background: `linear-gradient(to right, ${COLORS.cyan}, ${COLORS.emerald}, ${COLORS.cyan})`
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
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
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

              {/* === WIDGET DE AUDITORÍA === */}
              <AuditWidget />

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