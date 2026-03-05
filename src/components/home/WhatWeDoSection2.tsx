import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, animate } from 'framer-motion';
import { Zap, Target, ArrowUpRight, Check, ShieldCheck, HardHat, Drill, PhoneCall } from 'lucide-react';

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

const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
  zinc: "#71717a"
};

const buttonColorSequence = [COLORS.emerald, COLORS.emerald, COLORS.cyan, COLORS.cyan, COLORS.emerald];
const buttonColorDuration = 10;

// --- GLOWING EFFECT ---
const GlowingEffect = React.memo(
  ({
    blur = 0,
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

    const handleMove = useCallback(
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
          const isActive = mouseX > left - proximity && mouseX < left + width + proximity && mouseY > top - proximity && mouseY < top + height + proximity;
          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;
          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;
          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => { element.style.setProperty("--start", String(v)); },
          });
        });
      },
      [proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const h = (e: PointerEvent) => handleMove({ x: e.clientX, y: e.clientY });
      window.addEventListener("pointermove", h);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("pointermove", h);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={{
          "--blur": `${blur}px`, "--spread": spread, "--start": "0", "--active": "0",
          "--glowingeffect-border-width": `${borderWidth}px`,
          "--repeating-conic-gradient-times": "5",
          "--gradient": `radial-gradient(circle, ${COLORS.emerald} 20%, transparent 80%),
            repeating-conic-gradient(from 236.84deg at 50% 50%, ${COLORS.emerald} 0%, ${COLORS.cyan} calc(25% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(50% / var(--repeating-conic-gradient-times)), ${COLORS.cyan} calc(75% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(100% / var(--repeating-conic-gradient-times)))`,
        } as React.CSSProperties}
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300", glow ? "opacity-100" : "opacity-0", className)}
      >
        <div className={cn("rounded-[inherit] absolute inset-0", 'after:content-[""] after:rounded-[inherit] after:absolute after:inset-0', "after:[border:var(--glowingeffect-border-width)_solid_transparent]", "after:[background:var(--gradient)] after:[background-attachment:fixed]", "after:opacity-[var(--active)] after:transition-opacity after:duration-500", "after:[mask-clip:padding-box,border-box]", "after:[mask-composite:intersect]", "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]")} />
      </div>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

// --- TILT CARD ---
const TiltCard = ({ children, className, innerClassName, delay = 0 }: {
  children: React.ReactNode; className?: string; innerClassName?: string; delay?: number;
}) => {
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });
  const hm = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    y.set(((e.clientY - r.top) / r.height - 0.5) * -10);
  };
  const hl = () => { x.set(0); y.set(0); };
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay }} onMouseMove={hm} onMouseLeave={hl} style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d", perspective: 1000 }} className={cn("relative rounded-2xl p-[2px] h-full safari-gpu", className)}>
      <GlowingEffect spread={60} glow proximity={100} borderWidth={2} />
      <div className={cn("relative h-full w-full overflow-hidden rounded-2xl", innerClassName)}>{children}</div>
    </motion.div>
  );
};

// --- ANIMATED COUNTER ---
const Counter = ({ end, prefix = "", suffix = "", duration = 2000, decimals = 0 }: {
  end: number; prefix?: string; suffix?: string; duration?: number; decimals?: number;
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - s) / duration, 1);
          setVal((1 - Math.pow(1 - p, 3)) * end);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
};

// --- PROGRESS BAR ---
const ProgressBar = ({ value, label, color = COLORS.emerald }: {
  value: number; label: string; color?: string;
}) => {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(value), 100); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}, ${color}bb)`, transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </div>
    </div>
  );
};

const ProgressBarDark = ({ value, label, color = COLORS.cyan }: {
  value: number; label: string; color?: string;
}) => {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(value), 100); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}, ${color}bb)`, transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </div>
    </div>
  );
};

