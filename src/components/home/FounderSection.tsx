import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Globe, MapPin, Search, Clock, Check, PlusIcon, MousePointer2, BarChart3, Construction } from 'lucide-react';

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
    0% { left: 0%; }
    100% { left: 100%; }
  }
`;

const ANIMATION_CONFIG = {
  duration: 0.95, 
  ease: [0.2, 0, 0.2, 1] as [number, number, number, number]
};

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  gold: "#edbf86",
};

// --- LOGO CLOUD COMPONENTS ---
function LogoCard({ logo, className, children, isLightMode }: any) {
  return (
    <div className={cn("flex items-center justify-center px-4 py-8 md:p-8 transition-colors duration-500", className)}>
      <img
        alt={logo.alt}
        className={cn("pointer-events-none h-4 select-none md:h-5 transition-all duration-500", !isLightMode && "brightness-0 invert")}
        src={logo.src}
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
    <div className={cn("relative grid grid-cols-2 border-x md:grid-cols-4 transition-colors duration-500 mb-10", borderColor)}>
      <div className={cn("-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t", borderColor)} />
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b", bgAlt, borderColor)} logo={{ src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia Logo" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>
      <LogoCard isLightMode={isLightMode} className={cn("border-b md:border-r", borderColor)} logo={{ src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase Logo" }} />
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b md:bg-transparent", borderColor, isLightMode ? "md:bg-white" : "md:bg-white/5")} logo={{ src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub Logo" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
        <PlusIcon className={cn("-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>
      <LogoCard isLightMode={isLightMode} className={cn("relative border-b", borderColor, bgAlt)} logo={{ src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI Logo" }} />
      <div className={cn("-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b", borderColor)} />
    </div>
  );
}

// --- SCANNER LOGO COMPONENTS ---
const InstagramLogo = ({ className }: any) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" fill="currentColor"/>
  </svg>
);
const GoogleLogo = ({ className }: any) => (
  <svg viewBox="0 0 24 24" className={className}><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const LogoContainer = ({ className, children }: any) => (
  <div className={cn("rounded-full flex items-center justify-center shadow-inner", className)}>{children}</div>
);

const Sparkles = () => (
  <div className="absolute inset-0">
    {[...Array(8)].map((_, i) => (
      <motion.span
        key={i}
        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
      />
    ))}
  </div>
);

const AnimatedSparklesLine = () => (
  <div 
    className="h-full w-[2px] absolute top-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent z-40"
    style={{ animation: 'move-horizontal 3s linear infinite' }}
  >
    <div className="w-10 h-full -left-5 absolute">
      <Sparkles />
    </div>
  </div>
);

function TechnicalScanner({ isLightMode }: { isLightMode: boolean }) {
  const icons = [
    <InstagramLogo className="h-4 w-4" />,
    <GoogleLogo className="h-4 w-4" />,
    <Search className="h-4 w-4" />,
    <Globe className="h-4 w-4" />
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
      <div className="flex flex-row gap-3 relative z-10">
        {icons.map((icon, i) => (
          <LogoContainer key={i} className={cn("h-10 w-10", isLightMode ? "bg-zinc-100 text-zinc-900" : "bg-white/10 text-white")}>
            {icon}
          </LogoContainer>
        ))}
      </div>
      <AnimatedSparklesLine />
    </div>
  );
}

// --- UI COMPONENTS ---
const GlowingEffect = React.memo(({ glow = false, disabled = true }: any) => (
  <div className={cn("pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity", glow && "opacity-100", !disabled && "opacity-100")}>
    <div className="absolute inset-0 rounded-[inherit] border border-emerald-500/20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
  </div>
));

const TiltCard = ({ children, className, innerClassName, ...props }: any) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={cn("relative rounded-none p-[1px] transition-colors duration-300 safari-gpu", className)}
    {...props}
  >
    <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>
      {children}
    </div>
  </motion.div>
);

const StatBadge = ({ icon: Icon, label, value, isLight }: any) => (
  <div className={cn("flex items-center gap-3 px-4 py-3 border backdrop-blur-md", isLight ? "bg-white/80 border-zinc-200 shadow-sm text-zinc-900" : "bg-white/5 border-white/10 text-white")}>
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

// --- MAIN SECTION ---
export const WhatWeDoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLateScroll, setIsLateScroll] = useState(false);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.25 && !isLightMode) setIsLightMode(true);
    else if (latest <= 0.25 && isLightMode) setIsLightMode(false);
    if (latest > 0.55 && !isLateScroll) setIsLateScroll(true);
    else if (latest < 0.45 && isLateScroll) setIsLateScroll(false);
  });

  const yStats = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className={cn("relative w-full transition-colors duration-500 font-sans", isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]")}>
      <style>{fontStyles}</style>

      {/* 1. LOGO CLOUD */}
      <LogoCloud isLightMode={isLightMode} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 pb-24">
        
        {/* --- COMPACT INTRO SECTION --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center mb-24 pt-10">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className={cn("w-fit px-3 py-1 mb-6 border text-[10px] font-sans font-semibold uppercase tracking-[2px]", isLightMode ? "bg-zinc-50 border-zinc-200 text-gray-500" : "bg-white/5 border-white/10 text-gray-400")}>
                SECTION 2: WHAT WE DO DIFFERENTLY
            </motion.div>
            <h2 className={cn("font-sans font-bold text-4xl md:text-5xl leading-tight tracking-tighter mb-6", isLightMode ? "text-gray-900" : "text-white")}>
                We Handle Everything. Because We've Been <span className="text-emerald-500">Burned By Agencies</span> That Don't.
            </h2>
            <p className={cn("text-lg font-medium mb-8 max-w-lg leading-relaxed", isLightMode ? "text-gray-600" : "text-gray-400")}>
                Most agencies do websites OR ads. Never both. And they sure as hell don't understand what a tradie actually needs to get jobs. <span className={isLightMode ? "text-gray-900" : "text-white"}>We do. Because we ARE tradies.</span>
            </p>
          </div>

          {/* OVERLAPPED AGENCY CARDS */}
          <div className="relative h-[280px] w-full max-w-[450px] mx-auto lg:mx-0">
             {[
               { id: 1, title: "Agency #1", text: "$8K Website. Looked amazing. Zero leads. No SEO, just a pretty brochure no one saw.", color: "border-zinc-500/30", z: 10, y: 0, r: -4 },
               { id: 2, title: "Agency #2", text: "$12K Google Ads. Got clicks, but the website was so shit no one called. They blamed us.", color: "border-zinc-500/50", z: 20, y: 30, r: 0 },
               { id: 3, title: "Agency #3", text: "'SEO experts'. Vanity metrics only. Ranking for keywords no one searches. Zero jobs.", color: "border-emerald-500", z: 30, y: 60, r: 4 },
             ].map((card, i) => (
               <motion.div
                key={card.id}
                whileHover={{ y: card.y - 20, scale: 1.02, zIndex: 50, rotate: 0 }}
                style={{ zIndex: card.z, top: card.y, rotate: card.r }}
                className={cn(
                  "absolute inset-x-0 p-6 border backdrop-blur-md transition-all duration-300 cursor-help",
                  isLightMode ? "bg-white shadow-xl" : "bg-zinc-900 shadow-2xl",
                  card.color
                )}
               >
                 <div className="text-emerald-500 font-black text-xs uppercase tracking-widest mb-2">{card.title}</div>
                 <p className={cn("text-sm font-medium leading-relaxed", isLightMode ? "text-zinc-600" : "text-zinc-400")}>{card.text}</p>
               </motion.div>
             ))}
          </div>
        </div>

        {/* --- BLOCK 1: THE FOUNDATION --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          <div className="lg:w-[40%] sticky top-32">
            <div className="flex flex-col gap-6">
              <h3 className={cn("font-sans font-bold text-4xl leading-none tracking-tight", isLightMode ? "text-gray-900" : "text-white")}>
                First, We Fix <br/>What's Broken
              </h3>
              <p className={cn("font-sans text-base leading-relaxed font-medium", isLightMode ? "text-gray-500" : "text-gray-400")}>
                We've lived through every mistake a tradie can make online. While others show you "brand graphs", we focus on <strong>fixing the foundation</strong> to get you calls.
              </p>

              <div className="flex flex-col gap-3">
                {["Lead-Gen Websites", "GMB Domination", "Technical Tracking"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-emerald-500 text-black flex items-center justify-center rounded-none"><Check size={12} strokeWidth={4} /></div>
                    <span className={cn("font-sans font-bold text-sm", isLightMode ? "text-gray-700" : "text-gray-300")}>{item}</span>
                  </div>
                ))}
              </div>

              <button className="w-fit mt-4 px-8 py-3 bg-emerald-500 text-black font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                FIX MY FOUNDATION <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          <div className="lg:w-[60%] relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <TiltCard className="md:row-span-2 h-[500px]" innerClassName={cn("border bg-zinc-900", isLightMode ? "border-zinc-200" : "border-white/10")}>
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1469&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20">
                   <p className="text-white font-bold text-lg uppercase">Real Work, Real Leads</p>
                   <p className="text-white/60 text-[10px] mt-1 italic">"We build what we would use for our own business."</p>
                </div>
              </TiltCard>

              <TiltCard className="h-[240px]" innerClassName={cn("p-6 border flex flex-col justify-between", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                <div>
                  <Globe className="text-emerald-500 mb-4" size={24} />
                  <h4 className={cn("font-bold text-lg", isLightMode ? "text-zinc-900" : "text-white")}>Lead Gen Website</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">Built in 48h. Fast-loading, mobile-first, and CTA everywhere. Phone number visible at all times.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest"><Check size={12} strokeWidth={4}/> CONVERSION READY</div>
              </TiltCard>

              <TiltCard className="h-[240px]" innerClassName={cn("p-6 border flex flex-col justify-between", isLightMode ? "bg-white border-zinc-200" : "bg-white/5 border-white/10")}>
                <div>
                  <MapPin className="text-cyan-500 mb-4" size={24} />
                  <h4 className={cn("font-bold text-lg", isLightMode ? "text-zinc-900" : "text-white")}>GMB Domination</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">We optimize every field. Actual job photos, review systems, and posts. Top 3 on Maps or bust.</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest"><Check size={12} strokeWidth={4}/> LOCAL RANKING</div>
              </TiltCard>

              {/* RESTORED TECH SEO CARD WITH SCANNER LOGOS */}
              <TiltCard className="md:col-span-2 h-[220px]" innerClassName={cn("p-8 border relative", isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-zinc-800")}>
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-center">
                    <div className="md:col-span-7">
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <Search size={18} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Technical SEO</span>
                        </div>
                        <h3 className={cn("font-bold text-xl mb-2 leading-tight", isLightMode ? "text-gray-900" : "text-white")}>The boring shit that works.</h3>
                        <p className={cn("text-xs leading-relaxed font-medium", isLightMode ? "text-gray-500" : "text-white/70")}>
                          Schema markup, citations and meta tags. We don't bullshit you with vanity metrics. We track: "How many people found you on Google?"
                        </p>
                    </div>
                    <div className="md:col-span-5 h-full relative">
                       <TechnicalScanner isLightMode={isLightMode} />
                    </div>
                 </div>
              </TiltCard>

              <TiltCard className="h-[240px]" innerClassName="bg-emerald-500 p-8 flex flex-col justify-center text-black">
                   <Clock size={32} className="mb-4" />
                   <div className="text-3xl font-black leading-none mb-1 tracking-tighter uppercase">1-2 WEEKS</div>
                   <p className="text-xs font-bold uppercase opacity-80 mb-3 tracking-widest">Speed Guarantee</p>
                   <p className="text-xs font-bold leading-tight">Week 1: Live. Week 2: Found. We build fast because you have bills to pay.</p>
              </TiltCard>

              <TiltCard className="h-[240px]" innerClassName={cn("p-8 border relative flex flex-col justify-end", isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10")}>
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