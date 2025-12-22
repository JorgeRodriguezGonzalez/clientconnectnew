import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, animate } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Globe, MapPin, Search, Clock, Check, PlusIcon, BarChart3 } from 'lucide-react';

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

const ANIMATION_CONFIG = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20
};

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  gold: "#edbf86",
};

// --- LOGO COMPONENTS (EXACT CLONES FROM FOUNDERSECTION) ---
const InstagramLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="inst-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f58529" /><stop offset="50%" stopColor="#dd2a7b" /><stop offset="100%" stopColor="#8134af" />
      </linearGradient>
    </defs>
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" fill="url(#inst-grad)"/>
  </svg>
);
const GoogleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
const OpenAILogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454 7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Z" fill="currentColor" />
  </svg>
);
const MetaIconOutline = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 287.56 191" className={className}>
     <defs>
      <linearGradient id="meta-grad" x1="62.34" y1="101.45" x2="260.34" y2="91.45" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0064e1" /><stop offset="0.4" stopColor="#0064e1" /><stop offset="0.83" stopColor="#0073ee" /><stop offset="1" stopColor="#0082fb" />
      </linearGradient>
    </defs>
    <path fill="url(#meta-grad)" d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z" />
  </svg>
);
const GeminiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className}>
    <defs>
      <radialGradient id="gemini-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)">
        <stop offset=".067" stopColor="#9168C0" /><stop offset=".343" stopColor="#5684D1" /><stop offset=".672" stopColor="#1BA1E3" />
      </radialGradient>
    </defs>
    <path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#gemini-grad)" />
  </svg>
);

