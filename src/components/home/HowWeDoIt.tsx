"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, ChevronDown } from "lucide-react";

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
};

// --- BACKGROUND PATTERN ---
const BackgroundDotPattern = () => (
  <div 
    className="absolute inset-0 z-0 opacity-[0.4]"
    style={{
      backgroundImage: `radial-gradient(#e4e4e7 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}
  />
);

export default function HowWeDoIt() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animaciones
  const opacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(smoothProgress, [0.1, 0.3], [30, 0]);
  const scale = useTransform(smoothProgress, [0.1, 0.3], [0.95, 1]);
  
  // Rotación del "Core" basada en scroll
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FAFAFA] pt-24 pb-12 overflow-hidden flex flex-col items-center justify-center border-t border-zinc-200"
    >
      <BackgroundDotPattern />

      <motion.div 
        style={{ opacity, y, scale }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6"
      >
        {/* 1. BADGE "THE SYSTEM" */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-zinc-200 bg-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-500">
                The Methodology
            </span>
        </div>

        {/* 2. TITULO PRINCIPAL */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
          Architecture of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-900">
            Predictable Growth
          </span>
        </h2>

        {/* 3. SUBTITULO */}
        <p className="text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed font-medium mb-10">
          We don't rely on guesswork. We build custom acquisition infrastructures using a battle-tested blueprint.
        </p>

        {/* 4. ELEMENTO INTERACTIVO "CORE" */}
        <div className="relative group cursor-default">
            {/* Anillos decorativos */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative w-16 h-16 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] z-10">
                {/* Icono giratorio */}
                <motion.div style={{ rotate }} className="text-zinc-800">
                    <Cpu size={24} strokeWidth={1.5} />
                </motion.div>
                
                {/* Puntos de esquina */}
                <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-zinc-300 rounded-full" />
                <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-zinc-300 rounded-full" />
                <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-zinc-300 rounded-full" />
                <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-zinc-300 rounded-full" />
            </div>

            {/* Línea conectora hacia abajo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full h-24 w-[1px] bg-gradient-to-b from-zinc-300 to-transparent">
                 <motion.div 
                    animate={{ y: [0, 96] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1/2 bg-gradient-to-b from-transparent to-emerald-400"
                 />
            </div>
        </div>

      </motion.div>
    </section>
  );
}