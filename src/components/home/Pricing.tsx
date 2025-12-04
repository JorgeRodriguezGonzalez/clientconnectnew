import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion, animate } from "framer-motion";

// --- UTILIDADES ---
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// --- COMPONENTE GLOWING EFFECT ---
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
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      } as any);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
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
              "--gradient": `radial-gradient(circle, #EDBF86 10%, #EDBF8600 20%),
                radial-gradient(circle at 40% 40%, #DE8363 5%, #DE836300 15%),
                radial-gradient(circle at 60% 60%, #67BCB7 10%, #67BCB700 20%), 
                radial-gradient(circle at 40% 60%, #94A3B8 10%, #94A3B800 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #EDBF86 0%,
                  #DE8363 calc(25% / var(--repeating-conic-gradient-times)),
                  #67BCB7 calc(50% / var(--repeating-conic-gradient-times)), 
                  #94A3B8 calc(75% / var(--repeating-conic-gradient-times)),
                  #EDBF86 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);
GlowingEffect.displayName = "GlowingEffect";

// --- CONSTANTES ---
const COLORS = {
  turquoise: "rgb(103, 188, 183)", // #67bcb7
  coral: "rgb(222, 131, 99)",     // #de8363
  gold: "rgb(237, 191, 134)",     // #edbf86
};

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- DATOS DEL PRICING ---
const plans = [
  {
    name: "Growth",
    price: "$3,000",
    description: "Perfect for local businesses ready to build a solid foundation.",
    features: [
      "Local SEO Optimization",
      "Social Media Management (2 platforms)",
      "Monthly Content Calendar",
      "Google Business Profile Management",
      "Basic Monthly Reporting",
    ],
    highlighted: false,
    cta: "Start Growing",
  },
  {
    name: "Scale",
    price: "$5,000",
    description: "For brands ready to expand their reach and drive aggressive leads.",
    features: [
      "Advanced SEO & Link Building",
      "Paid Ads Management (Google & Meta)",
      "Email Marketing Automation",
      "CRO (Conversion Rate Optimization)",
      "Bi-Weekly Strategy Calls",
      "Real-time ROI Dashboard",
    ],
    highlighted: true,
    cta: "Scale Your Brand",
  },
  {
    name: "Dominance",
    price: "Custom",
    description: "Full-service partnership for industry leaders and large organizations.",
    features: [
      "Dedicated Fractional CMO",
      "Omni-Channel Strategy Execution",
      "Custom Web Development & Design",
      "Video Production & Photography",
      "Priority 24/7 Support",
      "Competitor Market Takeover",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

// --- COMPONENTE PRINCIPAL ---
const Pricing = () => {
  return (
    <section id="pricing" className="relative bg-white py-24 sm:py-32 overflow-hidden">
      
      {/* --- TOP BORDER LINE --- */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      {/* Background Pattern */}
      <BackgroundStripes />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500 mb-4"
          >
            INVESTMENT
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6"
          >
            Transparent pricing for{' '}
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
                backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.gold}, ${COLORS.coral}, ${COLORS.turquoise}, rgba(255, 255, 255, 0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              measurable results
            </motion.span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] font-medium leading-relaxed text-gray-600 tracking-tight"
          >
            Choose the partnership level that aligns with your growth goals. No hidden fees, just clear deliverables.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative h-full ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* 
                Estructura para GlowingEffect:
                El div padre tiene p-[2px] para crear espacio para el efecto de brillo.
              */}
              <div className="relative h-full p-[2px] rounded-none"> 
                
                {/* El efecto de brillo está detrás de la tarjeta */}
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex flex-col h-full p-8 transition-all duration-300 rounded-none bg-white",
                    // Se añade el borde gris a todas las tarjetas:
                    "border border-zinc-200",
                    plan.highlighted ? "shadow-xl z-10" : "hover:shadow-lg"
                  )}
                >
                  {/* Popular Badge */}
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 p-3">
                      <div className="px-3 py-1 bg-gray-900 text-white flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[rgb(237,191,134)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="mb-8 mt-2">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 uppercase tracking-wider">{plan.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed min-h-[40px]">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight text-gray-900">
                        {plan.price}
                      </span>
                      {plan.price !== "Custom" && <span className="text-gray-400 font-medium">/month</span>}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className={cn(
                      "w-full mb-8 h-12 text-sm font-semibold tracking-wide transition-all duration-300 group rounded-none border",
                      plan.highlighted 
                        ? "text-white shadow-md border-transparent hover:shadow-lg hover:scale-[1.01]" 
                        : "bg-transparent text-gray-900 border-zinc-900 hover:bg-zinc-900 hover:text-white"
                    )}
                    style={{
                      backgroundColor: plan.highlighted ? "rgb(30, 41, 59)" : undefined,
                      backgroundImage: plan.highlighted 
                        ? `linear-gradient(135deg, ${COLORS.turquoise}, ${COLORS.coral})` 
                        : undefined
                    }}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>

                  <div className="w-full h-px bg-zinc-200/60 mb-8" />

                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          <Check className="h-4 w-4" style={{ color: COLORS.turquoise }} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;