// --- FLOATING STAT BADGE ---
const StatBadge = ({ icon: Icon, label, value, className }: {
  icon: React.ElementType; label: string; value: string; className?: string;
}) => (
  <div className={cn("flex items-center gap-3 px-4 py-3 rounded-none border border-zinc-200 bg-white shadow-xl z-30", className)}>
    <div className="p-2 bg-emerald-500/10 text-emerald-500"><Icon size={16} /></div>
    <div>
      <div className="font-sans font-bold text-lg leading-none text-gray-900">{value}</div>
      <div className="font-sans text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{label}</div>
    </div>
  </div>
);

// ============================
// MAIN COMPONENT
// ============================
export const WhatWeDoSection2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] font-sans">
      <style>{fontStyles}</style>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* LEFT: CARDS */}
          <div className="lg:w-[60%] relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">

              {/* ===== CARD 1: YOUR LOCAL ROOFERS (wide, white bg + image) ===== */}
              <div className="md:col-span-2 relative">
                <motion.div style={{ y: yBadge }} className="absolute -top-6 right-8 z-40 hidden md:block">
                  <StatBadge icon={Zap} label="Monthly Revenue" value="$145k" />
                </motion.div>
                <TiltCard innerClassName="bg-white border border-zinc-200 min-h-[320px]">
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-10 grayscale">
                    <img src="/images/YLRimage.jpg" className="w-full h-full object-cover" alt="Roofing" />
                  </div>
                  <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8 items-center h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-tighter">Roofing</div>
                        <div className="h-px w-12 bg-zinc-300" />
                      </div>
                      <h4 className="text-2xl font-bold mb-2 text-gray-900 tracking-tight">Your Local Roofers</h4>
                      <p className="text-sm leading-relaxed mb-6 text-gray-600">
                        From feast-and-famine to fully booked. We implemented hyper-local SEO & Google Ads that captured <strong>high-intent storm damage queries.</strong>
                      </p>
                      <div className="text-4xl font-black text-gray-900 tracking-tight mb-1">
                        <Counter prefix="$" end={145} suffix="k" />
                      </div>
                      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Monthly Revenue</div>
                      <div className="text-[11px] font-bold text-emerald-500 mt-0.5">+210% Year over Year</div>
                      <div className="mt-6 max-w-xs">
                        <ProgressBar value={95} label="Revenue Target Hit" color={COLORS.emerald} />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* ===== CARD 2: PREMIER BATHROOMS (white bg) ===== */}
              <TiltCard delay={0.1} innerClassName="bg-white border border-zinc-200 p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] grayscale">
                  <img src="/images/premier.jpg" className="w-full h-full object-cover" alt="Bathroom" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-tighter">Renovations</div>
                    <div className="h-px w-12 bg-zinc-300" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">Premier Bathrooms</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">
                    Automated lead qualification and a 'Dream Bathroom' campaign that <strong>filled renovation slots for the entire season.</strong>
                  </p>
                  <div className="text-3xl font-black text-gray-900 tracking-tight mt-4 mb-1">
                    <Counter end={185} suffix="%" />
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Growth Year over Year</div>
                </div>
                <div className="relative z-10 pt-4 mt-6 border-t border-zinc-100">
                  <ProgressBar value={92} label="Schedule Fill Rate" color={COLORS.emerald} />
                </div>
              </TiltCard>

              {/* ===== CARD 3: NANOTISE (dark bg) ===== */}
              <TiltCard delay={0.2} innerClassName="bg-zinc-900 border-zinc-800 p-8 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-25 grayscale pointer-events-none">
                  <img src="/images/nanotise.jpg" className="w-full h-full object-cover" alt="Protection" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-2 py-1 bg-cyan-400 text-black text-[10px] font-black uppercase tracking-tighter">Mould Remediation</div>
                    <div className="h-px w-12 bg-zinc-600" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Nanotise</h4>
                  <p className="text-xs text-zinc-100 mt-2 leading-relaxed font-medium">
                    Direct-response LinkedIn & Meta ads targeting <strong>luxury property owners.</strong> High-net-worth clients at scale.
                  </p>
                  <div className="text-3xl font-black text-white tracking-tight mt-4 mb-1">
                    <Counter prefix="$" end={2.1} suffix="M" decimals={1} />
                  </div>
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Pipeline Value</div>
                  <div className="text-[11px] font-bold text-cyan-400 mt-0.5">Generated in Q3</div>
                </div>
                <div className="relative z-10 pt-4 mt-6 border-t border-zinc-700">
                  <ProgressBarDark value={88} label="Quote Conversion" color={COLORS.cyan} />
                </div>
              </TiltCard>

              {/* ===== CARD 4: LIFESTYLE CONCEPTS (black bg + image, wide) ===== */}
              <TiltCard delay={0.3} className="md:col-span-2" innerClassName="bg-black border-none relative min-h-[280px]">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-50 grayscale">
                  <img src="/images/landscaping.jpg" alt="Landscaping" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
                </div>
                <div className="relative z-10 h-full p-8 md:p-12 flex flex-col md:flex-row items-center md:items-stretch gap-8">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="px-2 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-tighter">Landscaping</div>
                      <div className="h-px w-12 bg-zinc-700" />
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-2 leading-[0.9]">
                      Lifestyle Concepts
                    </h4>
                    <p className="text-sm md:text-base text-zinc-400 max-w-md font-medium leading-relaxed mb-4">
                      Visual-first funnel with high-converting landing pages focused on project reveals. Scaling $50k+ garden transformations.
                    </p>
                    <div className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">
                      <Counter prefix="$" end={850} suffix="k" />
                    </div>
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Project Value</div>
                    <div className="text-[11px] font-bold text-emerald-400 mt-0.5">Booked in 90 Days</div>
                    <div className="mt-6 max-w-xs">
                      <ProgressBarDark value={97} label="Client Satisfaction" color={COLORS.emerald} />
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                      <ShieldCheck className="text-emerald-500 mb-1" size={32} />
                      <span className="text-[10px] font-bold text-white uppercase leading-none">Top 1%<br/>Conv. Rate</span>
                    </div>
                  </div>
                </div>
              </TiltCard>

            </div>
          </div>

          {/* RIGHT: STICKY TEXT */}
          <div className="lg:w-[40%] sticky top-32 self-start">
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-fit px-3 py-1.5 border border-zinc-200 bg-white text-gray-500 text-[10px] font-sans font-semibold uppercase tracking-[2px]"
              >
                PROVEN RESULTS
              </motion.div>

              <h3 className="font-sans font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-tighter text-gray-900">
                Built for tradies.{' '}
                <motion.span
                  initial={{ backgroundPosition: "400% 50%" }}
                  animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                  transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    backgroundImage: `linear-gradient(45deg, rgba(6,182,212,0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(6,182,212,0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  Backed by data
                </motion.span>
                <span className="text-black">.</span>
              </h3>

              <p className="font-sans text-[15px] leading-[1.6] font-medium text-gray-500 max-w-sm">
                No vanity metrics. No fluff. Just verified numbers from trade businesses we've scaled across Australia.
              </p>

              <div className="flex flex-col gap-5 mt-2">
                <div className="p-5 border border-zinc-200 bg-white shadow-sm">
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    Traditional Agencies <span className="h-px flex-1 bg-zinc-100" />
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {["Never worked on site", "Obsessed with vanity metrics", "Set and forget"].map(t => (
                      <span key={t} className="text-[13px] text-gray-400 font-medium italic">/ {t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 border border-emerald-100 bg-emerald-50/30">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    Our Partnership <span className="h-px flex-1 bg-emerald-100" />
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {["20 years on the tools", "Focused on cash flow", "Skin in the game"].map(t => (
                      <span key={t} className="text-[13px] text-gray-900 font-bold">/ {t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <motion.button
                  animate={{ borderColor: buttonColorSequence }}
                  transition={{ duration: buttonColorDuration, ease: "linear", repeat: Infinity }}
                  className={cn(
                    "group relative h-[52px] px-8 py-3 flex items-center justify-center gap-2 rounded-none",
                    "font-sans font-semibold text-[14px] border backdrop-blur-sm transition-all duration-500",
                    "hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] bg-black text-white hover:bg-zinc-900 w-full md:w-fit"
                  )}
                >
                  <span className="flex items-center gap-2">
                    Get Results Like These
                    <motion.span animate={{ color: buttonColorSequence }} transition={{ duration: buttonColorDuration, ease: "linear", repeat: Infinity }}>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection2;