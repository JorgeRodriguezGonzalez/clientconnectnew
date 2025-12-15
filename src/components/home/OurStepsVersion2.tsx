"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Hammer, TrendingUp, AlertTriangle, HardHat, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, animate } from "framer-motion";

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
};

// --- COMPONENTE GLOWING EFFECT (Integrado) ---
const GlowingEffect = React.memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
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

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
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

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

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
        <div className={cn("pointer-events-none absolute -inset-px hidden rounded-none border opacity-0 transition-opacity", glow && "opacity-100", disabled && "!block")} />
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
          className={cn("pointer-events-none absolute inset-0 rounded-none opacity-100 transition-opacity", glow && "opacity-100", blur > 0 && "blur-[var(--blur)] ", className, disabled && "!hidden")}
        >
          <div className={cn("glow", "rounded-none", 'after:content-[""] after:rounded-none after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]', "after:[border:var(--glowingeffect-border-width)_solid_transparent]", "after:[background:var(--gradient)] after:[background-attachment:fixed]", "after:opacity-[var(--active)] after:transition-opacity after:duration-300", "after:[mask-clip:padding-box,border-box]", "after:[mask-composite:intersect]", "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]")} />
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

// --- Components ---

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- Types ---

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

// --- Data: LA HISTORIA DE LOS FOUNDERS ---

export const founderStoryEntries: StoryEntry[] = [
  {
    icon: AlertTriangle,
    title: "The $90k Lesson",
    subtitle: "The Monster • Being Burned",
    description:
      "Before Client Connect, we were exactly where you are. We ran our own roofing business and trusted agencies with our growth. We lost over $90,000 to 'marketing experts' who promised the world but delivered dashboards full of vanity metrics and zero revenue.",
    items: [
      "Agencies that didn't understand the trade",
      "Reports full of 'Likes' but no paying jobs",
      "Contracts that locked us in while we bled cash",
      "The realization: 'No one is coming to save us'",
    ],
    // Imagen conceptual: Alguien mirando facturas/perdidas o frustrado en la oficina
    image:
      "https://images.unsplash.com/photo-1590422502693-47cb7945037d?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: HardHat,
    title: "The Double Life",
    subtitle: "The Quest • Tools & Laptops",
    description:
      "We decided to take matters into our own hands. We didn't quit the tools. Instead, we spent our days on roofs dealing with council delays and our nights decoding Google's algorithms. We lived the reality: High-vis in the morning, high-level strategy in the afternoon.",
    items: [
      "Still on the tools: We know the pressure",
      "Learning code and algorithms from the ground up",
      "Testing strategies with our own money, not yours",
      "Understanding the difference between a lead and a job",
    ],
    // Imagen conceptual: Un sitio de construcción / ute / herramientas
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: Hammer,
    title: "The Breakthrough",
    subtitle: "The Victory • It Works",
    description:
      "It clicked. When we applied a tradie's mindset—precision, structural integrity, and no BS—to marketing, our leads exploded. We realized that local positioning isn't about 'brand awareness', it's about being the most trusted option when a neighbor needs help urgently.",
    items: [
      "Built a system that bypasses corporate fluff",
      "Hyper-local targeting down to the suburb level",
      "Messages that speak 'Tradie', not 'Marketing'",
      "From 2 jobs a week to booked out months ahead",
    ],
    // Imagen conceptual: Planos, estructura, crecimiento
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop",
  },
  {
    icon: ShieldCheck,
    title: "Protecting The Trade",
    subtitle: "The Mission • Your Unfair Advantage",
    description:
      "Now, we exist for one reason: To ensure no other Australian business owner gets burned like we did. We aren't suits in a CBD office guessing about your industry. We are your competitive advantage because we've literally walked in your steel-capped boots.",
    items: [
      "We validate every lead (we know the tyre-kickers)",
      "We speak your language, not jargon",
      "Complete transparency: We show you the real numbers",
      "We only win when you are profitable",
    ],
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop",
    button: {
      url: "#contact",
      text: "Work With People Who Get It",
    },
  },
];

// --- UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- Main Component ---

