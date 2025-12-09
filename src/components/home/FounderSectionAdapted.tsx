import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Clapperboard, Zap, Play, Check, Globe, ShieldCheck, Code2, Cpu } from 'lucide-react';

// --- UTILS & COLORS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const COLORS = {
  turquoise: "rgb(103, 188, 183)", // #67bcb7
  coral: "rgb(222, 131, 99)",     // #de8363
  gold: "rgb(237, 191, 134)",     // #edbf86
};

// --- BACKGROUND COMPONENT ---
const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- GLOWING EFFECT (Adapted from your reference) ---
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

// --- TECH CARD COMPONENT (Straight Corners & Glow) ---
const TechCard = ({ 
  children, 
  className, 
  layoutId,
  animate,       
  initial,       
  transition,    
  style,
  noBorder = false,
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  layoutId?: string,
  animate?: any,
  initial?: any,
  transition?: any,
  style?: any,
  noBorder?: boolean,
  [key: string]: any
}) => {
  return (
    <motion.div
      layout
      {...(layoutId ? { layoutId } : {})}
      initial={initial}
      animate={animate}
      transition={transition || { layout: { duration: 0.8, ease: "easeInOut" } }} 
      style={style}
      className={cn(
        "relative overflow-hidden bg-white/80 backdrop-blur-sm transition-all duration-300 group rounded-none", // ROUNDED-NONE for straight corners
        !noBorder && "border border-zinc-200 hover:border-zinc-300 hover:shadow-lg",
        className
      )}
      {...props}
    >
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 h-full">
            {children}
        </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export const FounderSectionAdapted = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States adapted for logic
  const [isCompactMode, setIsCompactMode] = useState(false); // Was isLightMode
  const [isLateScroll, setIsLateScroll] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Trigger layout change (Miguel card shrinks)
    if (latest > 0.35 && !isCompactMode) {
      setIsCompactMode(true);
    } else if (latest <= 0.35 && isCompactMode) {
      setIsCompactMode(false);
    }

    // Trigger bottom cards appearance
    if (latest > 0.60 && !isLateScroll) {
      setIsLateScroll(true);
    } else if (latest < 0.50 && isLateScroll) {
      setIsLateScroll(false);
    }
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-24 lg:py-32 bg-white overflow-visible"
    >
      {/* Top Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-10" />
      
      {/* Background Pattern */}
      <BackgroundStripes />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* LAYOUT GRID */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: STICKY --- */}
          <div className="lg:w-[40%] sticky top-32 z-20">
            <div className="flex flex-col gap-8 pb-10">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500"
              >
                The Architect
              </motion.div>

              {/* Headline */}
              <h2 className="text-[42px] md:text-[52px] lg:text-[64px] font-bold leading-[1] tracking-[-0.03em] text-gray-900">
                I don't just code. <br/>
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
                  I engineer growth.
                </motion.span>
              </h2>

              {/* Description */}
              <p className="text-[18px] leading-[1.6] text-gray-600 font-medium max-w-md">
                Most agencies deliver code. We deliver <strong className="text-gray-900">Performance</strong>. 
                Our workflow integrates high-end React architecture, pixel-perfect UI, and conversion logic into one cohesive growth engine.
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  "Performance-First Architecture",
                  "Direct Response UX/UI",
                  "Scalable React Ecosystems"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-zinc-100 group-hover:bg-[rgb(103,188,183)] transition-colors duration-300 text-[rgb(103,188,183)] group-hover:text-white">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-medium text-[15px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6">
                <button 
                   className="group relative px-8 py-4 bg-gray-900 text-white text-[16px] font-bold overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-black rounded-none"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Initialize System
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
               className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(200px,auto)]"
            >

              {/* 
                 ITEM 1: MIGUEL CARD (The Resizable One)
                 Logic: Starts wide (col-span-2), shrinks to col-span-1 on scroll.
              */}
              <TechCard 
                layoutId="founder-card"
                onLayoutAnimationStart={() => setIsResizing(true)}
                onLayoutAnimationComplete={() => setIsResizing(false)}
                transition={{ layout: { duration: 0.8, ease: "easeInOut" } }}
                className={cn(
                   "md:row-span-2 h-[450px] md:h-[600px] relative z-10 border-zinc-200",
                   isCompactMode ? "md:col-span-1" : "md:col-span-2"
                )}
              >
                {/* Blur Overlay during resize */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isResizing ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-40 bg-white/60 backdrop-blur-xl pointer-events-none"
                />

                <div className="absolute inset-0 bg-zinc-100">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" 
                    alt="Founder" 
                    animate={{ scale: isCompactMode ? 1.1 : 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full object-cover object-center grayscale-[100%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-0 left-0 right-0 z-30 p-6 bg-white/90 border-t border-zinc-200 backdrop-blur-md">
                       <p className="text-gray-900 font-bold text-lg leading-none">Miguel (Founder)</p>
                       <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">Lead Architect</p>
                  </div>
                </div>
              </TechCard>

              {/* ITEMS 2 & 3: STATS & VIDEO (Appear when card shrinks) */}
              <AnimatePresence mode="popLayout">
                 {isCompactMode && (
                    <>
                       {/* ITEM 2: Performance Stat */}
                       <TechCard 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                          className="h-[280px] p-6 flex flex-col justify-between bg-white relative"
                       >
                          {/* Decorative blur blob */}
                          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[rgb(222,131,99)] blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="p-3 bg-[rgb(222,131,99)]/10 border border-[rgb(222,131,99)]/20 text-[rgb(222,131,99)]">
                                <TrendingUp size={24} />
                             </div>
                             <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                               Velocity
                             </span>
                          </div>
                          <div className="z-10">
                             <h3 className="text-5xl font-bold mb-2 text-gray-900">98<span className="text-[rgb(222,131,99)]">/100</span></h3>
                             <p className="text-sm text-gray-500 leading-relaxed">
                               Average Lighthouse Performance score across all deployed applications.
                             </p>
                          </div>
                       </TechCard>

                       {/* ITEM 3: Video Reel */}
                       <TechCard 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="h-[300px] bg-zinc-900 relative cursor-pointer border-zinc-800"
                       >
                          <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                             <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
                                <source src="https://videos.pexels.com/video-files/5854659/5854659-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                             </video>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10 rounded-full">
                                <Play fill="white" className="ml-1 text-white" />
                             </div>
                          </div>
                          <div className="absolute bottom-5 left-5">
                             <span className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 text-white text-xs font-medium uppercase tracking-wider">
                                View Case Study
                             </span>
                          </div>
                       </TechCard>
                    </>
                 )}
              </AnimatePresence>

              {/* ITEM 4: PROCESS CARD (Always visible) */}
              <TechCard className="md:col-span-2 p-8 flex flex-col md:flex-row items-center gap-8 bg-zinc-50 border-zinc-200">
                 <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-2xl mb-2">The "Atomic" Component System</h3>
                    <p className="text-gray-600 font-medium">
                      We eliminate technical debt before it starts. Modular, reusable, and scalable architecture from day one.
                    </p>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-gray-900">
                       <Cpu size={20} />
                    </div>
                    <div className="w-12 h-12 bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-gray-900">
                       <Code2 size={20} />
                    </div>
                 </div>
              </TechCard>

              {/* TARJETAS INFERIORES (Aparecen con Late Scroll) */}
              
               {/* CARD A (Global) */}
               <TechCard 
                  initial={{ opacity: 0, y: 40 }}
                  animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ pointerEvents: isLateScroll ? 'auto' : 'none' }}
                  className="h-[280px] p-0"
                  noBorder
               >
                   <div className="relative h-full bg-white border border-zinc-200 overflow-hidden flex flex-row items-stretch">
                      {/* Left Content */}
                      <div className="relative z-20 w-1/2 p-6 flex flex-col justify-center items-start shrink-0">
                         <div className="p-2.5 mb-3 bg-[rgb(237,191,134)]/10 border border-[rgb(237,191,134)]/20">
                            <Globe className="w-5 h-5" style={{ color: COLORS.gold }} />
                         </div>
                         <div className="text-[24px] font-bold tracking-tight mb-2 text-gray-900 leading-tight">
                            20+<br/>
                            <span className="text-gray-400">Countries</span>
                         </div>
                         <p className="text-[13px] font-medium leading-[1.4] text-gray-500">
                           Global deployment via Edge Networks.
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
               </TechCard>

               {/* CARD B (Retention) */}
               <TechCard 
                  initial={{ opacity: 0, y: 40 }}
                  animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                  style={{ pointerEvents: isLateScroll ? 'auto' : 'none' }}
                  className="h-[280px] bg-gray-900 border-none"
                  noBorder
               >
                   <div className="relative h-full bg-gray-900 overflow-hidden">
                       
                       {/* VIDEO BACKGROUND */}
                       <div className="absolute inset-0 w-full h-full opacity-40">
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
                           <span className="text-6xl font-bold leading-none tracking-tighter text-white">99.9%</span>
                           <ShieldCheck className="w-6 h-6 mb-2 text-zinc-400" />
                         </div>
                         <span className="text-[14px] font-medium leading-[1.4] text-zinc-400">
                           Uptime guarantee for all managed client applications.
                         </span>
                       </div>
                   </div>
               </TechCard>

            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
};

export default FounderSectionAdapted;