// --- SCANNER LOGIC ---
const LogoContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-full flex items-center justify-center shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.12)_inset,0px_10px_14px_-8px_rgba(0,0,0,0.25)] ${className}`} {...props} />
));

const Sparkles = () => (
  <div className="absolute inset-0">
    {[...Array(12)].map((_, i) => (
      <motion.span key={i} animate={{ top: `calc(${Math.random() * 100}% + ${Math.random()*2-1}px)`, left: `calc(${Math.random() * 100}% + ${Math.random()*2-1}px)`, opacity: Math.random(), scale: [1, 1.2, 0] }} transition={{ duration: Math.random() * 2 + 4, repeat: Infinity, ease: "linear" }} className="absolute w-[2px] h-[2px] rounded-full bg-cyan-400" />
    ))}
  </div>
);

const AnimatedSparklesLine = () => (
  <div className="h-32 w-px absolute top-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-500 to-transparent z-40" style={{ animation: 'move-horizontal 3s linear infinite', left: '10%' }}>
    <div className="w-10 h-24 top-1/2 -translate-y-1/2 absolute -left-5"><Sparkles /></div>
  </div>
);

function TechnicalScanner({ isLightMode }: { isLightMode: boolean }) {
  const icons = [
    { icon: <InstagramLogo className="h-4 w-4" />, size: "sm" as const },
    { icon: <GoogleLogo className="h-5 w-5" />, size: "md" as const },
    { icon: <OpenAILogo className={cn("h-6 w-6", isLightMode ? "text-black" : "text-white")} />, size: "lg" as const },
    { icon: <MetaIconOutline className="h-5 w-5" />, size: "md" as const },
    { icon: <GeminiLogo className="h-4 w-4" />, size: "sm" as const },
  ];
  const sizeMap = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };

  useEffect(() => {
    const sequence = icons.map((_, i) => [`.logo-circle-${i + 1}`, { scale: [1, 1.1, 1], transform: ["translateY(0px)", "translateY(-4px)", "translateY(0px)"] }, { duration: 0.8 }]);
    const run = async () => { while (true) { await animate(sequence as any); await new Promise(r => setTimeout(r, 1000)); } };
    run();
  }, []);

  return (
    <div className="overflow-visible h-full relative flex items-center justify-center w-full px-4">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        {icons.map((icon, i) => (
          <LogoContainer key={i} className={`${sizeMap[icon.size]} logo-circle-${i + 1} ${isLightMode ? "bg-white/90" : "bg-neutral-800/80"}`}>{icon.icon}</LogoContainer>
        ))}
      </div>
      <AnimatedSparklesLine />
    </div>
  );
}

// --- LOGO CLOUD (8 LOGOS) ---
function LogoCard({ logo, className, children, isLightMode, isCustomLogo }: any) {
  return (
    <div className={cn("flex items-center justify-center px-4 py-8 md:p-8 transition-colors duration-500", className)}>
      {isCustomLogo ? (
        <div className={cn("h-4 md:h-5 transition-all duration-500", isLightMode ? "text-black" : "text-white")}>
          {logo}
        </div>
      ) : (
        <img alt={logo.alt} className={cn("pointer-events-none h-4 select-none md:h-5 transition-all duration-500", !isLightMode && "brightness-0 invert")} src={logo.src} />
      )}
      {children}
    </div>
  );
}

export function LogoCloud({ isLightMode }: { isLightMode: boolean }) {
  const borderColor = isLightMode ? "border-zinc-200" : "border-white/10";
  const iconColor = isLightMode ? "text-zinc-300" : "text-white/20";
  const bgAlt = isLightMode ? "bg-white" : "bg-white/5";

  return (
    <div className={cn("relative grid grid-cols-2 border-x md:grid-cols-4 transition-colors duration-500 mb-10 w-full", borderColor)}>
      <div className={cn("-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t", borderColor)} />
      
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b", bgAlt, borderColor)} logo={{ src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia Logo" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>
      
      <LogoCard isLightMode={isLightMode} className={cn("border-b md:border-r", borderColor)} logo={{ src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase Logo" }} />
      
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b md:bg-transparent", borderColor, isLightMode ? "md:bg-white" : "md:bg-white/5")} logo={{ src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub Logo" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
        <PlusIcon className={cn("-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>
      
      <LogoCard isLightMode={isLightMode} isCustomLogo={true} className={cn("relative border-b", borderColor, bgAlt)} logo={<OpenAILogo className="h-full w-auto" />} />
      
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

const TiltCard = ({ children, className, innerClassName, ...props }: any) => (
  <motion.div whileHover={{ y: -5 }} transition={ANIMATION_CONFIG} className={cn("relative rounded-none p-[1px] safari-gpu", className)} {...props}>
    <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>{children}</div>
  </motion.div>
);

const StatBadge = ({ icon: Icon, label, value, isLight }: any) => (
  <div className={cn("flex items-center gap-3 px-4 py-3 border backdrop-blur-md transition-all duration-300", isLight ? "bg-white/80 border-zinc-200 text-zinc-900 shadow-xl" : "bg-white/5 border-white/10 text-white shadow-2xl")}>
    <div className="p-2 bg-emerald-500/10"><Icon size={16} className="text-emerald-500" /></div>
    <div>
      <div className="font-sans font-bold text-lg leading-none">{value}</div>
      <div className="font-sans text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
    </div>
  </div>
);

const ProfitChart = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30" style={{ maskImage: 'linear-gradient(to top, black, transparent)' }}>
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
      <motion.path d="M0,180 Q50,150 100,160 T200,80 T300,90 T400,20" fill="none" stroke={COLORS.emerald} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  </div>
);

export const WhatWeDoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.25 && !isLightMode) setIsLightMode(true);
    else if (latest <= 0.25 && isLightMode) setIsLightMode(false);
  });

  const yStats = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className={cn("relative w-full transition-colors duration-500 font-sans", isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]")}>
      <style>{fontStyles}</style>
      <LogoCloud isLightMode={isLightMode} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 pb-20">
        
        {/* --- INTRO SECTION (FULL WIDTH) --- */}
        <div className="lg:grid lg:grid-cols-12 mb-16 pt-5">
          <div className="lg:col-span-12 max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className={cn("w-fit px-3 py-1 mb-4 border text-[10px] font-sans font-semibold uppercase tracking-[2px]", isLightMode ? "bg-zinc-50 border-zinc-200 text-gray-500" : "bg-white/5 border-white/10 text-gray-400")}>
                WHAT WE DO DIFFERENTLY
            </motion.div>
            <h2 className={cn("font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter mb-5 transition-colors duration-0", isLightMode ? "text-gray-900" : "text-white")}>
                We Handle Everything. Because We've Been <span className="text-emerald-500">Burned By Agencies</span> That Don't.
            </h2>
            <p className={cn("text-lg md:text-xl font-medium mb-6 leading-relaxed transition-colors duration-0", isLightMode ? "text-gray-600" : "text-gray-400")}>
                Most agencies do websites OR ads. Never both. And they sure as hell don't understand what a tradie actually needs to get jobs. <span className={isLightMode ? "text-gray-900" : "text-white"}>We do. Because we ARE tradies.</span>
            </p>
          </div>
        </div>

        {/* --- MAIN BLOCK --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-10 relative">
          
          {/* LEFT COLUMN: STICKY */}
          <div className="lg:w-[40%] lg:sticky lg:top-32 self-start">
            <div className="flex flex-col gap-6">
              <h3 className={cn("font-sans font-bold text-4xl leading-none tracking-tight transition-colors duration-0", isLightMode ? "text-gray-900" : "text-white")}>
                First, We Fix <br/>What's Broken
              </h3>
              <p className={cn("font-sans text-base leading-relaxed font-medium transition-colors duration-0", isLightMode ? "text-gray-500" : "text-gray-400")}>
                We've lived through every mistake a tradie can make online. While others show you "brand graphs", we focus on <strong>fixing the foundation</strong> to get you calls.
              </p>
              <div className="flex flex-col gap-3">
                {["Lead-Gen Websites", "GMB Domination", "Technical Tracking"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-emerald-500 text-black flex items-center justify-center rounded-none"><Check size={12} strokeWidth={4} /></div>
                    <span className={cn("font-sans font-bold text-sm transition-colors duration-0", isLightMode ? "text-gray-700" : "text-gray-300")}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-fit mt-4 px-8 py-3 bg-emerald-500 text-black font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                FIX MY FOUNDATION <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLING CARDS WITH IMAGES */}
          <div className="lg:w-[60%] relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">
              
              {/* IMAGE HERO CARD */}
              <TiltCard className="md:row-span-2 min-h-[500px]" innerClassName={cn("border bg-zinc-900", isLightMode ? "border-zinc-200" : "border-white/10")}>
                <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7edd?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" alt="Tradie working" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20">
                   <p className="text-white font-bold text-lg uppercase leading-none">Real Work, Real Leads</p>
                   <p className="text-white/60 text-[10px] mt-2 italic leading-relaxed">"We build what we would use for our own business."</p>
                </div>
              </TiltCard>

              {/* LEAD GEN WEBSITE CARD */}
              <TiltCard innerClassName={cn("p-6 border flex flex-col justify-between h-full relative group", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                <img src="https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=1470&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-500" alt="Plumbing work" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
                <div className="relative z-10">
                  <Globe className="text-emerald-500 mb-4" size={24} />
                  <h4 className={cn("font-bold text-lg leading-tight transition-colors duration-0", isLightMode ? "text-zinc-900" : "text-white")}>Lead Gen Website</h4>
                  <p className="text-xs text-gray-300 md:text-gray-500 mt-2 leading-relaxed font-medium">Built in 48h. Fast-loading, mobile-first, and CTA everywhere. Phone number visible at all times.</p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest"><Check size={12} strokeWidth={4}/> CONVERSION READY</div>
              </TiltCard>

              {/* GMB DOMINATION CARD */}
              <TiltCard innerClassName={cn("p-6 border flex flex-col justify-between h-full relative group", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-500" alt="Electrician" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
                <div className="relative z-10">
                  <MapPin className="text-cyan-500 mb-4" size={24} />
                  <h4 className={cn("font-bold text-lg leading-tight transition-colors duration-0", isLightMode ? "text-zinc-900" : "text-white")}>GMB Domination</h4>
                  <p className="text-xs text-gray-300 md:text-gray-500 mt-2 leading-relaxed font-medium">We optimize every field. Actual job photos, review systems, and posts. Top 3 on Maps or bust.</p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest"><Check size={12} strokeWidth={4}/> LOCAL RANKING</div>
              </TiltCard>

              {/* TECHNICAL SEO CARD WITH BG IMAGE */}
              <TiltCard className="md:col-span-2 h-[220px]" innerClassName={cn("p-8 border relative group", isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-zinc-800")}>
                 <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1470&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Construction detail" />
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-center relative z-10">
                    <div className="md:col-span-7">
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <Search size={18} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Technical SEO</span>
                        </div>
                        <h3 className={cn("font-bold text-xl mb-2 leading-tight transition-colors duration-0", isLightMode ? "text-gray-900" : "text-white")}>The boring shit that works.</h3>
                        <p className={cn("text-xs leading-relaxed font-medium transition-colors duration-0", isLightMode ? "text-gray-500" : "text-white/70")}>
                          Schema markup, citations and meta tags. We don't bullshit you with vanity metrics. We track: "How many people found you on Google?"
                        </p>
                    </div>
                    <div className="md:col-span-5 h-full relative flex items-center justify-center overflow-visible">
                       <TechnicalScanner isLightMode={isLightMode} />
                    </div>
                 </div>
              </TiltCard>

              {/* SPEED GUARANTEE WITH IMAGE */}
              <TiltCard innerClassName="relative p-8 flex flex-col justify-center text-white h-full overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1631&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" alt="Modern construction" />
                   <div className="absolute inset-0 bg-emerald-500 mix-blend-multiply" />
                   <div className="relative z-10">
                     <Clock size={32} className="mb-4" />
                     <div className="text-3xl font-black leading-none mb-1 tracking-tighter uppercase">1-2 WEEKS</div>
                     <p className="text-xs font-bold uppercase opacity-80 mb-3 tracking-widest">Speed Guarantee</p>
                     <p className="text-xs font-bold leading-tight">Week 1: Live. Week 2: Found. We build fast because you have bills to pay.</p>
                   </div>
              </TiltCard>

              {/* CALL TRACKING WITH IMAGE */}
              <TiltCard innerClassName={cn("p-8 border relative flex flex-col justify-end h-full group", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                   <img src="https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?q=80&w=1470&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-500" alt="Tradie on phone" />
                   <ProfitChart />
                   <div className="relative z-10">
                       <BarChart3 className="text-emerald-500 mb-4" size={24} />
                       <div className={cn("text-3xl font-black leading-none mb-1", isLightMode ? "text-zinc-900" : "text-white")}>100%</div>
                       <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-tight">Accurate Call Tracking</p>
                       <p className="text-[10px] text-gray-500 mt-2 font-medium">Know exactly if calls come from Google, Ads or Facebook.</p>
                   </div>
              </TiltCard>
            </div>

            <motion.div style={{ y: yStats }} className="absolute -right-6 top-[20%] z-20 hidden lg:block pointer-events-none">
              <StatBadge icon={TrendingUp} label="Local Ranking" value="TOP 3" isLight={isLightMode} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;