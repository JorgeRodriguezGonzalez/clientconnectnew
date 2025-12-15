import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Calendar, BarChart, CheckCircle, Wifi, Battery, Signal, 
  TrendingUp, Users, MousePointerClick 
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

    let animationId: number;
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
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [init, density, maxSize, minSize, speed, particleColor]);

  return <div className={className} ref={containerRef}><canvas ref={canvasRef} /></div>;
};

// --- WIDGET ---
const CampaignProgressWidget = ({ className = "" }: { className?: string }) => {
  const [step, setStep] = useState(1);
  const [roiValue] = useState(() => Math.floor(Math.random() * (150 - 110) + 110)); 

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2000);
    const timer2 = setTimeout(() => setStep(3), 4500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <div className={`w-full bg-[#1a1a1a] rounded-[18px] px-4 py-4 shadow-xl border border-[#333333] ${className}`}>
      <div className="flex items-center justify-center mb-3"><div className="w-10 h-1 bg-[#404040] rounded-full" /></div>
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
          <TrendingUp width="16" height="16" className="text-green-400" />
        </div>
        <h2 className="text-lg font-black text-white">ROI <span className="text-green-500 text-xs font-normal ml-1">▲ {roiValue}%</span></h2>
      </div>
      <div className="relative mb-4 px-1">
        <div className="h-1 bg-[#505050] rounded-full w-full" />
        <motion.div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full" animate={{ width: step === 3 ? "100%" : step === 2 ? "60%" : "16.67%" }} />
      </div>
      <div className="text-center h-6 flex items-center justify-center">
        <p className="text-[#999999] text-[10px] font-medium">
          {step === 1 ? "Analyzing market data..." : step === 2 ? "Optimizing campaigns..." : "Growth targets hit."}
        </p>
      </div>
    </div>
  );
};

// --- MARKING APP CONTENT ---
const MarketingAppContent = ({ onOptionChange }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([{ id: '1', role: 'system', content: "G'day mate. Where do you want us to focus our energy now?" }]);
  const [showOptions, setShowOptions] = useState(true);

  useEffect(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, showOptions]);

  const handleOptionClick = (id: string, label: string) => {
    setShowOptions(false);
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: label }]);
    onOptionChange(id);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, role: 'system', content: <div><p className="mb-2 text-sm">On it. Initializing protocols:</p><CampaignProgressWidget /></div> }]);
      setTimeout(() => setShowOptions(true), 800);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white relative font-sans overflow-hidden">
      <div className="h-[44px] flex items-center justify-between px-6 pt-3 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="text-[14px] font-semibold text-gray-900">10:12</div>
        <div className="flex items-center gap-1.5 text-gray-900"><Signal size={16}/><Wifi size={16}/><Battery size={20}/></div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 text-[15px] shadow-sm ${msg.role === 'user' ? 'bg-[#007AFF] text-white rounded-[20px] rounded-br-[2px]' : 'bg-[#E9E9EB] text-black rounded-[20px] rounded-bl-[2px]'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className="absolute bottom-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-gray-200">
        <AnimatePresence>
          {showOptions && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pt-2 pb-6 flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-1">Suggested Replies</span>
              {[{id:'leads',l:'I need more leads'},{id:'clicks',l:'Increase Clicks'},{id:'revenue',l:'Improve Conversion Rate'}].map(o => (
                <button key={o.id} onClick={() => handleOptionClick(o.id, o.l)} className="w-full text-left bg-gray-100 rounded-xl px-4 py-2.5 text-[#007AFF] text-[14px] font-medium">{o.l}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full h-[20px] flex items-center justify-center"><div className="w-[130px] h-[5px] bg-black/90 rounded-full" /></div>
      </div>
    </div>
  );
};

// --- PHONE FRAME ---
const PhoneFrame = ({ onOptionChange }: any) => (
  <div className="relative w-[390px] h-[680px] bg-gray-900 rounded-[3.5rem] shadow-2xl p-3 border-4 border-gray-800">
    <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden border border-gray-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[28px] bg-black rounded-b-2xl z-40" />
      <MarketingAppContent onOptionChange={onOptionChange} />
    </div>
  </div>
);

// --- MAIN SUPERHERO ---
export const SuperHero = () => {
  const lampColor = "#06b6d4";
  const [uiWidgets, setUiWidgets] = useState<any[]>([]);

  const handlePhoneOptionChange = (id: string) => {
    const widgets = Array.from({ length: 10 }).map(() => ({
      id: Math.random(), top: `${Math.random() * 80}%`, duration: 5 + Math.random() * 3, type: Math.floor(Math.random()*4)
    }));
    setUiWidgets(widgets);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center pt-56 overflow-hidden relative font-inter">
      <style>{fontStyles}</style>
      <Sparkles density={800} className="absolute inset-0 pointer-events-none" particleColor="#ffffff" minSize={0.5} maxSize={1.5} />
      
      {/* Lamp Section */}
      <div className="max-w-[1296px] w-full text-center relative z-30 px-6">
        <div className="flex justify-center -mb-8 transform scale-75 md:scale-100">
          <div className="relative pt-56">
            <motion.div initial={{ opacity: 0, width: "15rem" }} animate={{ opacity: 1, width: "30rem" }} className="absolute right-1/2 h-56 top-0" style={{ backgroundImage: `conic-gradient(from 70deg at center top, ${lampColor}, transparent 50%)` }} />
            <motion.div initial={{ opacity: 0, width: "15rem" }} animate={{ opacity: 1, width: "30rem" }} className="absolute left-1/2 h-56 top-0" style={{ backgroundImage: `conic-gradient(from 290deg at center top, transparent 50%, ${lampColor})` }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 h-36 w-[28rem] rounded-full blur-3xl bg-cyan-500/20" />
          </div>
        </div>

        <motion.h1 className="text-[28px] md:text-[48px] font-semibold text-white mb-6 leading-[1.1] tracking-tighter">
          We Bring Light to Your <br/><span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">Business Growth</span>
        </motion.h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm md:text-base font-light">
          Stop relying on guesswork. Combining <span className="text-emerald-400 font-medium">Paid Media</span> and <span className="text-emerald-400 font-medium">CRO</span> to maximize ROI.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-sm">View Case Studies</button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-cyan-500 rounded-full text-cyan-400 font-semibold text-sm flex items-center gap-2">
            <Calendar size={16}/> Start Scaling
          </button>
        </div>
      </div>

      {/* --- WORKFLOW SECTION: ALTURA EXACTA AL TELÉFONO (680px) --- */}
      <div className="w-full relative h-[680px] flex justify-center mt-8 overflow-hidden">
        {/* Lado izquierdo y derecho de fondo (código/widgets) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        {/* Teléfono pegado al fondo */}
        <div className="relative z-20 flex flex-col items-center justify-end">
          <PhoneFrame onOptionChange={handlePhoneOptionChange} />
        </div>

        {/* Floating UI Widgets */}
        {uiWidgets.map((w) => (
          <div key={w.id} className="absolute right-0 opacity-0" style={{ top: w.top, animation: `uiFlow ${w.duration}s infinite` }}>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/10 text-[10px] text-white">
              {w.type === 0 ? "Lead +1" : w.type === 1 ? "ROI +240%" : "Sale Created"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};