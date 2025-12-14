import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Clapperboard, Zap, Play, Check, Globe, ShieldCheck, Map, PlusIcon, Activity } from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  
  /* OPTIMIZACIÓN SAFARI */
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }

  /* ANIMACIÓN LÍNEA VERTICAL (Del BentoGrid) */
  @keyframes move-horizontal {
    0% { left: 10%; }
    100% { left: 90%; }
  }
`;

// --- CONFIGURACIÓN DE ANIMACIÓN UNIFICADA ---
const ANIMATION_CONFIG = {
  duration: 0.95, 
  ease: [0.2, 0, 0.2, 1] as [number, number, number, number]
};

// --- UTILS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- COLORS ---
const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", // Verde principal
  gold: "#edbf86",    // (Ya no se usa en los efectos, se mantiene por referencia si fuera necesario)
};

// --- LOGO CLOUD COMPONENTS ---
type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

function LogoCard({ logo, className, children, isLightMode }: { logo: Logo, className?: string, children?: React.ReactNode, isLightMode: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-4 py-8 md:p-8 transition-colors duration-500",
        className
      )}
    >
      <img
        alt={logo.alt}
        className={cn(
          "pointer-events-none h-4 select-none md:h-5 transition-all duration-500",
          !isLightMode && "brightness-0 invert" 
        )}
        height={logo.height || "auto"}
        src={logo.src}
        width={logo.width || "auto"}
      />
      {children}
    </div>
  );
}

export function LogoCloud({ isLightMode }: { isLightMode: boolean }) {
  const borderColor = isLightMode ? "border-zinc-200" : "border-white/10";
  const iconColor = isLightMode ? "text-zinc-300" : "text-white/20";
  const bgAlt = isLightMode ? "bg-white" : "bg-white/5";

  return (
    <div className={cn("relative grid grid-cols-2 border-x md:grid-cols-4 transition-colors duration-500 mb-20", borderColor)}>
      <div className={cn("-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t", borderColor)} />

      <LogoCard
        isLightMode={isLightMode}
        className={cn("relative border-r border-b", bgAlt, borderColor)}
        logo={{ src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia Logo" }}
      >
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>

      <LogoCard
        isLightMode={isLightMode}
        className={cn("border-b md:border-r", borderColor)}
        logo={{ src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase Logo" }}
      />

      <LogoCard
        isLightMode={isLightMode}
        className={cn("relative border-r border-b md:bg-transparent", borderColor, isLightMode ? "md:bg-white" : "md:bg-white/5")}
        logo={{ src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub Logo" }}
      >
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 transition-colors duration-500", iconColor)} strokeWidth={1} />
        <PlusIcon className={cn("-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>

      <LogoCard
        isLightMode={isLightMode}
        className={cn("relative border-b", borderColor, bgAlt, isLightMode ? "md:bg-transparent" : "md:bg-transparent")}
        logo={{ src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI Logo" }}
      />

      <LogoCard
        isLightMode={isLightMode}
        className={cn("relative border-r border-b md:border-b-0", bgAlt, borderColor, isLightMode ? "md:bg-transparent" : "md:bg-transparent")}
        logo={{ src: "https://svgl.app/library/turso-wordmark-light.svg", alt: "Turso Logo" }}
      >
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden transition-colors duration-500", iconColor)} strokeWidth={1} />
      </LogoCard>

      <LogoCard
        isLightMode={isLightMode}
        className={cn("border-b md:border-r md:border-b-0", borderColor, isLightMode ? "md:bg-white" : "md:bg-white/5")}
        logo={{ src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk Logo" }}
      />

      <LogoCard
        isLightMode={isLightMode}
        className={cn("border-r", borderColor)}
        logo={{ src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude AI Logo" }}
      />

      <LogoCard
        isLightMode={isLightMode}
        className={cn(bgAlt)}
        logo={{ src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel Logo" }}
      />

      <div className={cn("-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b", borderColor)} />
    </div>
  );
}

// --- LOGO COMPONENTS (FOR ECOSYSTEM CARD) ---
const InstagramLogo = ({ className }: { className?: string }) => (
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

const GoogleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const OpenAILogo = ({ className }: { className?: string }) => (
  <svg className={className} width="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454 7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Zm-10.61 14.71c-1.412 0-2.505-.428-3.46-1.215.043-.023.119-.064.168-.094l5.65-3.22a.911.911 0 0 0 .464-.793v-7.86l2.389 1.36a.087.087 0 0 1 .046.065v6.508c0 2.952-2.491 5.248-5.257 5.248ZM4.062 21.354a5.17 5.17 0 0 1-.635-3.516c.042.025.115.07.168.1l5.65 3.22a.928.928 0 0 0 .928 0l6.898-3.93v2.72a.083.083 0 0 1-.034.072l-5.711 3.255a5.386 5.386 0 0 1-4.035.522 5.315 5.315 0 0 1-3.23-2.443ZM2.573 9.184a5.283 5.283 0 0 1 2.768-2.301V13.515a.895.895 0 0 0 .464.793l6.897 3.93-2.388 1.36a.087.087 0 0 1-.08.008L4.52 16.349a5.262 5.262 0 0 1-2.475-3.185 5.192 5.192 0 0 1 .527-3.98Zm19.623 4.506-6.898-3.93 2.388-1.36a.087.087 0 0 1 .08-.008l5.713 3.255a5.28 5.28 0 0 1 2.054 2.118 5.19 5.19 0 0 1-.488 5.608 5.314 5.314 0 0 1-2.39 1.742v-6.633a.896.896 0 0 0-.459-.792Zm2.377-3.533a7.973 7.973 0 0 0-.168-.099l-5.65-3.22a.93.93 0 0 0-.928 0l-6.898 3.93V8.046a.083.083 0 0 1 .034-.072l5.712-3.251a5.375 5.375 0 0 1 5.698.241 5.262 5.262 0 0 1 1.865 2.28c.39.92.506 1.93.335 2.913ZM9.631 15.009l-2.39-1.36a.083.083 0 0 1-.046-.065V7.075c.001-.997.29-1.973.832-2.814a5.297 5.297 0 0 1 2.231-1.935 5.382 5.382 0 0 1 5.659.72 4.89 4.89 0 0 0-.168.093l-5.65 3.22a.913.913 0 0 0-.465.793l-.003 7.857Zm1.297-2.76L14 10.5l3.072 1.75v3.5L14 17.499l-3.072-1.75v-3.5Z" fill="currentColor" />
  </svg>
);

const GeminiLogo = ({ className }: { className?: string }) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}>
    <path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)" />
    <defs>
      <radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)">
        <stop offset=".067" stopColor="#9168C0" />
        <stop offset=".343" stopColor="#5684D1" />
        <stop offset=".672" stopColor="#1BA1E3" />
      </radialGradient>
    </defs>
  </svg>
);

const MetaIconOutline = ({ className }: { className?: string }) => (
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 287.56 191" className={className}>
    <defs>
      <linearGradient id="linear-gradient" x1="62.34" y1="101.45" x2="260.34" y2="91.45" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0064e1" />
        <stop offset="0.4" stopColor="#0064e1" />
        <stop offset="0.83" stopColor="#0073ee" />
        <stop offset="1" stopColor="#0082fb" />
      </linearGradient>
      <linearGradient id="linear-gradient-2" x1="41.42" y1="53" x2="41.42" y2="126" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0082fb" />
        <stop offset="1" stopColor="#0064e0" />
      </linearGradient>
    </defs>
    <path fill="#0081fb" d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z" />
    <path fill="url(#linear-gradient)" d="M24.49,37.3C38.73,15.35,59.28,0,82.85,0c13.65,0,27.22,4,41.39,15.61,15.5,12.65,32,33.48,52.63,67.81l7.39,12.32c17.84,29.72,28,45,33.93,52.22,7.64,9.26,13,12,19.94,12,17.63,0,22-16.2,22-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191c-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71L146.08,93.6c-12.94-21.62-24.81-37.74-31.68-45C107,40.71,97.51,31.23,82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78Z" />
    <path fill="url(#linear-gradient-2)" d="M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,82.85,0Z" />
  </svg>
);

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
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true } as any);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
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
              // COLORS.gold eliminados y reemplazados solo por emerald y cyan
              "--gradient": `radial-gradient(circle, ${COLORS.emerald} 10%, #34d39900 20%),
                radial-gradient(circle at 40% 40%, ${COLORS.emerald} 5%, #34d39900 15%),
                radial-gradient(circle at 60% 60%, ${COLORS.cyan} 10%, #06b6d400 20%), 
                radial-gradient(circle at 40% 60%, ${COLORS.cyan} 10%, #06b6d400 20%),
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

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ 
  children, 
  className, 
  innerClassName,
  layoutId,
  animate,       
  initial,       
  transition,    
  style,
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  innerClassName?: string,
  layoutId?: string,
  animate?: any,
  initial?: any,
  transition?: any,
  style?: any,
  [key: string]: any
}) => {
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 10);
    y.set(yPct * -10);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layout={props.layout} 
      layoutId={layoutId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={initial || { opacity: 0, scale: 0.9 }}
      animate={animate || { opacity: 1, scale: 1 }}
      transition={transition || { 
        layout: ANIMATION_CONFIG, 
        opacity: { duration: 0.5 }
      }} 
      style={{
        rotateY: x,
        rotateX: y,
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style 
      }}
      className={cn("relative rounded-none p-[2px] transition-colors duration-300 safari-gpu will-change-transform", className)}
      {...props} 
    >
      <GlowingEffect 
        spread={40} 
        glow={true} 
        disabled={false} 
        proximity={64} 
        inactiveZone={0.01} 
        borderWidth={2} 
      />

      <div className={cn("relative h-full w-full overflow-hidden rounded-none", innerClassName)}>
        {children}
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENTS ---
const StatBadge = ({ icon: Icon, label, value, isLight }: { icon: any, label: string, value: string, isLight: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-none border backdrop-blur-md transition-colors duration-300",
    isLight 
      ? "bg-white/80 border-zinc-200 shadow-sm" 
      : "bg-white/5 border-white/10"
  )}>
    <div className="p-2 rounded-none bg-zinc-100 text-gray-900">
      <Icon size={16} />
    </div>
    <div>
      <div className={cn("font-sans font-bold text-lg leading-none transition-colors duration-0", isLight ? "text-gray-900" : "text-white")}>
        {value}
      </div>
      <div className="font-sans text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  </div>
);

// --- ANIMATION COMPONENTS FOR ECOSYSTEM CARD ---
const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const LogoContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-full flex items-center justify-center shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.12)_inset,0px_10px_14px_-8px_rgba(0,0,0,0.25)] ${className}`}
    {...props}
  />
));
LogoContainer.displayName = "LogoContainer";

function AnimatedLogos({ isLightMode }: { isLightMode: boolean }) {
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
      icon: <OpenAILogo className="h-6 w-6 text-black dark:text-white" />,
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
    <div className="overflow-hidden h-full relative flex items-center justify-center w-full">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        {icons.map((icon, index) => (
          <LogoContainer
            key={index}
            className={`${sizeMap[icon.size || "lg"]} logo-circle-${index + 1} ${
              isLightMode ? "bg-white/90" : "bg-neutral-800/80"
            }`}
          >
            {icon.icon}
          </LogoContainer>
        ))}
      </div>
      <AnimatedSparklesLine />
    </div>
  );
}

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
          className="inline-block bg-cyan-400"
        />
      ))}
    </div>
  );
};

// --- NEW COMPONENT: PROFIT CHART ANIMATION ---
const ProfitChart = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" 
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, transparent 2%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 2%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 100%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in'
      }}
    >
      <svg 
        // MODIFICADO: left cambiado de -20% a -35% para mostrar más del área verde (derecha)
        className="absolute bottom-0 left-[-45%] w-[140%] h-[120%]" 
        viewBox="0 0 494 286" 
        fill="none" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg" 
      >
        <defs>
          <linearGradient id="chartGradientTeal" x1="0.5" x2="0.5" y1="0" y2="1">
            <stop offset="0" stopColor={COLORS.cyan} stopOpacity="0.5" />
            <stop offset="1" stopColor={COLORS.cyan} stopOpacity="0" />
          </linearGradient>
          {/* Changed coral to emerald */}
          <linearGradient id="chartGradientEmerald" x1="0.5" x2="0.5" y1="0" y2="1">
            <stop offset="0" stopColor={COLORS.emerald} stopOpacity="0.5" />
            <stop offset="1" stopColor={COLORS.emerald} stopOpacity="0" />
          </linearGradient>
          <clipPath id="clipBelowLine">
            <rect x="0" y="152" width="494" height="134" />
          </clipPath>
          <clipPath id="clipAboveLine">
            <rect x="0" y="0" width="494" height="152" />
          </clipPath>
        </defs>
        
        <motion.line
          x1="80"
          y1="152"
          x2="490"
          y2="152"
          stroke={COLORS.cyan}
          strokeWidth="2"
          strokeDasharray="5,5"
          strokeOpacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
        />
        
        <g clipPath="url(#clipBelowLine)">
          <motion.path 
            d="M 489.248 283.23 L 4.869 279.745 L 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489 L 489.248 283.23 Z" 
            fill="url(#chartGradientTeal)" 
            stroke={COLORS.cyan}
            strokeWidth="2" 
            strokeMiterlimit="10" 
            initial={{ pathLength: 0, opacity: 0 }} 
            animate={{ pathLength: 1, opacity: 1 }} 
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0 }} 
          />
        </g>
        
        <g clipPath="url(#clipAboveLine)">
          {/* Replaced chartGradientCoral and COLORS.coral with Emerald versions */}
          <motion.path 
            d="M 489.248 5.489 L 489.248 283.23 L 4.869 279.745 L 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489 Z" 
            fill="url(#chartGradientEmerald)" 
            stroke={COLORS.emerald} 
            strokeWidth="2" 
            strokeMiterlimit="10" 
            initial={{ pathLength: 0, opacity: 0 }} 
            animate={{ pathLength: 1, opacity: 1 }} 
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0 }} 
          />
        </g>
        
        <g clipPath="url(#clipBelowLine)">
          <motion.path 
            d="M 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489" 
            fill="transparent" 
            stroke={COLORS.cyan} 
            strokeOpacity="0.5"
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
            d="M 80 240 C 160 195 230 165 280 155 C 300 152 310 151.5 320 152 C 330 152.5 340 152 350 152 C 370 148 400 130 440 95 C 470 65 485 35 489.248 5.489" 
            fill="transparent" 
            stroke={COLORS.emerald} 
            strokeOpacity="0.5"
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
  );
};

// --- MAIN COMPONENT ---
export const FounderSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLateScroll, setIsLateScroll] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [chartKey, setChartKey] = useState(0); 
  
  // STATE PARA VIDEO "CASE STUDIES"
  const [isCaseStudyActive, setIsCaseStudyActive] = useState(false);

  // --- ANIMATION CONSTANTS FOR BUTTON ---
  // Replaced coral with emerald
  const buttonColorSequence = [COLORS.emerald, COLORS.emerald, COLORS.cyan, COLORS.cyan, COLORS.emerald];
  const buttonColorDuration = 10;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // CAMBIO: Trigger para Light Mode ajustado al 15% (0.15)
    if (latest > 0.30 && !isLightMode) {
      setIsLightMode(true);
    } else if (latest <= 0.30 && isLightMode) {
      setIsLightMode(false);
    }

    if (latest > 0.60 && !isLateScroll) {
      setIsLateScroll(true);
    } else if (latest < 0.50 && isLateScroll) {
      setIsLateScroll(false);
    }
  });

  const yStats = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "relative w-full py-24 lg:py-32 transition-colors duration-0 z-10 font-sans", 
        // CAMBIO: Fondo actualizado a #FAFAFA
        isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]"
      )}
    >
      <style>{fontStyles}</style>

      {/* 
         LOGO CLOUD INTEGRATED AT THE TOP 
         Replaces the white line div.
      */}
      <div className="absolute top-0 left-0 w-full z-50">
         <LogoCloud isLightMode={isLightMode} />
      </div>

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{
              // Replaced coral with emerald
              backgroundColor: [COLORS.emerald, COLORS.cyan, COLORS.emerald],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className={cn(
              "absolute right-[-10%] top-[20%] w-[600px] h-[600px] blur-[150px] rounded-none transition-opacity duration-500",
              isLightMode ? "opacity-10" : "opacity-20"
            )} 
         />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* LAYOUT GRID - CAMBIO: mt-40 para dar 160px de espacio superior */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-40">
          
          {/* --- LEFT COLUMN: STICKY --- */}
          <div className="lg:w-[40%] sticky top-32">
            <div className="flex flex-col gap-6 pb-10">
              
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={cn(
                  "w-fit px-3 py-1.5 rounded-none border text-[10px] font-sans font-semibold uppercase tracking-[2px] transition-colors duration-300",
                  isLightMode 
                    ? "bg-zinc-50 border-zinc-200 text-gray-500" 
                    : "bg-white/5 border-white/10 text-gray-400"
                )}
              >
                GROWTH PARTNERS
              </motion.div>

              {/* Headline */}
              <h2 className={cn(
                "font-sans font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] tracking-tight transition-colors duration-0",
                isLightMode ? "text-gray-900" : "text-white"
              )}>
                Australia's unfair advantage for{' '}
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
                    // REMOVED COLORS.gold HERE
                    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
                    backgroundSize: "400% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  explosive growth
                </motion.span>
                <span>.</span>
              </h2>

              {/* Description */}
              <p className={cn(
                "font-sans text-[15px] leading-[1.6] font-medium transition-colors duration-0 max-w-sm",
                isLightMode ? "text-gray-500" : "text-gray-400"
              )}>
                Client Connect Australia isn't just another agency. We are your data-driven partners in <strong className={isLightMode ? "text-gray-900" : "text-white"}>Profitable Scaling</strong>. 
                We integrate paid media, creative, and retention into one national growth engine.
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  "National Acquisition Strategy",
                  "Conversion Rate Optimization",
                  "Australian Market Expertise"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <div className={cn(
                      "w-5 h-5 rounded-none flex items-center justify-center transition-all duration-300",
                      isLightMode ? "bg-zinc-900 text-white" : "bg-white text-black"
                    )}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className={cn(
                      "font-sans font-medium text-[14px] transition-colors duration-0",
                      isLightMode ? "text-gray-700" : "text-gray-300"
                    )}>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA - UPDATED BUTTON */}
              <div className="mt-4">
                <motion.button
                  animate={{
                    borderColor: buttonColorSequence
                  }}
                  transition={{
                    duration: buttonColorDuration,
                    ease: "linear",
                    repeat: Infinity
                  }}
                  className={cn(
                    // Updated rgba shadow to match emerald (#34d399 is roughly 52, 211, 153)
                    "group relative h-[52px] px-8 py-3 flex items-center justify-center gap-2 rounded-none font-sans font-semibold text-[14px] border backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]",
                    "bg-black text-white hover:bg-zinc-900"
                  )}
                >
                  <span className="flex items-center gap-2">
                    Start Scaling
                    {/* Flecha animada independiente */}
                    <motion.span
                      animate={{
                        color: buttonColorSequence
                      }}
                      transition={{
                        duration: buttonColorDuration,
                        ease: "linear",
                        repeat: Infinity
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.span>
                  </span>
                </motion.button>
              </div>

            </div>
          </div>

          {/* --- RIGHT COLUMN: DYNAMIC GRID --- */}
          <div className="lg:w-[60%] relative pt-0 lg:pt-0">
            
            <motion.div 
               layout 
               className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-[minmax(200px,auto)]"
            >

              {/* 
                 ITEM 1: MAIN IMAGE CARD
              */}
              <TiltCard 
                layoutId="miguel-card"
                layout
                transition={{ 
                  layout: ANIMATION_CONFIG,
                  opacity: { duration: 0.5 }
                }}
                onLayoutAnimationStart={() => setIsResizing(true)}
                onLayoutAnimationComplete={() => setIsResizing(false)}
                className={cn(
                   "md:row-span-2 h-[450px] md:h-[600px] group relative z-10 safari-gpu",
                   isLightMode ? "md:col-span-1" : "md:col-span-2"
                )}
                innerClassName={cn(
                  "border",
                  isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900 border-white/10"
                )}
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isResizing ? 1 : 0 }}
                  transition={{ duration: 0.15 }} 
                  className="absolute inset-0 z-40 bg-white/60 pointer-events-none"
                />

                <div className="absolute inset-0 bg-gray-900 overflow-hidden rounded-none">
                  <motion.img 
                    layout
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                    alt="Client Connect Australia Team" 
                    loading="eager"
                    animate={{ scale: isLightMode ? 1.25 : 1 }}
                    transition={{ 
                        layout: ANIMATION_CONFIG, 
                        scale: ANIMATION_CONFIG 
                    }}
                    className="w-full h-full object-cover object-center grayscale-[30%] group-hover:grayscale-0 safari-gpu"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <motion.div layout className="absolute bottom-6 left-6 right-6 z-30">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-none">
                       <p className="text-white font-sans font-bold text-base">The Connect Team</p>
                       <p className="text-white/60 font-sans text-[11px]">Your Australian Growth Partners</p>
                    </div>
                  </motion.div>
                </div>
              </TiltCard>

              {/* ITEMS 2 & 3: STATS & VIDEO */}
              <AnimatePresence mode="popLayout">
                 {isLightMode && (
                    <>
                       {/* ITEM 2 - RESULTS WITH PROFIT CHART GRAPHIC */}
                       <TiltCard 
                        layout="position"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                        className="h-[280px] group safari-gpu cursor-default"
                        innerClassName="bg-white border border-zinc-200 overflow-hidden"
                        onMouseEnter={() => setChartKey(prev => prev + 1)} // Replays animation on hover
                       >
                          {/* Glow Effect from Top Right */}
                          <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity" />
                          
                          {/* Text Content - Top Half */}
                          <div className="relative z-10 p-6 flex flex-col items-start">
                             <div className="flex justify-between items-center w-full mb-2">
                                <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-none text-emerald-500">
                                   {/* MODIFICADO: Color del icono a emerald directamente */}
                                   <Activity size={20} style={{ color: COLORS.emerald }} />
                                </div>
                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                   Results
                                </span>
                             </div>
                             <div>
                                <h3 className="text-3xl font-sans font-bold text-gray-900 leading-tight">
                                  4.5x <span className="text-gray-400 text-xl">ROAS</span>
                                </h3>
                                <p className="font-sans text-xs text-gray-500 font-medium mt-1">
                                  Average return for partners.
                                </p>
                             </div>
                          </div>

                          {/* Chart Content - Bottom Half (Absolute) */}
                          <div className="absolute bottom-0 left-0 right-0 h-[140px] w-full z-0">
                             <ProfitChart key={chartKey} />
                          </div>
                       </TiltCard>

                       {/* ITEM 3: VIDEO CASE STUDY (INTERACTIVE) */}
                       <TiltCard 
                        layout="position"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                        className="h-[300px] group cursor-pointer safari-gpu"
                        innerClassName="bg-black border border-zinc-800"
                        onClick={() => setIsCaseStudyActive(true)}
                       >
                          <div className="absolute inset-0 w-full h-full">
                             <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className={cn(
                                   "w-full h-full object-cover transition-all duration-700 ease-out",
                                   isCaseStudyActive ? "grayscale-0" : "grayscale opacity-60 group-hover:opacity-80"
                                )}
                             >
                                <source src="https://videos.pexels.com/video-files/5854659/5854659-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                             </video>
                          </div>

                          <motion.div
                             className="absolute inset-0 z-20 pointer-events-none"
                             animate={{ opacity: isCaseStudyActive ? 0 : 1 }}
                             transition={{ duration: 0.5 }}
                          >
                             <div className="absolute inset-0 bg-black/40" />

                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-none flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                                   <Play fill="white" className="ml-1 text-white" />
                                </div>
                             </div>

                             <div className="absolute bottom-5 left-5">
                                <span className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded-none text-white text-[11px] font-sans font-medium">
                                   View Case Studies
                                </span>
                             </div>
                          </motion.div>
                       </TiltCard>
                    </>
                 )}
              </AnimatePresence>

              {/* ITEM 4: PROCESS CARD (THE ECOSYSTEM) */}
              <TiltCard 
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} 
                animate={isLightMode 
                    ? { opacity: 1, y: 0, filter: "blur(0px)" } 
                    : { opacity: 0, y: 20, filter: "blur(10px)" }
                }
                transition={{
                    duration: isLightMode ? 0.5 : 0, 
                    delay: isLightMode ? 0.5 : 0, 
                    ease: "easeOut"
                }}
                className={cn(
                  "md:col-span-2 group safari-gpu h-[240px]" 
                )}
                innerClassName={cn(
                  "p-8 transition-colors duration-0 border relative",
                  isLightMode 
                    ? "bg-white border-zinc-200" 
                    : "bg-zinc-900 border-zinc-800"
                )}
              >
                 {/* BADGE ABSOLUTE */}
                 <div className={cn(
                    "absolute top-6 right-6 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium z-20",
                    isLightMode 
                        ? "border-zinc-200 text-gray-500" 
                        : "border-white/20 text-white/60"
                 )}>
                    Reach
                 </div>

                 <div className="grid grid-cols-12 gap-4 h-full items-center">
                    <div className="col-span-5 flex flex-col justify-center h-full">
                        <h3 className={cn("font-sans font-bold text-xl mb-2", isLightMode ? "text-gray-900" : "text-white")}>The Ecosystem</h3>
                        <p className={cn("font-sans font-medium text-xs leading-relaxed", isLightMode ? "text-gray-500" : "text-white/70")}>
                          Strategic campaigns across SEO, Google Ads, Social Media and more to capture high-intent prospects.
                        </p>
                    </div>

                    <div className="col-span-7 h-full flex items-center justify-center">
                       <div className="relative w-full max-w-[300px] h-[120px]">
                          <AnimatedLogos isLightMode={isLightMode} />
                       </div>
                    </div>
                 </div>
              </TiltCard>

              {/* TARJETAS INFERIORES */}
               {/* CARD A (National) */}
               <TiltCard 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ pointerEvents: isLateScroll ? 'auto' : 'none' }}
                  className="h-[280px] group safari-gpu"
                  innerClassName="bg-white border border-zinc-200 flex flex-row items-stretch"
               >
                   <div className="relative z-20 w-1/2 p-5 flex flex-col justify-center items-start shrink-0">
                      <div className="p-2.5 rounded-none mb-3 bg-zinc-50 border border-zinc-100">
                         <Map className="w-5 h-5 text-gray-900" />
                      </div>
                      <div className="text-[20px] font-sans font-semibold tracking-tight mb-2 text-gray-900 leading-tight">
                         National<br/>
                         <span className="text-gray-400">Scale</span>
                      </div>
                      <p className="text-[12px] font-sans font-medium leading-[1.4] text-gray-500">
                        Scaling campaigns across every state and territory.
                      </p>
                   </div>

                   <div className="absolute right-0 top-0 w-[55%] h-full overflow-hidden">
                      <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 origin-center">
                          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/40 to-transparent w-full h-full" />
                          <img 
                             src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800&auto=format&fit=crop" 
                             alt="Australian National Reach"
                             className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0"
                          />
                      </div>
                   </div>
               </TiltCard>

               {/* CARD B (Retention) */}
               <TiltCard 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLateScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  style={{ pointerEvents: isLateScroll ? 'auto' : 'none' }}
                  className="h-[280px] group safari-gpu"
                  innerClassName="bg-zinc-900 border border-zinc-800"
               >
                   <div className="relative h-full w-full">
                       <div className="absolute inset-0 w-full h-full opacity-60">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover grayscale scale-105 group-hover:scale-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
                          >
                            <source src="https://videos.pexels.com/video-files/3191572/3191572-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                          </video>
                       </div>

                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                       
                       <div className="relative z-10 text-white p-6 h-full flex flex-col justify-end">
                         <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-5xl font-sans font-semibold leading-none tracking-tighter">95%</span>
                           <ShieldCheck className="w-6 h-6 mb-2 text-white/80" />
                         </div>
                         <span className="text-[12px] font-sans font-medium leading-[1.4] text-white/60">
                           Client retention rate over the last 12 months.
                         </span>
                       </div>
                   </div>
               </TiltCard>

            </motion.div>

            {/* FLOATING STATS */}
            <motion.div 
               style={{ y: yStats }}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ 
                 opacity: isLightMode ? 1 : 0,
                 scale: isLightMode ? 1 : 0.8,
                 transition: { 
                    duration: 0.3, 
                    delay: isLightMode ? 0.8 : 0 
                 }
               }}
               className="absolute -right-4 top-[20%] z-20 hidden lg:block pointer-events-none"
            >
              {/* MODIFICADO: Icono de TrendingUp y texto relacionado con crecimiento */}
              <StatBadge icon={TrendingUp} label="Revenue Generated" value="$250M+" isLight={isLightMode} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;