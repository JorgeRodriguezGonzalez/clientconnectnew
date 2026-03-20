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
  Shield,
  Leaf,
  Hammer,
  Globe,
  Search,
  MapPin,
  Clock,
  Target,
  FileText
} from "lucide-react";

// --- CONSTANTES DE COLOR ---
const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399", 
};

// --- UTILS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- BACKGROUND STRIPES (Versión Dark) ---
const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-[0.05] invert"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

// --- DATA: CASOS DE ÉXITO ---
type CaseStudy = {
  id: string;
  client: string;
  category: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
    icon: React.ElementType;
  }[];
  highlights: string[];
  graphData: number[];
  graphLabel: string;
  color: string;
};

const cases: CaseStudy[] = [
  {
    id: "roofers",
    client: "Your Local Roofers",
    category: "Home Protection",
    icon: Home,
    title: "2x Website Traffic in 60 Days",
    subtitle: "11 Position #1 Rankings Achieved",
    description: "Your Local Roofers was stuck in a cycle of feast and famine, relying entirely on word-of-mouth. We redesigned their website on our proprietary tech stack and implemented a full digital strategy combining local search dominance with targeted advertising. Within 60 days, website traffic had more than doubled and 11 keywords reached the #1 position on Google.",
    thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/5532766/5532766-uhd_2560_1440_25fps.mp4", 
    color: COLORS.emerald,
    stats: [
      { label: "Traffic Growth", value: "+141%", subtext: "Post-Redesign (90 Days)", icon: TrendingUp },
      { label: "Website Clicks", value: "5,344", subtext: "vs 2,218 Prior Period", icon: MousePointerClick },
      { label: "#1 Rankings", value: "11", subtext: "Keywords on Page 1", icon: Search },
      { label: "Ranking Coverage", value: "7/7", subtext: "Days Per Week", icon: Target },
    ],
    highlights: [
      "Website rebuilt on React + Vite — 2-3x faster than WordPress",
      "Full digital strategy combining local search + paid advertising",
      "11 keywords ranking in position #1 on Google",
      "Rankings sustained 7 days a week including weekends",
      "From feast-and-famine to consistently booked out",
    ],
    graphData: [15, 18, 20, 25, 30, 35, 40, 45, 50, 60, 70, 85],
    graphLabel: "Monthly Website Traffic",
  },
  {
    id: "nanotise",
    client: "Nanotise",
    category: "Home Health",
    icon: Shield,
    title: "2x Website Traffic in 14 Days",
    subtitle: "WordPress to React Migration — Immediate Impact",
    description: "Nanotise's WordPress site had become unreliable — plugin conflicts were breaking forms and costing leads. We migrated the entire site to a modern React + Vite + Netlify architecture with zero downtime. Within 14 days, website traffic had doubled, click-through rates improved by 80%, and average search position climbed nearly 4 spots.",
    thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/3252755/3252755-uhd_2560_1440_25fps.mp4", 
    color: COLORS.cyan,
    stats: [
      { label: "Click Growth", value: "+102.8%", subtext: "Doubled Post-Migration", icon: MousePointerClick },
      { label: "CTR Improvement", value: "+80%", subtext: "0.5% → 0.9%", icon: TrendingUp },
      { label: "Avg. Position", value: "17.1", subtext: "Improved from 21", icon: Search },
      { label: "Form Submissions", value: "~70/mo", subtext: "March 2026 Pace", icon: FileText },
      { label: "Peak Leads", value: "90", subtext: "Aug 2025 Record", icon: Users },
    ],
    highlights: [
      "Migration from WordPress to React + Vite + Netlify with zero downtime",
      "Website traffic doubled within 14 days of launch",
      "Multi-channel lead generation combining search + paid advertising",
      "Average search position improved from 21 to 17.1",
      "March 2026 on pace for ~70 form submissions",
    ],
    graphData: [8, 12, 11, 15, 13, 16, 14, 18, 15, 28, 32, 35],
    graphLabel: "Daily Website Clicks",
  },
  {
    id: "premier",
    client: "Premier Bathrooms",
    category: "Home Renovations",
    icon: Hammer,
    title: "409% Traffic Growth in 6 Months",
    subtitle: "27 Hyperlocal Pages Dominating Sydney",
    description: "Premier Bathrooms needed to dominate Sydney's competitive bathroom renovation market. We built 27 hyperlocal landing pages targeting specific suburbs and services, achieving 8 position #1 rankings. Combined with strategic Google Ads campaigns, total lead volume surged — with traffic growing 409% in just 6 months across all channels.",
    thumbnail: "https://images.unsplash.com/photo-1552321159-5d974a29b8cc?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/5532766/5532766-uhd_2560_1440_25fps.mp4", 
    color: COLORS.emerald,
    stats: [
      { label: "Traffic Growth", value: "+409%", subtext: "Sep 2025 – Feb 2026", icon: TrendingUp },
      { label: "Lead Channels", value: "SEO + Ads", subtext: "Full Funnel Strategy", icon: Search },
      { label: "#1 Rankings", value: "8", subtext: "Position 1 Keywords", icon: Target },
      { label: "Hyperlocal Pages", value: "27", subtext: "Suburb-Specific Pages", icon: MapPin },
      { label: "First Page Coverage", value: "88%", subtext: "23 of 26 Keywords", icon: BarChart3 },
      { label: "Top 5 Keywords", value: "15", subtext: "Out of 26 Tracked", icon: Activity },
    ],
    highlights: [
      "27 hyperlocal pages targeting specific Sydney suburbs",
      "8 keywords ranking in position #1 on Google",
      "409% traffic growth in just 6 months across all channels",
      "Combined SEO + Google Ads strategy for maximum lead volume",
      "88% of tracked keywords on Google's first page",
      "Dominating the Sydney bathroom renovation market",
    ],
    graphData: [10, 22, 28, 33, 35, 33],
    graphLabel: "Monthly Traffic Growth (Scaled)",
  },
  {
    id: "fencing",
    client: "J Bryant Fencing",
    category: "Home Improvements",
    icon: Leaf,
    title: "From 0 to 300 Leads/Month in 60 Days",
    subtitle: "Cold Start to Full Scale in Record Time",
    description: "Starting from zero, we built a complete lead generation engine for a fencing contractor that scaled to 300 leads per month in just 60 days. The ramp-up was aggressive and sustained — reaching full target volume within two months and maintaining that pace consistently.",
    thumbnail: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2600&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/3191576/3191576-uhd_2560_1440_25fps.mp4", 
    color: COLORS.cyan,
    stats: [
      { label: "Monthly Leads", value: "300", subtext: "At Full Scale", icon: Users },
      { label: "Time to Scale", value: "60 Days", subtext: "From Zero", icon: Clock },
      { label: "Ramp-Up Speed", value: "5x/mo", subtext: "Week-over-Week Growth", icon: TrendingUp },
      { label: "Target Reached", value: "100%", subtext: "Volume Delivered", icon: Target },
    ],
    highlights: [
      "From absolute zero to 300 leads per month",
      "Full target volume reached in just 60 days",
      "Aggressive week-over-week scaling sustained throughout",
      "Consistent lead flow maintained after ramp-up",
    ],
    graphData: [0, 5, 18, 45, 90, 140, 195, 250, 300],
    graphLabel: "Lead Ramp-Up (60 Days)",
  },
];

