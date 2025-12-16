import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  Calendar, BarChart, CheckCircle, Image as ImageIcon, 
  Code as CodeIcon, Pencil, Wifi, Battery, Signal, Send, 
  TrendingUp, Users, DollarSign, MousePointerClick,
  ChevronLeft, Video, ChevronRight
} from 'lucide-react';

// --- FONTS STYLES & ANIMATIONS ---
const fontStyles = `
  .font-inter {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  density,
  className,
}: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  density?: number;
  className?: string;
}) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    setInit(true);
  }, []);
  const controls = useAnimation();

  const particlesCount = density || 100;
  const generatedParticles = useRef<any[]>([]); 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!init || !canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
            canvas.width = width;
            canvas.height = height;
        }
    });
    resizeObserver.observe(containerRef.current);

    generatedParticles.current = [];
    for (let i = 0; i < particlesCount; i++) {
        generatedParticles.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * ((maxSize || 1) - (minSize || 0.5)) + (minSize || 0.5),
            speedX: (Math.random() - 0.5) * (speed || 1),
            speedY: (Math.random() - 0.5) * (speed || 1),
            opacity: Math.random(),
        });
    }

    let animationId: number;
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        generatedParticles.current.forEach((p) => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = particleColor || "#FFFFFF";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
    };
  }, [init, maxSize, minSize, speed, particleColor, particlesCount]);

  return (
    <motion.div animate={controls} className={className} ref={containerRef}>
      <canvas ref={canvasRef} />
    </motion.div>
  );
};

// --- SUB-COMPONENTS FOR DIGITAL WORKFLOW ---

const CampaignProgressWidget = ({ className = "" }: { className?: string }) => {
  const [step, setStep] = useState(1);
  const [roiValue] = useState(() => Math.floor(Math.random() * (150 - 110) + 110)); 

  useEffect(() => {
    const cycleSteps = () => {
      const timer1 = setTimeout(() => { setStep(2); }, 2000);
      const timer2 = setTimeout(() => { setStep(3); }, 4500);
      const timer3 = setTimeout(() => { setStep(1); }, 10000);
      return [timer1, timer2, timer3];
    };
    const timers = cycleSteps();
    const interval = setInterval(() => {
      setStep(1);
      const newTimers = cycleSteps();
      return () => newTimers.forEach(clearTimeout);
    }, 12000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`w-full bg-[#1a1a1a] rounded-[16px] px-3 py-3 shadow-xl border border-[#333333] ${className}`}>
      <div className="flex items-center justify-center mb-2">
        <div className="w-8 h-1 bg-[#404040] rounded-full" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
             <TrendingUp width="12" height="12" className="text-green-400" />
          </div>
        </div>
        <h2 className="text-[13px] font-black tracking-tight text-white">ROI <span className="text-green-500 text-[10px] font-normal ml-0.5">▲ {roiValue}%</span></h2>
      </div>
      <div className="relative mb-2 px-0.5">
        <div className="h-1 bg-[#505050] rounded-full w-full" />
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full" 
          initial={{ width: "16.67%" }} 
          animate={{ width: step === 3 ? "100%" : step === 2 ? "60%" : "16.67%" }} 
          transition={{ duration: 0.8, ease: "easeInOut" }} 
        />
        <div className="relative flex items-center justify-between mt-1.5 px-0.5">
          <div className="w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_6px_#34d399]" />
          <motion.div className="w-1 h-1 rounded-full" initial={{ backgroundColor: "#505050" }} animate={{ backgroundColor: step >= 2 ? "#34d399" : "#505050" }} transition={{ duration: 0.5 }} />
          <motion.div className="w-1 h-1 rounded-full" initial={{ backgroundColor: "#505050" }} animate={{ backgroundColor: step === 3 ? "#34d399" : "#505050" }} transition={{ duration: 0.5 }} />
        </div>
      </div>
      <div className="text-center h-4 flex items-center justify-center">
        <motion.p className="text-[#999999] text-[9px] leading-snug font-medium" key={step} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {step === 1 ? "Analyzing market data..." : step === 2 ? <span className="text-emerald-300">Optimizing campaigns...</span> : <span className="text-white">Growth targets hit.</span>}
        </motion.p>
      </div>
    </div>
  );
};

