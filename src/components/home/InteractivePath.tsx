import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { 
  Megaphone, Search, Layout, Target, Mail, BarChart3, 
  TrendingUp, Users, MousePointer2, Zap 
} from 'lucide-react';

// --- UTILS ---
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const COLORS = {
  cyan: "#06b6d4",
  emerald: "#34d399",
  zinc: "#18181b"
};

const BackgroundDotPattern = () => (
  <div 
    className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(#e4e4e7 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}
  />
);

// --- ANIMATION VARIANTS ---
const PATH_VARIANTS: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 2, ease: "easeInOut" } 
  }
};

const NODE_VARIANTS: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 }
};

// --- TYPES ---
type NodePoint = {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: React.ElementType;
  description: string;
  stat: string;
};

const nodes: NodePoint[] = [
  { id: 'strategy', x: 225, y: 30, label: 'Strategy', icon: Target, description: 'Market positioning and audience targeting.', stat: 'Data-Driven' },
  { id: 'ads', x: 100, y: 90, label: 'Paid Media', icon: Megaphone, description: 'High-ROI campaigns on Meta and Google.', stat: '4.5x ROAS' },
  { id: 'seo', x: 350, y: 90, label: 'SEO & Content', icon: Search, description: 'Organic authority and keyword dominance.', stat: '+150% Traffic' },
  { id: 'web', x: 225, y: 150, label: 'Web Development', icon: Layout, description: 'High-performance conversion engines.', stat: '5% Conv. Rate' },
  { id: 'crm', x: 100, y: 210, label: 'Automation', icon: Mail, description: 'Lead nurturing and CRM integration.', stat: '24/7 Active' },
  { id: 'analytics', x: 350, y: 210, label: 'Analytics', icon: BarChart3, description: 'Real-time performance tracking.', stat: '100% Clarity' }
];

// --- SUB-COMPONENT: NODE ---
const NodeIcon = ({ node, active, onClick }: { node: NodePoint; active: boolean; onClick: (e: React.MouseEvent) => void }) => {
  const isEmerald = ['web', 'crm', 'analytics'].includes(node.id);
  const activeColor = isEmerald ? COLORS.emerald : COLORS.cyan;
  const activeClass = isEmerald ? 'text-emerald-500' : 'text-cyan-500';

  return (
    <motion.g 
      className="cursor-pointer group" 
      variants={NODE_VARIANTS} 
      initial="idle"
      whileHover="hover" 
      whileTap="tap" 
      onClick={onClick}
    >
      <AnimatePresence>
        {active && (
          <motion.circle
            cx={node.x} cy={node.y} r="32"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            fill={activeColor}
          />
        )}
      </AnimatePresence>

      <circle 
        cx={node.x} cy={node.y} r="22" 
        className={cn("transition-all duration-300", active ? "fill-white" : "fill-white group-hover:fill-zinc-50")}
        stroke={active ? activeColor : "#e4e4e7"}
        strokeWidth={active ? 2 : 1}
      />
      
      <foreignObject x={node.x - 10} y={node.y - 10} width="20" height="20" className="pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
            <node.icon size={16} className={cn("transition-colors duration-300", active ? activeClass : "text-zinc-400 group-hover:text-zinc-600")} />
        </div>
      </foreignObject>

      <text 
        x={node.x} y={node.y + 40} textAnchor="middle" 
        className={cn("text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 font-sans", active ? "fill-zinc-900" : "fill-zinc-400")}
      >
        {node.label}
      </text>
    </motion.g>
  );
};

