import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Clapperboard, Zap, Play, Check, Globe, ShieldCheck } from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
  .font-syne { font-family: 'Syne', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  
  /* OPTIMIZACIÓN SAFARI */
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }
`;

// --- CONFIGURACIÓN DE ANIMACIÓN UNIFICADA ---
const ANIMATION_CONFIG = {
  duration: 0.95, 
  ease: [0.2, 0, 0.2, 1] as [number, number, number, number]
};

// --- UTILS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- COLORS ---
const COLORS = {
  gold: "#EE9C21",
  orange: "#C96928",
  burnt: "#BA4226",
  red: "#AD2624",
};

// --- COMPONENTE GLOWING EFFECT ---
const GlowingEffect = React.memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    variant?: "default" | "white";
    glow?: boolean;
    className?: string;
    disabled?: boolean;
    movementDuration?: number;
    borderWidth?: number;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = React.useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e as any);
      window.addEventListener("scroll", handleScroll, { passive: true } as any);
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true } as any);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient": `radial-gradient(circle, ${COLORS.gold} 10%, #EDBF8600 20%),
                radial-gradient(circle at 40% 40%, ${COLORS.orange} 5%, #DE836300 15%),
                radial-gradient(circle at 60% 60%, ${COLORS.burnt} 10%, #67BCB700 20%), 
                radial-gradient(circle at 40% 60%, ${COLORS.red} 10%, #94A3B800 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  ${COLORS.gold} 0%,
                  ${COLORS.orange} calc(25% / var(--repeating-conic-gradient-times)),
                  ${COLORS.burnt} calc(50% / var(--repeating-conic-gradient-times)), 
                  ${COLORS.red} calc(75% / var(--repeating-conic-gradient-times)),
                  ${COLORS.gold} calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ 
  children, 
  className, 
  layoutId,
  animate,       
  initial,       
  transition,    
  style,
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  layoutId?: string,
  animate?: any,
  initial?: any,
  transition?: any,
  style?: any,
  [key: string]: any
}) => {
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 10);
    y.set(yPct * -10);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layout={props.layout} 
      layoutId={layoutId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={initial || { opacity: 0, scale: 0.9 }}
      animate={animate || { opacity: 1, scale: 1 }}
      transition={transition || { 
        layout: ANIMATION_CONFIG, 
        opacity: { duration: 0.5 }
      }} 
      style={{
        rotateY: x,
        rotateX: y,
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style 
      }}
      className={cn("relative rounded-3xl overflow-hidden transition-colors duration-300 safari-gpu will-change-transform", className)}
      {...props} 
    >
      {children}
    </motion.div>
  );
};

// --- SUB-COMPONENTS ---
const StatBadge = ({ icon: Icon, label, value, isLight }: { icon: any, label: string, value: string, isLight: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md transition-colors duration-300",
    isLight 
      ? "bg-white/80 border-black/5 shadow-sm" 
      : "bg-white/5 border-white/10"
  )}>
    <div className="p-2 rounded-full bg-[#D84315]/10 text-[#D84315]">
      <Icon size={16} />
    </div>
    <div>
      <div className={cn("font-syne font-bold text-lg leading-none transition-colors duration-0", isLight ? "text-gray-900" : "text-white")}>
        {value}
      </div>
      <div className="font-inter text-[10px] text-[#D84315] uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const FounderSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLateScroll, setIsLateScroll] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 1. Light Mode
    if (latest > 0.35 && !isLightMode) {
      setIsLightMode(true);
    } else if (latest <= 0.35 && isLightMode) {
      setIsLightMode(false);
    }

    // 2. Late Scroll (Buffer)
    if (latest > 0.60 && !isLateScroll) {
      setIsLateScroll(true);
    } else if (latest < 0.50 && isLateScroll) {
      setIsLateScroll(false);
    }
  });

  const yStats = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "relative w-full py-24 lg:py-32 transition-colors duration-0 z-10", 
        isLightMode ? "bg-white" : "bg-[#050505]"
      )}
    >
      <style>{fontStyles}</style>

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className={cn("absolute right-[-10%] top-[20%] w-[600px] h-[600px] bg-[#D84315] blur-[150px] opacity-20 animate-pulse rounded-full transition-opacity duration-0", isLightMode ? "opacity-0" : "opacity-20")} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* LAYOUT GRID */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: STICKY --- */}
          <div className="lg:w-[40%] sticky top-32">
            <div className="flex flex-col gap-8 pb-10">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={cn(
                  "w-fit px-4 py-1.5 rounded-full border text-[11px] font-inter font-medium uppercase tracking-widest transition-colors duration-300",
                  isLightMode 
                    ? "bg-orange-50 border-orange-100 text-[#D84315]" 
                    : "bg-white/5 border-white/10 text-[#D84315]"
                )}
              >
                The Architect
              </motion.div>

              {/* Headline */}
              <h2 className={cn(
                "font-syne font-bold text-[42px] md:text-[52px] lg:text-[64px] leading-[1] tracking-[-0.03em] transition-colors duration-0",
                isLightMode ? "text-gray-900" : "text-white"
              )}>
                I don't just edit. <br/>
                <span className="text-[#D84315]">I scale brands.</span>
              </h2>

              {/* Description */}
              <p className={cn(
                "font-inter text-[18px] leading-[1.6] transition-colors duration-0 max-w-md",
                isLightMode ? "text-gray-500" : "text-gray-400"
              )}>
                Most editors deliver files. I deliver <strong className={isLightMode ? "text-gray-900" : "text-white"}>ROAS</strong>. 
                My workflow integrates creative strategy, high-end production, and media buying logic into one cohesive growth engine.
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  "Creative Strategist Mindset",
                  "Direct Response Editing",
                  "Performance Data Analysis"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                      isLightMode ? "bg-black text-white group-hover:bg-[#D84315]" : "bg-white text-black group-hover:bg-[#D84315] group-hover:text-white"
                    )}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className={cn(
                      "font-inter font-medium text-[15px] transition-colors duration-0",
                      isLightMode ? "text-gray-800" : "text-gray-200"
                    )}>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6">
                <button className={cn(
                   "group relative px-8 py-4 rounded-full font-syne font-bold text-[16px] overflow-hidden transition-all duration-300",
                   isLightMode ? "bg-[#050505] text-white hover:shadow-xl" : "bg-white text-black hover:bg-[#D84315] hover:text-white"
                )}>
                  <span className="relative z-10 flex items-center gap-2">
                    Start Growth Engine
                    <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </button>
              </div>

            </div>
          </div>

          {/* --- RIGHT COLUMN: DYNAMIC GRID --- */}
          <div className="lg:w-[60%] relative pt-0 lg:pt-0">
            
            <motion.div 
               layout 
               className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[minmax(200px,auto)]"
            >

              {/* 
                 ITEM 1: MIGUEL CARD
              */}
              <TiltCard 
                layoutId="miguel-card"
                layout
                transition={{ 
                  layout: ANIMATION_CONFIG,
                  opacity: { duration: 0.5 }
                }}
                onLayoutAnimationStart={() => setIsResizing(true)}
                onLayoutAnimationComplete={() => setIsResizing(false)}
                className={cn(
                   "md:row-span-2 h-[450px] md:h-[600px] group border border-white/10 relative z-10 safari-gpu",
                   isLightMode ? "md:col-span-1" : "md:col-span-2"
                )}
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isResizing ? 1 : 0 }}
                  transition={{ duration: 0.15 }} 
                  className="absolute inset-0 z-40 bg-white/60 pointer-events-none"
                />

                <div 
                  className={cn(
                    "absolute inset-0 z-20 transition-opacity duration-700 pointer-events-none",
                    isLightMode ? "opacity-100" : "opacity-0"
                  )}
                >
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                </div>

                <div className="absolute inset-0 bg-gray-900 overflow-hidden rounded-3xl">
                  <motion.img 
                    layout
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" 
                    alt="Founder" 
                    loading="eager"
                    animate={{ scale: isLightMode ? 1.25 : 1 }}
                    transition={{ 
                        layout: ANIMATION_CONFIG, 
                        scale: ANIMATION_CONFIG 
                    }}
                    className="w-full h-full object-cover object-center grayscale-[30%] group-hover:grayscale-0 safari-gpu"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <motion.div layout className="absolute bottom-6 left-6 right-6 z-30">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                       <p className="text-white font-syne font-bold text-lg">Miguel (Founder)</p>
                       <p className="text-white/60 font-inter text-xs">Your Partner in Scale</p>
                    </div>
                  </motion.div>
                </div>
              </TiltCard>

              {/* ITEMS 2 & 3: STATS & VIDEO */}
              <AnimatePresence mode="popLayout">
                 {isLightMode && (
                    <>
                       {/* ITEM 2 */}
                       <TiltCard 
                        layout="position"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                        className="h-[280px] p-6 flex flex-col justify-between bg-gray-100 border border-gray-200 relative overflow-hidden group safari-gpu"
                       >
                          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D84315] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                          <div className="flex justify-between items-start z-10">
                             <div className="p-3 bg-[#D84315] rounded-xl text-white">
                                <TrendingUp size={24} />
                             </div>
                             <span className="font-inter text-xs font-bold uppercase tracking-wider text-gray-400">
                               Performance
                             </span>
                          </div>
                          <div className="z-10">
                             <h3 className="text-5xl font-syne font-bold mb-2 text-gray-900">4.5x</h3>
                             <p className="font-inter text-sm text-gray-500">
                               Average ROAS across all managed partners in Q4.
                             </p>
                          </div>
                       </TiltCard>

                       {/* ITEM 3 */}
                       <TiltCard 
                        layout="position"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                        className="h-[300px] bg-black relative group border border-white/10 cursor-pointer safari-gpu"
                       >
                          <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                             <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src="https://videos.pexels.com/video-files/5854659/5854659-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                             </video>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                                <Play fill="white" className="ml-1 text-white" />
                             </div>
                          </div>
                          <div className="absolute bottom-5 left-5">
                             <span className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded-lg text-white text-xs font-inter font-medium">
                                See Reel
                             </span>
                          </div>
                       </TiltCard>
                    </>
                 )}
              </AnimatePresence>

              {/* ITEM 4: PROCESS CARD (OPTIMIZED) */}
              <TiltCard 
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} // Blur inicial
                animate={isLightMode 
                    ? { opacity: 1, y: 0, filter: "blur(0px)" } 
                    : { opacity: 0, y: 20, filter: "blur(10px)" }
                }
                transition={{
                    // DURATION 0 si desaparece, 0.5 si aparece
                    duration: isLightMode ? 0.5 : 0, 
                    // DELAY: 0.5s para que empiece un poco antes (stagger effect)
                    delay: isLightMode ? 0.5 : 0, 
                    ease: "easeOut"
                }}
                className={cn(
                "md:col-span-2 p-8 flex flex-col md:flex-row items-center gap-8 transition-colors duration-0 border safari-gpu",
                isLightMode 
                  ? "bg-[#D84315] border-[#D84315]" 
                  : "bg-zinc-900 border-zinc-800"
              )}>
                 <div className="flex-1">
                    <h3 className="text-white font-syne font-bold text-2xl mb-2">The "One Workflow" System</h3>
                    <p className="text-white/80 font-inter font-light">
                      We eliminate the friction between production and distribution. One team, one goal, zero wasted budget.
                    </p>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                       <Zap size={20} />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                       <Clapperboard size={20} />
                    </div>
                 </div>
              </TiltCard>

              {/* TARJETAS INFERIORES */}
               {/* CARD A (Global) */}
               <TiltCard 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ pointerEvents: isLateScroll ? 'auto' : 'none' }}
                  className="h-[280px] relative rounded-3xl group bg-zinc-100/50 p-0 border-none overflow-hidden safari-gpu"
               >
                   <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
                   
                   <div className="relative h-full bg-white rounded-3xl border border-black/5 overflow-hidden flex flex-row items-stretch">
                      {/* Left Content */}
                      <div className="relative z-20 w-1/2 p-5 flex flex-col justify-center items-start shrink-0">
                         <div className="p-2.5 rounded-full mb-3 bg-orange-50/50 border border-orange-100/20">
                            <Globe className="w-5 h-5" style={{ color: COLORS.orange }} />
                         </div>
                         <div className="text-[24px] font-syne font-semibold tracking-tight mb-2 text-gray-900 leading-tight">
                            20+<br/>
                            <span className="text-gray-400">Countries</span>
                         </div>
                         <p className="text-[13px] font-inter font-light leading-[1.4] text-gray-500">
                           Global reach with localized assets.
                         </p>
                      </div>

                      {/* Right Image */}
                      <div className="absolute right-0 top-0 w-[55%] h-full overflow-hidden">
                         <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 origin-center">
                             <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/40 to-transparent w-full h-full" />
                             <img 
                                src="https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=1976&auto=format&fit=crop" 
                                alt="Global Reach"
                                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0"
                             />
                         </div>
                      </div>
                   </div>
               </TiltCard>

               {/* CARD B (Retention) */}
               <TiltCard 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  style={{ pointerEvents: isLateScroll ? 'auto' : 'none' }}
                  className="h-[280px] relative rounded-3xl group bg-gray-900 border-none overflow-hidden safari-gpu"
               >
                   <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} variant="white" />
                   
                   <div className="relative h-full bg-gray-900 rounded-[inherit] overflow-hidden">
                       
                       {/* VIDEO BACKGROUND */}
                       <div className="absolute inset-0 w-full h-full opacity-60">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover grayscale scale-105 group-hover:scale-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
                          >
                            <source src="https://videos.pexels.com/video-files/3191572/3191572-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                          </video>
                       </div>

                       {/* Gradient Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                       
                       {/* Content */}
                       <div className="relative z-10 text-white p-6 h-full flex flex-col justify-end">
                         <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-6xl font-syne font-semibold leading-none tracking-tighter">95%</span>
                           <ShieldCheck className="w-6 h-6 mb-2 text-white/80" />
                         </div>
                         <span className="text-[14px] font-inter font-light leading-[1.4] text-white/60">
                           Client retention rate over the last 12 months.
                         </span>
                       </div>
                   </div>
               </TiltCard>

            </motion.div>

            {/* FLOATING STATS */}
            <motion.div 
               style={{ y: yStats }}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ 
                 opacity: isLightMode ? 1 : 0,
                 scale: isLightMode ? 1 : 0.8,
                 transition: { 
                    duration: 0.3, 
                    delay: isLightMode ? 0.8 : 0 
                 }
               }}
               className="absolute -right-4 top-[20%] z-20 hidden lg:block pointer-events-none"
            >
              <StatBadge icon={Clapperboard} label="Ads Created" value="500+" isLight={isLightMode} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;