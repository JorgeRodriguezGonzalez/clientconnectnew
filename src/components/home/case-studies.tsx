"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MousePointerClick, 
  ShoppingBag, 
  Briefcase, 
  Zap,
  Activity,
  BarChart3
} from "lucide-react";

// --- COLORES CORPORATIVOS ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
  darkBg: "#050505",
  panelBg: "#0a0a0a",
};

// --- UTILS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- COMPONENTE: GLOWING EFFECT (Reutilizado para consistencia) ---
const GlowingEffect = ({
  spread = 20,
  glow = false,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  borderWidth = 1,
}: {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  borderWidth?: number;
}) => {
    // Nota: Simplificado para este componente específico, asumiendo hover automático por CSS en el padre
    return (
        <div className={cn("absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100", disabled && "!hidden")}>
             <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 blur-xl" />
        </div>
    );
};

// --- DATA: CASOS DE ÉXITO ---
type CaseStudy = {
  id: string;
  client: string;
  category: "Lead Gen" | "E-Commerce" | "SaaS";
  icon: React.ElementType;
  title: string;
  description: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
    icon: React.ElementType;
  }[];
  graphData: number[]; // Array simple para dibujar la curva
  color: string;
};

const cases: CaseStudy[] = [
  {
    id: "apex",
    client: "Apex Roofing Co.",
    category: "Lead Gen",
    icon: Briefcase,
    title: "From 'Feast & Famine' to Booked Out",
    description: "Apex was relying on word-of-mouth. We implemented a hyper-local SEO & Google Ads infrastructure that captured high-intent emergency queries.",
    color: COLORS.emerald,
    stats: [
      { label: "Monthly Revenue", value: "$145k", subtext: "+210% YoY", icon: DollarSign },
      { label: "Cost Per Lead", value: "$24.50", subtext: "-45% Decrease", icon: TrendingUp },
      { label: "Qualified Leads", value: "86", subtext: "Per Month", icon: Users },
    ],
    // Datos simulados para la curva (0-100)
    graphData: [20, 35, 30, 50, 45, 60, 55, 80, 75, 90, 85, 100], 
  },
  {
    id: "velvet",
    client: "Velvet & Oak",
    category: "E-Commerce",
    icon: ShoppingBag,
    title: "Scaling ROAS for High-Ticket Furniture",
    description: "Selling $4,000 sofas online requires trust. We built a full-funnel Meta Ads strategy combined with high-converting landing pages focused on social proof.",
    color: COLORS.cyan,
    stats: [
      { label: "ROAS", value: "6.8x", subtext: "Ad Spend Return", icon: Activity },
      { label: "Conversion Rate", value: "3.2%", subtext: "Top 1% in Niche", icon: MousePointerClick },
      { label: "Total Sales", value: "$1.2M", subtext: "In 6 Months", icon: DollarSign },
    ],
    graphData: [10, 15, 12, 25, 40, 35, 50, 70, 65, 85, 95, 100],
  },
  {
    id: "software",
    client: "StreamFlow App",
    category: "SaaS",
    icon: Zap,
    title: "Cracking the B2B Demo Booking Code",
    description: "We shifted their strategy from 'gate-kept whitepapers' to direct-response LinkedIn ads targeting CTOs, resulting in a massive pipeline unlock.",
    color: COLORS.emerald, // Volvemos a Emerald para variar
    stats: [
      { label: "Pipeline Value", value: "$3.5M", subtext: "Generated Q3", icon: BarChart3 },
      { label: "Demo Bookings", value: "142", subtext: "+300% Increase", icon: Users },
      { label: "CAC", value: "$120", subtext: "30% Below Target", icon: TrendingUp },
    ],
    graphData: [5, 10, 25, 20, 40, 55, 50, 65, 80, 75, 90, 95],
  },
];

// --- COMPONENTES INTERNOS ---

const Counter = ({ value }: { value: string }) => {
    // Simulación simple de contador para strings con símbolos (ej: $145k)
    // En producción, usaría una librería como 'framer-motion' useSpring para interpolar números
    return <span className="tracking-tight">{value}</span>;
};

