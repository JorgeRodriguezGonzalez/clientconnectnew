import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence, animate } from 'framer-motion';
import { Check, X, Globe, MapPin, Search, Zap, Clock, AlertCircle, PlusIcon } from 'lucide-react';

// --- STYLES ---
const fontStyles = `
  .font-sans { font-family: 'Satoshi', sans-serif; }
  .safari-gpu {
    -webkit-backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }
`;

// --- CONFIG ---
const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399", 
  gold: "#edbf86",
  red: "#ef4444"
};

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- LOGO CLOUD COMPONENTS (Mantenidos de tu original) ---
type Logo = { src: string; alt: string; width?: number; height?: number; };

function LogoCard({ logo, className, children, isLightMode }: { logo: Logo, className?: string, children?: React.ReactNode, isLightMode: boolean }) {
  return (
    <div className={cn("flex items-center justify-center px-4 py-8 md:p-8 transition-colors duration-500", className)}>
      <img
        alt={logo.alt}
        className={cn("pointer-events-none h-4 select-none md:h-5 transition-all duration-500", !isLightMode && "brightness-0 invert")}
        src={logo.src}
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
    <div className={cn("relative grid grid-cols-2 border-x md:grid-cols-4 transition-colors duration-500", borderColor)}>
      <div className={cn("-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t", borderColor)} />
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b", bgAlt, borderColor)} logo={{ src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6", iconColor)} strokeWidth={1} />
      </LogoCard>
      <LogoCard isLightMode={isLightMode} className={cn("border-b md:border-r", borderColor)} logo={{ src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" }} />
      <LogoCard isLightMode={isLightMode} className={cn("relative border-r border-b md:bg-transparent", borderColor, isLightMode ? "md:bg-white" : "md:bg-white/5")} logo={{ src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" }}>
        <PlusIcon className={cn("-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6", iconColor)} strokeWidth={1} />
      </LogoCard>
      <LogoCard isLightMode={isLightMode} className={cn("relative border-b", borderColor, bgAlt)} logo={{ src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" }} />
      <div className={cn("-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b", borderColor)} />
    </div>
  );
}

// --- SUB-COMPONENTE: COMPARISON CARD ---
const ComparisonCard = ({ title, icon: Icon, badAgency, ourWay, why, isLightMode }: any) => (
  <div className={cn(
    "flex flex-col gap-6 p-8 border transition-colors duration-500",
    isLightMode ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-900/50 border-white/10"
  )}>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-emerald-500/10 rounded-none text-emerald-500">
        <Icon size={24} />
      </div>
      <h3 className={cn("text-xl font-bold font-sans", isLightMode ? "text-zinc-900" : "text-white")}>{title}</h3>
    </div>
    <div className="space-y-4 font-sans">
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-2">
          <X size={12} /> What most agencies do:
        </p>
        <p className={cn("text-sm leading-relaxed", isLightMode ? "text-zinc-500" : "text-zinc-400")}>{badAgency}</p>
      </div>
      <div className="space-y-2 border-l-2 border-emerald-500 pl-4 py-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
          <Check size={12} /> What we do:
        </p>
        <p className={cn("text-sm leading-relaxed font-semibold", isLightMode ? "text-zinc-900" : "text-zinc-100")}>{ourWay}</p>
      </div>
    </div>
    <div className={cn("mt-auto pt-4 border-t", isLightMode ? "border-zinc-100" : "border-white/5")}>
      <p className={cn("text-[11px] italic font-sans", isLightMode ? "text-zinc-400" : "text-zinc-500")}>
        <span className="font-bold">Why?</span> {why}
      </p>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL (EXPORTADO COMO FounderSection) ---
export const FounderSection = () => {
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
        "relative w-full pb-32 transition-colors duration-700 font-sans", 
        isLightMode ? "bg-[#FAFAFA]" : "bg-[#050505]"
      )}
    >
      <style>{fontStyles}</style>

      {/* 1. LOGOS (Empieza inmediatamente después) */}
      <div className="w-full">
         <LogoCloud isLightMode={isLightMode} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 mt-24">
        
        {/* 2. HEADLINES GENERALES */}
        <div className="max-w-4xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={cn(
              "text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 font-sans",
              isLightMode ? "text-zinc-900" : "text-white"
            )}
          >
            "We Handle Everything. Because We've Been <span className="text-emerald-400">Burned By Agencies That Don't."</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "text-lg md:text-xl font-medium max-w-2xl leading-relaxed font-sans",
              isLightMode ? "text-zinc-600" : "text-zinc-400"
            )}
          >
            Most agencies do websites OR ads. Never both. And they sure as hell don't understand what a tradie actually needs to get jobs. We do. Because we ARE tradies.
          </motion.p>
        </div>

        {/* 3. INTRO COPY: LA HISTORIA */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-8 p-10 mb-32 border-y",
          isLightMode ? "border-zinc-200 bg-zinc-50/50" : "border-white/10 bg-white/5"
        )}>
          <div className="col-span-full mb-4">
            <h4 className="text-emerald-500 font-bold uppercase tracking-[2px] text-xs font-sans">Here's what happened to us:</h4>
          </div>
          {[
            { tag: "Agency #1", text: "Built us a beautiful website. $8K. Got zero leads. No Google Ads, no SEO, just a pretty brochure no one ever saw." },
            { tag: "Agency #2", text: "Ran Google Ads. $12K in ad spend. Website was so slow no one called. They blamed our 'brand'." },
            { tag: "Agency #3", text: "'SEO experts'. Ranking for 50 keywords no one searches. Zero jobs. Just vanity metrics." }
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <span className={cn("inline-block font-bold px-2 py-1 text-[10px] font-sans", isLightMode ? "bg-zinc-900 text-white" : "bg-white text-black")}>{item.tag}</span>
              <p className={cn("text-sm leading-relaxed font-sans", isLightMode ? "text-zinc-600" : "text-zinc-400")}>{item.text}</p>
            </div>
          ))}
          <div className="col-span-full pt-8 border-t border-dashed border-white/20">
            <p className={cn("text-lg md:text-xl font-bold font-sans", isLightMode ? "text-zinc-900" : "text-white")}>
              We learned the hard way: <span className="text-emerald-500 underline underline-offset-4">You need BOTH the foundation AND the fuel.</span>
            </p>
          </div>
        </div>

        {/* 4. BLOQUE 1: THE FOUNDATION */}
        <div className="space-y-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 text-emerald-500 uppercase font-bold tracking-widest text-xs font-sans">
              <Zap size={14} fill="currentColor" /> BLOCK 1: THE FOUNDATION (Painkiller)
            </div>
            <h3 className={cn(
              "text-3xl md:text-5xl font-bold mb-6 font-sans leading-tight",
              isLightMode ? "text-zinc-900" : "text-white"
            )}>
              First, We Fix What's Broken <br className="hidden md:block" />
              <span className="opacity-40 text-2xl md:text-3xl">(The Stuff Agencies Ignore)</span>
            </h3>
            <p className={cn("text-lg mb-10 font-sans font-medium", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
              Most tradies have the same problems. We know, because we HAD them:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {[
                "Website loads slower than council approvals",
                "Doesn't show up on Google Maps",
                "Mobile site is a total disaster",
                "No idea if calls come from Google or Facebook",
                "Ranking for 'tips' instead of 'jobs'"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-semibold font-sans">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <span className={isLightMode ? "text-zinc-700" : "text-zinc-300"}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TARJETAS COMPARATIVAS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ComparisonCard 
              title="Conversion Website"
              icon={Globe}
              badAgency="Build something pretty for $8K-$15K. Takes 3 months. Loads slow. No clear call-to-action."
              ourWay="Fast (under 2s), mobile-first, single purpose: lead gen. CTA on every section. Built in 48h if needed."
              why="We remember trying to get quotes on mobile and websites being absolute shit. We build what we'd want to use."
              isLightMode={isLightMode}
            />
            <ComparisonCard 
              title="GMB Domination"
              icon={MapPin}
              badAgency="'Yeah we set it up.' Then never touch it. No review strategy. You're on page 3 of Google Maps."
              ourWay="Every field optimized. Real job photos. Weekly posts. Review system to keep you in the Top 3."
              why="When someone searches 'roofer near me', you need to be in the top 3. Not page 2. FIRST."
              isLightMode={isLightMode}
            />
            <ComparisonCard 
              title="Technical SEO"
              icon={Search}
              badAgency="Drown you in jargon like 'Domain Authority' while you get zero calls."
              ourWay="Schema markup and local citations that tell Google EXACTLY what you do. Only leads matter."
              why="We wasted $18K on an agency that showed pretty graphs while we got zero calls. Never again."
              isLightMode={isLightMode}
            />
          </div>

          {/* BOX FINAL DEL BLOQUE 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative p-[1px] bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-none overflow-hidden"
          >
            <div className={cn(
              "p-10 flex flex-col md:flex-row justify-between items-center gap-8",
              isLightMode ? "bg-white" : "bg-zinc-950"
            )}>
              <div className="space-y-3">
                <h4 className={cn("text-2xl md:text-3xl font-bold font-sans", isLightMode ? "text-zinc-900" : "text-white")}>
                  The Foundation Takes 1-2 Weeks
                </h4>
                <p className={cn("font-sans font-medium max-w-xl", isLightMode ? "text-zinc-500" : "text-zinc-400")}>
                  Not 3 months. Week 1, you're live. Week 2, people find you. Because we had bills to pay, and we know you do too.
                </p>
              </div>
              <div className="flex items-center gap-5 shrink-0 px-8 py-4 border border-emerald-500/20 bg-emerald-500/5">
                <Clock className="text-emerald-500" size={32} />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-sans">Timeline</p>
                  <p className={cn("text-xl font-bold font-sans", isLightMode ? "text-zinc-900" : "text-white")}>Ready for Leads</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;