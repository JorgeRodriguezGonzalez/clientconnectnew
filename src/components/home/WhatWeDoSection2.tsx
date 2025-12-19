import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Zap, BarChart3, Target, RefreshCw, Check, ArrowUpRight, MousePointer2, PhoneCall, Construction } from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }
`;

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- REUSABLE COMPONENTS ---

const TiltCard = ({ children, className, innerClassName }: any) => {
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div 
      onMouseMove={handleMove} 
      onMouseLeave={handleLeave} 
      style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d", perspective: 1000 }} 
      className={cn("relative rounded-none p-[2px] transition-colors duration-300 h-full", className)}
    >
      <div className={cn("relative h-full w-full overflow-hidden rounded-none bg-white border border-zinc-200", innerClassName)}>
        {children}
      </div>
    </motion.div>
  );
};

const StatBadge = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-none border border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm">
    <div className="p-2 bg-emerald-500/10 text-emerald-500"><Icon size={16} /></div>
    <div>
      <div className="font-sans font-bold text-lg leading-none text-gray-900">{value}</div>
      <div className="font-sans text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{label}</div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const WhatWeDoSection2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"] 
  });

  // Efecto de movimiento para el badge flotante
  const yStats = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] font-sans overflow-hidden"
    >
      <style>{fontStyles}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* PARTE 1: COLUMNAS INVERTIDAS (Tarjetas Izquierda, Texto Derecha) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-32">
          
          {/* IZQUIERDA: TARJETAS (Ocupa más espacio para el grid) */}
          <div className="lg:w-[60%] relative order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">

              {/* CARD 1: GOOGLE ADS QUALIFIED */}
              <TiltCard className="md:col-span-2" innerClassName="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-cyan-500 mb-4">
                      <Target size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Qualified Traffic Only</span>
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-gray-900">Ads That Get Jobs, Not Just Clicks</h4>
                    <p className="text-sm leading-relaxed mb-6 text-gray-500">
                      We filter for quality. No tyre-kickers asking for $500 renos when you do $50K jobs. We target by suburb, time of day, and intent.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-zinc-50 text-[11px] font-bold border border-zinc-100">
                            <Check size={14} className="inline mr-2 text-emerald-500"/> Geographic targeting
                        </div>
                        <div className="p-3 bg-zinc-50 text-[11px] font-bold border border-zinc-100">
                            <Check size={14} className="inline mr-2 text-emerald-500"/> Keyword filtering
                        </div>
                    </div>
                  </div>
                  <div className="w-full md:w-48 h-48 bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                    <MousePointer2 className="text-cyan-500 animate-pulse" size={40} />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
                  </div>
                </div>
              </TiltCard>

              {/* CARD 2: REAL NUMBERS */}
              <TiltCard innerClassName="p-8 flex flex-col justify-between">
                <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center mb-6"><PhoneCall className="text-emerald-500" /></div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">Real Numbers</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">Every week you get: Exact number of calls, form submissions, and cost per lead. <strong>No fluff jargon.</strong></p>
                </div>
                <div className="pt-4 mt-6 border-t border-zinc-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Calls tracked</span>
                  <span className="text-emerald-500 font-black text-lg">LIVE</span>
                </div>
              </TiltCard>

              {/* CARD 3: CONTINUOUS TESTING */}
              <TiltCard innerClassName="p-8 flex flex-col justify-between bg-zinc-900 border-zinc-800">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-6"><RefreshCw className="text-cyan-400" /></div>
                <div className="text-white">
                  <h4 className="text-xl font-bold">Daily Testing</h4>
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">New landing pages, bid adjustments, and A/B testing weekly. We don't "wait 3 months to gather data".</p>
                </div>
                <div className="flex -space-x-2 mt-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-400 font-bold">V{i}</div>
                  ))}
                </div>
              </TiltCard>

              {/* CARD 4: THE SCIENCE EXPERIMENT */}
              <TiltCard className="md:col-span-2" innerClassName="bg-emerald-500 p-8 border-none text-black">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 p-4 bg-black/10"><BarChart3 size={32} /></div>
                  <div>
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-2 leading-none">Agencies treat this like a science experiment</h4>
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                      "Let's see what happens in 6 months!" — Mate, we have bills due in 30 days. That's why we optimize daily and our guarantee is 30 days, not 90.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* FLOATING STATS */}
            <motion.div style={{ y: yStats }} className="absolute -left-8 top-[20%] z-20 hidden lg:block pointer-events-none">
              <StatBadge icon={Zap} label="Leads Generated" value="1,240+" />
            </motion.div>
          </div>

          {/* DERECHA: TEXTO (Ocupa el 40%) */}
          <div className="lg:w-[40%] sticky top-32 order-1 lg:order-2">
            <div className="flex flex-col gap-6">
              <div className="w-fit px-3 py-1.5 border border-zinc-200 bg-white text-gray-500 text-[10px] font-sans font-semibold uppercase tracking-[2px]">
                STEP 2: THE FUEL
              </div>

              <h3 className="font-sans font-bold text-[32px] md:text-[48px] leading-[1.1] tracking-tighter text-gray-900">
                Then, We Turn That Foundation Into <span className="text-cyan-500">Leads</span>
              </h3>

              <p className="font-sans text-[17px] leading-[1.6] font-medium text-gray-600">
                <strong>Time to pour fuel on the fire.</strong> Agencies love to "set and forget". We don't. We run ads for our own roofing business every day. If our ads don't work, we don't eat.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <div className="p-5 border border-zinc-200 bg-white shadow-sm">
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    Lazy Agency Habits <span className="h-px flex-1 bg-zinc-100" />
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {["Monthly check-ins", "Impressions", "Generic reports"].map(t => (
                      <span key={t} className="text-[12px] text-gray-400 font-medium">/ {t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 border border-emerald-100 bg-emerald-50/30">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    Our Strategy <span className="h-px flex-1 bg-emerald-100" />
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {["Daily optimization", "Qualified leads", "ROI tracking"].map(t => (
                      <span key={t} className="text-[12px] text-gray-900 font-bold">/ {t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="group relative h-[56px] px-10 py-3 flex items-center justify-center gap-3 rounded-none font-sans font-bold text-[15px] border transition-all duration-500 bg-black text-white hover:bg-zinc-800 hover:shadow-xl">
                  Scale My Business <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PARTE 2: WHY OTHER AGENCIES FAIL TRADIES (Cierre Final) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="relative mt-40"
        >
          <div className="relative p-8 md:p-16 border border-zinc-200 bg-white shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-none text-gray-900">
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
                      <div className="h-6 w-6 rounded-none bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-1">
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">{item.t}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPLIT SCREEN VISUAL (Corregido enlace de imagen) */}
              <div className="relative h-[450px] w-full border border-zinc-200 overflow-hidden shadow-inner">
                <div className="absolute inset-0 grid grid-cols-2">
                  {/* Left Side: Roof (Imagen Corregida) */}
                  <div className="relative group/side overflow-hidden border-r border-zinc-200">
                    <img 
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" 
                      className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover/side:grayscale-0 group-hover/side:scale-105" 
                      alt="Tradie working on roof" 
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Morning</p>
                      <p className="text-white font-bold text-sm tracking-tight">ON THE TOOLS</p>
                    </div>
                  </div>
                  {/* Right Side: Laptop */}
                  <div className="relative group/side overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=800&auto=format&fit=crop" 
                      className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover/side:grayscale-0 group-hover/side:scale-105" 
                      alt="Google Ads Dashboard" 
                    />
                    <div className="absolute inset-0 bg-cyan-900/20" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Afternoon</p>
                      <p className="text-white font-bold text-sm tracking-tight">12 NEW LEADS</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-6 py-4 border border-zinc-200 shadow-2xl z-20 min-w-[140px]">
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