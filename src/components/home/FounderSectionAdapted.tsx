"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Play, Check, Globe, ShieldCheck, Zap, LayoutTemplate } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Asumiendo que usas shadcn o similar, si no, usa un button normal

// --- UTILS & CONSTANTS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Tu paleta de colores exacta
const BRAND_COLORS = {
  turquoise: "rgb(103, 188, 183)", // #67bcb7
  coral: "rgb(222, 131, 99)",     // #de8363
  gold: "rgb(237, 191, 134)",     // #edbf86
  white: "#ffffff",
};

// Fondo de Rayas (Marca de la casa)
const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- COMPONENTE GLOWING EFFECT (ADAPTADO A TU PALETA) ---
const BrandGlowingEffect = React.memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    borderWidth = 1,
  }: {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
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
        });
      },
      [inactiveZone, proximity]
    );

    useEffect(() => {
      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e as any);
      window.addEventListener("scroll", handleScroll, { passive: true } as any);
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true } as any);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove]);

    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            // AQUÍ ESTÁ LA MAGIA: Tu gradiente corporativo
            "--gradient": `radial-gradient(circle, ${BRAND_COLORS.gold} 10%, transparent 20%),
              radial-gradient(circle at 40% 40%, ${BRAND_COLORS.coral} 5%, transparent 15%),
              radial-gradient(circle at 60% 60%, ${BRAND_COLORS.turquoise} 10%, transparent 20%), 
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                ${BRAND_COLORS.gold} 0%,
                ${BRAND_COLORS.coral} 25%,
                ${BRAND_COLORS.turquoise} 50%, 
                ${BRAND_COLORS.gold} 100%
              )`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
          blur > 0 && "blur-[var(--blur)] "
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
    );
  }
);
BrandGlowingEffect.displayName = "BrandGlowingEffect";

