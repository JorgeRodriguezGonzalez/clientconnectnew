import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { Check, X, Globe, MapPin, Search, Zap, Clock, AlertCircle } from 'lucide-react';

// --- STYLES & CONFIG ---
const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }
`;

const ANIMATION_CONFIG = {
  duration: 0.95, 
  ease: [0.2, 0, 0.2, 1] as [number, number, number, number]
};

const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  gold: "#edbf86",
  red: "#ef4444"
};

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- REUSED COMPONENTS (LogoCloud & GlowingEffect mantenidos de tu código) ---

// [Aquí se asume que LogoCloud y GlowingEffect son los mismos que proporcionaste]
// Para abreviar, los incluyo integrados o referenciados mentalmente.

// --- NUEVO COMPONENTE: COMPARISON CARD ---
const ComparisonCard = ({ 
  title, 
  icon: Icon, 
  badAgency, 
  ourWay, 
  why, 
  isLightMode 
}: { 
  title: string, 
  icon: any, 
  badAgency: string, 
  ourWay: string, 
  why: string, 
  isLightMode: boolean 
}) => (
  <div className={cn(
    "flex flex-col gap-6 p-8 border h-full transition-colors duration-500",
    isLightMode ? "bg-white border-zinc-200" : "bg-zinc-900/50 border-white/10"
  )}>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-emerald-500/10 rounded-none">
        <Icon className="text-emerald-500" size={24} />
      </div>
      <h3 className={cn("text-xl font-bold", isLightMode ? "text-zinc-900" : "text-white")}>{title}</h3>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-2">
          <X size={12} /> What most agencies do:
        </p>
        <p className={cn("text-sm leading-relaxed", isLightMode ? "text-zinc-500" : "text-zinc-400")}>
          {badAgency}
        </p>
      </div>

      <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
          <Check size={12} /> What we do:
        </p>
        <p className={cn("text-sm leading-relaxed font-medium", isLightMode ? "text-zinc-900" : "text-zinc-100")}>
          {ourWay}
        </p>
      </div>
    </div>

    <div className={cn("mt-auto pt-4 border-t", isLightMode ? "border-zinc-100" : "border-white/5")}>
      <p className="text-[11px] italic opacity-70">
        <span className="font-bold">Why?</span> {why}
      </p>
    </div>
  </div>
);

// --- MAIN COMPONENT: SECTION 2 (BLOQUE 1) ---
export const WhatWeDoDifferent_Block1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightMode, setIsLightMode] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.15 && !isLightMode) setIsLightMode(true);
    else if (latest <= 0.15 && isLightMode) setIsLightMode(false);
  });

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "relative w-full pb-24 transition-colors duration-700 font-sans", 
        isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]"
      )}
    >
      <style>{fontStyles}</style>

      {/* 1. MANTENER LOGO CLOUD (Se asume componente importado o definido arriba) */}
      <div className="w-full">
         <LogoCloud isLightMode={isLightMode} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 mt-20">
        
        {/* 2. HEADLINE GENERAL & SUBHEADLINE */}
        <div className="max-w-4xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={cn(
              "text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8",
              isLightMode ? "text-zinc-900" : "text-white"
            )}
          >
            "We Handle Everything. Because We've Been <span className="text-emerald-500">Burned By Agencies That Don't."</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "text-lg md:text-xl font-medium max-w-2xl leading-relaxed",
              isLightMode ? "text-zinc-600" : "text-zinc-400"
            )}
          >
            Most agencies do websites OR ads. Never both. And they sure as hell don't understand what a tradie actually needs to get jobs. We do. Because we ARE tradies.
          </motion.p>
        </div>

        {/* 3. INTRO COPY (THE STORY) */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-8 p-8 mb-32 border-y",
          isLightMode ? "border-zinc-200 bg-zinc-50/50" : "border-white/10 bg-white/5"
        )}>
          <div className="col-span-full mb-4">
            <h4 className="text-emerald-500 font-bold uppercase tracking-[2px] text-xs">Here's what happened to us:</h4>
          </div>
          {[
            { tag: "Agency #1", text: "Built us a beautiful website. $8K. Got zero leads. No Google Ads, no SEO, just a pretty brochure no one ever saw." },
            { tag: "Agency #2", text: "Ran Google Ads. $12K in ad spend. Website was so slow no one called. They blamed our 'brand'." },
            { tag: "Agency #3", text: "'SEO experts'. Ranking for keywords no one searches. Zero jobs. Just vanity metrics." }
          ].map((item, i) => (
            <div key={i} className="space-y-2 text-sm">
              <span className={cn("font-bold px-2 py-1 text-[10px]", isLightMode ? "bg-zinc-900 text-white" : "bg-white text-black")}>{item.tag}</span>
              <p className={isLightMode ? "text-zinc-600" : "text-zinc-400"}>{item.text}</p>
            </div>
          ))}
          <div className="col-span-full pt-6 border-t border-dashed border-white/20">
            <p className={cn("text-lg font-bold", isLightMode ? "text-zinc-900" : "text-white")}>
              We learned the hard way: <span className="text-emerald-500">You need BOTH the foundation AND the fuel.</span>
            </p>
          </div>
        </div>

        {/* 4. BLOQUE 1: THE FOUNDATION */}
        <div className="space-y-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-500 uppercase font-bold tracking-widest text-xs">
              <Zap size={14} fill="currentColor" /> BLOCK 1: THE FOUNDATION (Painkiller)
            </div>
            <h3 className={cn(
              "text-3xl md:text-5xl font-bold mb-6",
              isLightMode ? "text-zinc-900" : "text-white"
            )}>
              First, We Fix What's Broken <br/>
              <span className="opacity-50 text-2xl md:text-3xl">(The Stuff Agencies Ignore)</span>
            </h3>
            <p className={cn("text-lg mb-8", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
              Most tradies have the same problems. We know, because we HAD them:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Website loads slower than council approvals",
                "Invisible on Google Maps",
                "Mobile site is a total disaster",
                "No idea where calls are coming from",
                "Ranking for 'tips' instead of 'jobs'"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <span className={isLightMode ? "text-zinc-700" : "text-zinc-300"}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TARJETAS DE COMPARACIÓN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ComparisonCard 
              title="Conversion Website"
              icon={Globe}
              badAgency="Build something pretty for $15K. Takes 3 months. Confusing navigation. No clear call-to-action."
              ourWay="Fast-loading (under 2s), mobile-first lead machine. Phone visible everywhere. Built in 48 hours if needed."
              why="We remember trying to get quotes on mobile and websites being absolute shit. We build what we'd use."
              isLightMode={isLightMode}
            />
            <ComparisonCard 
              title="GMB Domination"
              icon={MapPin}
              badAgency="'Yeah we set it up.' Then never touch it. No review strategy. You're on page 3 of Google Maps."
              ourWay="Optimized for local leads. Real job photos. Weekly posts. Review generation system to hit the Top 3."
              why="When someone searches 'roofer near me', you need to be in the top 3. Not page 2. FIRST."
              isLightMode={isLightMode}
            />
            <ComparisonCard 
              title="Technical SEO"
              icon={Search}
              badAgency="Drown you in jargon like 'Domain Authority' while you get zero calls."
              ourWay="Schema markup and local citations that tell Google EXACTLY what you do and where. No bullshit."
              why="We wasted $18K on SEO that showed pretty graphs while we got zero calls. Never again."
              isLightMode={isLightMode}
            />
          </div>

          {/* CIERRE DEL BLOQUE 1 (BOX DESTACADO) */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative p-1 bg-gradient-to-r from-emerald-500 to-cyan-500"
          >
            <div className={cn(
              "p-10 flex flex-col md:flex-row justify-between items-center gap-8",
              isLightMode ? "bg-white" : "bg-black"
            )}>
              <div className="space-y-2">
                <h4 className={cn("text-2xl font-bold", isLightMode ? "text-zinc-900" : "text-white")}>
                  The Foundation Takes 1-2 Weeks
                </h4>
                <p className={isLightMode ? "text-zinc-500" : "text-zinc-400"}>
                  Not 3 months. Week 1, you're live. Week 2, people find you.
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Clock className="text-emerald-500" size={40} />
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Timeline</p>
                  <p className={cn("text-2xl font-bold", isLightMode ? "text-zinc-900" : "text-white")}>Fast & Built to Last</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- LOGO CLOUD (Mantenido igual que tu código original) ---
function LogoCard({ logo, className, isLightMode }: { logo: any, className?: string, isLightMode: boolean }) {
  return (
    <div className={cn("flex items-center justify-center px-4 py-8 md:p-8 transition-colors duration-500", className)}>
      <img alt={logo.alt} className={cn("h-4 md:h-5 transition-all duration-500", !isLightMode && "brightness-0 invert")} src={logo.src} />
    </div>
  );
}

export function LogoCloud({ isLightMode }: { isLightMode: boolean }) {
  const borderColor = isLightMode ? "border-zinc-200" : "border-white/10";
  return (
    <div className={cn("relative grid grid-cols-2 border-x md:grid-cols-4 transition-colors duration-500", borderColor)}>
      <LogoCard isLightMode={isLightMode} className={cn("border-r border-b", borderColor)} logo={{ src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" }} />
      <LogoCard isLightMode={isLightMode} className={cn("border-b md:border-r", borderColor)} logo={{ src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" }} />
      <LogoCard isLightMode={isLightMode} className={cn("border-r border-b", borderColor)} logo={{ src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" }} />
      <LogoCard isLightMode={isLightMode} className={cn("border-b", borderColor)} logo={{ src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" }} />
    </div>
  );
}

export default WhatWeDoDifferent_Block1;