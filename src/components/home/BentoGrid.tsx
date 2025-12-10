import React, { useEffect, useRef, useState } from "react";
import { Aperture, BarChart3, Activity, Layers } from "lucide-react";
import { motion, animate, useInView } from "framer-motion";

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
        0% { opacity: 0.32; }
        25% { opacity: 0; }
        100% { opacity: 0; }
      }
      @keyframes bento2-gradient-fade2 {
        0% { opacity: 0; }
        25% { opacity: 0.32; }
        75% { opacity: 0.32; }
        100% { opacity: 0; }
      }
      @keyframes bento2-title-gradient {
        0% { background-position: 200% 50%; }
        100% { background-position: -100% 50%; }
      }
      @keyframes move-horizontal {
        0% { left: 10%; }
        100% { left: 90%; }
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
      title: "+95 Local Brands Served",
      blurb: "Helping businesses across various industries achieve their goals and stand out in competitive markets.",
      meta: "Experience",
      icon: Aperture,
      animation: "bento2-float 6s ease-in-out infinite",
    },
    {
      title: "Omni-Channel Lead Generation",
      blurb: "Strategic campaigns across SEO, Google Ads, Social Media and more to capture high-intent prospects.",
      meta: "Reach",
      icon: BarChart3,
      animation: "bento2-pulse 4s ease-in-out infinite",
      showSkills: true,
    },
    {
      title: "$1,000,000+ Profit Generated",
      blurb: "Driving measurable growth for our clients so they can reinvest where it matters the most.",
      meta: "Growth",
      icon: Activity,
      animation: "bento2-drift 8s ease-in-out infinite",
    },
    {
      title: "Technical Excellence",
      blurb: "Data-driven strategies that amplify your brand with targeted campaigns for your ideal audience.",
      meta: "Process",
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
    <div className="relative min-h-screen w-full bg-[#FAFAFA] text-neutral-900 transition-colors duration-500 dark:bg-black dark:text-white">
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
  const [showInternalAnimations, setShowInternalAnimations] = useState(false);
  
  useEffect(() => {
    if (isVisible && !showInternalAnimations) {
      const cardAnimationDuration = 800; // duración de la animación bento2-card en ms
      const cardDelay = Math.max(index * 0.12, 0) * 1000; // delay de la tarjeta en ms
      const totalDelay = cardAnimationDuration + cardDelay + 200; // 200ms extra después de que termine
      
      const timer = setTimeout(() => {
        setShowInternalAnimations(true);
        setHoverCount(prev => prev + 1);
      }, totalDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, showInternalAnimations, index]);
  
  const animationDelay = `${Math.max(index * 0.12, 0)}s`;

  const isStrategicGrowth = index === 0;
  const isQualifiedLeads = showSkills === true;
  const isTransparentReporting = index === 2;
  const isFullServiceTeam = index === 3;

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
      <div className="relative h-full p-[2px]">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <article
          className={`group relative flex h-full flex-col justify-between overflow-hidden border border-neutral-900/10 bg-white/80 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] motion-safe:opacity-0 ${
            isVisible ? "motion-safe:animate-[bento2-card_0.8s_ease-out_forwards]" : ""
          } dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)]`}
          style={{ animationDelay }}
          onMouseEnter={() => {
            setCardHovered(true);
            if (showInternalAnimations) {
              setHoverCount(prev => prev + 1);
            }
          }}
          onMouseLeave={() => setCardHovered(false)}
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
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
                    background: "radial-gradient(ellipse 60% 120% at 12% 0%, rgb(102,204,224), transparent 72%)",
                    animation: "bento2-gradient-fade2 10.5s ease-in-out infinite"
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

            {isStrategicGrowth && showInternalAnimations && (
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

            {isQualifiedLeads && showInternalAnimations && (
              <div className="relative w-full h-[120px] mt-2">
                <AnimatedLogos />
              </div>
            )}

            {isTransparentReporting && showInternalAnimations && (
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
                    className="absolute bottom-[-40px] left-[-120px] w-[150%] h-[150%]" 
                    viewBox="0 0 494 286" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{ imageRendering: 'auto', transform: 'scale(1.2)' }}
                  >
                    <defs>
                      <linearGradient id="chartGradientTeal" x1="0.4994780349390567" x2="0.5005219650609433" y1="0" y2="1">
                        <stop offset="0" stopColor="rgba(103, 188, 183, 0.6)" stopOpacity="0.6" />
                        <stop offset="1" stopColor="rgba(103, 188, 183, 0)" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="chartGradientCoral" x1="0.4994780349390567" x2="0.5005219650609433" y1="0" y2="1">
                        <stop offset="0" stopColor="rgba(255, 127, 80, 0.6)" stopOpacity="0.6" />
                        <stop offset="1" stopColor="rgba(255, 127, 80, 0)" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="clipBelowLine">
                        <rect x="0" y="152" width="494" height="134" />
                      </clipPath>
                      <clipPath id="clipAboveLine">
                        <rect x="0" y="0" width="494" height="152" />
                      </clipPath>
                    </defs>
                    
                    <motion.line
                      key={`reference-line-${hoverCount}`}
                      x1="80"
                      y1="152"
                      x2="490"
                      y2="152"
                      stroke="rgba(103, 188, 183, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
                    />
                    
                    <g clipPath="url(#clipBelowLine)">
                      <motion.path 
                        key={`chart-teal-${hoverCount}`}
                        d="M 489.248 283.23 L 4.869 279.745 L 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489 L 489.248 283.23 Z" 
                        fill="url(#chartGradientTeal)" 
                        stroke="#67BCB7" 
                        strokeWidth="1.77" 
                        strokeMiterlimit="10" 
                        initial={{ pathLength: 0, opacity: 0 }} 
                        animate={{ pathLength: 1, opacity: 1 }} 
                        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0 }} 
                      />
                    </g>
                    
                    <g clipPath="url(#clipAboveLine)">
                      <motion.path 
                        key={`chart-coral-${hoverCount}`}
                        d="M 489.248 5.489 L 489.248 283.23 L 4.869 279.745 L 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489 Z" 
                        fill="url(#chartGradientCoral)" 
                        stroke="#FF7F50" 
                        strokeWidth="1.77" 
                        strokeMiterlimit="10" 
                        initial={{ pathLength: 0, opacity: 0 }} 
                        animate={{ pathLength: 1, opacity: 1 }} 
                        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0 }} 
                      />
                    </g>
                    
                    <g clipPath="url(#clipBelowLine)">
                      <motion.path 
                        key={`line-teal-${hoverCount}`}
                        d="M 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489" 
                        fill="transparent" 
                        stroke="rgba(103, 188, 183, 0.5)" 
                        strokeWidth="2" 
                        strokeMiterlimit="10" 
                        strokeDasharray="9.07,9.07" 
                        initial={{ pathLength: 0 }} 
                        animate={{ pathLength: 1 }} 
                        transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }} 
                      />
                    </g>
                    
                    <g clipPath="url(#clipAboveLine)">
                      <motion.path 
                        key={`line-coral-${hoverCount}`}
                        d="M 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489" 
                        fill="transparent" 
                        stroke="rgba(255, 127, 80, 0.5)" 
                        strokeWidth="2" 
                        strokeMiterlimit="10" 
                        strokeDasharray="9.07,9.07" 
                        initial={{ pathLength: 0 }} 
                        animate={{ pathLength: 1 }} 
                        transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }} 
                      />
                    </g>
                  </svg>
                </div>
               </div>
            )}

            {isFullServiceTeam && showInternalAnimations && (
              <div className="absolute bottom-2 right-2 w-[360px]">
                <MiniCardStatusList />
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div
              className="absolute inset-0 border border-neutral-900/10 transition-colors duration-500 dark:border-white/10"
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

// Mini Card Status List for Full-Service Team
interface MiniCard {
  id: string;
  title: string;
  status: "completed" | "updates-found" | "syncing";
}

function MiniCardStatusList() {
  const [cards, setCards] = useState<MiniCard[]>([
    { id: "3", title: "Primary customers", status: "completed" },
    { id: "4", title: "Common words & phrases", status: "updates-found" },
    { id: "5", title: "Company overview", status: "syncing" },
  ]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeDashIndex, setActiveDashIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDashIndex(prev => (prev + 1) % 8);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto-complete "Common words & phrases" after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(prev => prev.map(card => 
        card.id === "4" ? { ...card, status: "syncing" as const } : card
      ));

      setTimeout(() => {
        setCards(prev => prev.map(card => 
          card.id === "4" ? { ...card, status: "completed" as const } : card
        ));
      }, 2500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSynchronize = (cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, status: "syncing" as const } : card
    ));

    setTimeout(() => {
      setCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, status: "completed" as const } : card
      ));
    }, 2500);
  };

  const getStatusIcon = (status: MiniCard["status"]) => {
    switch (status) {
      case "completed":
        return (
          <svg width="12" height="12" viewBox="0 0 16 16" className="drop-shadow-sm">
            <circle cx="8" cy="8" r="8" fill="#22c55e" />
            <path 
              d="M5 8l2.5 2.5 3.5-4" 
              stroke="white" 
              strokeWidth="1.5" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        );
      case "updates-found":
        return (
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path 
              d="M8 1.5L14.5 13H1.5L8 1.5Z" 
              fill="#eab308" 
              stroke="#eab308" 
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <path 
              d="M8 6v3M8 11h0" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>
        );
      case "syncing":
        return (
          <svg width="12" height="12" viewBox="0 0 16 16">
            {Array.from({ length: 8 }).map((_, index) => {
              const angle = (index * 45) - 90;
              const radian = (angle * Math.PI) / 180;
              const radius = 6;
              const dashLength = 1.8;
              
              const startX = 8 + (radius - dashLength/2) * Math.cos(radian);
              const startY = 8 + (radius - dashLength/2) * Math.sin(radian);
              const endX = 8 + (radius + dashLength/2) * Math.cos(radian);
              const endY = 8 + (radius + dashLength/2) * Math.sin(radian);
              
              const isActive = index === activeDashIndex;
              
              return (
                <line
                  key={index}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={isActive ? "#ffffff" : "#6b7280"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        );
    }
  };

  const getStatusText = (status: MiniCard["status"]) => {
    switch (status) {
      case "updates-found":
        return "UPDATES";
      case "syncing":
        return "SYNCING";
      default:
        return null;
    }
  };

  const getGradientClass = (status: MiniCard["status"]) => {
    switch (status) {
      case "updates-found":
        return "from-red-500/20 to-transparent";
      case "syncing":
        return "from-green-500/20 to-transparent";
      default:
        return "";
    }
  };

  const sortedCards = [...cards].sort((a, b) => {
    if (a.status === "completed" && b.status !== "completed") return -1;
    if (a.status !== "completed" && b.status === "completed") return 1;
    return 0;
  });

  return (
    <div className="border border-neutral-900/10 dark:border-white/10 rounded-lg p-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-lg">
      <motion.div 
        className="space-y-2"
        initial="hidden"
        animate="visible"
      >
        {sortedCards.map((card) => (
          <motion.div
            key={card.id}
            layout
            className="relative cursor-pointer"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div 
              className="relative bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 rounded-lg p-2 overflow-hidden"
              whileHover={{
                y: -1,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
            >
              {(card.status === "updates-found" || card.status === "syncing") && (
                <div className={`absolute inset-0 bg-gradient-to-l ${getGradientClass(card.status)} pointer-events-none`} 
                     style={{ 
                       backgroundSize: "40% 100%", 
                       backgroundPosition: "right",
                       backgroundRepeat: "no-repeat"
                     }} 
                />
              )}
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <motion.div
                      key={card.status}
                      initial={{ x: card.status === "completed" ? 16 : 0, scale: 0.8, opacity: 0 }}
                      animate={{ x: 0, scale: 1, opacity: 1 }}
                      exit={{ x: card.status === "syncing" ? -16 : 0, scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {getStatusIcon(card.status)}
                    </motion.div>
                  </div>
                  
                  <span className="text-[10px] text-neutral-900 dark:text-white truncate max-w-[200px]">{card.title}</span>
                </div>

                <div className="flex items-center min-w-0 h-5">
                  {card.status === "updates-found" && hoveredCard === card.id ? (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => handleSynchronize(card.id)}
                      className="px-1.5 py-0.5 bg-white dark:bg-neutral-700 cursor-pointer text-neutral-900 dark:text-white text-[9px] font-medium rounded transition-colors whitespace-nowrap"
                    >
                      Sync
                    </motion.button>
                  ) : getStatusText(card.status) ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[8px] font-mono font-medium text-neutral-500 dark:text-neutral-400 tracking-wider whitespace-nowrap"
                    >
                      {getStatusText(card.status)}
                    </motion.span>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Logos animados para Full-Service Team
const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

function AnimatedLogos() {
  const icons = [
    {
      icon: <InstagramLogo className="h-4 w-4" />,
      size: "sm" as const,
    },
    {
      icon: <GoogleLogo className="h-5 w-5" />,
      size: "md" as const,
    },
    {
      icon: <OpenAILogo className="h-6 w-6" />,
      size: "lg" as const,
    },
    {
      icon: <MetaIconOutline className="h-5 w-5" />,
      size: "md" as const,
    },
    {
      icon: <GeminiLogo className="h-4 w-4" />,
      size: "sm" as const,
    },
  ];

  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  
  const sequence = icons.map((_, index) => [
    `.logo-circle-${index + 1}`,
    { scale, transform },
    { duration: 0.8 },
  ]);

  useEffect(() => {
    const runAnimation = async () => {
      while (true) {
        await animate(sequence as any);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };
    runAnimation();
  }, []);

  return (
    <div className="overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        {icons.map((icon, index) => (
          <LogoContainer
            key={index}
            className={`${sizeMap[icon.size || "lg"]} logo-circle-${index + 1}`}
          >
            {icon.icon}
          </LogoContainer>
        ))}
      </div>
      <AnimatedSparklesLine />
    </div>
  );
}

const LogoContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.8)] dark:bg-neutral-800/80 shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.12)_inset,0px_10px_14px_-8px_rgba(0,0,0,0.25)] ${className}`}
    {...props}
  />
));
LogoContainer.displayName = "LogoContainer";

const AnimatedSparklesLine = () => (
  <div 
    className="h-32 w-px absolute top-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-500 to-transparent z-40"
    style={{
      animation: 'move-horizontal 3s linear infinite',
      left: '10%'
    }}
  >
    <div className="w-10 h-24 top-1/2 -translate-y-1/2 absolute -left-5">
      <Sparkles />
    </div>
  </div>
);

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        />
      ))}
    </div>
  );
};

// Logo Components - Originales del MarketingCard
const InstagramLogo = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="50%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#8134af" />
        </linearGradient>
      </defs>
      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" fill="url(#instagram-gradient)"/>
    </svg>
  );
};

const GoogleLogo = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
};

const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 512 512"
      className={className}
    >
      <rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042" />
      <path
        fill="#1F1F1E"
        fillRule="nonzero"
        d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"
      />
    </svg>
  );
};

const CopilotLogo = ({ className }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 512 416" 
      xmlns="http://www.w3.org/2000/svg" 
      fillRule="evenodd" 
      clipRule="evenodd" 
      strokeLinejoin="round" 
      strokeMiterlimit="2"
      className={className}
    >
      <path d="M181.33 266.143c0-11.497 9.32-20.818 20.818-20.818 11.498 0 20.819 9.321 20.819 20.818v38.373c0 11.497-9.321 20.818-20.819 20.818-11.497 0-20.818-9.32-20.818-20.818v-38.373zM308.807 245.325c-11.477 0-20.798 9.321-20.798 20.818v38.373c0 11.497 9.32 20.818 20.798 20.818 11.497 0 20.818-9.32 20.818-20.818v-38.373c0-11.497-9.32-20.818-20.818-20.818z" fillRule="nonzero"/>
      <path d="M512.002 246.393v57.384c-.02 7.411-3.696 14.638-9.67 19.011C431.767 374.444 344.695 416 256 416c-98.138 0-196.379-56.542-246.33-93.21-5.975-4.374-9.65-11.6-9.671-19.012v-57.384a35.347 35.347 0 016.857-20.922l15.583-21.085c8.336-11.312 20.757-14.31 33.98-14.31 4.988-56.953 16.794-97.604 45.024-127.354C155.194 5.77 226.56 0 256 0c29.441 0 100.807 5.77 154.557 62.722 28.19 29.75 40.036 70.401 45.025 127.354 13.263 0 25.602 2.936 33.958 14.31l15.583 21.127c4.476 6.077 6.878 13.345 6.878 20.88zm-97.666-26.075c-.677-13.058-11.292-18.19-22.338-21.824-11.64 7.309-25.848 10.183-39.46 10.183-14.454 0-41.432-3.47-63.872-25.869-5.667-5.625-9.527-14.454-12.155-24.247a212.902 212.902 0 00-20.469-1.088c-6.098 0-13.099.349-20.551 1.088-2.628 9.793-6.509 18.622-12.155 24.247-22.4 22.4-49.418 25.87-63.872 25.87-13.612 0-27.86-2.855-39.501-10.184-11.005 3.613-21.558 8.828-22.277 21.824-1.17 24.555-1.272 49.11-1.375 73.645-.041 12.318-.082 24.658-.288 36.976.062 7.166 4.374 13.818 10.882 16.774 52.97 24.124 103.045 36.278 149.137 36.278 46.01 0 96.085-12.154 149.014-36.278 6.508-2.956 10.84-9.608 10.881-16.774.637-36.832.124-73.809-1.642-110.62h.041zM107.521 168.97c8.643 8.623 24.966 14.392 42.56 14.392 13.448 0 39.03-2.874 60.156-24.329 9.28-8.951 15.05-31.35 14.413-54.079-.657-18.231-5.769-33.28-13.448-39.665-8.315-7.371-27.203-10.574-48.33-8.644-22.399 2.238-41.267 9.588-50.875 19.833-20.798 22.728-16.323 80.317-4.476 92.492zm130.556-56.008c.637 3.51.965 7.35 1.273 11.517 0 2.875 0 5.77-.308 8.952 6.406-.636 11.847-.636 16.959-.636s10.553 0 16.959.636c-.329-3.182-.329-6.077-.329-8.952.329-4.167.657-8.007 1.294-11.517-6.735-.637-12.812-.965-17.924-.965s-11.21.328-17.924.965zm49.275-8.008c-.637 22.728 5.133 45.128 14.413 54.08 21.105 21.454 46.708 24.328 60.155 24.328 17.596 0 33.918-5.769 42.561-14.392 11.847-12.175 16.322-69.764-4.476-92.492-9.608-10.245-28.476-17.595-50.875-19.833-21.127-1.93-40.015 1.273-48.33 8.644-7.679 6.385-12.791 21.434-13.448 39.665z"/>
    </svg>
  );
};

const OpenAILogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454 7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Zm-10.61 14.71c-1.412 0-2.505-.428-3.46-1.215.043-.023.119-.064.168-.094l5.65-3.22a.911.911 0 0 0 .464-.793v-7.86l2.389 1.36a.087.087 0 0 1 .046.065v6.508c0 2.952-2.491 5.248-5.257 5.248ZM4.062 21.354a5.17 5.17 0 0 1-.635-3.516c.042.025.115.07.168.1l5.65 3.22a.928.928 0 0 0 .928 0l6.898-3.93v2.72a.083.083 0 0 1-.034.072l-5.711 3.255a5.386 5.386 0 0 1-4.035.522 5.315 5.315 0 0 1-3.23-2.443ZM2.573 9.184a5.283 5.283 0 0 1 2.768-2.301V13.515a.895.895 0 0 0 .464.793l6.897 3.93-2.388 1.36a.087.087 0 0 1-.08.008L4.52 16.349a5.262 5.262 0 0 1-2.475-3.185 5.192 5.192 0 0 1 .527-3.98Zm19.623 4.506-6.898-3.93 2.388-1.36a.087.087 0 0 1 .08-.008l5.713 3.255a5.28 5.28 0 0 1 2.054 2.118 5.19 5.19 0 0 1-.488 5.608 5.314 5.314 0 0 1-2.39 1.742v-6.633a.896.896 0 0 0-.459-.792Zm2.377-3.533a7.973 7.973 0 0 0-.168-.099l-5.65-3.22a.93.93 0 0 0-.928 0l-6.898 3.93V8.046a.083.083 0 0 1 .034-.072l5.712-3.251a5.375 5.375 0 0 1 5.698.241 5.262 5.262 0 0 1 1.865 2.28c.39.92.506 1.93.335 2.913ZM9.631 15.009l-2.39-1.36a.083.083 0 0 1-.046-.065V7.075c.001-.997.29-1.973.832-2.814a5.297 5.297 0 0 1 2.231-1.935 5.382 5.382 0 0 1 5.659.72 4.89 4.89 0 0 0-.168.093l-5.65 3.22a.913.913 0 0 0-.465.793l-.003 7.857Zm1.297-2.76L14 10.5l3.072 1.75v3.5L14 17.499l-3.072-1.75v-3.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

const GeminiLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
        fill="url(#prefix__paint0_radial_980_20147)"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial_980_20147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
        >
          <stop offset=".067" stopColor="#9168C0" />
          <stop offset=".343" stopColor="#5684D1" />
          <stop offset=".672" stopColor="#1BA1E3" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const MetaIconOutline = ({ className }: { className?: string }) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 287.56 191"
      className={className}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="62.34"
          y1="101.45"
          x2="260.34"
          y2="91.45"
          gradientTransform="matrix(1, 0, 0, -1, 0, 192)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0064e1" />
          <stop offset="0.4" stopColor="#0064e1" />
          <stop offset="0.83" stopColor="#0073ee" />
          <stop offset="1" stopColor="#0082fb" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="41.42"
          y1="53"
          x2="41.42"
          y2="126"
          gradientTransform="matrix(1, 0, 0, -1, 0, 192)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0082fb" />
          <stop offset="1" stopColor="#0064e0" />
        </linearGradient>
      </defs>
      <path
        fill="#0081fb"
        d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z"
      />
      <path
        fill="url(#linear-gradient)"
        d="M24.49,37.3C38.73,15.35,59.28,0,82.85,0c13.65,0,27.22,4,41.39,15.61,15.5,12.65,32,33.48,52.63,67.81l7.39,12.32c17.84,29.72,28,45,33.93,52.22,7.64,9.26,13,12,19.94,12,17.63,0,22-16.2,22-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191c-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71L146.08,93.6c-12.94-21.62-24.81-37.74-31.68-45C107,40.71,97.51,31.23,82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78Z"
      />
      <path
        fill="url(#linear-gradient-2)"
        d="M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,82.85,0Z"
      />
    </svg>
  );
};

export default FeaturesSectionMinimal;
export { FeaturesSectionMinimal };
export { FeaturesSectionMinimal as BentoGrid };