// --- MARKETING APP CONTENT ---
type Message = {
    id: string;
    role: 'system' | 'user';
    content: React.ReactNode;
};

const MarketingAppContent = ({ onOptionChange }: { onOptionChange: (id: string) => void }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-1', role: 'system', content: "G'day mate. Where do you want us to focus our energy now?" }
  ]);
  
  const [showOptions, setShowOptions] = useState(true);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages, showOptions]);

  const handleOptionClick = (id: string, label: string) => {
    setShowOptions(false);
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: label }]);
    
    onOptionChange(id);

    setTimeout(() => {
        const sysMsgId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { 
            id: sysMsgId, 
            role: 'system', 
            content: (
                <div className="w-full">
                    <p className="mb-1.5 text-[13px] text-gray-800">On it. Initializing growth protocols:</p>
                    <CampaignProgressWidget />
                </div>
            )
        }]);

        setTimeout(() => {
            setShowOptions(true);
        }, 800);
        
    }, 1200); 
  };

  const options = [
    { id: 'leads', label: 'I need more leads' },
    { id: 'clicks', label: 'Increase Clicks' },
    { id: 'revenue', label: 'Improve Conversion Rate' }
  ];

  return (
    <div className="flex flex-col h-full bg-white relative font-inter overflow-hidden">
      
      {/* --- STATUS BAR --- */}
      <div className="h-[40px] w-full flex items-end justify-between px-6 pb-2 z-50 absolute top-0 text-black font-medium text-[15px]">
          <div className="w-[54px] text-center tracking-tight font-semibold text-[13px]">{currentTime.split(' ')[0]}</div>
          <div className="flex items-center gap-1.5">
             <Signal className="w-[14px] h-[14px] fill-black" strokeWidth={0} />
             <Wifi className="w-[14px] h-[14px]" strokeWidth={2.5} />
             <Battery className="w-[20px] h-[10px] text-black/40 fill-black" strokeWidth={0} />
          </div>
      </div>

      {/* --- NAVIGATION BAR --- */}
      <div className="pt-[40px] pb-2 px-3 bg-[#F5F5F5]/90 backdrop-blur-xl border-b border-gray-300/50 z-40 sticky top-0 flex items-center justify-between">
          <div className="flex items-center text-[#007AFF] -ml-1">
             <ChevronLeft size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
             <div className="w-8 h-8 rounded-full bg-gray-400 mb-0.5 flex items-center justify-center overflow-hidden relative shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500"></div>
                  <span className="relative z-10 text-white text-[10px] font-bold">CC<span className="text-emerald-400">.</span></span>
             </div>
             <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-semibold text-black tracking-tight">Client Connect</span>
                <ChevronRight size={8} className="text-gray-400 mt-0.5" strokeWidth={3} />
             </div>
          </div>
          <div className="flex items-center justify-end text-[#007AFF] pr-1">
             <Video size={18} fill="#007AFF" className="opacity-100" />
          </div>
      </div>

      {/* --- CHAT AREA --- */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 pb-40 bg-white">
        <div className="w-full flex flex-col items-center justify-center py-2 gap-0.5">
            <span className="text-[10px] font-medium text-gray-400">iMessage</span>
            <span className="text-[10px] font-medium text-gray-400">Today {currentTime}</span>
        </div>

        {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const isLast = index === messages.length - 1;

            return (
            <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex w-full flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
                <div 
                    className={`max-w-[78%] px-[12px] py-[6px] text-[13.5px] leading-[1.3] relative
                    ${isUser 
                        ? 'bg-[#007AFF] text-white rounded-[16px] rounded-br-[4px]' 
                        : 'bg-[#E9E9EB] text-black rounded-[16px] rounded-bl-[4px]'
                    }`}
                >
                    {msg.content}
                </div>
                {isUser && isLast && (
                    <span className="text-[9px] font-medium text-gray-400 mt-0.5 mr-1">Delivered</span>
                )}
            </motion.div>
            );
        })}
      </div>

      {/* --- OPTIONS PANEL --- */}
      <div className="absolute bottom-32 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200">
        <AnimatePresence>
            {showOptions && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-3 pt-2 pb-5 flex flex-col gap-1.5 overflow-hidden" 
                >
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Suggested Replies</span>
                    </div>
                    {options.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => handleOptionClick(opt.id, opt.label)}
                            className="w-full text-left bg-white border border-gray-200 shadow-sm hover:bg-gray-50 active:bg-gray-100 active:scale-[0.99] transition-all rounded-xl px-3 py-2.5 text-black text-[12px] flex justify-between items-center"
                        >
                            <span>{opt.label}</span>
                            <Send size={12} className="text-gray-300" />
                        </button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
        
        <div className="w-full h-[20px] flex items-center justify-center bg-transparent pointer-events-none pb-1">
             <div className="w-[120px] h-[4px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
};

