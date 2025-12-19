import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { Zap, BarChart3, Target, RefreshCw, Check, X, ArrowUpRight, MousePointer2, PhoneCall, TrendingUp, Laptop, Construction, PlusIcon } from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }
`;

const ANIMATION_CONFIG = {
  duration: 0.95, 
  ease: [0.2, 0, 0.2, 1] as [number, number, number, number]
};

const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  red: "#ef4444"
};

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- REUSABLE COMPONENTS (Mantenidos del bloque 1 para consistencia) ---

const GlowingEffect = React.memo(({ spread = 20, glow = false, className, disabled = true }: any) => (
  <div style={{ "--active": glow ? "1" : "0", "--start": "0" } as any} className={cn("pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity", className, disabled && "!hidden")}>
      <div className="absolute inset-0 rounded-[inherit] border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]" />
  </div>
));

const TiltCard = ({ children, className, innerClassName, ...props }: any) => {
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  const handleMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5 * 10);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d", perspective: 1000 }} className={cn("relative rounded-none p-[2px] transition-colors duration-300", className)} {...props}>
      <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>{children}</div>
    </motion.div>
  );
};

const StatBadge = ({ icon: Icon, label, value, isLight }: any) => (
  <div className={cn("flex items-center gap-3 px-4 py-3 rounded-none border backdrop-blur-md", isLight ? "bg-white/80 border-zinc-200" : "bg-white/5 border-white/10")}>
    <div className="p-2 bg-emerald-500/10 text-emerald-500"><Icon size={16} /></div>
    <div>
      <div className={cn("font-sans font-bold text-lg leading-none", isLight ? "text-gray-900" : "text-white")}>{value}</div>
      <div className="font-sans text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{label}</div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const WhatWeDoSection2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLateScroll, setIsLateScroll] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.20 && !isLightMode) setIsLightMode(true);
    else if (latest <= 0.20 && isLightMode) setIsLightMode(false);
    if (latest > 0.50 && !isLateScroll) setIsLateScroll(true);
    else if (latest < 0.40 && isLateScroll) setIsLateScroll(false);
  });

  const yStats = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className={cn("relative w-full py-24 lg:py-32 transition-colors duration-500 font-sans", isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]")}>
      <style>{fontStyles}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* --- IZQUIERDA: TEXTO BLOQUE 2 --- */}
          <div className="lg:w-[40%] sticky top-32">
            <div className="flex flex-col gap-6 pb-10">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className={cn("w-fit px-3 py-1.5 border text-[10px] font-sans font-semibold uppercase tracking-[2px]", isLightMode ? "bg-zinc-50 border-zinc-200 text-gray-500" : "bg-white/5 border-white/10 text-gray-400")}>
                STEP 2: THE FUEL
              </motion.div>

              <h3 className={cn("font-sans font-bold text-[32px] md:text-[40px] leading-[1.1] tracking-tight", isLightMode ? "text-gray-900" : "text-white")}>
                Then, We Turn That Foundation Into <span className="text-cyan-500">Leads</span>
              </h3>

              <p className={cn("font-sans text-[16px] leading-[1.6] font-medium", isLightMode ? "text-gray-500" : "text-gray-400")}>
                <strong>Time to pour fuel on the fire.</strong> Agencies love to "set and forget". We don't. We run ads for our own roofing business every day. If our ads don't work, we don't eat.
              </p>

              <div className="flex flex-col gap-4">
                <div className={cn("p-4 border", isLightMode ? "bg-white" : "bg-white/5 border-white/10")}>
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">Lazy Agency Habits ❌</p>
                  <div className="flex flex-wrap gap-2">
                    {["Monthly check-ins", "Impressions", "Clicks", "Generic reports"].map(t => (
                      <span key={t} className="text-[11px] opacity-60 font-medium">/ {t}</span>
                    ))}
                  </div>
                </div>
                <div className={cn("p-4 border", isLightMode ? "bg-white" : "bg-white/5 border-white/10")}>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Our Strategy ✅</p>
                  <div className="flex flex-wrap gap-2">
                    {["Daily optimization", "Qualified leads", "Cost per job", "A/B Testing"].map(t => (
                      <span key={t} className="text-[11px] opacity-80 font-bold">/ {t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button className="group relative h-[52px] px-8 py-3 flex items-center justify-center gap-2 rounded-none font-sans font-semibold text-[14px] border transition-all duration-500 bg-cyan-500 text-black border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  Scale My Business <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* --- DERECHA: TARJETAS BLOQUE 2 --- */}
          <div className="lg:w-[60%] relative">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[minmax(200px,auto)]">

              {/* CARD 1: GOOGLE ADS QUALIFIED */}
              <TiltCard className="md:col-span-2 h-auto" innerClassName={cn("p-8 border", isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10")}>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-cyan-500 mb-4">
                      <Target size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Qualified Traffic Only</span>
                    </div>
                    <h4 className={cn("text-2xl font-bold mb-4", isLightMode ? "text-gray-900" : "text-white")}>Ads That Get Jobs, Not Just Clicks</h4>
                    <p className={cn("text-sm leading-relaxed mb-6", isLightMode ? "text-gray-500" : "text-gray-400")}>
                      We filter for quality. No tyre-kickers asking for $500 renos when you do $50K jobs. We target by suburb, time of day, and intent.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-zinc-100 dark:bg-white/5 text-[11px] font-bold"><Check size={14} className="inline mr-2 text-emerald-500"/> Geographic targeting</div>
                        <div className="p-3 bg-zinc-100 dark:bg-white/5 text-[11px] font-bold"><Check size={14} className="inline mr-2 text-emerald-500"/> Keyword filtering</div>
                    </div>
                  </div>
                  <div className="w-full md:w-48 h-48 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center relative overflow-hidden">
                    <MousePointer2 className="text-cyan-500 animate-pulse" size={40} />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                  </div>
                </div>
              </TiltCard>

              {/* CARD 2: REAL NUMBERS */}
              <AnimatePresence mode="popLayout">
                {isLightMode && (
                  <>
                    <TiltCard className="h-[300px]" innerClassName="bg-white border border-zinc-200 p-8 flex flex-col justify-between">
                      <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center"><PhoneCall className="text-emerald-500" /></div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Real Numbers</h4>
                        <p className="text-xs text-gray-500 mt-2">Every week you get: Exact number of calls, form submissions, and cost per lead. <strong>No fluff jargon.</strong></p>
                      </div>
                      <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Calls tracked</span>
                        <span className="text-emerald-500 font-black text-lg">LIVE</span>
                      </div>
                    </TiltCard>

                    {/* CARD 3: CONTINUOUS TESTING */}
                    <TiltCard className="h-[300px]" innerClassName="bg-zinc-900 border border-white/10 p-8 flex flex-col justify-between">
                      <div className="w-12 h-12 bg-white/5 flex items-center justify-center"><RefreshCw className="text-cyan-400 animate-spin-slow" /></div>
                      <div className="text-white">
                        <h4 className="text-xl font-bold">Daily Testing</h4>
                        <p className="text-xs text-white/50 mt-2">New landing pages, bid adjustments, and A/B testing weekly. We don't "wait 3 months to gather data".</p>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">V{i}</div>)}
                      </div>
                    </TiltCard>
                  </>
                )}
              </AnimatePresence>

              {/* CARD 4: THE SCIENCE EXPERIMENT (Box destacado) */}
              <TiltCard layout className="md:col-span-2 h-auto" innerClassName="bg-emerald-500 p-8 text-black">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 p-4 bg-black/10"><BarChart3 size={32} /></div>
                  <div>
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Agencies treat this like a science experiment</h4>
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                      "Let's see what happens in 6 months!" — Mate, we have bills due in 30 days. That's why we optimize daily and our guarantee is 30 days, not 90.
                    </p>
                  </div>
                </div>
              </TiltCard>

            </motion.div>

            {/* FLOATING STATS */}
            <motion.div style={{ y: yStats }} initial={{ opacity: 0 }} animate={{ opacity: isLightMode ? 1 : 0 }} className="absolute -right-4 top-[20%] z-20 hidden lg:block pointer-events-none">
              <StatBadge icon={Zap} label="Leads Generated" value="1,240+" isLight={isLightMode} />
            </motion.div>
          </div>
        </div>

        {/* --- CIERRE FINAL DE LA SECCIÓN (CONNECTING BOTH BLOCKS) --- */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-32 relative group">
          <div className="absolute inset-0 bg-emerald-500 blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className={cn("relative p-8 md:p-16 border overflow-hidden", isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10")}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <h3 className={cn("text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-none", isLightMode ? "text-gray-900" : "text-white")}>
                  Why Other Agencies <br/>
                  <span className="text-emerald-500">Fail Tradies</span>
                </h3>

                <div className="space-y-6">
                  {[
                    { t: "The $90K Lesson", desc: "After wasting $90K on agencies that did ONE thing (only web or only ads), we built a system that does BOTH." },
                    { t: "Foundation + Fuel", desc: "You can't run ads to a shit website, and a beautiful website is useless with zero traffic." },
                    { t: "Tradie Timelines", desc: "We optimize daily because you're on the tools every morning and need leads every afternoon." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-1"><Check size={14}/></div>
                      <div>
                        <p className={cn("font-bold text-lg", isLightMode ? "text-gray-900" : "text-white")}>{item.t}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPLIT SCREEN VISUAL */}
              <div className="relative h-[450px] w-full border border-white/5 overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2">
                  {/* Left Side: Roof */}
                  <div className="relative group/side overflow-hidden border-r border-white/10">
                    <img src="https://images.unsplash.com/photo-1635443328221-a20d638be0a5?q=80&w=1470&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover/side:grayscale-0 group-hover/side:scale-110" alt="Tradie on roof" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Morning</p>
                      <p className="text-white font-bold text-sm">ON THE TOOLS</p>
                    </div>
                  </div>
                  {/* Right Side: Laptop */}
                  <div className="relative group/side overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1426&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover/side:grayscale-0 group-hover/side:scale-110" alt="Google Ads Dashboard" />
                    <div className="absolute inset-0 bg-cyan-500/20" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Afternoon</p>
                      <p className="text-white font-bold text-sm">12 NEW LEADS</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-4 border border-emerald-500/50 z-20">
                    <Construction size={24} className="text-emerald-500 mb-2 mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-tighter text-center">Built by tradies</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhatWeDoSection2;