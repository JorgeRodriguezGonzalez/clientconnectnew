"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MousePointerClick, 
  Briefcase, 
  Zap,
  Activity,
  BarChart3,
  Play,
  X,
  Home,
  Droplets,
  Flower2,
  Hammer
} from "lucide-react";

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
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
  category: string;
  icon: React.ElementType;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
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
    id: "roofers",
    client: "Your Local Roofers",
    category: "Roofing",
    icon: Home,
    title: "From 'Feast & Famine' to Booked Out",
    description: "They were relying on word-of-mouth. We implemented a hyper-local SEO & Google Ads infrastructure that captured high-intent storm damage queries.",
    thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/5532766/5532766-uhd_2560_1440_25fps.mp4", 
    color: COLORS.emerald, // 1. EMERALD
    stats: [
      { label: "Monthly Revenue", value: "$145k", subtext: "+210% YoY", icon: DollarSign },
      { label: "Cost Per Lead", value: "$24.50", subtext: "-45% Decrease", icon: TrendingUp },
      { label: "Qualified Leads", value: "86", subtext: "Per Month", icon: Users },
    ],
    graphData: [20, 35, 30, 50, 45, 60, 55, 80, 75, 90, 85, 100], 
  },
  {
    id: "nanotise",
    client: "Nanotise",
    category: "Protection",
    icon: Droplets,
    title: "Dominating the Surface Protection Market",
    description: "Nanotise needed to reach high-net-worth clients. We shifted their strategy to direct-response LinkedIn & Meta ads targeting luxury property owners.",
    thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/3252755/3252755-uhd_2560_1440_25fps.mp4", 
    color: COLORS.cyan, // 2. CYAN
    stats: [
      { label: "Pipeline Value", value: "$2.1M", subtext: "Generated Q3", icon: BarChart3 },
      { label: "Quotes Booked", value: "115", subtext: "+150% Increase", icon: Users },
      { label: "ROAS", value: "8.4x", subtext: "Ad Spend Return", icon: Activity },
    ],
    graphData: [10, 20, 15, 30, 45, 40, 60, 55, 75, 80, 95, 100],
  },
  {
    id: "landscaping",
    client: "Lifestyle Concepts",
    category: "Landscaping",
    icon: Flower2,
    title: "Scaling High-Ticket Landscape Projects",
    description: "Selling $50k+ garden transformations requires trust. We built a visual-first funnel with high-converting landing pages focused on project reveals.",
    thumbnail: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2600&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/3191576/3191576-uhd_2560_1440_25fps.mp4", 
    color: COLORS.emerald, // 3. EMERALD
    stats: [
      { label: "Project Value", value: "$850k", subtext: "Booked in 90 Days", icon: DollarSign },
      { label: "Conversion Rate", value: "4.8%", subtext: "Top 1% in Niche", icon: MousePointerClick },
      { label: "Lead Cost", value: "$42", subtext: "High Intent", icon: TrendingUp },
    ],
    graphData: [15, 25, 20, 40, 35, 50, 65, 60, 80, 85, 90, 100],
  },
  {
    id: "bathrooms",
    client: "Premier Bathrooms",
    category: "Renovation",
    icon: Hammer,
    title: "Filling the Schedule 4 Months Ahead",
    description: "We automated their lead qualification process and launched a 'Dream Bathroom' campaign that filled their renovation slots for the entire season.",
    thumbnail: "https://images.unsplash.com/photo-1552321159-5d974a29b8cc?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/5532766/5532766-uhd_2560_1440_25fps.mp4", 
    color: COLORS.cyan, // 4. CYAN
    stats: [
      { label: "Jobs Won", value: "34", subtext: "Avg $25k Value", icon: Briefcase },
      { label: "Time Saved", value: "20hrs", subtext: "Per Week (Admin)", icon: Zap },
      { label: "Growth", value: "185%", subtext: "Year over Year", icon: Activity },
    ],
    graphData: [5, 15, 10, 30, 25, 45, 50, 70, 65, 85, 90, 100],
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
                        <stop offset="0%" stopColor={color} stopOpacity="0.15" />
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
                    // CAMBIO: strokeWidth 0.3 (muy fino)
                    strokeWidth="0.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                
                {/* Puntos brillantes sutiles */}
                 {data.map((d, i) => (
                    (i === data.length - 1) && ( 
                        <motion.circle
                            key={i}
                            cx={(i / (data.length - 1)) * width}
                            cy={height - (d / 100) * height}
                            r="1.5"
                            fill="white"
                            stroke={color}
                            // CAMBIO: strokeWidth 0.3 (muy fino)
                            strokeWidth="0.3"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5 }}
                        />
                    )
                ))}
            </svg>
        </div>
    );
};

