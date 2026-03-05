import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, animate } from 'framer-motion';
import {
  ArrowUpRight, Home, Shield, Hammer, Leaf,
  CheckCircle2, Activity
} from 'lucide-react';

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
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay }} onMouseMove={hm} onMouseLeave={hl} style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d", perspective: 1000 }} className={cn("relative rounded-none p-[2px] h-full safari-gpu", className)}>
      <GlowingEffect spread={60} glow proximity={100} borderWidth={2} />
      <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>{children}</div>
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

// --- FLOATING BADGE ---
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

// --- CASE STUDY DATA ---
const caseStudies = [
  {
    client: "Your Local Roofers",
    icon: Home,
    niche: "Roofing",
    color: COLORS.emerald,
    stat: { value: 145, prefix: "$", suffix: "k", decimals: 0 },
    statLabel: "Monthly Revenue",
    statSub: "+210% YoY",
    sparkData: [12, 18, 22, 28, 35, 42, 48, 55, 62, 70, 78, 86],
    progress: { value: 95, label: "Revenue Target" },
  },
  {
    client: "Nanotise",
    icon: Shield,
    niche: "Protection",
    color: COLORS.cyan,
    stat: { value: 2.1, prefix: "$", suffix: "M", decimals: 1 },
    statLabel: "Pipeline Value",
    statSub: "Generated Q3",
    sparkData: [8, 15, 22, 35, 42, 55, 65, 72, 85, 95, 105, 115],
    progress: { value: 88, label: "Quote Conversion" },
  },
  {
    client: "Premier Bathrooms",
    icon: Hammer,
    niche: "Renovation",
    color: COLORS.emerald,
    stat: { value: 185, prefix: "", suffix: "%", decimals: 0 },
    statLabel: "Growth",
    statSub: "Year over Year",
    sparkData: [3, 6, 8, 12, 15, 18, 22, 25, 28, 30, 32, 34],
    progress: { value: 92, label: "Schedule Fill Rate" },
  },
  {
    client: "Lifestyle Concepts",
    icon: Leaf,
    niche: "Landscaping",
    color: COLORS.cyan,
    stat: { value: 850, prefix: "$", suffix: "k", decimals: 0 },
    statLabel: "Project Value",
    statSub: "Booked in 90 Days",
    sparkData: [50, 120, 180, 280, 380, 450, 520, 600, 680, 750, 800, 850],
    progress: { value: 97, label: "Client Satisfaction" },
  },
];

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

          {/* ========== LEFT: CARDS ========== */}
          <div className="lg:w-[60%] relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Floating badge */}
              <motion.div style={{ y: yBadge }} className="absolute -top-6 right-8 z-40 hidden md:block">
                <StatBadge icon={Activity} label="Total Pipeline" value="$4.2M+" />
              </motion.div>

              {caseStudies.map((cs, i) => (
                <TiltCard
                  key={cs.client}
                  delay={i * 0.1}
                  innerClassName="bg-white border border-zinc-200 p-6 flex flex-col justify-between"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Niche tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${cs.color}15` }}>
                          <cs.icon size={14} style={{ color: cs.color }} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: cs.color }}>{cs.niche}</span>
                      </div>
                    </div>

                    {/* Client name */}
                    <h4 className="text-base font-bold text-gray-900 mb-1 leading-tight">{cs.client}</h4>

                    {/* Hero stat */}
                    <div className="my-5">
                      <div className="text-4xl font-black text-gray-900 leading-none tracking-tight">
                        <Counter end={cs.stat.value} prefix={cs.stat.prefix} suffix={cs.stat.suffix} decimals={cs.stat.decimals} />
                      </div>
                      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">{cs.statLabel}</div>
                      <div className="text-[11px] font-bold mt-0.5" style={{ color: cs.color }}>{cs.statSub}</div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-auto pt-4 border-t border-zinc-100">
                      <ProgressBar value={cs.progress.value} label={cs.progress.label} color={cs.color} />
                    </div>
                  </div>
                </TiltCard>
              ))}

            </div>
          </div>

          {/* ========== RIGHT: STICKY TEXT ========== */}
          <div className="lg:w-[40%] sticky top-32 self-start">
            <div className="flex flex-col gap-6">

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-fit px-3 py-1.5 border border-zinc-200 bg-white text-gray-500 text-[10px] font-sans font-semibold uppercase tracking-[2px]"
              >
                Proven Results
              </motion.div>

              <h3 className="font-sans font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-tighter text-gray-900">
                Real clients.{' '}
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
                  Real results
                </motion.span>
                <span className="text-black">.</span>
              </h3>

              <p className="font-sans text-[15px] leading-[1.6] font-medium text-gray-500 max-w-sm">
                No vanity metrics. No fluff. Just verified numbers from trade businesses we've scaled across Australia.
              </p>

              {/* Trust box */}
              <div className="p-5 border border-zinc-200 bg-white shadow-sm">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  Why Tradies Trust Us <span className="h-px flex-1 bg-zinc-100" />
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "We run ads for our own roofing company first",
                    "20+ years on the tools across Australia",
                    "Every dollar tracked — no vanity metrics"
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                      <span className="text-[12px] text-gray-600 font-medium leading-relaxed">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
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