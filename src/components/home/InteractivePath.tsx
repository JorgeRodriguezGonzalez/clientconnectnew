import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { Network, Database, Cloud, ShieldCheck, Layers, Cpu, Zap, Activity, Server, Lock } from 'lucide-react';

// --- UTILS & CONFIG ---
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

// --- ANIMATION VARIANTS (FIXED TYPE) ---
const PATH_VARIANTS: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 2, ease: "easeInOut" } 
  }
};

const NODE_VARIANTS: Variants = {
  idle: { scale: 1, strokeWidth: 2 },
  hover: { scale: 1.1, strokeWidth: 3, transition: { duration: 0.3 } },
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
  {
    id: 'cloud',
    x: 225, 
    y: 30,
    label: 'Ingress API',
    icon: Cloud,
    description: 'High-throughput entry point handling external requests.',
    stat: '1.2M req/s'
  },
  {
    id: 'db',
    x: 100,
    y: 90,
    label: 'Data Store',
    icon: Database,
    description: 'Distributed persistence layer with sharding.',
    stat: '0.4ms Latency'
  },
  {
    id: 'cpu',
    x: 350,
    y: 90,
    label: 'Compute Unit',
    icon: Cpu,
    description: 'Serverless execution environment for business logic.',
    stat: 'Auto-Scaling'
  },
  {
    id: 'shield',
    x: 225,
    y: 150,
    label: 'Firewall',
    icon: ShieldCheck,
    description: 'Real-time threat detection and packet filtering.',
    stat: '0 Threats'
  },
  {
    id: 'layers',
    x: 100,
    y: 210,
    label: 'Integration',
    icon: Layers,
    description: 'Middleware processing and message queuing.',
    stat: '99.99% Uptime'
  },
  {
    id: 'network',
    x: 350,
    y: 210,
    label: 'Gateway',
    icon: Network,
    description: 'Final edge distribution and load balancing.',
    stat: 'Global CDN'
  }
];

// --- SUB-COMPONENT: NODE ---
const NodeIcon = ({
  node,
  active,
  onClick
}: {
  node: NodePoint;
  active: boolean;
  onClick: () => void;
}) => {
  const isEmerald = ['db', 'layers', 'shield'].includes(node.id);
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
      {/* Outer Glow Ring (Only on Active) */}
      <AnimatePresence>
        {active && (
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="32"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            fill={activeColor}
          />
        )}
      </AnimatePresence>

      {/* Main Circle Background */}
      <circle 
        cx={node.x} 
        cy={node.y} 
        r="24" 
        className={cn(
          "transition-all duration-300",
          active ? "fill-white" : "fill-white group-hover:fill-zinc-50"
        )}
        stroke={active ? activeColor : "#e4e4e7"}
        strokeWidth={active ? 2 : 1}
      />
      
      {/* Icon */}
      <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24" className="pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
            <node.icon 
                size={18}
                className={cn(
                    "transition-colors duration-300",
                    active ? activeClass : "text-zinc-400 group-hover:text-zinc-600"
                )} 
            />
        </div>
      </foreignObject>

      {/* Label Underneath */}
      <text 
        x={node.x} 
        y={node.y + 45} 
        textAnchor="middle" 
        className={cn(
            "text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 font-sans",
            active ? "fill-zinc-900" : "fill-zinc-400"
        )}
      >
        {node.label}
      </text>
    </motion.g>
  );
};

