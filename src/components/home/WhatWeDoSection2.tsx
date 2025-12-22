import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, animate } from 'framer-motion';
import { Zap, BarChart3, Target, RefreshCw, Check, ArrowUpRight, MousePointer2, PhoneCall, ShieldCheck, HardHat, Drill } from 'lucide-react';

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
      <GlowingEffect spread={60} glow={true} proximity={100} borderWidth={2} />
      <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>
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

              {/* CARD 1: TYRE KICKER FILTERING */}
              <div className="md:col-span-2 relative">
                <motion.div style={{ y: yBadge }} className="absolute -top-6 right-8 z-40 hidden md:block">
                    <StatBadge icon={Zap} label="Leads Generated" value="1,240+" />
                </motion.div>
                <TiltCard innerClassName="bg-white border border-zinc-200 min-h-[320px]">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1635424710928-0544e8512eae?q=80&w=1200&auto=format&fit=crop" 
                      className="w-full h-full object-cover opacity-10 grayscale" 
                      alt="Roofing detail"
                    />
                  </div>
                  <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8 items-center h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-emerald-600 mb-4">
                        <HardHat size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Built by Real Roofers</span>
                      </div>
                      <h4 className="text-2xl font-bold mb-4 text-gray-900">Stop Wasting Time on "Tyre-Kickers"</h4>
                      <p className="text-sm leading-relaxed mb-6 text-gray-600">
                        We know the pain of getting a call while you're on a roof, only for it to be someone asking for a $200 repair. We filter by high-intent keywords so you only pick up for <strong>real jobs.</strong>
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-zinc-50/50 text-[11px] font-bold border border-zinc-100">
                              <Check size={14} className="inline mr-2 text-emerald-500"/> Suburb Targeting
                          </div>
                          <div className="p-3 bg-zinc-50/50 text-[11px] font-bold border border-zinc-100">
                              <Check size={14} className="inline mr-2 text-emerald-500"/> Job Quality Filter
                          </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* CARD 2: JARGON-FREE NUMBERS (Imagen Corregida) */}
              <TiltCard delay={0.1} innerClassName="bg-white border border-zinc-200 p-8 flex flex-col justify-between">
                <div className="absolute inset-0 z-0 opacity-[0.07]">
                    <img 
                      src="https://images.unsplash.com/photo-1503387762-5929606ba39c?q=80&w=800&auto=format&fit=crop" 
                      className="w-full h-full object-cover" 
                      alt="Construction planning" 
                    />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center mb-6 rounded-none"><PhoneCall className="text-emerald-500" /></div>
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">No Marketing Bullshit</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">
                    We don't talk about "impressions" or "reach". We show you <strong>calls, quotes, and cash.</strong> Reporting designed for business owners, not data nerds.
                  </p>
                </div>
                <div className="relative z-10 pt-4 mt-6 border-t border-zinc-100 flex justify-between items-center text-emerald-600">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Calls that pay</span>
                  <span className="font-black text-lg">TRACKED</span>
                </div>
              </TiltCard>

              {/* CARD 3: SKIN IN THE GAME (Textos Blancos Corregidos) */}
              <TiltCard delay={0.2} innerClassName="bg-zinc-900 border-zinc-800 p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-25 grayscale">
                    <img 
                      src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800&auto=format&fit=crop" 
                      className="w-full h-full object-cover" 
                      alt="Roofer working" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center mb-6 rounded-none"><Drill className="text-cyan-400" /></div>
                  <h4 className="text-xl font-bold text-white">Our Own Skin in the Game</h4>
                  <p className="text-xs text-zinc-100 mt-2 leading-relaxed font-medium opacity-90">
                    We still run ads for our own roofing company today. If the strategy doesn't work for our business, we don't dare sell it to yours.
                  </p>
                </div>
                <div className="relative z-10 flex mt-6">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase border border-cyan-400/30 px-2 py-1 bg-cyan-400/10">Tested on our site first</span>
                </div>
              </TiltCard>

              {/* CARD 4: THE 20-YEAR DIFFERENCE */}
              <TiltCard delay={0.3} className="md:col-span-2" innerClassName="bg-black border-none relative min-h-[280px]">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop" 
                        alt="20 years on the tools" 
                        className="w-full h-full object-cover opacity-50 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
                </div>

                <div className="relative z-10 h-full p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-tighter">20 Years on the Tools</div>
                        <div className="h-px w-12 bg-zinc-700" />
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-4 leading-[0.9]">
                      Marketing agencies experiment. <br/>
                      <span className="text-emerald-500">We just build.</span>
                    </h4>
                    <p className="text-sm md:text-base text-zinc-400 max-w-md font-medium leading-relaxed">
                      We’ve spent two décadas on roofs across Australia. We don’t guess what homeowners want—we’ve spoken to thousands of them in their driveways. 
                    </p>
                  </div>
                  
                  <div className="shrink-0 flex items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                        <ShieldCheck className="text-emerald-500 mb-1" size={32} />
                        <span className="text-[10px] font-bold text-white uppercase leading-none">Founder<br/>Led</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* DERECHA: TEXTO STICKY (40%) - Corregido */}
          <div className="lg:w-[40%] sticky top-32 self-start">
            <div className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-fit px-3 py-1.5 border border-zinc-200 bg-white text-gray-500 text-[10px] font-sans font-semibold uppercase tracking-[2px]"
              >
                THE TRADIE WAY
              </motion.div>

              <h3 className="font-sans font-bold text-[32px] md:text-[48px] leading-[1.1] tracking-tighter text-gray-900">
                You’re on the tools. <br/> We’re generating{' '}
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
                Agencies treat your business like a spreadsheet. We treat it like our own roofing business. No fancy talk, no corporate excuses—just the leads you need to keep your crews busy.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <div className="p-5 border border-zinc-200 bg-white shadow-sm">
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    Traditional Agencies <span className="h-px flex-1 bg-zinc-100" />
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {["Never worked on site", "Obsessed with vanity metrics", "Set and forget"].map(t => (
                      <span key={t} className="text-[12px] text-gray-400 font-medium">/ {t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 border border-emerald-100 bg-emerald-50/30">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    Our Partnership <span className="h-px flex-1 bg-emerald-100" />
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {["20 years on the tools", "Focused on cash flow", "Skin in the game"].map(t => (
                      <span key={t} className="text-[12px] text-gray-900 font-bold">/ {t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="group relative h-[56px] px-10 py-3 flex items-center justify-center gap-3 rounded-none font-sans font-bold text-[15px] border transition-all duration-500 bg-black text-white hover:bg-zinc-800 hover:shadow-xl w-full md:w-fit">
                  Scale My Tradie Business <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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