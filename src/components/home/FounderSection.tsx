import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Clapperboard, Zap, Play, Check, Globe, ShieldCheck, Map } from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  .font-sans { font-family: 'Inter', sans-serif; }
  
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
  turquoise: "#67bcb7",
  coral: "#de8363",
  gold: "#edbf86",
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
                radial-gradient(circle at 40% 40%, ${COLORS.coral} 5%, #DE836300 15%),
                radial-gradient(circle at 60% 60%, ${COLORS.turquoise} 10%, #67BCB700 20%), 
                radial-gradient(circle at 40% 60%, #94A3B8 10%, #94A3B800 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  ${COLORS.gold} 0%,
                  ${COLORS.coral} calc(25% / var(--repeating-conic-gradient-times)),
                  ${COLORS.turquoise} calc(50% / var(--repeating-conic-gradient-times)), 
                  #94A3B8 calc(75% / var(--repeating-conic-gradient-times)),
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
  innerClassName,
  layoutId,
  animate,       
  initial,       
  transition,    
  style,
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  innerClassName?: string,
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
      className={cn("relative rounded-none p-[2px] transition-colors duration-300 safari-gpu will-change-transform", className)}
      {...props} 
    >
      <GlowingEffect 
        spread={40} 
        glow={true} 
        disabled={false} 
        proximity={64} 
        inactiveZone={0.01} 
        borderWidth={2} 
      />

      <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>
        {children}
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENTS ---
const StatBadge = ({ icon: Icon, label, value, isLight }: { icon: any, label: string, value: string, isLight: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-none border backdrop-blur-md transition-colors duration-300",
    isLight 
      ? "bg-white/80 border-zinc-200 shadow-sm" 
      : "bg-white/5 border-white/10"
  )}>
    <div className="p-2 rounded-none bg-zinc-100 text-gray-900">
      <Icon size={16} />
    </div>
    <div>
      <div className={cn("font-sans font-bold text-lg leading-none transition-colors duration-0", isLight ? "text-gray-900" : "text-white")}>
        {value}
      </div>
      <div className="font-sans text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
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
    if (latest > 0.35 && !isLightMode) {
      setIsLightMode(true);
    } else if (latest <= 0.35 && isLightMode) {
      setIsLightMode(false);
    }

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
        "relative w-full py-24 lg:py-32 transition-colors duration-0 z-10 font-sans", 
        isLightMode ? "bg-white" : "bg-[#050505]"
      )}
    >
      <style>{fontStyles}</style>

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className={cn("absolute right-[-10%] top-[20%] w-[600px] h-[600px] bg-[#D84315] blur-[150px] opacity-20 animate-pulse rounded-none transition-opacity duration-0", isLightMode ? "opacity-0" : "opacity-20")} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* LAYOUT GRID */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: STICKY --- */}
          <div className="lg:w-[40%] sticky top-32">
            <div className="flex flex-col gap-6 pb-10">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={cn(
                  "w-fit px-3 py-1.5 rounded-none border text-[10px] font-sans font-semibold uppercase tracking-[2px] transition-colors duration-300",
                  isLightMode 
                    ? "bg-zinc-50 border-zinc-200 text-gray-500" 
                    : "bg-white/5 border-white/10 text-gray-400"
                )}
              >
                GROWTH PARTNERS
              </motion.div>

              {/* Headline - ACTUALIZADO CON GRADIENTE ANIMADO */}
              <h2 className={cn(
                "font-sans font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight transition-colors duration-0",
                isLightMode ? "text-gray-900" : "text-white"
              )}>
                Australia's unfair advantage for{' '}
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
                  explosive growth.
                </motion.span>
              </h2>

              {/* Description */}
              <p className={cn(
                "font-sans text-[15px] leading-[1.6] font-medium transition-colors duration-0 max-w-sm",
                isLightMode ? "text-gray-500" : "text-gray-400"
              )}>
                Client Connect Australia isn't just another agency. We are your data-driven partners in <strong className={isLightMode ? "text-gray-900" : "text-white"}>Profitable Scaling</strong>. 
                We integrate paid media, creative, and retention into one national growth engine.
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  "National Acquisition Strategy",
                  "Conversion Rate Optimization",
                  "Australian Market Expertise"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <div className={cn(
                      "w-5 h-5 rounded-none flex items-center justify-center transition-all duration-300",
                      isLightMode ? "bg-zinc-900 text-white" : "bg-white text-black"
                    )}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className={cn(
                      "font-sans font-medium text-[14px] transition-colors duration-0",
                      isLightMode ? "text-gray-700" : "text-gray-300"
                    )}>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-4">
                <button className={cn(
                   "group relative px-6 py-3.5 rounded-none font-sans font-semibold text-[14px] overflow-hidden transition-all duration-300 border",
                   isLightMode 
                     ? "bg-zinc-900 text-white border-zinc-900 hover:shadow-lg hover:scale-[1.01]" 
                     : "bg-white text-black border-white hover:bg-zinc-200"
                )}>
                  <span className="relative z-10 flex items-center gap-2">
                    Start Scaling
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
                 ITEM 1: MAIN IMAGE CARD - ACTUALIZADA A FOTO DE EQUIPO
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
                   "md:row-span-2 h-[450px] md:h-[600px] group relative z-10 safari-gpu",
                   isLightMode ? "md:col-span-1" : "md:col-span-2"
                )}
                innerClassName={cn(
                  "border",
                  isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10"
                )}
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isResizing ? 1 : 0 }}
                  transition={{ duration: 0.15 }} 
                  className="absolute inset-0 z-40 bg-white/60 pointer-events-none"
                />

                <div className="absolute inset-0 bg-gray-900 overflow-hidden rounded-none">
                  {/* PHOTO UPDATE: Professional Team Photo */}
                  <motion.img 
                    layout
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                    alt="Client Connect Australia Team" 
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
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-none">
                       <p className="text-white font-sans font-bold text-base">The Connect Team</p>
                       <p className="text-white/60 font-sans text-[11px]">Your Australian Growth Partners</p>
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
                        className="h-[280px] group safari-gpu"
                        innerClassName="p-6 flex flex-col justify-between bg-white border border-zinc-200"
                       >
                          <div className="absolute -right-10 -top-10 w-32 h-32 bg-zinc-200 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                          <div className="flex justify-between items-start z-10">
                             <div className="p-3 bg-zinc-900 rounded-none text-white">
                                <TrendingUp size={24} />
                             </div>
                             <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-gray-400">
                               Results
                             </span>
                          </div>
                          <div className="z-10">
                             <h3 className="text-4xl font-sans font-bold mb-2 text-gray-900">4.5x</h3>
                             <p className="font-sans text-xs text-gray-500 font-medium">
                               Average ROAS for our Australian partners.
                             </p>
                          </div>
                       </TiltCard>

                       {/* ITEM 3 */}
                       <TiltCard 
                        layout="position"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                        className="h-[300px] group cursor-pointer safari-gpu"
                        innerClassName="bg-black border border-zinc-800"
                       >
                          <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                             <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src="https://videos.pexels.com/video-files/5854659/5854659-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                             </video>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-none flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                                <Play fill="white" className="ml-1 text-white" />
                             </div>
                          </div>
                          <div className="absolute bottom-5 left-5">
                             <span className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded-none text-white text-[11px] font-sans font-medium">
                                View Case Studies
                             </span>
                          </div>
                       </TiltCard>
                    </>
                 )}
              </AnimatePresence>

              {/* ITEM 4: PROCESS CARD */}
              <TiltCard 
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} 
                animate={isLightMode 
                    ? { opacity: 1, y: 0, filter: "blur(0px)" } 
                    : { opacity: 0, y: 20, filter: "blur(10px)" }
                }
                transition={{
                    duration: isLightMode ? 0.5 : 0, 
                    delay: isLightMode ? 0.5 : 0, 
                    ease: "easeOut"
                }}
                className={cn(
                  "md:col-span-2 group safari-gpu"
                )}
                innerClassName={cn(
                  "p-8 flex flex-col md:flex-row items-center gap-8 transition-colors duration-0 border",
                  isLightMode 
                    ? "bg-white border-zinc-200" 
                    : "bg-zinc-900 border-zinc-800"
                )}
              >
                 <div className="flex-1">
                    <h3 className={cn("font-sans font-bold text-xl mb-2", isLightMode ? "text-gray-900" : "text-white")}>The Ecosystem</h3>
                    <p className={cn("font-sans font-medium text-sm", isLightMode ? "text-gray-500" : "text-white/70")}>
                      We eliminate friction. Paid media, creative, and email marketing integrated into one goal: Zero wasted budget.
                    </p>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-none bg-zinc-100 flex items-center justify-center text-gray-900">
                       <Zap size={20} />
                    </div>
                    <div className="w-12 h-12 rounded-none bg-zinc-100 flex items-center justify-center text-gray-900">
                       <Clapperboard size={20} />
                    </div>
                 </div>
              </TiltCard>

              {/* TARJETAS INFERIORES */}
               {/* CARD A (National - UPDATED) */}
               <TiltCard 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ pointerEvents: isLateScroll ? 'auto' : 'none' }}
                  className="h-[280px] group safari-gpu"
                  innerClassName="bg-white border border-zinc-200 flex flex-row items-stretch"
               >
                   <div className="relative z-20 w-1/2 p-5 flex flex-col justify-center items-start shrink-0">
                      <div className="p-2.5 rounded-none mb-3 bg-zinc-50 border border-zinc-100">
                         {/* UPDATE ICON: Map icon for Australian Scale */}
                         <Map className="w-5 h-5 text-gray-900" />
                      </div>
                      <div className="text-[20px] font-sans font-semibold tracking-tight mb-2 text-gray-900 leading-tight">
                         National<br/>
                         <span className="text-gray-400">Scale</span>
                      </div>
                      <p className="text-[12px] font-sans font-medium leading-[1.4] text-gray-500">
                        Scaling campaigns across every state and territory.
                      </p>
                   </div>

                   <div className="absolute right-0 top-0 w-[55%] h-full overflow-hidden">
                      <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 origin-center">
                          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/40 to-transparent w-full h-full" />
                          {/* UPDATE IMAGE: Sydney/Australia Aerial View */}
                          <img 
                             src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop" 
                             alt="Australian National Reach"
                             className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0"
                          />
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
                  className="h-[280px] group safari-gpu"
                  innerClassName="bg-zinc-900 border border-zinc-800"
               >
                   <div className="relative h-full w-full">
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

                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                       
                       <div className="relative z-10 text-white p-6 h-full flex flex-col justify-end">
                         <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-5xl font-sans font-semibold leading-none tracking-tighter">95%</span>
                           <ShieldCheck className="w-6 h-6 mb-2 text-white/80" />
                         </div>
                         <span className="text-[12px] font-sans font-medium leading-[1.4] text-white/60">
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
              <StatBadge icon={Clapperboard} label="Campaigns Launched" value="500+" isLight={isLightMode} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;