// --- MAIN COMPONENT ---
const InteractivePath = () => {
  const [activeNode, setActiveNode] = useState<NodePoint | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Manejar cierre al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveNode(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#FAFAFA] overflow-hidden border-t border-zinc-200">
      <BackgroundDotPattern />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6" ref={containerRef}>
        <div className="flex flex-col items-center text-center mb-16 gap-4">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-500">Growth Ecosystem</span>
            </motion.div>

            <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900"
            >
                Integrated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Growth Engine</span>
            </motion.h2>
        </div>

        <div className="relative w-full bg-white border border-zinc-200 rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-visible">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 opacity-50" />
            
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] p-8 md:p-12">
                <svg viewBox="0 0 450 260" className="w-full h-full overflow-visible">
                    {/* Paths */}
                    <motion.path 
                        d="M 225 30 L 100 90 L 225 150 L 350 90 Z" 
                        fill="none" stroke={COLORS.cyan} strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="4 4"
                        variants={PATH_VARIANTS} initial="hidden" animate={isInView ? "visible" : "hidden"} 
                    />
                    <motion.path 
                        d="M 100 90 L 100 210 L 225 150 M 350 90 L 350 210 L 225 150" 
                        fill="none" stroke={COLORS.emerald} strokeWidth="1.5" strokeOpacity="0.2"
                        variants={PATH_VARIANTS} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.5 }} 
                    />

                    {/* Nodes */}
                    {nodes.map(node => (
                        <NodeIcon 
                            key={node.id} 
                            node={node} 
                            active={activeNode?.id === node.id} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveNode(node);
                            }} 
                        />
                    ))}
                </svg>

                {/* --- FLOATING CARD (DYNAMIC POSITION) --- */}
                <AnimatePresence>
                    {activeNode && (
                        <motion.div 
                            ref={cardRef}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                // Cálculo de posición: convertimos 0-450 y 0-260 a %
                                left: `${(activeNode.x / 450) * 100}%`,
                                top: `${(activeNode.y / 260) * 100}%`
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            style={{ 
                                position: 'absolute',
                                // Ajuste fino para que la tarjeta no tape el icono y se mueva inteligentemente
                                transform: `translate(${activeNode.x > 300 ? '-90%' : activeNode.x < 150 ? '-10%' : '-50%'}, ${activeNode.y > 180 ? '-110%' : '20px'})`
                            }}
                            className="z-50 w-64 bg-white border border-zinc-200 shadow-2xl rounded-lg p-4 pointer-events-auto"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className={cn(
                                    "p-1.5 rounded-md border",
                                    ['web', 'crm', 'analytics'].includes(activeNode.id) 
                                        ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                                        : "bg-cyan-50 border-cyan-100 text-cyan-600"
                                )}>
                                    <activeNode.icon size={16} />
                                </div>
                                <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wide">
                                    {activeNode.label}
                                </h3>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                                {activeNode.description}
                            </p>
                            <div className="pt-2 border-t border-zinc-100 flex justify-between items-center">
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Performance</span>
                                <span className={cn(
                                    "text-[10px] font-bold font-mono",
                                    ['web', 'crm', 'analytics'].includes(activeNode.id) ? "text-emerald-600" : "text-cyan-600"
                                )}>
                                    {activeNode.stat}
                                </span>
                            </div>
                            {/* Arrow decoration */}
                            <div className={cn(
                                "absolute w-3 h-3 bg-white border-l border-t border-zinc-200 rotate-45",
                                activeNode.y > 180 ? "-bottom-1.5" : "-top-1.5",
                                "left-1/2 -translate-x-1/2"
                            )} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-200 divide-x divide-zinc-200 bg-zinc-50/50">
                {[
                   { label: "Client ROAS", value: "450%", icon: TrendingUp, color: "text-emerald-600" },
                   { label: "Leads Gen", value: "15k+", icon: Users, color: "text-cyan-600" },
                   { label: "Avg CTR", value: "2.4%", icon: MousePointer2, color: "text-zinc-700" },
                   { label: "Speed", value: "98/100", icon: Zap, color: "text-emerald-600" }
                ].map((stat, i) => (
                    <div key={i} className="p-4 flex flex-col items-center justify-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <stat.icon size={12} className="text-zinc-400" />
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <span className={cn("text-xl font-bold tracking-tight", stat.color)}>{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <p className="text-center mt-6 text-zinc-400 text-[10px] font-medium uppercase tracking-[3px]">
            Click outside the diagram to reset view
        </p>
      </div>
    </section>
  );
};

export default InteractivePath;