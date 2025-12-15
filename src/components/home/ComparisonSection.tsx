import React from "react";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

// --- Assets & Styles ---

// COLORES CORPORATIVOS (Solo Emerald y Cyan)
const COLORS = {
  cyan: "#06b6d4", 
  emerald: "#34d399",
};

// --- Content Data ---

const comparisonData = [
  {
    category: "Strategy",
    others: "Cookie-cutter templates",
    us: "Custom, data-driven roadmap",
  },
  {
    category: "Focus Metric",
    others: "Vanity metrics (Likes/Views)",
    us: "Revenue & ROI Growth",
  },
  {
    category: "Reporting",
    others: "Vague monthly PDF reports",
    us: "Real-time transparent dashboards",
  },
  {
    category: "Communication",
    others: "Slow email support tickets",
    us: "Dedicated Slack channel & instant access",
  },
  {
    category: "Speed to Launch",
    others: "Weeks or months of onboarding",
    us: "Rapid deployment in days",
  },
  {
    category: "Lead Quality",
    others: "Cold, unqualified leads",
    us: "High-intent, ready-to-buy prospects",
  },
];

// --- Components ---

const ComparisonSection = () => {
  return (
    // CAMBIO: Fondo negro (#050505) en lugar de blanco
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 sm:py-32">
      
      {/* --- TOP BORDER LINE --- */}
      <div className="w-full h-[1px] bg-white/10 absolute top-0 z-20" />

      {/* Gradient Blurs (Sutiles manchones de luz para dar profundidad en modo oscuro) */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-emerald-900/10 via-[#050505] to-transparent z-0" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-500"
          >
            THE DIFFERENCE
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-white"
          >
            Why partner with{' '}
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
                // CAMBIO: Gradiente Emerald y Cyan
                backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0), ${COLORS.emerald}, ${COLORS.cyan}, rgba(255, 255, 255, 0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              Client Connect
            </motion.span>
            ?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] font-medium leading-relaxed text-zinc-400 tracking-tight"
          >
            Stop wasting budget on strategies that don't convert. Compare the difference between the industry standard and our results-obsessed approach.
          </motion.p>
        </div>

        {/* Comparison Table Grid */}
        <div className="max-w-5xl mx-auto">
          
          {/* Table Headers (Desktop) */}
          <div className="hidden md:grid grid-cols-10 gap-4 mb-4 items-end">
            <div className="col-span-3 pb-4 pl-4">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Features</span>
            </div>
            <div className="col-span-3 text-center pb-4">
              <span className="text-sm font-bold text-zinc-400">Other Agencies</span>
            </div>
            <div className="col-span-4 text-center pb-4 relative">
              {/* Highlight Badge - Actualizado con colores corporativos */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                Recommended
              </div>
              <span className="text-lg font-bold text-white">Client Connect</span>
            </div>
          </div>

          {/* Rows Container */}
          <div className="space-y-4 md:space-y-3">
            {comparisonData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-10 gap-0 md:gap-4 group"
              >
                
                {/* 1. Feature Name */}
                <div className="col-span-3 md:flex items-center p-4 md:bg-transparent rounded-t-xl md:rounded-lg">
                  <span className="text-base font-semibold text-zinc-200">{item.category}</span>
                </div>

                {/* 2. Other Agencies */}
                <div className="col-span-3 bg-white/5 border border-white/5 p-5 md:p-4 md:rounded-lg flex items-center md:justify-center gap-3 transition-colors duration-300 md:group-hover:bg-white/10 border-b-0 md:border-b">
                  <div className="shrink-0 rounded-full bg-white/10 p-1">
                    <X className="w-4 h-4 text-zinc-500" />
                  </div>
                  <span className="text-sm text-zinc-400 font-medium">{item.others}</span>
                </div>

                {/* 3. Client Connect (Highlighted) */}
                <div className="col-span-4 relative bg-zinc-900 border border-white/10 p-5 md:p-4 rounded-b-xl md:rounded-lg flex items-center md:justify-center gap-3 shadow-none md:shadow-[0_4px_20px_rgba(0,0,0,0.2)] md:group-hover:-translate-y-1 transition-all duration-300 z-10 md:scale-[1.02]">
                  
                  {/* Borde sutil iluminado al hover */}
                  <div 
                    className="absolute inset-0 rounded-b-xl md:rounded-lg border border-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ borderColor: COLORS.emerald }}
                  />
                  
                  {/* Icono Check con fondo Emerald muy transparente */}
                  <div className="shrink-0 rounded-full p-1" style={{ backgroundColor: "rgba(52, 211, 153, 0.15)" }}>
                    <Check className="w-4 h-4" style={{ color: COLORS.emerald }} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-white">{item.us}</span>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Bottom Call to Action area */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-zinc-500 mb-6 font-medium">
              Join 95+ local brands growing with us
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;