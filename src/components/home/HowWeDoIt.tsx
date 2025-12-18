"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Network } from "lucide-react";

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
};

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

  // Animaciones de entrada
  const opacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(smoothProgress, [0.1, 0.3], [30, 0]);
  const scale = useTransform(smoothProgress, [0.1, 0.3], [0.95, 1]);
  
  // Rotación del "Core" basada en scroll
  const rotate = useTransform(smoothProgress, [0, 1], [0, 180]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FAFAFA] pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center border-t border-zinc-200"
    >
      
      <motion.div 
        style={{ opacity, y, scale }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6"
      >
        {/* 1. BADGE "THE SYSTEM" */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-zinc-200 bg-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-500 font-sans">
                The Methodology
            </span>
        </div>

        {/* 2. TITULO PRINCIPAL (Tamaño original restaurado) */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
          Architecture of <br className="hidden md:block" />
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
              backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
              backgroundSize: "400% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            Predictable Growth
          </motion.span>
        </h2>

        {/* 3. SUBTITULO (Tamaño original restaurado) */}
        <p className="text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed font-medium mb-12">
          We build custom acquisition infrastructures using a battle-tested blueprint designed for high-intent conversion.
        </p>

        {/* 4. ELEMENTO INTERACTIVO "CORE" */}
        <div className="relative group cursor-default mb-10">
            {/* Brillo Intenso Cyan/Emerald */}
            <div className="absolute inset-[-20px] bg-gradient-to-r from-emerald-400/40 to-cyan-400/40 blur-[40px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            
            <div className="relative w-24 h-24 bg-white border border-zinc-200 rounded-none flex items-center justify-center shadow-[0_10px_50px_rgba(6,182,212,0.15)] z-10">
                {/* Nuevo Icono: Network */}
                <motion.div style={{ rotate }} className="text-zinc-900">
                    <Network size={40} strokeWidth={1.2} />
                </motion.div>
                
                {/* Micro-puntos de detalle técnico en esquinas */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-emerald-400" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-cyan-400" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-emerald-400" />

                {/* Borde interno decorativo */}
                <div className="absolute inset-1.5 border border-zinc-100 pointer-events-none" />
            </div>

            {/* Línea conectora hacia abajo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full h-32 w-[1px] bg-gradient-to-b from-zinc-300 to-transparent">
                 <motion.div 
                    animate={{ y: [0, 128] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1/2 bg-gradient-to-b from-transparent to-cyan-500"
                 />
            </div>
        </div>

      </motion.div>
    </section>
  );
}