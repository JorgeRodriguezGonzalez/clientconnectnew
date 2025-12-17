"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  coral: "rgb(222, 131, 99)", 
  gold: "rgb(237, 191, 134)",
  emerald: "#34d399", 
};

// --- BACKGROUND STRIPES ---
const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-[0.04]"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- UTILS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

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
  graphData: number[];
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
    color: COLORS.coral, 
    stats: [
      { label: "Pipeline Value", value: "$3.5M", subtext: "Generated Q3", icon: BarChart3 },
      { label: "Demo Bookings", value: "142", subtext: "+300% Increase", icon: Users },
      { label: "CAC", value: "$120", subtext: "30% Below Target", icon: TrendingUp },
    ],
    graphData: [5, 10, 25, 20, 40, 55, 50, 65, 80, 75, 90, 95],
  },
];

// --- COMPONENTES INTERNOS ---

const LiveGraph = ({ data, color }: { data: number[], color: string }) => {
    const width = 100;
    const height = 50;
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (d / 100) * height;
        return `${x},${y}`;
    }).join(" ");
    const pathD = `M ${points}`;

    return (
        <div className="w-full h-full relative">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`gradient-light-${color}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={`${pathD} L 100,50 L 0,50 Z`}
                    fill={`url(#gradient-light-${color})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.path 
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCase = cases[activeTab];
  const containerRef = useRef(null);

  return (
    <section 
        ref={containerRef}
        className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden"
    >
      {/* 1. BACKGROUND STRIPES */}
      <BackgroundStripes />
      
      {/* 2. TOP BORDER (Zinc-200 para modo claro) */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8 max-w-[1280px]">
        
        {/* HEADER */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500"
          >
            PROVEN RESULTS
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900"
          >
            Don't just take our word for it. <br className="hidden md:block"/>
            Look at the <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: `linear-gradient(45deg, ${COLORS.emerald}, ${COLORS.cyan}, ${COLORS.emerald})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              data
            </motion.span>.
          </motion.h2>
        </div>

        {/* --- DASHBOARD UI --- */}
        <div className="max-w-6xl mx-auto">
            
            {/* TABS (Light Mode) */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {cases.map((c, idx) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveTab(idx)}
                        className={cn(
                            "relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden group border",
                            activeTab === idx 
                                ? "text-gray-900 border-zinc-300 bg-white shadow-sm" 
                                : "text-gray-500 border-transparent hover:bg-zinc-100 hover:text-gray-900"
                        )}
                    >
                        {/* Indicador activo pequeño */}
                        {activeTab === idx && (
                            <motion.span 
                                layoutId="activeDot"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: c.color }}
                            />
                        )}
                        <span className={cn("relative z-10 flex items-center gap-2", activeTab === idx ? "pl-3" : "")}>
                            {/* CORRECCIÓN AQUI: Cambiado de !activeTab === idx a activeTab !== idx */}
                            {activeTab !== idx && <c.icon size={14} />}
                            {c.category}
                        </span>
                    </button>
                ))}
            </div>

            {/* --- MAIN CARD (Light Mode Dashboard) --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCase.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full bg-white border border-zinc-200 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                        
                        {/* LEFT: Context */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between relative z-10 border-b lg:border-b-0 lg:border-r border-zinc-100">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                                        <activeCase.icon size={18} style={{ color: activeCase.color }} />
                                    </div>
                                    <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">{activeCase.client}</span>
                                </div>
                                
                                <h3 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {activeCase.title}
                                </h3>
                                
                                <p className="text-gray-600 leading-relaxed text-base md:text-[16px] mb-8 font-medium">
                                    {activeCase.description}
                                </p>
                            </div>

                            <div>
                                <a href="#contact" className="group inline-flex items-center gap-2 text-gray-900 font-bold border-b-2 border-zinc-100 pb-1 hover:border-emerald-400 transition-colors text-sm">
                                    READ FULL CASE STUDY
                                    <ArrowUpRight size={14} className="text-emerald-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>

                        {/* RIGHT: Stats & Graph */}
                        <div className="lg:col-span-7 p-8 md:p-12 relative overflow-hidden flex flex-col bg-zinc-50/50">
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                {activeCase.stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                        className="bg-white border border-zinc-200/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <stat.icon size={18} className="text-gray-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">
                                            {stat.label}
                                        </div>
                                        <div 
                                          className="text-xs font-semibold mt-1"
                                          style={{ color: activeCase.color }}
                                        >
                                            {stat.subtext}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Graph Area */}
                            <div className="flex-1 bg-white rounded-xl border border-zinc-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-50 border border-zinc-100">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeCase.color }} />
                                        <span className="text-[10px] text-gray-500 font-bold tracking-wide">LIVE PERFORMANCE</span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 p-6 pt-16">
                                    {/* Grid Lines (Lighter) */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-[0.4] pointer-events-none">
                                        <div className="w-full h-px bg-zinc-100" />
                                        <div className="w-full h-px bg-zinc-100" />
                                        <div className="w-full h-px bg-zinc-100" />
                                        <div className="w-full h-px bg-zinc-100" />
                                        <div className="w-full h-px bg-zinc-100" />
                                    </div>

                                    {/* Graph */}
                                    <LiveGraph data={activeCase.graphData} color={activeCase.color} />
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            
            {/* FOOTER */}
            <div className="mt-12 text-center">
                 <p className="text-gray-400 text-sm font-medium">
                    Results shown are verified from client CRM & Ad accounts. <span className="text-gray-900 underline cursor-pointer hover:text-emerald-500 transition-colors">See Methodology</span>.
                 </p>
            </div>
        </div>
      </div>
      
      {/* Bottom Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
}