// --- PHONE FRAME ---
const PhoneFrame = ({ onOptionChange }: { onOptionChange: (id: string) => void }) => {
  return (
    <div className="relative w-[350px] h-[700px] bg-gray-900 rounded-[3.5rem] shadow-2xl p-3 border-4 border-gray-800">
      <div className="absolute left-[-4px] top-[100px] w-[4px] h-[32px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute left-[-4px] top-[160px] w-[4px] h-[60px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute left-[-4px] top-[230px] w-[4px] h-[60px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute right-[-4px] top-[180px] w-[4px] h-[80px] bg-gray-700 rounded-r-sm"></div>
      <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden border border-gray-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[28px] bg-black rounded-b-2xl z-50 flex items-center justify-center pointer-events-none">
          <div className="absolute right-[25%] w-[8px] h-[8px] bg-[#1a1a1a] rounded-full ring-1 ring-gray-800/50"></div>
        </div>
        <MarketingAppContent onOptionChange={onOptionChange} />
      </div>
    </div>
  );
};

// --- MAIN SUPERHERO COMPONENT ---

type SuperHeroProps = {
  title?: string;
  highlightedText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  images?: string[]; 
};

export const SuperHero = ({
  primaryButtonText = 'Start Scaling',
  secondaryButtonText = 'View Case Studies',
}: SuperHeroProps) => {
  const lampColor = "#06b6d4"; 
  const emeraldColor = "#34d399"; 

  const [isHovered, setIsHovered] = useState(false);

  const radialColorSequence = [
    "radial-gradient(circle at bottom center, #06b6d4, transparent 70%)", 
    "radial-gradient(circle at bottom center, #22d3ee, transparent 70%)", 
    "radial-gradient(circle at bottom center, #06b6d4, transparent 70%)"
  ];

  const [codeLines, setCodeLines] = useState<any[]>([]);
  const [uiWidgets, setUiWidgets] = useState<any[]>([]);

  useEffect(() => {
    const syntaxColors = ['text-blue-500', 'text-cyan-400', 'text-indigo-400', 'text-sky-300'];
    const codeSnippets = ['analytics.track("Conversion")', 'const lead = await crm.create()', '<MetaPixel id={PIXEL_ID} />', 'if (ad_spend < budget)', 'optimize_bidding(strategy)', 'export default LandingPage', 'fetch("https://api.ads.com")'];
    
    const lines = Array.from({ length: 30 }).map((_, i) => { 
      const topPos = Math.random() * 95;
      const isTopLine = topPos < 50; 

      return {
        id: i,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        color: syntaxColors[Math.floor(Math.random() * syntaxColors.length)],
        top: `${topPos}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${4 + Math.random() * 4}s`,
        animationName: isTopLine ? 'codeFlowTop' : 'codeFlow',
      };
    });
    setCodeLines(lines);
  }, []);

  const generateWidgetsData = (mode: string, count: number, burstMode: boolean = false) => {
    return Array.from({ length: count }).map((_, i) => {
        let type = 2; 
        const rand = Math.random();

        if (mode === 'leads') {
            if (rand < 0.8) type = 0; 
            else if (rand < 0.9) type = 2; 
            else type = 3;
        } else if (mode === 'clicks') {
            if (rand < 0.8) type = 3; 
            else if (rand < 0.9) type = 0;
            else type = 1;
        } else if (mode === 'revenue') {
             if (rand < 0.8) type = 1; 
             else if (rand < 0.9) type = 2;
             else type = 0;
        }

        const delay = burstMode ? Math.random() * 1.5 : Math.random() * 6;
        const randomROI = Math.floor(Math.random() * (450 - 150) + 150); 
        const randomCTR = (Math.random() * (9.5 - 2.1) + 2.1).toFixed(1); 

        return {
            id: Math.random().toString(36).substr(2, 9) + Date.now(),
            type: type, 
            top: `${10 + Math.random() * 80}%`, 
            delay: `${delay}s`,
            duration: `${5 + Math.random() * 4}s`,
            roiValue: randomROI,
            ctrValue: randomCTR
        };
    });
  };

  useEffect(() => {
    setUiWidgets(generateWidgetsData('leads', 15, false));
  }, []);

  const handlePhoneOptionChange = (id: string) => {
      const newBurstWidgets = generateWidgetsData(id, 12, true);
      setUiWidgets(prev => [...prev, ...newBurstWidgets]);

      setTimeout(() => {
         setUiWidgets(prev => {
             if (prev.length > 25) {
                 return prev.slice(prev.length - 25);
             }
             return prev;
         });
      }, 8000); 
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-start pt-8 px-0 overflow-hidden pb-0">
      <style>{fontStyles}</style>

       {/* --- FIXED PARALLAX BACKGROUND (FULL SCREEN) --- */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop)',
              backgroundPosition: 'center center' 
            }}
         ></div>
         <div 
            className="absolute inset-0"
            style={{ 
                background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.85) 50%, #050505 100%)'
            }}
         ></div>
      </div>
      
      <div className="relative z-10 w-full flex flex-col items-center">
      
          <div className="absolute inset-x-0 bottom-0 h-[1000px] w-full overflow-hidden pointer-events-none z-[0]">
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{ background: radialColorSequence }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            />
            <Sparkles
              density={800}
              className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
              particleColor="#ffffff" 
              minSize={0.5}
              maxSize={1.5}
            />
          </div>

          <div className="max-w-[1296px] w-full mx-auto relative z-[30] px-6">
            <div className="w-full relative flex items-center justify-center -mb-[32px] overflow-visible transform scale-75 md:scale-100">
              <div className="w-full h-[80px] relative flex items-center justify-center pt-56 overflow-visible">
                
                {/* LIGHT CONTAINER (CLIPPED) */}
                <div className="absolute inset-auto z-30 h-56 w-full translate-y-[0rem] flex items-center justify-center pointer-events-none">
                    <motion.div
                        className="w-[60rem] h-full relative"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    >
                        {/* Right Cone */}
                        <motion.div
                          initial={{ opacity: 0, width: "15rem" }}
                          animate={{ opacity: 0.5, width: "28rem", "--gradient-color": lampColor }} 
                          transition={{ opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" }, width: { delay: 0.2, duration: 1.0, ease: "easeInOut" } }}
                          style={{ 
                              backgroundImage: `conic-gradient(var(--conic-position), var(--gradient-color) 0%, transparent 35%, transparent 100%)`, 
                              "--gradient-color": lampColor 
                          } as any}
                          className="absolute top-0 right-1/2 h-56 overflow-visible w-[28rem] text-white [--conic-position:from_70deg_at_center_top] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"
                        />
                        
                        {/* Left Cone */}
                        <motion.div
                          initial={{ opacity: 0, width: "15rem" }}
                          animate={{ opacity: 0.5, width: "28rem", "--gradient-color": lampColor }}
                          transition={{ opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" }, width: { delay: 0.2, duration: 1.0, ease: "easeInOut" } }}
                          style={{ 
                              backgroundImage: `conic-gradient(var(--conic-position), transparent 0%, transparent 65%, var(--gradient-color) 100%)`, 
                              "--gradient-color": lampColor 
                          } as any}
                          className="absolute top-0 left-1/2 h-56 w-[28rem] text-white [--conic-position:from_290deg_at_center_top] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"
                        />

                        {/* GLOWS */}
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 0.4, backgroundColor: lampColor }} 
                            transition={{ opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" } }} 
                            className="absolute top-0 left-1/2 -translate-x-1/2 h-36 w-[28rem] rounded-full blur-3xl" 
                        />
                        <motion.div 
                            initial={{ opacity: 0, width: "8rem" }} 
                            animate={{ opacity: 0.8, width: "16rem", backgroundColor: lampColor }} 
                            transition={{ opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" }, width: { delay: 0.2, duration: 1.0, ease: "easeInOut" } }} 
                            className="absolute top-0 left-1/2 -translate-x-1/2 h-36 w-64 rounded-full blur-2xl" 
                        />

                    </motion.div>
                </div>
                
                {/* --- CYAN LINE --- */}
                <motion.div 
                    initial={{ opacity: 0, width: "15rem" }} 
                    animate={{ opacity: 1, width: "28rem", backgroundColor: lampColor }} 
                    transition={{ opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" }, width: { delay: 0.2, duration: 1.0, ease: "easeInOut" } }} 
                    className="absolute inset-auto z-50 h-0.5 w-[28rem] -translate-y-[7rem]" 
                />
                
              </div>
            </div>

            <div className="relative z-10 text-center mb-8">
              <motion.h1 
                key="hero-title"
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.7, duration: 1.0, ease: "easeOut" }} 
                className="font-inter font-semibold text-[28px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-1.5px] text-white mb-6"
              >
                We Bring Light <br className="md:hidden" /> to Your <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                  Business Growth
                </span>
              </motion.h1>

              <motion.div 
                key="hero-subtitle"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.9, duration: 1.0, ease: "easeOut" }} 
                className="flex flex-col items-center gap-2 font-inter font-light text-[14px] md:text-[16px] text-gray-400 max-w-3xl mx-auto"
              >
                <p>Stop relying on guesswork. We act as your entire growth engine.</p>
                <p className="text-gray-300">
                  Combining <span className="text-emerald-400 font-semibold">Paid Media</span>, <span className="text-emerald-400 font-semibold">Creative Strategy</span>, and <span className="text-emerald-400 font-semibold">CRO</span> to maximize ROI.
                </p>
              </motion.div>

              <motion.div 
                key="hero-buttons"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 1.1, duration: 1.0, ease: "easeOut" }} 
                className="mt-8"
              >
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <motion.a href="#contact" className="flex items-center justify-center gap-1.5 h-[48px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-[50px] px-6 py-3 transition-[background-color,box-shadow] duration-300 cursor-pointer w-full sm:w-auto relative z-[100]" whileHover={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)', transition: { duration: 0.2 } }}>
                    <p className="font-inter font-semibold text-[15px] text-white whitespace-nowrap">{secondaryButtonText}</p>
                  </motion.a>
                  <motion.a 
                    href="#contact" 
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="flex items-center justify-center gap-1.5 h-[48px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-[50px] px-6 py-3 transition-[background-color,box-shadow] duration-300 cursor-pointer w-full sm:w-auto relative z-[100]" 
                    style={{ border: `1px solid ${isHovered ? emeraldColor : lampColor}` }} 
                    whileHover={{ boxShadow: `0 0 20px rgba(52, 211, 153, 0.5)`, transition: { duration: 0.2 } }}
                  >
                    <div className="w-[18px] h-[14px] relative overflow-hidden" style={{ color: isHovered ? emeraldColor : lampColor }}><Calendar className="w-[17px] h-[14px]" /></div>
                    <p className="font-inter font-semibold text-[15px] whitespace-nowrap z-[1]" style={{ color: isHovered ? emeraldColor : lampColor }}>{primaryButtonText}</p>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- WORKFLOW CONTAINER --- */}
          <div className="w-full relative h-[720px] flex justify-center items-end overflow-hidden z-[10] mt-8">
            
            <div className="absolute left-0 w-1/2 h-full z-[10] overflow-hidden">
               {/* 
                  MODIFICADO IZQUIERDA: 
                  - Radial más ancho (transparent 60%)
                  - MASK IMAGE añadida al contenedor para desvanecer el borde superior (igual que en la derecha)
               */}
              <div 
                className="absolute inset-0" 
                style={{ 
                    background: 'radial-gradient(circle at 100% 0%, transparent 60%, #000000 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent, black 40%)'
                }}
              ></div>

              {codeLines.map((line) => (
                <div
                  key={line.id}
                  className={`absolute left-0 whitespace-nowrap font-mono text-xs md:text-sm ${line.color} opacity-0 blur-[0.5px]`}
                  style={{
                    top: line.top,
                    animation: `${line.animationName} ${line.duration} linear infinite`, 
                    animationDelay: line.delay,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>

            <div className="relative z-[20] flex flex-col items-center justify-end">
              <div className="absolute top-20 inset-0 bg-indigo-500/10 blur-[100px] rounded-full scale-105 animate-pulse"></div>
              
              <motion.div
                initial={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              >
                  <PhoneFrame onOptionChange={handlePhoneOptionChange} />
              </motion.div>
            </div>

            <div className="absolute right-0 w-1/2 h-full z-[10] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-[#1e293b]/50 to-transparent" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}></div>
              
               {/* MODIFICADO DERECHA (MANTENIDO): Grid con máscara */}
              <div 
                  className="absolute inset-0 opacity-15 mix-blend-overlay" 
                  style={{ 
                      backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', 
                      backgroundSize: '40px 40px',
                      maskImage: 'linear-gradient(135deg, transparent 0%, black 100%)'
                  }}
              ></div>
              
              {uiWidgets.map((widget) => (
                <div
                  key={widget.id}
                  className="absolute opacity-0"
                  style={{
                    top: widget.top,
                    left: '0%', 
                    animation: `uiFlow ${widget.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                    animationDelay: widget.delay,
                  }}
                >
                  {widget.type === 0 && (
                    <div className="w-48 h-16 bg-white/10 backdrop-blur-md border-l-4 border-emerald-500 rounded-r-lg p-3 shadow-lg flex flex-col gap-1">
                      <div className="flex justify-between items-center"><div className="flex gap-2 items-center"><div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><CheckCircle size={12} className="text-emerald-400"/></div><span className="text-xs text-white font-medium">Lead Acquired</span></div><span className="text-[10px] text-gray-400">Just now</span></div><div className="w-24 h-1.5 bg-white/10 rounded ml-8"></div>
                    </div>
                  )}
                  {widget.type === 1 && (
                    <div className="w-28 h-28 bg-gradient-to-t from-slate-900 to-slate-800 border border-green-500/20 rounded-xl flex flex-col items-center justify-center shadow-xl backdrop-blur-sm rotate-6 p-2 gap-1">
                      <BarChart className="text-green-400 w-8 h-8" /><span className="text-[10px] text-green-300 font-bold">+{widget.roiValue}% ROI</span>
                    </div>
                  )}
                  {widget.type === 2 && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/90 border border-blue-500/30 rounded-full shadow-lg">
                      <Users className="w-4 h-4 text-blue-400" /><span className="text-xs text-white font-medium tracking-wide">New Client Onboarded</span>
                    </div>
                  )}
                  {widget.type === 3 && (
                    <div className="w-36 h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-2xl -rotate-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start"><div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"><MousePointerClick size={16} className="text-white"/></div><div className="text-[10px] text-gray-400">CTR</div></div><div className="text-xl font-bold text-white">{widget.ctrValue}%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};