const LiveGraph = ({ data, color }: { data: number[], color: string }) => {
    // Generar path SVG basado en los datos
    const width = 100;
    const height = 50;
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (d / 100) * height;
        return `${x},${y}`;
    }).join(" ");

    // Curva suave (bezier simplificado o polyline directo para estilo 'tech')
    const pathD = `M ${points}`;

    return (
        <div className="w-full h-full relative">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Area Fill */}
                <motion.path
                    d={`${pathD} L 100,50 L 0,50 Z`}
                    fill={`url(#gradient-${color})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                {/* Line Stroke */}
                <motion.path 
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                {/* Glowing Dots on peaks */}
                {data.map((d, i) => (
                    (i === data.length - 1 || i === 4) && ( // Solo mostrar un par de puntos clave
                        <motion.circle
                            key={i}
                            cx={(i / (data.length - 1)) * width}
                            cy={height - (d / 100) * height}
                            r="2"
                            fill="#fff"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 + (i * 0.1) }}
                        />
                    )
                ))}
            </svg>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

export default function CaseStudiesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCase = cases[activeTab];
  const containerRef = useRef(null);

  return (
    <section 
        ref={containerRef}
        className="relative w-full py-24 lg:py-32 bg-[#050505] overflow-hidden"
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
         {/* Grid sutil */}
         <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} 
         />
         {/* Gradient Glow Superior */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-emerald-900/10 blur-[100px] rounded-full" />
      </div>
      
      {/* Top Border */}
      <div className="w-full h-[1px] bg-white/10 absolute top-0 z-20" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-500"
          >
            PROVEN RESULTS
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-white"
          >
            Don't just take our word for it. <br className="hidden md:block"/>
            Look at the <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto]"
            >
              data
            </motion.span>.
          </motion.h2>
        </div>

        {/* --- INTERFACE CONTROL --- */}
        <div className="max-w-6xl mx-auto">
            
            {/* TABS DE NAVEGACIÓN */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {cases.map((c, idx) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveTab(idx)}
                        className={cn(
                            "relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md overflow-hidden group",
                            activeTab === idx 
                                ? "text-black border-transparent" 
                                : "text-zinc-400 border-white/10 hover:border-white/20 hover:text-white bg-white/5"
                        )}
                    >
                        {/* Fondo activo animado */}
                        {activeTab === idx && (
                            <motion.div 
                                layoutId="activeTabBg"
                                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <c.icon size={14} className={activeTab === idx ? "text-black" : "text-zinc-500 group-hover:text-white"} />
                            {c.category}
                        </span>
                    </button>
                ))}
            </div>

            {/* --- MAIN DASHBOARD CARD --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCase.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl"
                >
                    {/* Glow decorativo detrás del card */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-emerald-500/5 to-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                        
                        {/* --- LEFT COLUMN: CONTEXT --- */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between relative z-10 border-b lg:border-b-0 lg:border-r border-white/5">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <activeCase.icon size={18} className="text-emerald-400" />
                                    </div>
                                    <span className="text-zinc-400 font-mono text-sm uppercase tracking-wider">{activeCase.client}</span>
                                </div>
                                
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    {activeCase.title}
                                </h3>
                                
                                <p className="text-zinc-400 leading-relaxed text-base md:text-lg mb-8">
                                    {activeCase.description}
                                </p>
                            </div>

                            <div>
                                <a href="#contact" className="group inline-flex items-center gap-2 text-white font-semibold border-b border-white/30 pb-1 hover:border-emerald-400 transition-colors">
                                    Read Full Case Study
                                    <ArrowUpRight size={16} className="text-emerald-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: VISUALS & STATS --- */}
                        <div className="lg:col-span-7 p-8 md:p-12 relative overflow-hidden flex flex-col">
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                {activeCase.stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                        className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <stat.icon size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                                        </div>
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            <Counter value={stat.value} />
                                        </div>
                                        <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                                            {stat.label}
                                        </div>
                                        <div className="text-xs text-emerald-400/80 mt-1 font-mono">
                                            {stat.subtext}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Graph Area */}
                            <div className="flex-1 bg-[#050505] rounded-xl border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-zinc-300 font-mono">LIVE PERFORMANCE</span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 p-6 pt-12">
                                    {/* Grilla de fondo del chart */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-10 pointer-events-none">
                                        <div className="w-full h-px bg-white" />
                                        <div className="w-full h-px bg-white" />
                                        <div className="w-full h-px bg-white" />
                                        <div className="w-full h-px bg-white" />
                                        <div className="w-full h-px bg-white" />
                                    </div>

                                    {/* Componente Gráfica */}
                                    <LiveGraph data={activeCase.graphData} color={activeCase.color} />
                                </div>
                                
                                {/* Overlay Gradient al hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>

                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            
            {/* FOOTER CTA LINE */}
            <div className="mt-12 text-center">
                 <p className="text-zinc-500 text-sm">
                    Results shown are verified from client CRM & Ad accounts. <span className="text-zinc-300 underline cursor-pointer hover:text-emerald-400 transition-colors">See Methodology</span>.
                 </p>
            </div>
        </div>
      </div>
    </section>
  );
}