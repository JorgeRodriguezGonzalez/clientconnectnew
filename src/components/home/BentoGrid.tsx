import React, { useEffect, useRef, useState } from "react";
import { Aperture, BarChart3, Activity, Layers } from "lucide-react";
import { motion, animate } from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

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

const getRootTheme = () => {
  if (typeof document === "undefined") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }

  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.getAttribute("data-theme") === "dark" || root.dataset?.theme === "dark") return "dark";
  if (root.classList.contains("light")) return "light";

  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "light";
};

function FeaturesSectionMinimal() {
  const [theme, setTheme] = useState(() => getRootTheme());
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "bento2-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes bento2-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6%); }
      }
      @keyframes bento2-pulse {
        0%, 100% { transform: scale(1); opacity: 0.85; }
        50% { transform: scale(1.08); opacity: 1; }
      }
      @keyframes bento2-tilt {
        0% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
        100% { transform: rotate(-2deg); }
      }
      @keyframes bento2-drift {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(6%, -6%, 0); }
      }
      @keyframes bento2-glow {
        0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 0 rgba(0,0,0,0.4)); }
        50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(0,0,0,0.2)); }
      }
      @keyframes bento2-intro {
        0% { opacity: 0; transform: translate3d(0, 28px, 0); }
        100% { opacity: 1; transform: translate3d(0, 0, 0); }
      }
      @keyframes bento2-card {
        0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
      @keyframes bento2-gradient-fade1 {
        0%, 10% { opacity: 0.32; }
        26.67%, 73.33% { opacity: 0; }
        88.1%, 100% { opacity: 0.32; }
      }
      @keyframes bento2-gradient-fade2 {
        0%, 10% { opacity: 0; }
        26.67%, 50% { opacity: 0.32; }
        69.05%, 100% { opacity: 0; }
      }
      @keyframes bento2-gradient-fade3 {
        0%, 50% { opacity: 0; }
        69.05%, 73.81% { opacity: 0.32; }
        88.1%, 100% { opacity: 0; }
      }
      @keyframes bento2-title-gradient {
        0% { background-position: 200% 50%; }
        100% { background-position: -100% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    const syncTheme = () => {
      const next = getRootTheme();
      setTheme((prev) => (prev === next ? prev : next));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

    const handleStorage = (event) => {
      if (event.key === "bento-theme") syncTheme();
    };

    const media =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;

    const handleMediaChange = () => syncTheme();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
    }
    media?.addEventListener("change", handleMediaChange);

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorage);
      }
      media?.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Strategic Growth",
      blurb: "Data-driven campaigns built with precision targeting and optimized budgets across every digital channel.",
      meta: "Strategy",
      icon: Aperture,
      animation: "bento2-float 6s ease-in-out infinite",
    },
    {
      title: "Qualified Leads Daily",
      blurb: "Targeted strategies connect you with high-intent prospects actively searching for your services right now.",
      meta: "Results",
      icon: BarChart3,
      animation: "bento2-pulse 4s ease-in-out infinite",
      showSkills: true,
    },
    {
      title: "Transparent Reporting",
      blurb: "Real metrics tracked monthly, showing exactly how your investment translates into measurable business growth.",
      meta: "Analytics",
      icon: Activity,
      animation: "bento2-drift 8s ease-in-out infinite",
    },
    {
      title: "Full-Service Team",
      blurb: "Expert specialists managing SEO, ads, design, and social media while you focus on closing deals.",
      meta: "Support",
      icon: Layers,
      animation: "bento2-glow 7s ease-in-out infinite",
    },
  ];

  const spans = [
    "md:col-span-4 md:row-span-2",
    "md:col-span-2 md:row-span-2",
    "md:col-span-3 md:row-span-1",
    "md:col-span-3 md:row-span-1",
  ];

  const customStyles = [
    { maxHeight: 'calc(100% - 120px)' }, 
    { maxHeight: 'calc(100% - 120px)' }, 
    { marginTop: '-120px' }, 
    { marginTop: '-120px' }  
  ];

  return (
    <div className="relative min-h-screen w-full bg-white text-neutral-900 transition-colors duration-500 dark:bg-black dark:text-white">
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div
          className="absolute inset-0 [--aurora-base:#ffffff] [--aurora-accent:rgba(148,163,184,0.15)] dark:[--aurora-base:#040404] dark:[--aurora-accent:rgba(59,130,246,0.15)]"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 12% 0%, var(--aurora-accent), transparent 65%), radial-gradient(ellipse 40% 80% at 88% 0%, rgba(148,163,184,0.1), transparent 70%), var(--aurora-base)",
          }}
        />
        <div
          className="absolute inset-0 [--grid-color:rgba(17,17,17,0.08)] dark:[--grid-color:rgba(255,255,255,0.06)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            opacity: 0.9,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 [--edge-color:rgba(255,255,255,1)] dark:[--edge-color:rgba(0,0,0,1)]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 55%, var(--edge-color) 100%)",
            filter: "blur(40px)",
            opacity: 0.75,
          }}
        />
      </div>

      <section
        ref={sectionRef}
        className={`relative mx-auto max-w-6xl px-6 py-20 motion-safe:opacity-0 ${
          sectionVisible ? "motion-safe:animate-[bento2-intro_0.9s_ease-out_forwards]" : ""
        }`}
      >
        <header className="mb-10 flex flex-col gap-6 border-b border-neutral-900/10 pb-6 transition-colors duration-500 md:flex-row md:items-end md:justify-between dark:border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-500 transition-colors duration-500 dark:text-white/40">
              Digital Excellence
            </span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 transition-colors duration-500 md:text-5xl dark:text-white">
              Why Choose Us
              <span
                style={{
                  display: "inline-block",
                  backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(237,191,134,0.2) 15%, rgba(237,191,134,0.5) 25%, rgb(237,191,134) 35%, rgb(222,131,99) 50%, rgb(103,188,183) 65%, rgba(103,188,183,0.5) 75%, rgba(103,188,183,0.2) 85%, rgba(255,255,255,0) 100%)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  animation: "bento2-title-gradient 8s ease-in-out infinite"
                }}
              >
                .
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-sm text-neutral-600 transition-colors duration-500 md:text-base dark:text-white/60">
              Australia's leading marketing agency delivering measurable growth through proven digital strategies.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-3 md:auto-rows-[minmax(220px,auto)] md:grid-cols-6">
          {features.map((feature, index) => (
            <BentoItem
              key={feature.title}
              span={spans[index]}
              feature={feature}
              theme={theme}
              index={index}
              isVisible={sectionVisible}
              customStyle={customStyles[index]}
            />
          ))}
        </div>

        <footer className="mt-16 border-t border-neutral-900/10 pt-6 text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors duration-500 dark:border-white/10 dark:text-white/40">
          Real results through data-driven digital marketing.
        </footer>
      </section>
    </div>
  );
}

