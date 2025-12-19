import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Play, Check, PlusIcon, HeartHandshake, Users, MessageCircleHeart, ShieldCheck, Smile, X, Globe, MapPin, Search, Clock } from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }

  @keyframes move-horizontal {
    0% { left: 10%; }
    100% { left: 90%; }
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
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  gold: "#edbf86",
};

// --- LOGO CLOUD COMPONENTS (MANTENIDO IGUAL) ---
type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

function LogoCard({ logo, className, children, isLightMode }: { logo: Logo, className?: string, children?: React.ReactNode, isLightMode: boolean }) {
  return (
    <div className={cn("flex items-center justify-center px-4 py-8 md:p-8 transition-colors duration-500", className)}>
      <img
        alt={logo.alt}
        className={cn("pointer-events-none h-4 select-none md:h-5 transition-all duration-500", !isLightMode && "brightness-0 invert")}
        height={logo.height || "auto"}
        src={logo.src}
        width={logo.width || "auto"}
      />
      {children}
    </div>
  );
}

export function LogoCloud({ isLightMode }: { isLightMode: boolean }) {
  const borderColor = isLightMode ? "border-zinc-200" : "border-white/10";
  const iconColor = isLightMode ? "text-zinc-300" : "text-white/20";
  const bgAlt = isLightMode ? "bg-white" : "bg-white/5";

  return (
    <div className={cn("relative grid grid-cols-2 border-x md:grid-cols-4 transition-colors duration-500 mb-20", borderColor)}>
      <div className={cn("-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t", borderColor)} />
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b", bgAlt, borderColor)} logo={{ src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia Logo" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>
      <LogoCard isLightMode={isLightMode} className={cn("border-b md:border-r", borderColor)} logo={{ src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase Logo" }} />
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b md:bg-transparent", borderColor, isLightMode ? "md:bg-white" : "md:bg-white/5")} logo={{ src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub Logo" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
        <PlusIcon className={cn("-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>
      <LogoCard isLightMode={isLightMode} className={cn("relative border-b", borderColor, bgAlt, isLightMode ? "md:bg-transparent" : "md:bg-transparent")} logo={{ src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI Logo" }} />
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b md:border-b-0", bgAlt, borderColor, isLightMode ? "md:bg-transparent" : "md:bg-transparent")} logo={{ src: "https://svgl.app/library/turso-wordmark-light.svg", alt: "Turso Logo" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>
      <LogoCard isLightMode={isLightMode} className={cn("border-b md:border-r md:border-b-0", borderColor, isLightMode ? "md:bg-white" : "md:bg-white/5")} logo={{ src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk Logo" }} />
      <LogoCard isLightMode={isLightMode} className={cn("border-r", borderColor)} logo={{ src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude AI Logo" }} />
      <LogoCard isLightMode={isLightMode} className={cn(bgAlt)} logo={{ src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel Logo" }} />
      <div className={cn("-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b", borderColor)} />
    </div>
  );
}

// --- LOGO COMPONENTS PARA ECOSYSTEM ---
const InstagramLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f58529" /><stop offset="50%" stopColor="#dd2a7b" /><stop offset="100%" stopColor="#8134af" />
      </linearGradient>
    </defs>
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" fill="url(#instagram-gradient)"/>
  </svg>
);

const GoogleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// --- COMPONENTE GLOWING EFFECT ---
const GlowingEffect = React.memo(({ blur = 0, inactiveZone = 0.7, proximity = 0, spread = 20, glow = false, className, movementDuration = 2, borderWidth = 1, disabled = true }: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = React.useCallback((e?: any) => {
        if (!containerRef.current) return;
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;
          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;
          if (e) lastPosition.current = { x: mouseX, y: mouseY };
          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
          if (distanceFromCenter < inactiveRadius) { element.style.setProperty("--active", "0"); return; }
          const isActive = mouseX > left - proximity && mouseX < left + width + proximity && mouseY > top - proximity && mouseY < top + height + proximity;
          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;
          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;
          animate(currentAngle, newAngle, { duration: movementDuration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => element.style.setProperty("--start", String(v)) });
        });
    }, [inactiveZone, proximity, movementDuration]);

    useEffect(() => {
      if (disabled) return;
      const handleScroll = () => handleMove();
      const handlePointerMove = (e: any) => handleMove(e);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
      return () => { window.removeEventListener("scroll", handleScroll); document.body.removeEventListener("pointermove", handlePointerMove); };
    }, [handleMove, disabled]);

    return (
      <div ref={containerRef} style={{ "--blur": `${blur}px`, "--spread": spread, "--start": "0", "--active": "0", "--glowingeffect-border-width": `${borderWidth}px`, "--repeating-conic-gradient-times": "5", "--gradient": `radial-gradient(circle, ${COLORS.emerald} 10%, #34d39900 20%), radial-gradient(circle at 40% 40%, ${COLORS.emerald} 5%, #34d39900 15%), radial-gradient(circle at 60% 60%, ${COLORS.cyan} 10%, #06b6d400 20%), radial-gradient(circle at 40% 60%, ${COLORS.cyan} 10%, #06b6d400 20%), repeating-conic-gradient(from 236.84deg at 50% 50%, ${COLORS.emerald} 0%, ${COLORS.cyan} calc(25% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(50% / var(--repeating-conic-gradient-times)), ${COLORS.cyan} calc(75% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(100% / var(--repeating-conic-gradient-times)))` } as React.CSSProperties} className={cn("pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity", glow && "opacity-100", blur > 0 && "blur-[var(--blur)]", className, disabled && "!hidden")}>
          <div className="glow rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]" />
      </div>
    );
});

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className, innerClassName, layoutId, initial, animate, transition, style, ...props }: any) => {
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  const handleMove = (e: any) => { const rect = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - rect.left) / rect.width - 0.5 * 10); y.set(((e.clientY - rect.top) / rect.height - 0.5) * -10); };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div layoutId={layoutId} onMouseMove={handleMove} onMouseLeave={handleLeave} initial={initial || { opacity: 0, scale: 0.9 }} animate={animate || { opacity: 1, scale: 1 }} transition={transition || { layout: ANIMATION_CONFIG, opacity: { duration: 0.5 } }} style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d", perspective: 1000, ...style }} className={cn("relative rounded-none p-[2px] transition-colors duration-300 safari-gpu", className)} {...props}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>{children}</div>
    </motion.div>
  );
};

// --- SUB-COMPONENTS ---
const StatBadge = ({ icon: Icon, label, value, isLight }: any) => (
  <div className={cn("flex items-center gap-3 px-4 py-3 rounded-none border backdrop-blur-md transition-colors duration-300", isLight ? "bg-white/80 border-zinc-200 shadow-sm" : "bg-white/5 border-white/10")}>
    <div className="p-2 rounded-none bg-zinc-100 text-gray-900"><Icon size={16} /></div>
    <div>
      <div className={cn("font-sans font-bold text-lg leading-none transition-colors duration-0", isLight ? "text-gray-900" : "text-white")}>{value}</div>
      <div className="font-sans text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
    </div>
  </div>
);

const LogoContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-full flex items-center justify-center shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.12)_inset,0px_10px_14px_-8px_rgba(0,0,0,0.25)] ${className}`} {...props} />
));

function AnimatedLogos({ isLightMode }: { isLightMode: boolean }) {
  const icons = [ { icon: <InstagramLogo className="h-4 w-4" />, size: "sm" as const }, { icon: <GoogleLogo className="h-5 w-5" />, size: "md" as const } ];
  useEffect(() => {
    const sequence = icons.map((_, i) => [`.logo-circle-${i + 1}`, { scale: [1, 1.1, 1], translateY: [0, -4, 0] }, { duration: 0.8 }]);
    const run = async () => { while (true) { await animate(sequence as any); await new Promise(r => setTimeout(r, 1000)); } };
    run();
  }, []);

  return (
    <div className="overflow-hidden h-full relative flex items-center justify-center w-full">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        {icons.map((icon, i) => (
          <LogoContainer key={i} className={`${i === 0 ? 'h-8 w-8' : 'h-10 w-10'} logo-circle-${i + 1} ${isLightMode ? "bg-white/90" : "bg-neutral-800/80"}`}>{icon.icon}</LogoContainer>
        ))}
      </div>
    </div>
  );
}

// --- PROFIT CHART (SIMPLIFICADO) ---
const ProfitChart = () => (
  <div className="absolute inset-0 w-full h-full opacity-50 overflow-hidden" style={{ maskImage: 'linear-gradient(to top, transparent, black)' }}>
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
      <motion.path d="M0,180 Q50,150 100,160 T200,80 T300,90 T400,20" fill="none" stroke={COLORS.emerald} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
    </svg>
  </div>
);

// --- MAIN COMPONENT ---
export const WhatWeDoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLateScroll, setIsLateScroll] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.30 && !isLightMode) setIsLightMode(true);
    else if (latest <= 0.30 && isLightMode) setIsLightMode(false);
    if (latest > 0.60 && !isLateScroll) setIsLateScroll(true);
    else if (latest < 0.50 && isLateScroll) setIsLateScroll(false);
  });

  const yStats = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className={cn("relative w-full py-24 lg:py-32 transition-colors duration-0 z-10 font-sans", isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]")}>
      <style>{fontStyles}</style>

      {/* 1. LOGO CLOUD (IGUAL AL ORIGINAL) */}
      <div className="absolute top-0 left-0 w-full z-50">
         <LogoCloud isLightMode={isLightMode} />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div animate={{ backgroundColor: [COLORS.emerald, COLORS.cyan, COLORS.emerald] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className={cn("absolute right-[-10%] top-[20%] w-[600px] h-[600px] blur-[150px] rounded-none transition-opacity duration-500", isLightMode ? "opacity-10" : "opacity-20")} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* --- HEADLINE & INTRO COPY --- */}
        <div className="mt-40 mb-24 max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className={cn("w-fit px-3 py-1.5 mb-6 border text-[10px] font-sans font-semibold uppercase tracking-[2px] transition-colors duration-300", isLightMode ? "bg-zinc-50 border-zinc-200 text-gray-500" : "bg-white/5 border-white/10 text-gray-400")}>
                SECTION 2: WHAT WE DO DIFFERENTLY
            </motion.div>

            <h2 className={cn("font-sans font-bold text-[32px] md:text-[56px] leading-[1] tracking-tighter mb-8 transition-colors duration-0", isLightMode ? "text-gray-900" : "text-white")}>
                We Handle Everything. Because We've Been <span className="text-emerald-500">Burned By Agencies</span> That Don't.
            </h2>

            <p className={cn("text-xl md:text-2xl font-medium mb-12 max-w-3xl", isLightMode ? "text-gray-600" : "text-gray-400")}>
                Most agencies do websites OR ads. Never both. And they sure as hell don't understand what a tradie actually needs to get jobs. <span className={isLightMode ? "text-gray-900" : "text-white"}>We do. Because we ARE tradies.</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { id: "01", name: "Agency #1", text: "Beautiful $8K website. Got zero leads. Just a pretty brochure no one saw." },
                    { id: "02", name: "Agency #2", text: "$12K in Ads. Got clicks, but the website was so shit no one called. They blamed us." },
                    { id: "03", name: "Agency #3", text: "SEO experts showing vanity metrics. Ranking for keywords no one searches. Zero jobs." }
                ].map((item) => (
                    <div key={item.id} className={cn("p-6 border transition-all", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                        <div className="text-emerald-500 font-bold text-xs mb-2 uppercase tracking-widest">{item.name}</div>
                        <p className={cn("text-sm leading-relaxed", isLightMode ? "text-gray-600" : "text-gray-400")}>{item.text}</p>
                    </div>
                ))}
            </div>
            
            <div className={cn("mt-10 p-6 border-l-2 border-emerald-500 font-medium italic text-lg", isLightMode ? "text-gray-700 bg-zinc-100" : "text-gray-300 bg-white/5")}>
                "We learned the hard way: You need BOTH the foundation AND the fuel. And someone who actually understands how a tradie closes jobs."
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* --- IZQUIERDA: BLOQUE 1 TEXTO --- */}
          <div className="lg:w-[40%] sticky top-32">
            <div className="flex flex-col gap-6 pb-10">
              <h3 className={cn("font-sans font-bold text-[32px] md:text-[40px] leading-[1.1] tracking-tight transition-colors duration-0", isLightMode ? "text-gray-900" : "text-white")}>
                Bloque 1: <br/>
                <span className="text-emerald-500">The Foundation</span>
              </h3>

              <p className={cn("font-sans text-[16px] leading-[1.6] font-medium transition-colors duration-0 max-w-sm", isLightMode ? "text-gray-500" : "text-gray-400")}>
                <strong>First, We Fix What's Broken.</strong> Most tradies are invisible because of the stuff agencies ignore. We've lived through every mistake, and we know exactly what to fix.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {[
                    "Conversion-Focused Websites",
                    "GMB Domination (Local Rank)",
                    "Technical SEO & Call Tracking"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn("w-5 h-5 rounded-none flex items-center justify-center transition-all duration-300", isLightMode ? "bg-zinc-900 text-white" : "bg-white text-black")}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className={cn("font-sans font-medium text-[14px] transition-colors duration-0", isLightMode ? "text-gray-700" : "text-gray-300")}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button className="group relative h-[52px] px-8 py-3 flex items-center justify-center gap-2 rounded-none font-sans font-semibold text-[14px] border backdrop-blur-sm transition-all duration-500 bg-emerald-500 text-black border-emerald-500 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  Fix My Foundation <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>

          {/* --- DERECHA: TARJETAS BLOQUE 1 --- */}
          <div className="lg:w-[60%] relative">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[minmax(200px,auto)]">

              {/* CARD 1: PAINKILLER IMAGE */}
              <TiltCard layoutId="main-card" className={cn("md:row-span-2 h-[450px] md:h-[600px] group relative z-10", isLightMode ? "md:col-span-1" : "md:col-span-2")} innerClassName={cn("border", isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10")}>
                <div className="absolute inset-0 bg-gray-900 overflow-hidden rounded-none">
                  <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop" alt="Tradie working" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 z-30">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-none">
                       <p className="text-white font-sans font-bold text-xl uppercase tracking-tighter">Fixing what's broken</p>
                       <p className="text-white/70 font-sans text-xs mt-2 italic">"We build what we'd want to use ourselves."</p>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* CARD 2: WEBSITE CONVERSION */}
              <AnimatePresence mode="popLayout">
                 {isLightMode && (
                    <>
                       <TiltCard className="h-[280px] group cursor-default" innerClassName="bg-white border border-zinc-200 p-8 flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center mb-4"><Globe size={20} className="text-emerald-500" /></div>
                            <h4 className="text-xl font-bold tracking-tight text-gray-900">Lead Machine Website</h4>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">Fast loading (under 2s), mobile-first, and phone numbers visible everywhere. <strong>Built in 48 hours.</strong></p>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest"><Check size={12}/> Conversion Focus</div>
                       </TiltCard>

                       {/* CARD 3: GMB DOMINATION */}
                       <TiltCard className="h-[280px] group cursor-default" innerClassName="bg-white border border-zinc-200 p-8 flex flex-col justify-between">
                          <div>
                            <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center mb-4"><MapPin size={20} className="text-cyan-500" /></div>
                            <h4 className="text-xl font-bold tracking-tight text-gray-900">GMB Domination</h4>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">Optimization of every field Google looks at. Review generation system. Be in the top 3, not page 2.</p>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 uppercase tracking-widest"><Check size={12}/> Local Authority</div>
                       </TiltCard>
                    </>
                 )}
              </AnimatePresence>

              {/* CARD 4: TECHNICAL SEO (EXPERT HANDS) */}
              <TiltCard layout className="md:col-span-2 h-[240px]" innerClassName={cn("p-8 transition-colors duration-0 border relative", isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-zinc-800")}>
                 <div className="grid grid-cols-12 gap-4 h-full items-center">
                    <div className="col-span-7">
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <Search size={18} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Technical SEO</span>
                        </div>
                        <h3 className={cn("font-sans font-bold text-2xl mb-2", isLightMode ? "text-gray-900" : "text-white")}>The boring shit that works.</h3>
                        <p className={cn("font-sans text-xs leading-relaxed", isLightMode ? "text-gray-500" : "text-white/70")}>
                          Schema markup, local citations and meta tags. We don't bullshit you with jargon. We track one thing: How many people found you on Google.
                        </p>
                    </div>
                    <div className="col-span-5 flex justify-center"><AnimatedLogos isLightMode={isLightMode} /></div>
                 </div>
              </TiltCard>

               {/* CARD 5: TIMELINE BOX */}
               <TiltCard initial={{ opacity: 0, y: 20 }} animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} className="h-[280px] group" innerClassName="bg-emerald-500 border border-emerald-400 p-8 flex flex-col justify-center text-black">
                   <div className="p-3 bg-black/10 w-fit mb-4"><Clock size={24} /></div>
                   <div className="text-3xl font-black tracking-tighter leading-none mb-2">1-2 WEEKS</div>
                   <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80">Foundation Speed</p>
                   <p className="text-xs font-medium leading-relaxed">
                     Week 1: Live. Week 2: Found. We don't do 'discovery calls' for 6 weeks. We build fast because you have bills to pay.
                   </p>
               </TiltCard>

               {/* CARD 6: CALL TRACKING (TRUST) */}
               <TiltCard initial={{ opacity: 0, y: 20 }} animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} className="h-[280px] group" innerClassName="bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-end overflow-hidden">
                   <ProfitChart />
                   <div className="relative z-10">
                       <div className="text-4xl font-black text-white leading-none mb-2">100%</div>
                       <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Leads Focused Tracking</p>
                       <p className="text-[11px] text-white/80 mt-2">Knowing exactly if calls come from Google or word-of-mouth. No more guessing.</p>
                   </div>
               </TiltCard>

            </motion.div>

            {/* FLOATING STATS */}
            <motion.div style={{ y: yStats }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: isLightMode ? 1 : 0, scale: isLightMode ? 1 : 0.8 }} className="absolute -right-4 top-[20%] z-20 hidden lg:block pointer-events-none">
              <StatBadge icon={TrendingUp} label="Rank Increase" value="+240%" isLight={isLightMode} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;