export default function FounderStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

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
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    // SECCIÓN PRINCIPAL: Fondo negro (#050505)
    <section className="relative w-full bg-[#050505]">
      
      {/* 1. FONDO DE RAYAS */}
      <BackgroundStripes />

      {/* 2. CONTENEDOR ESTRUCTURAL */}
      <div className="relative z-10 w-full max-w-5xl mx-auto bg-[#050505] border-l border-r border-white/10">
        
        {/* Padding interno del contenido */}
        <div className="pt-24 pb-32 px-4 md:px-8">
          
          {/* HEADER (NARRATIVA) */}
          <div className="mx-auto max-w-[680px] flex flex-col gap-6 text-center mb-16 md:mb-24">
            <div className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-500">
              OUR STORY
            </div>

            <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-white">
              We aren't just marketers.<br/> 
              We are tradies who learned{' '}
              <span className="whitespace-nowrap">
                <motion.span
                  initial={{ backgroundPosition: "400% 50%" }}
                  animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                  transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity
                  }}
                  style={{
                    display: "inline-block",
                    // EFECTO GRADIENTE: Emerald -> Cyan -> Emerald
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

          {/* LISTA DE CAPITULOS (STORIES) */}
          <div className="mx-auto max-w-3xl space-y-16 md:space-y-24">
            {founderStoryEntries.map((entry, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                  ref={(el) => setItemRef(el, index)}
                  aria-current={isActive ? "true" : "false"}
                >
                  {/* STICKY COLUMN (LEFT) - Icon & Title */}
                  <div className="top-32 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                    <div className="flex items-center gap-3">
                      {/* Icon Container: Square corners */}
                      <div 
                        className={cn(
                          "p-2 rounded-none transition-colors duration-300 border border-transparent",
                          isActive ? "text-black" : "bg-white/5 text-zinc-500 border-white/5"
                        )}
                        style={{
                          backgroundColor: isActive ? COLORS.cyan : undefined
                        }}
                      >
                        <entry.icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className={cn("text-sm font-bold transition-colors duration-300", isActive ? "text-white" : "text-zinc-500")}>
                          {entry.title}
                        </span>
                        <span className="text-xs text-zinc-600 font-medium">
                          {entry.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Invisible sentinel for scroll detection */}
                  <div
                    ref={(el) => setSentinelRef(el, index)}
                    aria-hidden
                    className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                  />

                  {/* CONTENT COLUMN (RIGHT) */}
                  <div className="relative">
                    
                    {/* Glowing Effect Wrapper - Solo activo cuando es visible */}
                    <div className="absolute -inset-[1px] rounded-none opacity-0 transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0 }}>
                        <GlowingEffect 
                            spread={20}
                            glow={true}
                            disabled={!isActive}
                            proximity={64}
                            inactiveZone={0.01}
                            borderWidth={1}
                        />
                    </div>

                    <article
                      className={
                        "relative flex flex-col rounded-none border p-6 transition-all duration-300 " +
                        (isActive
                          ? "bg-zinc-900 z-10 border-transparent"
                          : "bg-white/5 border-white/5 opacity-60 grayscale")
                      }
                    >
                      {entry.image && (
                        <div className="mb-6 w-full h-64 overflow-hidden bg-black border-b border-white/10 relative group">
                            <img
                                src={entry.image}
                                alt={`${entry.title} visual`}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                loading="lazy"
                            />
                            {/* Overlay sutil para integrar imagen en dark mode */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {/* Eliminado título duplicado, ya está en el sticky. Enfocamos en narrativa */}
                          
                          <p
                            className={
                              "text-sm leading-relaxed md:text-base transition-all duration-300 font-medium " +
                              (isActive 
                                ? "text-zinc-300" 
                                : "text-zinc-500")
                            }
                          >
                            {entry.description}
                          </p>
                        </div>

                        <div
                          aria-hidden={!isActive}
                          className={
                            "grid transition-all duration-500 ease-out " +
                            (isActive 
                              ? "grid-rows-[1fr] opacity-100" 
                              : "grid-rows-[0fr] opacity-0")
                          }
                        >
                          <div className="overflow-hidden">
                            <div className="space-y-6 pt-2">
                              {entry.items && entry.items.length > 0 && (
                                <div className="rounded-none border-l-2 border-white/10 pl-4 py-1">
                                  <ul className="space-y-3">
                                    {entry.items.map((item, itemIndex) => (
                                      <li 
                                        key={itemIndex} 
                                        className="flex items-start gap-3 text-sm text-zinc-400"
                                      >
                                        {/* Bullet: Emerald Square */}
                                        <div 
                                          className="mt-1.5 h-1.5 w-1.5 rounded-none flex-shrink-0"
                                          style={{ backgroundColor: COLORS.emerald }}
                                        />
                                        <span className="leading-relaxed">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {entry.button && (
                                <div className="flex justify-start pt-2">
                                  <Button 
                                    size="lg"
                                    className="group font-bold transition-all duration-200 text-white rounded-none border-none px-8"
                                    style={{
                                      // Gradiente Emerald -> Cyan
                                      backgroundImage: `linear-gradient(135deg, ${COLORS.emerald}, ${COLORS.cyan})`,
                                    }}
                                    asChild
                                  >
                                    <a href={entry.button.url}>
                                      {entry.button.text} 
                                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </a>
                                  </Button>
                                </div>
                              )}
                            </div>
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