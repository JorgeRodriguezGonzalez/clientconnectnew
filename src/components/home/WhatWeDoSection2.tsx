import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, animate } from 'framer-motion';
import { COLORS, BACKGROUNDS } from "@/lib/design-tokens";
import {
  Zap, Target, ArrowUpRight, Home, Shield, Hammer, Leaf,
  DollarSign, TrendingUp, Users, BarChart3, Percent,
  CheckCircle2, Activity, Globe, MousePointerClick
} from 'lucide-react';

const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
  }
`;

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const buttonColorSequence = [COLORS.emerald, COLORS.emerald, COLORS.cyan, COLORS.cyan, COLORS.emerald];
const buttonColorDuration = 10;

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
        style={{
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--glowingeffect-border-width": `${borderWidth}px`,
          "--repeating-conic-gradient-times": "5",
          "--gradient": `radial-gradient(circle, ${COLORS.emerald} 20%, transparent 80%),
            repeating-conic-gradient(from 236.84deg at 50% 50%, ${COLORS.emerald} 0%, ${COLORS.cyan} calc(25% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(50% / var(--repeating-conic-gradient-times)), ${COLORS.cyan} calc(75% / var(--repeating-conic-gradient-times)), ${COLORS.emerald} calc(100% / var(--repeating-conic-gradient-times)))`,
        } as React.CSSProperties}
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

// Componente de Tarjeta Estática (Sin movimiento/tilt)
const CardWrapper = ({ children, className, innerClassName, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={cn("relative rounded-2xl p-[2px] h-full safari-gpu", className)}
    >
      <GlowingEffect spread={60} glow={true} proximity={100} borderWidth={2} />
      <div className={cn("relative h-full w-full overflow-hidden rounded-2xl", innerClassName)}>
        {children}
      </div>
    </motion.div>
  );
};

const Sparkline = ({
  data,
  color = COLORS.emerald,
  width = 200,
  height = 50,
  className = ""
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => {
    const px = (i / (data.length - 1)) * width;
    const py = height - ((v - min) / (max - min || 1)) * (height * 0.8) - height * 0.1;
    return `${px},${py}`;
  });
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${width},${height} L0,${height} Z`;
  const lastPt = pts[pts.length - 1].split(",");
  const gradId = `grad-${color.replace("#", "")}`;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={cn("overflow-visible", className)} preserveAspectRatio="none">
      <path d={area} fill={`url(#${gradId})`} opacity={drawn ? 0.3 : 0} style={{ transition: "opacity 1s ease" }} />
      <path
        d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={drawn ? "none" : "1000"} strokeDashoffset={drawn ? "0" : "1000"}
        style={{ transition: "stroke-dashoffset 1.5s ease" }}
      />
      {drawn && (
        <circle cx={lastPt[0]} cy={lastPt[1]} r="4" fill={color}>
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Counter = ({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  decimals = 0
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(eased * end);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}
    </span>
  );
};

const ProgressBar = ({
  value,
  max = 100,
  color = COLORS.emerald,
  label,
  delay = 0
}: {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  delay?: number;
}) => {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setW((value / max) * 100), delay);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, max, delay]);

  return (
    <div ref={ref} className="w-full">
      {label && (
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">{label}</span>
          <span className="text-[11px] font-bold" style={{ color }}>{value}%</span>
        </div>
      )}
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1.5s] ease-out"
          style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}, ${color}dd)` }}
        />
      </div>
    </div>
  );
};

const NicheTag = ({
  icon: Icon,
  label,
  color = COLORS.emerald
}: {
  icon: React.ElementType;
  label: string;
  color?: string;
}) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color}18` }}>
      <Icon size={14} style={{ color }} />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color }}>{label}</span>
  </div>
);

const StatBadge = ({
  icon: Icon,
  label,
  value,
  className
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-2xl border border-zinc-700 bg-zinc-900 shadow-xl z-30",
    className
  )}>
    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500"><Icon size={16} /></div>
    <div>
      <div className="font-sans font-bold text-lg leading-none text-white">{value}</div>
      <div className="font-sans text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">{label}</div>
    </div>
  </div>
);

// YLR data: Datos reales de Your Local Roofers basados en el análisis
// Clicks mensuales aproximados desde nov 2024 hasta feb 2026
const roofData = [15, 18, 20, 25, 30, 35, 40, 45, 50, 60, 70, 85];
const nanotiseData = [8, 12, 11, 15, 13, 16, 14, 18, 15, 28, 32, 35];
// Premier Bathrooms data: Organic clicks por mes desde Sep 2025 hasta Feb 2026
const premierData = [52, 115, 144, 172, 180, 172];
// Driveway client: Total leads per month May 2025 - Feb 2026
const drivewayData = [1, 6, 8, 5, 10, 14, 12, 5, 8, 18];