// --- COMPONENTE DE VIDEO MODAL ---
const VideoModal = ({ 
    isOpen, 
    onClose, 
    videoUrl, 
    color 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    videoUrl: string; 
    color: string 
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    {/* Modal Content - CAMBIO: rounded-none */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-none overflow-hidden shadow-2xl border border-white/10"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <video 
                            src={videoUrl} 
                            controls 
                            autoPlay 
                            className="w-full h-full object-cover"
                            style={{ outlineColor: color }}
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- COMPONENTE PRINCIPAL ---

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false); 
  const activeCase = cases[activeTab];
  const containerRef = useRef(null);

  return (
    <section 
        ref={containerRef}
        className="relative w-full py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden"
    >
      <BackgroundStripes />
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-20" />

      {/* Video Modal */}
      <VideoModal 
         isOpen={isVideoOpen} 
         onClose={() => setIsVideoOpen(false)} 
         videoUrl={activeCase.videoUrl}
         color={activeCase.color}
      />

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
            
            {/* TABS - CAMBIO: rounded-none */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {cases.map((c, idx) => (
                    <button
                        key={c.id}
                        onClick={() => { setActiveTab(idx); setIsVideoOpen(false); }}
                        className={cn(
                            "relative px-6 py-3 rounded-none text-sm font-semibold transition-all duration-300 overflow-hidden group border",
                            activeTab === idx 
                                ? "text-gray-900 border-zinc-300 bg-white shadow-sm" 
                                : "text-gray-500 border-transparent hover:bg-zinc-100 hover:text-gray-900"
                        )}
                    >
                        {activeTab === idx && (
                            <motion.span 
                                layoutId="activeDot"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: c.color }}
                            />
                        )}
                        <span className={cn("relative z-10 flex items-center gap-2", activeTab === idx ? "pl-3" : "")}>
                            {activeTab !== idx && <c.icon size={14} />}
                            {c.client}
                        </span>
                    </button>
                ))}
            </div>

            {/* --- MAIN CARD - CAMBIO: rounded-none --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCase.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full bg-white border border-zinc-200 rounded-none overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                        
                        {/* LEFT: Context & Video Trigger */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col relative z-10 border-b lg:border-b-0 lg:border-r border-zinc-100">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                                        <activeCase.icon size={18} style={{ color: activeCase.color }} />
                                    </div>
                                    <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">{activeCase.category}</span>
                                </div>
                                
                                <h3 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {activeCase.title}
                                </h3>
                                
                                <p className="text-gray-600 leading-relaxed text-base mb-8 font-medium">
                                    {activeCase.description}
                                </p>

                                {/* --- VIDEO THUMBNAIL CARD - CAMBIO: rounded-none --- */}
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsVideoOpen(true)}
                                    className="group relative w-full h-48 rounded-none overflow-hidden cursor-pointer shadow-sm mb-6 border border-zinc-100"
                                >
                                    {/* Image */}
                                    <div className="absolute inset-0">
                                        <img 
                                            src={activeCase.thumbnail} 
                                            alt="Client Video" 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                                    </div>

                                    {/* Play Button & Text */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                        <div 
                                            className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center pl-1 shadow-lg transition-transform duration-300 group-hover:scale-110"
                                            style={{ color: activeCase.color }}
                                        >
                                            <Play size={20} fill="currentColor" />
                                        </div>
                                        <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-none border border-white/20">
                                            <span className="text-white text-xs font-semibold tracking-wide">
                                                Watch Testimonial
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CTA Link */}
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
                                        // CAMBIO: rounded-none
                                        className="bg-white border border-zinc-200/60 rounded-none p-5 shadow-sm hover:shadow-md transition-shadow"
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

                            {/* Graph Area - CAMBIO: rounded-none */}
                            <div className="flex-1 bg-white rounded-none border border-zinc-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    {/* CAMBIO: rounded-none en badge */}
                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-none bg-zinc-50 border border-zinc-100">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeCase.color }} />
                                        <span className="text-[10px] text-gray-500 font-bold tracking-wide">LIVE PERFORMANCE</span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 p-6 pt-16">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-[0.4] pointer-events-none">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-full h-px bg-zinc-100" />
                                        ))}
                                    </div>
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
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
}