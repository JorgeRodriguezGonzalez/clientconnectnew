import React from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

type SavingsCardProps = {
  title?: string;
  badge?: string;
  amount?: string;
  description?: string;
};

export const SavingsCard = ({
  title = 'Savings',
  badge = 'Highest (This month)',
  amount = '$100,000+ Saved for Brands',
  description = 'so they can reinvest where it matters the most'
}: SavingsCardProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-start gap-4 w-[326.6px] h-[380px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[28px] p-6 overflow-hidden" 
      initial={{
        opacity: 0,
        y: 20
      }} 
      animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} 
      transition={{
        duration: 0.5
      }} 
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
        transition: {
          duration: 0.3
        }
      }}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-300/20 border border-cyan-300/30 rounded-full">
        <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
        <p className="text-[11px] font-medium text-cyan-300 leading-none" style={{
          fontFamily: '"Inter Display", sans-serif',
          letterSpacing: '0.2px'
        }}>
          {badge}
        </p>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[32px] font-light text-white leading-[38px]" style={{
          fontFamily: '"Inter Display", sans-serif',
          letterSpacing: '-1.2px'
        }}>
          {title}
        </h3>
        <div className="w-12 h-0.5 bg-cyan-300/50 rounded-full" />
      </div>

      {/* Chart Area with Gradient Background */}
      <div className="flex-1 w-full relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-300/10 p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_70%)]" />
        
        {/* Simplified visual indicator */}
        <div className="relative h-full flex items-end gap-2">
          {[40, 65, 45, 70, 55, 85, 75].map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-cyan-400/60 to-cyan-300/40 rounded-t-lg"
              initial={{ height: 0 }}
              animate={isInView ? { height: `${height}%` } : { height: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * i,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Amount and Description */}
      <div className="flex flex-col gap-2 w-full">
        <p className="text-[22px] font-medium text-white leading-tight" style={{
          fontFamily: '"Inter Display", sans-serif',
          letterSpacing: '-0.6px'
        }}>
          {amount}
        </p>
        <p className="text-[13px] font-normal text-white/60 leading-[18px]" style={{
          fontFamily: '"Inter Display", sans-serif',
          letterSpacing: '0.1px'
        }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};