// --- MAIN COMPONENT ---
const InteractivePath = () => {
  const [activeNode, setActiveNode] = useState<NodePoint | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-24 bg-[#FAFAFA] overflow-hidden border-t border-zinc-200">
      <BackgroundDotPattern />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6" ref={containerRef}>
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-500">
                    System Architecture
                </span>
            </motion.div>

            <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900"
            >
                Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Data Flow</span>
            </motion.h2>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 max-w-lg leading-relaxed text-sm md:text-base"
            >
                Visualizing the interconnected nodes of our proprietary growth engine. Click on any node to inspect layer details.
            </motion.p>
        </div>

        {/* INTERACTIVE DIAGRAM */}
        <div className="relative w-full bg-white border border-zinc-200 rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            
            {/* Top Bar Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 opacity-50" />
            <div className="absolute top-4 left-4 flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-200" />
                <div className="w-2 h-2 rounded-full bg-zinc-200" />
                <div className="w-2 h-2 rounded-full bg-zinc-200" />
            </div>

            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] p-8 md:p-12">
                <svg viewBox="0 0 450 260" className="w-full h-full overflow-visible">
                    
                    {/* CONNECTIONS (Lines) */}
                    {/* Left Diamond */}
                    <motion.path 
                        d="M 225 30 L 100 90 L 225 150 L 350 90 Z" 
                        fill="none" 
                        stroke="#f4f4f5" 
                        strokeWidth="1" 
                    />
                    <motion.path 
                        d="M 225 30 L 100 90 L 225 150 L 350 90 Z" 
                        fill="none" 
                        stroke={COLORS.cyan} 
                        strokeWidth="1.5" 
                        strokeOpacity="0.4"
                        strokeDasharray="4 4"
                        variants={PATH_VARIANTS} 
                        initial="hidden" 
                        animate={isInView ? "visible" : "hidden"} 
                    />

                    {/* Right Diamond / Bottom connection */}
                    <motion.path 
                        d="M 100 90 L 100 210 L 225 150 M 350 90 L 350 210 L 225 150" 
                        fill="none" 
                        stroke="#f4f4f5" 
                        strokeWidth="1" 
                    />
                    <motion.path 
                        d="M 100 90 L 100 210 L 225 150 M 350 90 L 350 210 L 225 150" 
                        fill="none" 
                        stroke={COLORS.emerald} 
                        strokeWidth="1.5" 
                        strokeOpacity="0.4"
                        variants={PATH_VARIANTS} 
                        initial="hidden" 
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.5 }} 
                    />

                    {/* Active Path Highlight (Dynamic) */}
                    <AnimatePresence>
                        {activeNode && (
                        <motion.path 
                            key="active-path" 
                            d="M 225 30 L 100 90 L 225 150 L 350 90 Z" 
                            fill="none" 
                            stroke={['db', 'layers', 'shield'].includes(activeNode.id) ? COLORS.emerald : COLORS.cyan} 
                            strokeWidth="2" 
                            initial={{ pathLength: 0, opacity: 0 }} 
                            animate={{ pathLength: 1, opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            transition={{ duration: 0.8 }} 
                        />
                        )}
                    </AnimatePresence>

                    {/* Nodes */}
                    {nodes.map(node => (
                        <NodeIcon 
                            key={node.id} 
                            node={node} 
                            active={activeNode?.id === node.id} 
                            onClick={() => setActiveNode(node)} 
                        />
                    ))}
                </svg>

                {/* Floating Info Card (Bottom Center) */}
                <AnimatePresence mode="wait">
                    {activeNode ? (
                        <motion.div 
                            key={activeNode.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xl z-20 rounded-sm"
                        >
                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn(
                                        "p-1.5 rounded-sm border",
                                        ['db', 'layers', 'shield'].includes(activeNode.id) 
                                            ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                                            : "bg-cyan-50 border-cyan-100 text-cyan-600"
                                    )}>
                                        <activeNode.icon size={16} />
                                    </div>
                                    <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wide">
                                        {activeNode.label}
                                    </h3>
                                </div>
                                
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium mb-3">
                                    {activeNode.description}
                                </p>
                                
                                <div className="pt-3 border-t border-zinc-100 flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Metric</span>
                                    <span className={cn(
                                        "text-[10px] font-bold font-mono",
                                        ['db', 'layers', 'shield'].includes(activeNode.id) 
                                            ? "text-emerald-600" 
                                            : "text-cyan-600"
                                    )}>
                                        {activeNode.stat}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
                        >
                            <span className="px-3 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                Select a node to inspect
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-200 divide-x divide-zinc-200 bg-zinc-50/50">
                {[
                   { label: "Total Uptime", value: "99.99%", icon: Activity, color: "text-emerald-600" },
                   { label: "Latency", value: "24ms", icon: Zap, color: "text-cyan-600" },
                   { label: "Security", value: "Encrypted", icon: Lock, color: "text-zinc-700" },
                   { label: "Nodes", value: "14/14 Active", icon: Server, color: "text-emerald-600" }
                ].map((stat, i) => (
                    <div key={i} className="p-4 md:p-6 flex flex-col items-center justify-center gap-1 hover:bg-white transition-colors duration-300">
                        <div className="flex items-center gap-1.5 mb-1">
                            <stat.icon size={12} className="text-zinc-400" />
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <span className={cn("text-xl md:text-2xl font-bold tracking-tight", stat.color)}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePath;