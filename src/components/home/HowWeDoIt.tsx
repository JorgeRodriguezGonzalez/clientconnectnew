"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ScanSearch, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  AlertOctagon, 
  ArrowDown 
} from "lucide-react";

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
  red: "#EF5350", // Bright Red para el "Audit"
  darkBg: "#050505",
};

// --- BACKGROUND STRIPES (Invertido para modo oscuro) ---
const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- COMPONENTE DE TARJETA DE PASO ---
const StepCard = ({ 
  number, 
  title, 
  description, 
  icon: Icon, 
  color, 
  align = "left",
  progress 
}: { 
  number: string; 
  title: string; 
  description: string; 
  icon: any; 
  color: string; 
  align?: "left" | "right";
  progress: any; // MotionValue
}) => {
  
  // Animaciones basadas en el scroll individual de la tarjeta
  const opacity = useTransform(progress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const xOffset = align === "left" ? -20 : 20;
  const x = useTransform(progress, [0, 0.5, 1], [xOffset, 0, xOffset]);
  
  // Glow dinámico
  const glowOpacity = useTransform(progress, [0.3, 0.5, 0.7], [0, 0.5, 0]);

  return (
    <div className={`flex w-full items-center ${align === "left" ? "justify-end pr-12 md:pr-24" : "justify-start pl-12 md:pl-24"} relative py-12`}>
      
      {/* Connector Line (Horizontal) */}
      <div 
        className={`absolute top-1/2 h-[1px] bg-zinc-800 w-12 md:w-24 ${align === "left" ? "right-0" : "left-0"}`}
      >
        <motion.div 
            style={{ 
                width: useTransform(progress, [0.2, 0.5], ["0%", "100%"]),
                backgroundColor: color,
                opacity: useTransform(progress, [0.2, 0.5], [0, 1]),
            }}
            className={`h-full absolute top-0 ${align === "left" ? "right-0" : "left-0"}`}
        />
      </div>

      {/* Card */}
      <motion.div 
        style={{ opacity, scale, x }}
        className="relative w-full max-w-md"
      >
        {/* Border Gradient Glow */}
        <motion.div 
            style={{ opacity: glowOpacity, borderColor: color }}
            className="absolute -inset-px border rounded-none opacity-0 blur-[2px]"
        />

        <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 md:p-8 rounded-none overflow-hidden group hover:bg-zinc-900 transition-colors duration-500">
            {/* Corner Accent */}
            <div 
                className={`absolute top-0 w-20 h-[2px] ${align === "left" ? "right-0" : "left-0"}`} 
                style={{ backgroundColor: color }}
            />

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div 
                        className="w-10 h-10 flex items-center justify-center rounded-none border border-zinc-700 bg-zinc-950"
                        style={{ color: color }}
                    >
                        <Icon size={18} />
                    </div>
                    <span className="text-4xl font-bold text-zinc-800 select-none font-mono">
                        {number}
                    </span>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (EXPORTADO POR DEFECTO) ---
export default function HowWeDoIt() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Beam Animation (Línea Central)
  const beamHeight = useTransform(smoothProgress, [0, 0.9], ["0%", "100%"]);
  
  // Progress values for each step (staggered)
  // Step 1: 0.1 - 0.4
  const p1 = useTransform(smoothProgress, [0.05, 0.25, 0.45], [0, 0.5, 1]);
  // Step 2: 0.3 - 0.6
  const p2 = useTransform(smoothProgress, [0.30, 0.50, 0.70], [0, 0.5, 1]);
  // Step 3: 0.55 - 0.85
  const p3 = useTransform(smoothProgress, [0.55, 0.75, 0.95], [0, 0.5, 1]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] pt-32 pb-40 overflow-hidden">
      
      {/* Background Elements */}
      <BackgroundStripes />
      
      {/* Top Divider (Continuidad) */}
      <div className="w-full h-[1px] bg-white/10 absolute top-0 z-20" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center gap-6 mb-24 max-w-3xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] uppercase tracking-[2px] text-zinc-400"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                The Methodology
            </motion.div>

            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
            >
                We don't guess. <br/>
                We <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-gradient-x">engineer growth</span>.
            </motion.h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative max-w-5xl mx-auto min-h-[1000px]">
            
            {/* CENTRAL BEAM LINE */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-zinc-800/50 h-full">
                <motion.div 
                    style={{ height: beamHeight }}
                    className="w-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-emerald-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                />
            </div>

            {/* NODES (Puntos en la línea central) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[16%] w-3 h-3 bg-[#050505] border border-zinc-700 rotate-45 z-20" />
            <div className="absolute left-1/2 -translate-x-1/2 top-[50%] w-3 h-3 bg-[#050505] border border-zinc-700 rotate-45 z-20" />
            <div className="absolute left-1/2 -translate-x-1/2 top-[84%] w-3 h-3 bg-[#050505] border border-zinc-700 rotate-45 z-20" />

            {/* STEPS */}
            <div className="relative z-10 flex flex-col justify-between h-full gap-20 md:gap-32 py-10">
                
                {/* STEP 1: AUDIT (Left) */}
                {/* Conecta visualmente con 'BlueprintVisualization' (Rojo/Error) */}
                <StepCard 
                    number="01"
                    title="Forensic Audit"
                    description="We tear down your current infrastructure to find the hidden bottlenecks. We look for 'Error 404s' in your strategy, technically and psychologically."
                    icon={AlertOctagon}
                    color={COLORS.red}
                    align="left"
                    progress={p1}
                />

                {/* STEP 2: ARCHITECTURE (Right) */}
                {/* Conecta visualmente con 'NodeCardLayer' (Cyan/Estructura) */}
                <StepCard 
                    number="02"
                    title="System Architecture"
                    description="We build the blueprint. A custom stack of acquisition channels, CRO frameworks, and automated workflows designed specifically for your market."
                    icon={Cpu}
                    color={COLORS.cyan}
                    align="right"
                    progress={p2}
                />

                {/* STEP 3: SCALE (Left) */}
                {/* Conecta visualmente con 'WaveCardLayer' (Emerald/Crecimiento) */}
                <StepCard 
                    number="03"
                    title="Vertical Scaling"
                    description="Once the foundation holds, we pour the fuel. We aggressively scale ad spend while monitoring unit economics to ensure profitable growth."
                    icon={TrendingUp}
                    color={COLORS.emerald}
                    align="left"
                    progress={p3}
                />

            </div>
        </div>

        {/* BOTTOM CONNECTOR TO NEXT SECTION */}
        <div className="flex flex-col items-center justify-center mt-20 relative z-20">
            <motion.div 
                style={{ opacity: useTransform(smoothProgress, [0.9, 1], [0, 1]) }}
                className="flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">See the blueprint</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-800 to-transparent">
                    <motion.div 
                        animate={{ y: [0, 48] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-gradient-to-b from-transparent to-zinc-400"
                    />
                </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}