// --- 3D TILT CARD (Clean Version) ---
const TiltCard = ({ 
  children, 
  className, 
  style,
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  style?: any,
  [key: string]: any
}) => {
  // Ajustamos la rigidez para que sea más sutil y elegante, menos "videojuego"
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 8); // Reducido de 10 a 8 para más sutileza
    y.set(yPct * -8);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        rotateY: x,
        rotateX: y,
        transformStyle: "preserve-3d",
        perspective: 1200,
        ...style 
      }}
      className={cn(
        "relative rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]", 
        className
      )}
      {...props}
    >
      {/* Texture Background Inside Card */}
      <BackgroundStripes />
      
      {children}
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export const FounderSectionAdapted = () => {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      
      {/* Global Background */}
      <BackgroundStripes />
      
      {/* Top Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-10" />

      {/* Decorative Blur Top Right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-50/40 to-white blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* LAYOUT GRID */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* --- LEFT COLUMN: CONTENT (Sticky) --- */}
          <div className="lg:w-[35%] lg:sticky lg:top-32 self-start">
            <div className="flex flex-col gap-8 pb-10">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-fit px-3 py-1 rounded-full border border-zinc-200 bg-gray-50/50 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]"
              >
                Leadership
              </motion.div>

              {/* Headline with Brand Gradient */}
              <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-[1.05] tracking-tight text-gray-900">
                Not just an agency. <br/>
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
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${BRAND_COLORS.gold}, ${BRAND_COLORS.coral}, ${BRAND_COLORS.turquoise}, rgba(255, 255, 255, 0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  Your Growth Partner.
                </motion.span>
              </h2>

              {/* Description */}
              <p className="text-[16px] leading-[1.6] text-gray-600 font-medium">
                We combine technical excellence with creative strategy. While others deliver files, we engineer ecosystems designed to scale your brand and dominate your market.
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  "Data-Driven Architecture",
                  "Omni-Channel Scalability",
                  "Performance-First Design"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgba(103,188,183,0.1)] text-[rgb(103,188,183)] group-hover:bg-[rgb(103,188,183)] group-hover:text-white transition-all duration-300">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-medium text-[15px] text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button (Styled to match OurStepsVersion2) */}
              <div className="mt-6">
                <Button 
                    size="lg"
                    className="group relative px-8 py-6 rounded-full font-medium text-[16px] overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none"
                    style={{ backgroundColor: BRAND_COLORS.coral }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    Start Growth Engine
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Button>
              </div>

            </div>
          </div>

          {/* --- RIGHT COLUMN: DYNAMIC BENTO GRID --- */}
          <div className="lg:w-[65%] w-full relative">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[minmax(240px,auto)]">

              {/* 
                 ITEM 1: FOUNDER CARD (Large Portrait)
              */}
              <TiltCard className="md:row-span-2 h-[500px] md:h-[600px] group relative z-10">
                {/* Custom Glowing Border */}
                <BrandGlowingEffect blur={10} borderWidth={2} proximity={100} spread={40} />

                <div className="absolute inset-0 bg-gray-100">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2144&auto=format&fit=crop" 
                    alt="Founder" 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full object-cover object-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                  
                  <div className="absolute bottom-6 left-6 right-6 z-30">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       <p className="text-white font-bold text-xl mb-1 relative z-10">Miguel (Director)</p>
                       <p className="text-white/80 text-sm font-medium tracking-wide relative z-10">Lead Architect & Strategist</p>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* 
                 ITEM 2: STATS CARD (Clean & Big)
              */}
              <TiltCard className="h-[280px] p-8 flex flex-col justify-between bg-white relative group">
                  <BrandGlowingEffect blur={0} borderWidth={1.5} proximity={80} spread={30} />
                  
                  <div className="flex justify-between items-start z-10 relative">
                     <div className="p-3 rounded-xl bg-orange-50 text-[rgb(222,131,99)] border border-orange-100">
                        <TrendingUp size={24} />
                     </div>
                     <span className="font-semibold text-xs uppercase tracking-wider text-gray-400">
                       Impact
                     </span>
                  </div>
                  <div className="z-10 relative">
                     <h3 className="text-6xl font-bold mb-3 text-gray-900 tracking-tighter">
                       4.5<span className="text-[rgb(222,131,99)]">x</span>
                     </h3>
                     <p className="text-sm font-medium text-gray-500 leading-relaxed">
                       Average ROAS across all managed partner campaigns in Q4 2024.
                     </p>
                  </div>
              </TiltCard>

              {/* 
                 ITEM 3: VIDEO REEL (Interactive)
              */}
              <TiltCard className="h-[300px] bg-gray-900 relative group cursor-pointer border-none overflow-hidden">
                  <BrandGlowingEffect blur={10} borderWidth={2} proximity={100} />
                  
                  <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                     <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src="https://videos.pexels.com/video-files/3196344/3196344-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                     </video>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                  
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30 group-hover:bg-[rgb(103,188,183)] group-hover:border-[rgb(103,188,183)]">
                        <Play fill="white" className="ml-1 text-white w-6 h-6" />
                     </div>
                  </div>
                  <div className="absolute bottom-5 left-5 z-20">
                     <span className="px-3 py-1.5 bg-black/60 backdrop-blur border border-white/10 rounded-lg text-white text-xs font-bold tracking-wide uppercase">
                        Watch Reel
                     </span>
                  </div>
              </TiltCard>

              {/* 
                 ITEM 4: PROCESS CARD (Gradient Background)
              */}
              <TiltCard className="md:col-span-2 p-8 flex flex-col md:flex-row items-center gap-8 border-none relative overflow-hidden">
                 {/* Gradient Background matching the brand */}
                 <div 
                    className="absolute inset-0 z-0" 
                    style={{
                        background: `linear-gradient(135deg, ${BRAND_COLORS.turquoise}, ${BRAND_COLORS.coral})`,
                        opacity: 0.95
                    }}
                 />
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay" />
                 
                 <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-3 mb-3 text-white/90">
                        <LayoutTemplate size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">The "One Workflow" System</span>
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-2">Eliminating Friction.</h3>
                    <p className="text-white/90 font-medium text-sm leading-relaxed max-w-lg">
                      We merge creative production directly with media buying logic. One team, one goal, zero wasted budget.
                    </p>
                 </div>
                 
                 <div className="flex gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-lg">
                       <Zap size={24} />
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-lg">
                       <ShieldCheck size={24} />
                    </div>
                 </div>
              </TiltCard>

               {/* 
                  ITEM 5: GLOBAL REACH (Image + Text)
               */}
               <TiltCard className="h-[260px] relative rounded-2xl group p-0 overflow-hidden">
                   <BrandGlowingEffect blur={5} borderWidth={1} proximity={60} />
                   
                   <div className="relative h-full flex flex-row items-stretch bg-white">
                      {/* Left Content */}
                      <div className="relative z-20 w-[55%] p-6 flex flex-col justify-center items-start shrink-0">
                         <div className="p-2.5 rounded-lg mb-4 bg-teal-50 border border-teal-100">
                            <Globe className="w-5 h-5" style={{ color: BRAND_COLORS.turquoise }} />
                         </div>
                         <div className="text-[28px] font-bold tracking-tight mb-2 text-gray-900 leading-none">
                            20+<br/>
                            <span className="text-gray-400 text-lg">Countries</span>
                         </div>
                         <p className="text-xs font-medium text-gray-500 leading-normal">
                           Global reach with localized assets & strategy.
                         </p>
                      </div>

                      {/* Right Image */}
                      <div className="absolute right-0 top-0 w-[50%] h-full overflow-hidden">
                         <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 origin-center">
                             {/* Gradient Fade to Blend */}
                             <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/20 to-transparent w-full h-full" />
                             <img 
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                                alt="Global Reach"
                                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0"
                             />
                         </div>
                      </div>
                   </div>
               </TiltCard>

               {/* 
                  ITEM 6: RETENTION (Gradient Number)
               */}
               <TiltCard className="h-[260px] relative rounded-2xl group bg-white border border-zinc-200 overflow-hidden">
                   <BrandGlowingEffect blur={0} borderWidth={1.5} proximity={80} />
                   
                   <div className="relative h-full p-6 flex flex-col justify-end">
                       {/* Background Pattern */}
                       <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldCheck size={80} />
                       </div>

                       <div className="relative z-10">
                         <div className="flex items-baseline gap-1 mb-2">
                           <span 
                              className="text-7xl font-bold leading-none tracking-tighter"
                              style={{
                                backgroundImage: `linear-gradient(135deg, ${BRAND_COLORS.gold}, ${BRAND_COLORS.coral})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                              }}
                           >
                            95%
                           </span>
                         </div>
                         <div className="h-1 w-12 rounded-full mb-3" style={{ background: BRAND_COLORS.turquoise }} />
                         <span className="text-sm font-semibold text-gray-600 leading-tight block max-w-[80%]">
                           Client retention rate over the last 12 months.
                         </span>
                       </div>
                   </div>
               </TiltCard>

            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
};

export default FounderSectionAdapted;