export const WhatWeDoSection2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 lg:py-32 font-sans"
      style={{ background: BACKGROUNDS.dark }}
    >
      <style>{fontStyles}</style>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          <div className="lg:w-[60%] relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* CARD 1: HERO AGGREGATE */}
              <div className="md:col-span-2 relative">
                <motion.div style={{ y: yBadge }} className="absolute -top-6 right-8 z-40 hidden md:block">
                  <StatBadge icon={Activity} label="Pipeline Generated" value="$4.2M+" />
                </motion.div>

                <CardWrapper innerClassName="bg-zinc-900 border border-zinc-800 rounded-2xl min-h-[200px]">
                  <div className="relative z-10 p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[3px] text-emerald-400">
                        Verified Client Results
                      </span>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight">
                        <Counter prefix="$" end={4.2} suffix="M+" decimals={1} />
                      </h4>
                      <span className="block text-sm font-semibold text-zinc-500 mt-2 tracking-normal">
                        Pipeline generated across 4 trade niches
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: Users, val: <Counter end={265} suffix="+" />, label: "Leads / Month" },
                        { icon: Target, val: <Counter end={4.8} suffix="%" decimals={1} />, label: "Conv. Rate" },
                        { icon: TrendingUp, val: <Counter end={8.4} suffix="x" decimals={1} />, label: "Avg. ROAS" },
                        { icon: Percent, val: <Counter prefix="-" end={45} suffix="%" />, label: "Cost / Lead" },
                      ].map((s, i) => (
                        <div key={i} className="p-3 rounded-xl border border-zinc-700/30 bg-zinc-800/30">
                          <s.icon size={12} className="text-zinc-600 mb-1" />
                          <div className="text-lg font-black text-white">{s.val}</div>
                          <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardWrapper>
              </div>

              {/* CARD 2: HOME PROTECTION */}
              <CardWrapper delay={0.1} innerClassName="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
                <div className="relative z-10 flex flex-col h-full">
                  <NicheTag icon={Home} label="Home Protection" />
                  <h4 className="text-lg font-bold text-white mb-1 leading-tight">
                    2x SEO Traffic in 60 Days
                  </h4>
                  <p className="text-[11px] text-zinc-500 mb-5 leading-relaxed">
                    Website redesign + hyper-local SEO dominating Hills District. 11 #1 rankings achieved.
                  </p>

                  <div className="p-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-2xl font-black text-white"><Counter end={141} suffix="%" decimals={1} /></div>
                        <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">SEO Traffic Growth</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-emerald-400">Post-Redesign</div>
                        <div className="text-[9px] text-zinc-500">Last 90 Days</div>
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-white">5,344 vs 2,218 clicks (90 days)</div>
                  </div>

                  <div className="mt-auto border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Traffic Surge</span>
                    </div>
                    <Sparkline data={roofData} color={COLORS.emerald} height={45} className="w-full h-[45px]" />
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <ProgressBar value={100} label="Weekend Rankings 7 Days/Week" color={COLORS.emerald} />
                    <ProgressBar value={92} label="Position #1 Keywords (11 Total)" color={COLORS.emerald} delay={200} />
                  </div>
                </div>
              </CardWrapper>

              {/* CARD 3: HOME HEALTH */}
              <CardWrapper delay={0.2} innerClassName="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
                <div className="relative z-10 flex flex-col h-full">
                  <NicheTag icon={Shield} label="Home Health" color={COLORS.cyan} />
                  <h4 className="text-lg font-bold text-white mb-1 leading-tight">
                    2x Organic Traffic in 14 Days
                  </h4>
                  <p className="text-[11px] text-zinc-500 mb-5 leading-relaxed">
                    Migration from WordPress to React/Vite. Massive SEO surge & record lead volume.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/50">
                      <div className="text-xl font-black text-white"><Counter end={102.8} suffix="%" decimals={1} /></div>
                      <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">Click Growth</div>
                      <div className="text-[10px] font-bold" style={{ color: COLORS.cyan }}>Post-Migration</div>
                    </div>
                    <div className="p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/50">
                      <div className="text-xl font-black text-white"><Counter end={70} /></div>
                      <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">Forms / Mo</div>
                      <div className="text-[10px] font-bold" style={{ color: COLORS.cyan }}>March 2026</div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.cyan }} />
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">SEO Momentum</span>
                    </div>
                    <Sparkline data={nanotiseData} color={COLORS.cyan} height={45} className="w-full h-[45px]" />
                  </div>
                  
                  <div className="mt-4 space-y-2.5">
                    <ProgressBar value={80} label="CTR Improvement" color={COLORS.cyan} />
                    <ProgressBar value={100} label="System Uptime" color={COLORS.cyan} delay={200} />
                  </div>
                </div>
              </CardWrapper>

              {/* CARD 4: HOME RENOVATIONS */}
              <CardWrapper delay={0.3} innerClassName="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
                <div className="relative z-10 flex flex-col h-full">
                  <NicheTag icon={Hammer} label="Home Renovations" />
                  <h4 className="text-lg font-bold text-white mb-1 leading-tight">
                    65% of Leads from SEO
                  </h4>
                  <p className="text-[11px] text-zinc-500 mb-5 leading-relaxed">
                    27 hyperlocal pages + 8 position #1 rankings dominating Sydney bathroom market.
                  </p>

                  <div className="p-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xl font-black text-white"><Counter end={409} suffix="%" /></div>
                        <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">Growth Rate</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-emerald-400">Sep-Feb</div>
                        <div className="text-[9px] text-zinc-500">6 Months</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Organic Growth</span>
                    </div>
                    <Sparkline data={premierData} color={COLORS.emerald} height={45} className="w-full h-[45px]" />
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <ProgressBar value={88} label="First Page Coverage (23/26)" color={COLORS.emerald} />
                    <ProgressBar value={58} label="Top 5 Keywords (15/26)" color={COLORS.emerald} delay={200} />
                  </div>
                </div>
              </CardWrapper>

              {/* CARD 5: HOME IMPROVEMENTS */}
              <CardWrapper delay={0.4} innerClassName="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
                <div className="relative z-10 flex flex-col h-full">
                  <NicheTag icon={Leaf} label="Home Improvements" color={COLORS.cyan} />
                  <h4 className="text-lg font-bold text-white mb-1 leading-tight">
                    From 1 Lead to 18/Month with Zero Ad Spend
                  </h4>
                  <p className="text-[11px] text-zinc-500 mb-5 leading-relaxed">
                    Pure organic SEO strategy for a driveway contractor. 87 leads in 10 months, $0 in ads.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/50">
                      <div className="text-xl font-black text-white"><Counter end={18} /></div>
                      <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">Leads / Mo</div>
                      <div className="text-[10px] font-bold" style={{ color: COLORS.cyan }}>Feb 2026 Peak</div>
                    </div>
                    <div className="p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/50">
                      <div className="text-xl font-black text-white"><Counter prefix="$" end={0} /></div>
                      <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">Ad Spend</div>
                      <div className="text-[10px] font-bold" style={{ color: COLORS.cyan }}>100% Organic</div>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.cyan }} />
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Lead Growth (10 Months)</span>
                    </div>
                    <Sparkline data={drivewayData} color={COLORS.cyan} height={45} className="w-full h-[45px]" />
                  </div>

                  <div className="mt-4 space-y-2.5">
                    <ProgressBar value={100} label="Organic-Only Acquisition" color={COLORS.cyan} />
                    <ProgressBar value={87} label="87 Total Leads Generated" color={COLORS.cyan} delay={200} />
                  </div>
                </div>
              </CardWrapper>

            </div>
          </div>

          {/* RIGHT: STICKY TEXT */}
          <div className="lg:w-[40%] sticky top-32 self-start">
            <div className="flex flex-col gap-6">

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-fit px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 text-[10px] font-sans font-semibold uppercase tracking-[2px]"
              >
                Proven Results
              </motion.div>

              <h3 className="section-title text-white">
                Numbers that{' '}
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
                  speak louder
                </motion.span>
                <span className="text-zinc-600">.</span>
              </h3>

              <p className="section-text-dark max-w-sm">
                We don't talk about "impressions" or "reach." Here are real results from real trade businesses across Australia — tracked, verified, and still growing.
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { icon: Home, label: "Home Protection", color: COLORS.emerald },
                  { icon: Shield, label: "Home Health", color: COLORS.cyan },
                  { icon: Hammer, label: "Home Renovations", color: COLORS.emerald },
                  { icon: Leaf, label: "Home Improvements", color: COLORS.cyan },
                ].map(n => (
                  <div
                    key={n.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-[10px] font-bold uppercase tracking-wider text-zinc-400"
                  >
                    <n.icon size={12} style={{ color: n.color }} />
                    <span>{n.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full ml-1" style={{ background: n.color }} />
                  </div>
                ))}
              </div>

              <div className="mt-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  Why Tradies Trust Us <span className="h-px flex-1 bg-zinc-800" />
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "We run ads for our own trade companies — if it doesn't work for us, we don't sell it",
                    "Proprietary tech stack: 2x faster than WordPress, 100% SEO optimized",
                    "Every dollar tracked. No vanity metrics, just cash flow."
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                      <span className="text-[12px] text-zinc-400 font-medium leading-relaxed">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <motion.button
                  animate={{ borderColor: buttonColorSequence }}
                  transition={{ duration: buttonColorDuration, ease: "linear", repeat: Infinity }}
                  className={cn(
                    "group relative h-[52px] px-8 py-3 flex items-center justify-center gap-2 rounded-full",
                    "font-sans font-semibold text-[14px] border backdrop-blur-sm transition-all duration-500",
                    "hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] bg-black text-white hover:bg-zinc-900 w-full md:w-fit"
                  )}
                >
                  <span className="flex items-center gap-2">
                    Get Results Like These
                    <motion.span
                      animate={{ color: buttonColorSequence }}
                      transition={{ duration: buttonColorDuration, ease: "linear", repeat: Infinity }}
                    >
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