"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Hammer, AlertTriangle, HardHat, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, animate, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
};

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- COMPONENTE GLOWING EFFECT ---
const GlowingEffect = React.memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    variant?: "default" | "white";
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
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

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
            onUpdate: (value) => element.style.setProperty("--start", String(value)),
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e as any);
      window.addEventListener("scroll", handleScroll, { passive: true } as any);
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true } as any);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div className={cn("pointer-events-none absolute -inset-px hidden rounded-2xl border opacity-0 transition-opacity", glow && "opacity-100", disabled && "!block")} />
        <div
          ref={containerRef}
          style={{
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient": `radial-gradient(circle, ${COLORS.emerald} 10%, #34d39900 20%),
              radial-gradient(circle at 60% 60%, ${COLORS.cyan} 10%, #06b6d400 20%), 
              repeating-conic-gradient(from 236.84deg at 50% 50%, ${COLORS.emerald} 0%, ${COLORS.cyan} 50%, ${COLORS.emerald} 100%)`
          } as React.CSSProperties}
          className={cn("pointer-events-none absolute inset-0 rounded-2xl opacity-100 transition-opacity", glow && "opacity-100", blur > 0 && "blur-[var(--blur)] ", className, disabled && "!hidden")}
        >
          <div className={cn("glow", "rounded-2xl", 'after:content-[""] after:rounded-2xl after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]', "after:[border:var(--glowingeffect-border-width)_solid_transparent]", "after:[background:var(--gradient)] after:[background-attachment:fixed]", "after:opacity-[var(--active)] after:transition-opacity after:duration-300", "after:[mask-clip:padding-box,border-box]", "after:[mask-composite:intersect]", "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]")} />
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

export type StoryEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export const founderStoryEntries: StoryEntry[] = [
  {
    icon: AlertTriangle,
    title: "The $90k Lesson",
    subtitle: "The Monster • Being Burned",
    description: "Before Client Connect, we ran our own roofing business. We trusted agencies and lost over $90,000 to 'experts' who promised the world but delivered dashboards full of vanity metrics and zero revenue.",
    items: ["Agencies that didn't understand the trade", "Reports full of 'Likes' but no paying jobs", "Contracts that locked us in while we bled cash", "The realization: 'No one is coming to save us'"],
    image: "/images/tradies.jpg",
  },
  {
    icon: HardHat,
    title: "The Double Life",
    subtitle: "The Quest • Tools & Laptops",
    description: "We didn't quit the tools. Instead, we spent days on roofs and nights decoding algorithms. We lived the reality: High-vis in the morning, high-level strategy in the afternoon.",
    items: ["Still on the tools: We know the pressure", "Learning code and algorithms from the ground up", "Testing strategies with our own money, not yours", "Understanding the difference between a lead and a job"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2600&auto=format&fit=crop",
  },
  {
    icon: Hammer,
    title: "The Breakthrough",
    subtitle: "The Victory • It Works",
    description: "It clicked. Applying a tradie's mindset to marketing made our leads explode. We realized local positioning isn't about 'brand awareness', it's about being the most trusted option when a neighbor needs help.",
    items: ["Built a system that bypasses corporate fluff", "Hyper-local targeting down to the suburb level", "Messages that speak 'Tradie', not 'Marketing'", "From 2 jobs a week to booked out months ahead"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: ShieldCheck,
    title: "Protecting The Trade",
    subtitle: "The Mission • Your Unfair Advantage",
    description: "We exist to ensure no other business owner gets burned. We aren't suits in a CBD office guessing about your industry. We are your competitive advantage because we've literally walked in your steel-capped boots.",
    items: ["We validate every lead (we know the tyre-kickers)", "We speak your language, not jargon", "Complete transparency: We show you the real numbers", "We only win when you are profitable"],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop",
    button: { url: "#contact", text: "Work With People Who Get It" },
  },
];

export default function FounderStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const beamTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const beamOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const color1 = useTransform(smoothProgress, [0, 0.5, 1], [COLORS.emerald, COLORS.cyan, COLORS.emerald]);
  const color2 = useTransform(smoothProgress, [0, 0.5, 1], [COLORS.cyan, COLORS.emerald, COLORS.cyan]);
  const beamGradient = useMotionTemplate`linear-gradient(to bottom, transparent, ${color1}, ${color2})`;

  useEffect(() => {
    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) { bestDist = dist; bestIndex = i; }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };
    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  return (
    <section className="relative w-full bg-[#050505]" ref={containerRef}>
      <BackgroundStripes />
      <div className="relative z-10 w-full max-w-7xl mx-auto bg-[#050505] border-l border-r border-white/10">
        
        <motion.div style={{ top: beamTop, opacity: beamOpacity, background: beamGradient }} className="absolute -left-[1px] w-[2px] h-[150px] -translate-y-full blur-[2px] z-20" />
        <motion.div style={{ top: beamTop, opacity: beamOpacity, background: beamGradient }} className="absolute -right-[1px] w-[2px] h-[150px] -translate-y-full blur-[2px] z-20" />

        <div className="pt-24 pb-32 px-4 md:px-12">
          
          {/* HEADER CON EL NUEVO BADGE */}
          <div className="mx-auto max-w-[680px] flex flex-col items-center gap-6 text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="w-fit px-3 py-1.5 rounded border border-white/10 bg-white/[0.05] transition-colors duration-300"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[2px] text-zinc-400 font-['Satoshi',_sans-serif]">
                Success stories
              </span>
            </motion.div>

            <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-white">
              We aren't just marketers.<br/> 
              We are tradies who learned{' '}
              <span className="whitespace-nowrap">
                <motion.span
                  initial={{ backgroundPosition: "400% 50%" }}
                  animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                  transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  The $90k Lesson
                </motion.span>
                <span className="text-white">.</span>
              </span>
            </h2>
            <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-zinc-400 tracking-tight">
              Most agencies view you as a transaction. We view you as a peer. Why? Because we spent years on the tools, got burned by the same agencies, and built the solution we wished we had.
            </p>
          </div>

          <div className="mx-auto w-full space-y-30 md:space-y-48">
            {founderStoryEntries.map((entry, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
                  {/* TITLES COLUMN */}
                  <div className="top-40 flex h-min w-full md:w-[350px] shrink-0 flex-col md:sticky md:pl-12">
                    <div className={cn("absolute -top-10 -left-4 md:left-8 text-[120px] leading-none font-bold select-none transition-all duration-700", isActive ? "text-white/10 translate-y-0" : "text-white/0 translate-y-4")}>0{index + 1}</div>
                    <div className="relative z-10 flex flex-col gap-3 pl-2">
                        <div className="flex items-center gap-3">
                            <div className={cn("transition-colors duration-500", isActive ? "text-[#34d399]" : "text-zinc-600")}><entry.icon className="w-5 h-5" /></div>
                            <span className={cn("text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-500", isActive ? "text-[#34d399]" : "text-zinc-600")}>{entry.subtitle.split("•")[0]}</span>
                        </div>
                        <h3 className={cn("text-3xl md:text-4xl font-bold leading-[1.1] transition-all duration-500", isActive ? "text-white" : "text-zinc-700")}>{entry.title}</h3>
                        <div className={cn("h-1 mt-2 w-12 transition-all duration-700 rounded-full", isActive ? "bg-gradient-to-r from-emerald-400 to-cyan-400 w-24 opacity-100" : "bg-zinc-800 w-8 opacity-0")} />
                    </div>
                  </div>

                  <div ref={(el) => (sentinelRefs.current[index] = el)} aria-hidden className="absolute top-1/2 -translate-y-1/2 left-0 h-12 w-12 opacity-0 pointer-events-none" />

                  {/* CARDS COLUMN */}
                  <div className="relative flex-1 min-w-0">
                    <div className="absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0 }}>
                        <GlowingEffect spread={20} glow={true} disabled={!isActive} proximity={64} inactiveZone={0.01} borderWidth={1} />
                    </div>
                    <article className={cn("relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300", isActive ? "bg-zinc-900 z-10 border-transparent shadow-2xl shadow-black/50" : "bg-white/5 border-white/5 opacity-40 grayscale blur-[1px]")}>
                      {entry.image && (
                        <div className="mb-8 w-full h-[240px] overflow-hidden bg-black border-b border-white/10 relative group rounded-xl">
                            <img src={entry.image} alt={entry.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                        </div>
                      )}
                      <div className="space-y-6">
                        <p className={cn("text-sm leading-relaxed md:text-base transition-all duration-300 font-medium", isActive ? "text-zinc-300" : "text-zinc-500")}>{entry.description}</p>
                        <div className={cn("grid transition-all duration-500 ease-out", isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                          <div className="overflow-hidden space-y-6 pt-2">
                              {entry.items && (
                                <div className="border-l-2 border-white/10 pl-6 py-2">
                                  <ul className="space-y-3">
                                    {entry.items.map((item, i) => (
                                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.emerald }} />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {entry.button && (
                                <Button size="lg" className="group font-bold transition-all duration-200 text-white rounded-xl border-none px-8 h-10 text-sm" style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.emerald}, ${COLORS.cyan})` }} asChild>
                                  <a href={entry.button.url}>{entry.button.text} <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
                                </Button>
                              )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}