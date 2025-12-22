import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, animate } from 'framer-motion';
import { Zap, BarChart3, Target, RefreshCw, Check, ArrowUpRight, MousePointer2, PhoneCall, ShieldCheck } from 'lucide-react';

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

// --- COLORS ---
const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#10b981", 
  zinc: "#71717a"
};

// --- COMPONENTE GLOWING EFFECT ---
const GlowingEffect = React.memo(
  ({
    blur = 0,
    inactiveZone = 0.1,
    proximity = 80,
    spread = 60,
    glow = true,
    className,
    movementDuration = 1.5,
    borderWidth = 2,
    disabled = false,
  }: {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
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
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) lastPosition.current = { x: mouseX, y: mouseY };

          const center = [left + width * 0.5, top + height * 0.5];
          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
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
      [proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const handlePointerMove = (e: PointerEvent) => handleMove({ x: e.clientX, y: e.clientY });
      window.addEventListener("pointermove", handlePointerMove);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
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
            "--gradient": `radial-gradient(circle, ${COLORS.emerald} 20%, transparent 80%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                ${COLORS.emerald} 0%,
                ${COLORS.cyan} calc(25% / var(--repeating-conic-gradient-times)),
                ${COLORS.emerald} calc(50% / var(--repeating-conic-gradient-times)), 
                ${COLORS.cyan} calc(75% / var(--repeating-conic-gradient-times)),
                ${COLORS.emerald} calc(100% / var(--repeating-conic-gradient-times))
              )`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300",
          glow ? "opacity-100" : "opacity-0",
          className
        )}
      >
        <div
          className={cn(
            "rounded-[inherit] absolute inset-0",
            'after:content-[""] after:rounded-[inherit] after:absolute after:inset-0',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:[background-attachment:fixed]",
            "after:opacity-[var(--active)] after:transition-opacity after:duration-500",
            "after:[mask-clip:padding-box,border-box]",
            "after:[mask-composite:intersect]",
            "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
          )}
        />
      </div>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

// --- REUSABLE COMPONENTS ---

const TiltCard = ({ children, className, innerClassName, delay = 0 }: any) => {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMove} 
      onMouseLeave={handleLeave} 
      style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d", perspective: 1000 }} 
      className={cn("relative rounded-none p-[2px] h-full safari-gpu", className)}
    >
      <GlowingEffect 
        spread={60} 
        glow={true} 
        proximity={100} 
        borderWidth={2} 
      />
      <div className={cn("relative h-full w-full overflow-hidden rounded-none bg-white border border-zinc-200", innerClassName)}>
        {children}
      </div>
    </motion.div>
  );
};

const StatBadge = ({ icon: Icon, label, value, className }: any) => (
  <div className={cn("flex items-center gap-3 px-4 py-3 rounded-none border border-zinc-200 bg-white shadow-xl z-30", className)}>
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
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] font-sans">
      <style>{fontStyles}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* IZQUIERDA: TARJETAS (60%) */}
          <div className="lg:w-[60%] relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">

              {/* CARD 1: GOOGLE ADS */}
              <div className="md:col-span-2 relative">
                <motion.div style={{ y: yBadge }} className="absolute -top-6 right-8 z-40 hidden md:block">
                    <StatBadge icon={Zap} label="Leads Generated" value="1,240+" />
                </motion.div>
                <TiltCard innerClassName="p-8">
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
              </div>

              {/* CARD 2: REAL NUMBERS */}
              <TiltCard delay={0.1} innerClassName="p-8 flex flex-col justify-between">
                <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center mb-6"><PhoneCall className="text-emerald-500" /></div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">Real Numbers</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">Every week you get: Exact number of calls, form submissions, and cost per lead. <strong>No fluff jargon.</strong></p>
                </div>
                <div className="pt-4 mt-6 border-t border-zinc-100 flex justify-between items-center text-emerald-500">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Calls tracked</span>
                  <span className="font-black text-lg">LIVE</span>
                </div>
              </TiltCard>

              {/* CARD 3: CONTINUOUS TESTING */}
              <TiltCard delay={0.2} innerClassName="p-8 flex flex-col justify-between bg-zinc-900 border-zinc-800">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-6"><RefreshCw className="text-cyan-400 animate-spin-slow" /></div>
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

              {/* CARD 4: REDISEÑADA - THE EXECUTION CARD */}
              <TiltCard delay={0.3} className="md:col-span-2" innerClassName="bg-black border-none relative min-h-[280px]">
                {/* Background Image de Tradies */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=1200&auto=format&fit=crop" 
                        alt="Tradies working" 
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>

                <div className="relative z-10 h-full p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-tighter">Fast Results</div>
                        <div className="h-px w-12 bg-zinc-700" />
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-4 leading-[0.9]">
                      Agencies experiment. <br/>
                      <span className="text-emerald-500">We execute.</span>
                    </h4>
                    <p className="text-sm md:text-base text-zinc-400 max-w-md font-medium leading-relaxed">
                      Bills are due in 30 days—not 90. We optimize daily because your business needs cash flow now, not "eventually". That's our 30-day guarantee.
                    </p>
                  </div>
                  
                  <div className="shrink-0 flex items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                        <ShieldCheck className="text-emerald-500 mb-1" size={32} />
                        <span className="text-[10px] font-bold text-white uppercase leading-none">Optimized Daily</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* DERECHA: TEXTO STICKY (40%) */}
          <div className="lg:w-[40%] sticky top-32 self-start">
            <div className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-fit px-3 py-1.5 border border-zinc-200 bg-white text-gray-500 text-[10px] font-sans font-semibold uppercase tracking-[2px]"
              >
                STEP 2: THE FUEL
              </motion.div>

              <h3 className="font-sans font-bold text-[32px] md:text-[48px] leading-[1.1] tracking-tighter text-gray-900">
                Then, We Turn That Foundation Into{' '}
                <motion.span
                  initial={{ backgroundPosition: "400% 50%" }}
                  animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                  transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    backgroundImage: `linear-gradient(45deg, rgba(6, 182, 212, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(6, 182, 212, 0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  Leads
                </motion.span>
                <span className="text-black">.</span>
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
                <button className="group relative h-[56px] px-10 py-3 flex items-center justify-center gap-3 rounded-none font-sans font-bold text-[15px] border transition-all duration-500 bg-black text-white hover:bg-zinc-800 hover:shadow-xl w-full md:w-fit">
                  Scale My Business <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection2;