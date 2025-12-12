import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Calendar, BarChart, CheckCircle, Image as ImageIcon, 
  Code as CodeIcon, Pencil, Wifi, Battery, Signal, Send, 
  TrendingUp, Users, DollarSign, MousePointerClick 
} from 'lucide-react';

// --- FONTS STYLES & ANIMATIONS ---
const fontStyles = `
  .font-inter {
    font-family: 'Satoshi', sans-serif;
  }
  
  @keyframes codeFlow {
    0% { transform: translateX(-50px) scale(0.8); opacity: 0; }
    10% { opacity: 0.6; }
    80% { opacity: 0.8; }
    100% { transform: translateX(50vw); opacity: 0; }
  }

  @keyframes codeFlowTop {
    0% { transform: translateX(-50px) scale(0.8); opacity: 0; }
    10% { opacity: 0.4; }
    40% { opacity: 0; } 
    100% { transform: translateX(30vw); opacity: 0; }
  }

  @keyframes uiFlow {
    0% { transform: translateX(0) scale(0.8) perspective(500px) rotateY(15deg); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateX(50vw) scale(1.1) perspective(500px) rotateY(0deg); opacity: 0; }
  }
`;

// --- SPARKLES COMPONENT ---
const Sparkles = ({
  density,
  className,
  particleColor,
  minSize,
  maxSize,
  speed,
}: any) => {
  const [init, setInit] = useState(false);
  useEffect(() => setInit(true), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedParticles = useRef<any[]>([]);

  useEffect(() => {
    if (!init || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    canvas.width = width;
    canvas.height = height;

    generatedParticles.current = Array.from({ length: density || 100 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * ((maxSize || 1) - (minSize || 0.5)) + (minSize || 0.5),
      speedX: (Math.random() - 0.5) * (speed || 1),
      speedY: (Math.random() - 0.5) * (speed || 1),
      opacity: Math.random(),
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      generatedParticles.current.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = particleColor || "#FFFFFF";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [init, density, maxSize, minSize, speed, particleColor]);

  return <div className={className} ref={containerRef}><canvas ref={canvasRef} /></div>;
};

// --- SUB-COMPONENTS ---

const CampaignProgressWidget = ({ className = "" }: { className?: string }) => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev % 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full bg-[#1a1a1a] rounded-[24px] px-4 py-5 shadow-xl border border-[#333333] ${className}`}>
      <div className="flex items-center justify-center mb-4"><div className="w-12 h-1 bg-[#404040] rounded-full" /></div>
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20"><TrendingUp width="20" height="20" className="text-green-400" /></div>
        <h2 className="text-xl font-black tracking-tight text-white">ROI <span className="text-green-500 text-sm font-normal ml-1">▲ 124%</span></h2>
      </div>
      <div className="relative mb-5 px-1">
        <div className="h-1 bg-[#505050] rounded-full w-full" />
        <motion.div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full" animate={{ width: step === 3 ? "100%" : step === 2 ? "60%" : "16.67%" }} />
        <div className="relative flex items-center justify-between mt-2 px-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]" />
          <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-emerald-400' : 'bg-[#505050]'}`} />
          <div className={`w-2 h-2 rounded-full ${step === 3 ? 'bg-emerald-400' : 'bg-[#505050]'}`} />
        </div>
      </div>
    </div>
  );
};

const MarketingAppContent = () => {
  const initialPreferences = [{ id: 'leads', label: 'Maximize Lead Gen' }, { id: 'brand', label: 'Boost Brand Authority' }, { id: 'revenue', label: 'Scale Revenue (ROI)' }];
  const [selectedPreference, setSelectedPreference] = useState('leads');

  return (
    <div className="flex flex-col h-full bg-white relative font-sans pt-12">
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-2">
        {/* Espacio AUMENTADO entre texto y opciones (gap-6) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col gap-6">
          {/* Texto de 2 líneas */}
          <h2 className="text-[17px] font-medium text-gray-900 leading-tight px-1">
            Let's set your growth targets. Where should we focus our energy?
          </h2>
          
          <div className="space-y-2">
            {initialPreferences.map((preference) => (
              <button key={preference.id} onClick={() => setSelectedPreference(preference.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-[1.2rem] transition-all ${selectedPreference === preference.id ? 'bg-black text-white shadow-lg scale-[1.02]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPreference === preference.id ? 'border-white bg-white' : 'border-gray-400'}`}>
                  {selectedPreference === preference.id && <div className="w-2 h-2 bg-black rounded-full" />}
                </div>
                <span className="text-[15px] font-medium text-left flex-1">{preference.label}</span>
              </button>
            ))}
          </div>
          
          {/* Widget negro de progreso movido hacia arriba (ya no hay input field) */}
          <CampaignProgressWidget />
        </motion.div>
      </div>
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/90 rounded-full" />
    </div>
  );
};

const PhoneFrame = () => (
  <div className="relative w-[390px] h-[800px] bg-gray-900 rounded-[3.5rem] shadow-2xl p-3 border-4 border-gray-800">
    <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden border border-gray-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-3xl z-40 flex items-center justify-center">
        <div className="absolute right-[25%] w-[10px] h-[10px] bg-[#1a1a1a] rounded-full" />
      </div>
      <MarketingAppContent />
    </div>
  </div>
);

// --- MAIN SUPERHERO ---

export const SuperHero = ({ primaryButtonText = 'Start Scaling', secondaryButtonText = 'View Case Studies' }: any) => {
  const [codeLines, setCodeLines] = useState<any[]>([]);
  const [uiWidgets, setUiWidgets] = useState<any[]>([]);

  useEffect(() => {
    const codeSnippets = ['analytics.track("Conversion")', 'const lead = await crm.create()', '<MetaPixel id={PIXEL_ID} />', 'if (ad_spend < budget)', 'optimize_bidding(strategy)', 'export default LandingPage'];
    setCodeLines(Array.from({ length: 25 }).map((_, i) => {
      const topPos = Math.random() * 90;
      return { id: i, text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)], color: 'text-cyan-400', top: `${topPos}%`, delay: `${Math.random() * 5}s`, duration: `${3 + Math.random() * 3}s`, animationName: topPos < 45 ? 'codeFlowTop' : 'codeFlow' };
    }));
    setUiWidgets(Array.from({ length: 12 }).map((_, i) => ({ id: i, type: Math.floor(Math.random() * 4), top: `${15 + Math.random() * 70}%`, delay: `${Math.random() * 6}s`, duration: `${5 + Math.random() * 4}s` })));
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-black via-[#050505] to-[#1e293b] flex flex-col items-center justify-start pt-16 px-0 overflow-hidden relative">
      <style>{fontStyles}</style>
      <Sparkles density={800} className="absolute inset-x-0 -bottom-48 h-[1000px] w-full pointer-events-none z-[0] opacity-30" particleColor="#ffffff" minSize={0.5} maxSize={1.5} />

      <div className="max-w-[1296px] w-full mx-auto relative z-[30] px-6">
        
        {/* LAMP AREA (RESTAURADA ORIGINALMENTE) */}
        <div className="relative flex w-full flex-1 items-center justify-center isolate z-0 transform scale-75 md:scale-100">
          {/* Luz Izquierda */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundImage: `conic-gradient(from 70deg at center top, #06b6d4, transparent, transparent)` }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white"
          >
            <div className="absolute w-[100%] left-0 bg-[#050505] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-[100%] left-0 bg-[#050505] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Luz Derecha */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, #06b6d4)` }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white"
          >
            <div className="absolute w-40 h-[100%] right-0 bg-[#050505] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-[100%] right-0 bg-[#050505] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Efectos de fondo lamp */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#050505] blur-2xl"></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
          <motion.div initial={{ width: "8rem" }} whileInView={{ width: "16rem" }} transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }} className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl" />
          <motion.div initial={{ width: "15rem" }} whileInView={{ width: "30rem" }} transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }} className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400" />
          
          {/* BLOQUEADOR SUPERIOR (Evita cyan arriba de la linea) */}
          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#050505]" />
        </div>

        {/* HEADER TEXT */}
        <div className="relative z-10 text-center -mt-20">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-inter font-semibold text-[28px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-1.5px] text-white mb-4">
            We Bring Light <br className="md:hidden" /> to Your Business Growth
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-gray-400 text-[14px] md:text-[16px] max-w-xl mx-auto mb-8">
            Stop relying on guesswork. Act as your entire growth engine combining Paid Media and CRO to maximize ROI.
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#case" className="h-[48px] bg-white/10 border border-white/20 rounded-full px-6 flex items-center text-white text-[15px] font-semibold">{secondaryButtonText}</a>
            <a href="#scale" className="h-[48px] border border-cyan-500 rounded-full px-6 flex items-center text-cyan-400 text-[15px] font-semibold gap-2"><Calendar size={18}/>{primaryButtonText}</a>
          </div>
        </div>
      </div>

      {/* --- DIGITAL WORKFLOW AREA --- */}
      <div className="w-full relative h-[650px] flex justify-center overflow-hidden z-[10] -mt-24">
        {/* Left Tunnel */}
        <div className="absolute left-0 w-1/2 h-full z-[10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
          {codeLines.map((line) => (
            <div key={line.id} className={`absolute left-0 whitespace-nowrap font-mono text-xs ${line.color} opacity-0 blur-[0.5px]`} style={{ top: line.top, animation: `${line.animationName} ${line.duration} linear infinite`, animationDelay: line.delay }}>{line.text}</div>
          ))}
        </div>

        {/* Center Phone */}
        <div className="relative z-[20] flex flex-col items-center justify-end transform translate-y-[15%] scale-[0.8] md:scale-[0.85] lg:scale-[0.9] origin-bottom">
          <div className="absolute top-20 inset-0 bg-indigo-500/10 blur-[100px] rounded-full scale-105 animate-pulse" />
          <PhoneFrame />
        </div>

        {/* Right Tunnel */}
        <div className="absolute right-0 w-1/2 h-full z-[10] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-[#1e293b]/50 to-transparent" />
          {uiWidgets.map((widget) => (
            <div key={widget.id} className="absolute opacity-0" style={{ top: widget.top, left: '0%', animation: `uiFlow ${widget.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`, animationDelay: widget.delay }}>
              {widget.type === 0 ? <div className="w-40 h-16 bg-white/10 backdrop-blur-md border-l-4 border-emerald-500 rounded-r-lg p-3 shadow-lg flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400"/><span className="text-xs text-white">Lead Acquired</span></div> : <div className="w-24 h-24 bg-slate-800/80 border border-slate-600 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-sm"><BarChart className="text-cyan-400 w-8 h-8" /></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};