// --- COMPONENTES INTERNOS ---

const LiveGraph = ({ data, color }: { data: number[], color: string }) => {
    const max = Math.max(...data);
    const width = 100;
    const height = 50;
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (d / max) * height * 0.9 - height * 0.05;
        return `${x},${y}`;
    }).join(" ");
    const pathD = `M ${points}`;

    return (
        <div className="w-full h-full relative">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`gradient-dark-${color.replace('#','')}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={`${pathD} L 100,50 L 0,50 Z`}
                    fill={`url(#gradient-dark-${color.replace('#','')})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.path 
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                
                {data.map((d, i) => (
                    (i === data.length - 1) && ( 
                        <motion.circle
                            key={i}
                            cx={(i / (data.length - 1)) * width}
                            cy={height - (d / max) * height * 0.9 - height * 0.05}
                            r="1.2"
                            fill={color}
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

const VideoModal = ({ isOpen, onClose, videoUrl, color }: { isOpen: boolean; onClose: () => void; videoUrl: string; color: string }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />
                    
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
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
        className="relative w-full py-24 lg:py-32 bg-[#050505] overflow-hidden"
    >
      <BackgroundStripes />
      
      {/* Línea superior decorativa */}
      <div className="w-full h-[1px] bg-white/5 absolute top-0 z-20" />

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
            className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-500"
          >
            PROVEN RESULTS
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-white"
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
            
            {/* TABS */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {cases.map((c, idx) => (
                    <button
                        key={c.id}
                        onClick={() => { setActiveTab(idx); setIsVideoOpen(false); }}
                        className={cn(
                            "relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden group border",
                            activeTab === idx 
                                ? "text-white border-white/20 bg-zinc-900 shadow-xl" 
                                : "text-zinc-500 border-transparent hover:bg-white/5 hover:text-white"
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

            {/* --- MAIN CARD --- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCase.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
                        
                        {/* LEFT: Context & Video Trigger */}
                        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col relative z-10 border-b lg:border-b-0 lg:border-r border-white/5">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                        <activeCase.icon size={18} style={{ color: activeCase.color }} />
                                    </div>
                                    <div>
                                        <span className="text-zinc-500 font-medium text-sm uppercase tracking-wider block">{activeCase.category}</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-3xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                    {activeCase.title}
                                </h3>

                                <p className="text-sm font-semibold mb-5" style={{ color: activeCase.color }}>
                                    {activeCase.subtitle}
                                </p>
                                
                                <p className="text-zinc-400 leading-relaxed text-[15px] mb-8">
                                    {activeCase.description}
                                </p>

                                {/* HIGHLIGHTS */}
                                <div className="mb-8">
                                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-500 mb-4">Key Results</p>
                                    <div className="flex flex-col gap-2.5">
                                        {activeCase.highlights.map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + (i * 0.06) }}
                                                className="flex items-start gap-2.5"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: activeCase.color }} />
                                                <span className="text-[13px] text-zinc-300 leading-relaxed">{h}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* VIDEO THUMBNAIL */}
                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsVideoOpen(true)}
                                    className="group relative w-full h-40 rounded-2xl overflow-hidden cursor-pointer shadow-lg mb-6 border border-white/10"
                                >
                                    <div className="absolute inset-0">
                                        <img 
                                            src={activeCase.thumbnail} 
                                            alt="Client Video" 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                                    </div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                        <div 
                                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pl-1 shadow-2xl transition-transform duration-300 group-hover:scale-110"
                                            style={{ color: activeCase.color }}
                                        >
                                            <Play size={20} fill="currentColor" />
                                        </div>
                                        <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                                            <span className="text-white text-xs font-semibold tracking-wide">
                                                Watch Testimonial
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CTA Link */}
                            <div>
                                <a href="#contact" className="group inline-flex items-center gap-2 text-white font-bold border-b-2 border-white/5 pb-1 hover:border-emerald-400/50 transition-colors text-sm">
                                    READ FULL CASE STUDY
                                    <ArrowUpRight size={14} className="text-emerald-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>

                        {/* RIGHT: Stats & Graph */}
                        <div className="lg:col-span-7 p-8 md:p-12 relative overflow-hidden flex flex-col bg-black/20">
                            
                            {/* Stats Grid — adapts to number of stats */}
                            <div className={cn(
                                "grid gap-4 mb-8",
                                activeCase.stats.length <= 4 
                                    ? "grid-cols-1 sm:grid-cols-2" 
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            )}>
                                {activeCase.stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.08) }}
                                        className="bg-zinc-900/50 border border-white/10 rounded-2xl p-5 shadow-sm hover:border-white/20 transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <stat.icon size={18} className="text-zinc-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold">
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
                            <div className="flex-1 bg-zinc-950 rounded-2xl border border-white/10 shadow-inner relative overflow-hidden group min-h-[200px]">
                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeCase.color }} />
                                        <span className="text-[10px] text-zinc-400 font-bold tracking-wide">{activeCase.graphLabel.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 p-6 pt-16">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-[0.1] pointer-events-none">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-full h-px bg-white" />
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
                 <p className="text-zinc-500 text-sm font-medium">
                    Results shown are verified from client Google Search Console, CRM & Ad accounts. <span className="text-white underline cursor-pointer hover:text-emerald-400 transition-colors">See Methodology</span>.
                 </p>
            </div>
        </div>
      </div>
      
      {/* Línea inferior decorativa */}
      <div className="w-full h-[1px] bg-white/5 absolute bottom-0 z-10" />
    </section>
  );
}