function BentoItem({ feature, span = "", theme = "light", index = 0, isVisible = false, customStyle = {} }) {
  const { icon: Icon, animation, title, blurb, meta, showSkills } = feature;
  const [hoverCount, setHoverCount] = useState(0);
  const [cardHovered, setCardHovered] = useState(false);
  
  const animationDelay = `${Math.max(index * 0.12, 0)}s`;

  const isStrategicGrowth = index === 0;
  const isQualifiedLeads = showSkills === true;
  const isTransparentReporting = index === 2;

  const skills = [
    { text: 'Website Design', position: { top: '80px', right: '12px' } },
    { text: 'SEO', position: { top: '9px', right: '10px' } },
    { text: 'Google Ads', position: { top: '9px', left: '15px' } },
    { text: 'Social Media', position: { top: '23px', right: '108px' } },
    { text: 'CRM', position: { top: '49px', right: '57px' } },
    { text: 'Facebook Ads', position: { bottom: '31px', left: '120px' } },
    { text: 'Videography', position: { bottom: '7px', left: '25px' } },
    { text: 'Photography', position: { bottom: '53px', left: '55px' } }
  ];

  return (
    <div className={`relative ${span}`} style={customStyle}>
      <div className="relative h-full rounded-2xl p-[2px]">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <article
          className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] motion-safe:opacity-0 ${
            isVisible ? "motion-safe:animate-[bento2-card_0.8s_ease-out_forwards]" : ""
          } dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)]`}
          style={{ animationDelay }}
          onMouseEnter={() => {
            setCardHovered(true);
            setHoverCount(prev => prev + 1);
          }}
          onMouseLeave={() => setCardHovered(false)}
        >
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-white/85 transition-colors duration-500 dark:bg-white/8" />
            {theme === "dark" ? (
              <div
                className="absolute inset-0 opacity-70 transition-opacity duration-500"
                style={{ 
                  background: "radial-gradient(ellipse 60% 120% at 12% 0%, rgba(59,130,246,0.24), transparent 72%)"
                }}
              />
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{ 
                    background: "radial-gradient(ellipse 60% 120% at 12% 0%, rgb(237,191,134), transparent 72%)",
                    animation: "bento2-gradient-fade1 10.5s ease-in-out infinite"
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ 
                    background: "radial-gradient(ellipse 60% 120% at 12% 0%, rgb(103,188,183), transparent 72%)",
                    animation: "bento2-gradient-fade2 10.5s ease-in-out infinite"
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ 
                    background: "radial-gradient(ellipse 60% 120% at 12% 0%, rgb(148,163,184), transparent 72%)",
                    animation: "bento2-gradient-fade3 10.5s ease-in-out infinite"
                  }}
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-900/15 bg-white transition-colors duration-500 dark:border-white/15 dark:bg-white/10">
                <Icon
                  className="h-7 w-7 text-neutral-900 transition-colors duration-500 dark:text-white"
                  strokeWidth={1.5}
                  style={{ animation }}
                />
              </div>
              <div className="flex-1">
                <header className="flex items-start gap-3">
                  <h3 className="pt-[20px] text-base font-semibold uppercase tracking-wide text-neutral-900 transition-colors duration-500 dark:text-white">
                    {title}
                  </h3>
                  {meta && (
                    <span className="ml-auto rounded-full border border-neutral-900/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors duration-500 dark:border-white/15 dark:text-white/60">
                      {meta}
                    </span>
                  )}
                </header>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 transition-colors duration-500 dark:text-white/60">
                  {blurb}
                </p>
              </div>
            </div>

            {isStrategicGrowth && (
              <div className="relative w-full h-[160px] mt-2 overflow-hidden">
                <motion.div 
                  key={`img1-${hoverCount}`}
                  className="absolute w-[120px] h-[204px]" 
                  style={{
                    top: '40px',
                    left: '50%',
                    marginLeft: '-260px',
                    transformOrigin: '60px 102px'
                  }} 
                  initial={{ x: -20, opacity: 0.8 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <img 
                    src="https://framerusercontent.com/images/Cs7myyCzaXS8LyQHqBxdAlCZ8.png?scale-down-to=512" 
                    alt="Website preview" 
                    className="w-full h-full object-cover rounded-md shadow-lg" 
                  />
                </motion.div>
                
                <motion.div 
                  key={`img2-${hoverCount}`}
                  className="absolute w-[120px] h-[204px]" 
                  style={{
                    top: '40px',
                    left: '50%',
                    marginLeft: '-140px',
                    transformOrigin: '60px 102px'
                  }} 
                  initial={{ y: -20, opacity: 0.8 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <img 
                    src="https://framerusercontent.com/images/QhYCPWusAHYNzw5EQ6zVaQ50.png?scale-down-to=512" 
                    alt="Website preview" 
                    className="w-full h-full object-cover rounded-md shadow-lg" 
                  />
                </motion.div>
                
                <motion.div 
                  key={`img3-${hoverCount}`}
                  className="absolute w-[136px] h-[250px]" 
                  style={{
                    top: '10px',
                    left: '50%',
                    marginLeft: '-68px',
                    transformOrigin: '68px 125px',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 56px 47px 0px',
                    zIndex: 10
                  }} 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img 
                    src="https://framerusercontent.com/images/pb1l1eWieWRyif3smeXnmDu1jnY.png?scale-down-to=512" 
                    alt="Website preview" 
                    className="w-full h-full object-cover rounded-md" 
                  />
                </motion.div>
                
                <motion.div 
                  key={`img4-${hoverCount}`}
                  className="absolute w-[120px] h-[204px]" 
                  style={{
                    top: '40px',
                    left: '50%',
                    marginLeft: '76px',
                    transformOrigin: '60px 102px'
                  }} 
                  initial={{ y: -20, opacity: 0.8 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <img 
                    src="https://framerusercontent.com/images/Cs7myyCzaXS8LyQHqBxdAlCZ8.png?scale-down-to=512" 
                    alt="Website preview" 
                    className="w-full h-full object-cover rounded-md shadow-lg" 
                  />
                </motion.div>
                
                <motion.div 
                  key={`img5-${hoverCount}`}
                  className="absolute w-[120px] h-[204px]" 
                  style={{
                    top: '40px',
                    left: '50%',
                    marginLeft: '196px',
                    transformOrigin: '60px 102px'
                  }} 
                  initial={{ x: 20, opacity: 0.8 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img 
                    src="https://framerusercontent.com/images/QhYCPWusAHYNzw5EQ6zVaQ50.png?scale-down-to=512" 
                    alt="Website preview" 
                    className="w-full h-full object-cover rounded-md shadow-lg" 
                  />
                </motion.div>
              </div>
            )}

            {isQualifiedLeads && (
              <div className="relative w-full h-[120px] mt-2">
                {skills.map((skill, idx) => (
                  <motion.div
                    key={`${skill.text}-${hoverCount}`}
                    className="absolute flex items-center justify-center overflow-hidden rounded-full bg-white dark:bg-neutral-800 px-2 py-1 shadow-md"
                    style={{
                      ...skill.position
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: isVisible ? idx * 0.05 + 0.3 : 0,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <p className="m-0 whitespace-nowrap text-[9px] font-medium text-neutral-900 dark:text-white">
                      {skill.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {isTransparentReporting && (
               <div className="relative w-full h-[160px] mt-2 overflow-hidden">
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden" 
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 50%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 50%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 5%, black 60%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in'
                  }}
                >
                  <svg 
                    className="absolute bottom-[-40px] left-[-40px] w-[150%] h-[150%]" 
                    viewBox="0 0 494 286" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{ imageRendering: 'auto', transform: 'scale(1.2)' }}
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0.4994780349390567" x2="0.5005219650609433" y1="0" y2="1">
                        <stop offset="0" stopColor="rgba(103, 188, 183, 0.6)" stopOpacity="0.6" />
                        <stop offset="1" stopColor="rgba(103, 188, 183, 0)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path 
                      key={`chart-${hoverCount}`}
                      d="M 489.248 5.489 L 489.248 283.23 L 4.869 279.745 L 10 200 C 50 195 90 190 130 180 C 170 168 210 152 250 130 C 290 105 330 72 370 40 C 410 15 450 8 489.248 5.489 Z" 
                      fill="url(#chartGradient)" 
                      stroke="#67BCB7" 
                      strokeWidth="1.77" 
                      strokeMiterlimit="10" 
                      initial={{ pathLength: 0, opacity: 0 }} 
                      animate={{ pathLength: 1, opacity: 1 }} 
                      transition={{ duration: 1.5, ease: 'easeInOut', delay: 0 }} 
                    />
                    <motion.path 
                      key={`line-${hoverCount}`}
                      d="M 10 200 C 50 195 90 190 130 180 C 170 168 210 152 250 130 C 290 105 330 72 370 40 C 410 15 450 8 489.248 5.489" 
                      fill="transparent" 
                      stroke="rgba(103, 188, 183, 0.5)" 
                      strokeWidth="2" 
                      strokeMiterlimit="10" 
                      strokeDasharray="9.07,9.07" 
                      initial={{ pathLength: 0 }} 
                      animate={{ pathLength: 1 }} 
                      transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }} 
                    />
                  </svg>
                </div>
               </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div
              className="absolute inset-0 rounded-2xl border border-neutral-900/10 transition-colors duration-500 dark:border-white/10"
              style={{
                maskImage:
                  "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
                WebkitMaskImage:
                  "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

export default FeaturesSectionMinimal;
export { FeaturesSectionMinimal };
export { FeaturesSectionMinimal as BentoGrid };