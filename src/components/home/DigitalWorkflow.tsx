import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, CheckCircle, Image as ImageIcon, Code as CodeIcon, 
  Pencil, Wifi, Battery, Signal, Send, TrendingUp, Users, DollarSign, MousePointerClick
} from 'lucide-react';

// --- 1. COMPONENTE: WIDGET DE CAMPAÑA (Monitor de ROI) ---
// Antes era FlightBoarding, ahora muestra el progreso de una campaña de marketing.
const CampaignProgressWidget = ({ className = "" }) => {
  const [step, setStep] = useState(1);

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
    <div className={`w-full bg-[#1a1a1a] rounded-[24px] px-4 py-5 shadow-xl border border-[#333333] ${className}`}>
      {/* Top indicator bar */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-1 bg-[#404040] rounded-full" />
      </div>

      {/* Main content row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Icono de Gráfico ascendente (ROI) */}
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
             <TrendingUp width="20" height="20" className="text-green-400" />
          </div>
        </div>
        {/* "ROI" como el destino final */}
        <h2 className="text-xl font-black tracking-tight text-white">ROI <span className="text-green-500 text-sm font-normal ml-1">▲ 124%</span></h2>
      </div>

      {/* Step indicators */}
      <div className="relative mb-5 px-1">
        <div className="h-1 bg-[#505050] rounded-full w-full" />
        {/* Barra de progreso (Verde para dinero/éxito) */}
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full" 
          initial={{ width: "16.67%" }} 
          animate={{ width: step === 3 ? "100%" : step === 2 ? "60%" : "16.67%" }} 
          transition={{ duration: 0.8, ease: "easeInOut" }} 
        />
        
        <div className="relative flex items-center justify-between mt-2 px-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]" />
          <motion.div 
            className="w-2 h-2 rounded-full" 
            initial={{ backgroundColor: "#505050" }} 
            animate={{ backgroundColor: step >= 2 ? "#34d399" : "#505050" }} 
            transition={{ duration: 0.5 }} 
          />
          <motion.div 
            className="w-2 h-2 rounded-full" 
            initial={{ backgroundColor: "#505050" }} 
            animate={{ backgroundColor: step === 3 ? "#34d399" : "#505050" }} 
            transition={{ duration: 0.5 }} 
          />
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center h-8 flex items-center justify-center">
        <motion.p 
          className="text-[#999999] text-xs leading-snug font-medium" 
          key={step} 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          {step === 1 ? "Analyzing market data..." : step === 2 ? <span className="text-emerald-300">Optimizing campaigns...</span> : <span className="text-white">Growth targets hit.</span>}
        </motion.p>
      </div>
    </div>
  );
};

// --- 2. COMPONENTE: CONTENIDO APP MARKETING (Formulario Leads) ---
const MarketingAppContent = () => {
  // Opciones de Marketing
  const initialPreferences = [
    { id: 'leads', label: 'Maximize Lead Gen' }, 
    { id: 'brand', label: 'Boost Brand Authority' }, 
    { id: 'revenue', label: 'Scale Revenue (ROI)' }
  ];
  
  const [preferences] = useState(initialPreferences);
  const [selectedPreference, setSelectedPreference] = useState('leads');
  const [inputValue, setInputValue] = useState('');

  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex flex-col h-full bg-white relative font-sans">
      
      {/* STATUS BAR */}
      <div className="h-[44px] flex items-center justify-between px-6 pt-2 z-20 shrink-0">
        <div className="text-[14px] font-semibold text-gray-900 tracking-wide">{currentTime}</div>
        <div className="flex items-center gap-1.5 text-gray-900">
          <Signal className="w-[16px] h-[16px]" strokeWidth={2.5} />
          <Wifi className="w-[16px] h-[16px]" strokeWidth={2.5} />
          <Battery className="w-[22px] h-[16px]" strokeWidth={2.5} />
        </div>
      </div>

      {/* CONTENIDO SCROLLABLE */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Header Text: Enfocado a Cliente */}
          <h2 className="text-xl font-medium text-gray-900 leading-snug px-1 mt-2">
            Let's set your growth targets. Where should we focus our energy to scale your business?
          </h2>

          {/* Opciones (Checkboxes) */}
          <div className="space-y-2">
            <AnimatePresence>
              {preferences.map((preference, index) => (
                <motion.button 
                  key={preference.id} 
                  onClick={() => setSelectedPreference(preference.id)} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[1.2rem] transition-all duration-300 ${selectedPreference === preference.id ? 'bg-black text-white shadow-lg scale-[1.02]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  <div className="flex items-center justify-center flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPreference === preference.id ? 'border-white bg-white' : 'border-gray-400'}`}>
                      {selectedPreference === preference.id && (
                        <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                  <span className="text-[15px] font-medium text-left flex-1">{preference.label}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Field: Target Audience */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4, delay: 0.7 }} 
            className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-[1.5rem]"
          >
            <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Target audience (e.g. SaaS Founders)..." 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              className="flex-1 bg-transparent text-gray-900 text-[15px] placeholder:text-gray-400 outline-none border-none" 
            />
            <button className={`flex-shrink-0 p-2 rounded-full transition-all duration-200 ${inputValue.trim() ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'}`}>
              <Send className="w-4 h-4" />
            </button>
          </motion.div>

          {/* WIDGET DE ROI (Insertado aquí) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-2"
          >
            <CampaignProgressWidget />
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Home Indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/90 rounded-full z-30" />
    </div>
  );
};

// --- 3. COMPONENTE: PHONE FRAME (MARCO) ---
const PhoneFrame = () => {
  return (
    <div className="relative w-[390px] h-[800px] bg-gray-900 rounded-[3.5rem] shadow-2xl p-3 border-4 border-gray-800">
       {/* Botones Físicos */}
      <div className="absolute left-[-4px] top-[120px] w-[4px] h-[32px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute left-[-4px] top-[180px] w-[4px] h-[60px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute left-[-4px] top-[250px] w-[4px] h-[60px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute right-[-4px] top-[200px] w-[4px] h-[80px] bg-gray-700 rounded-r-sm"></div>

      {/* Marco Interno */}
      <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden border border-gray-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-3xl z-40 flex items-center justify-center pointer-events-none">
          <div className="absolute right-[25%] w-[10px] h-[10px] bg-[#1a1a1a] rounded-full ring-1 ring-gray-800/50"></div>
        </div>
        <MarketingAppContent />
      </div>
    </div>
  );
};

// --- 4. COMPONENTE PRINCIPAL: ESCENA COMPLETA ---
const DigitalWorkflow = () => {
  const [codeLines, setCodeLines] = useState([]);
  const [uiWidgets, setUiWidgets] = useState([]);

  useEffect(() => {
    // Generador de líneas de código (Backend/Tech Stuff)
    const syntaxColors = ['text-blue-500', 'text-cyan-400', 'text-indigo-400', 'text-sky-300'];
    const snippets = [
      'analytics.track("Conversion")', 
      'const lead = await crm.create()', 
      '<MetaPixel id={PIXEL_ID} />', 
      'if (ad_spend < budget)', 
      'optimize_bidding(strategy)', 
      'export default LandingPage',
      'fetch("https://api.ads.com")'
    ];
    
    const lines = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      text: snippets[Math.floor(Math.random() * snippets.length)],
      color: syntaxColors[Math.floor(Math.random() * syntaxColors.length)],
      top: `${Math.random() * 90}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 3}s`,
    }));
    setCodeLines(lines);

    // Generador de widgets (Resultados de Marketing)
    const widgets = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      type: Math.floor(Math.random() * 4), 
      top: `${15 + Math.random() * 70}%`, 
      delay: `${Math.random() * 6}s`,
      duration: `${5 + Math.random() * 4}s`
    }));
    setUiWidgets(widgets);
  }, []);

  return (
    <div className="relative w-full h-[650px] bg-black overflow-hidden flex flex-col items-center justify-end font-sans selection:bg-black selection:text-white">
      
      {/* --- ZONA 1: TÚNEL IZQUIERDO (Entrada de Código) --- */}
      <div className="absolute left-0 w-1/2 h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-transparent"></div>
        {codeLines.map((line) => (
          <div
            key={line.id}
            className={`absolute left-0 whitespace-nowrap font-mono text-xs md:text-sm ${line.color} opacity-0 blur-[0.5px]`}
            style={{
              top: line.top,
              animation: `codeFlow ${line.duration} linear infinite`,
              animationDelay: line.delay,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* --- ZONA 2: MOCKUP CENTRAL --- */}
      <div className="relative z-20 flex flex-col items-center justify-end transform translate-y-[15%] scale-[0.8] md:scale-[0.85] lg:scale-[0.9] origin-bottom">
        {/* Glow effect sutil */}
        <div className="absolute top-20 inset-0 bg-indigo-500/10 blur-[100px] rounded-full scale-105 animate-pulse"></div>
        <PhoneFrame />
      </div>

      {/* --- ZONA 3: TÚNEL DERECHO (Resultados/Leads) --- */}
      <div className="absolute right-0 w-1/2 h-full z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-[#1e293b] via-[#0f172a] to-transparent opacity-95"></div>
        <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

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
            {/* Widget 0: Lead Captured Notification */}
            {widget.type === 0 && (
              <div className="w-48 h-16 bg-white/10 backdrop-blur-md border-l-4 border-emerald-500 rounded-r-lg p-3 shadow-lg flex flex-col gap-1">
                <div className="flex justify-between items-center">
                   <div className="flex gap-2 items-center">
                     <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><CheckCircle size={12} className="text-emerald-400"/></div>
                     <span className="text-xs text-white font-medium">Lead Acquired</span>
                   </div>
                   <span className="text-[10px] text-gray-400">Just now</span>
                </div>
                <div className="w-24 h-1.5 bg-white/10 rounded ml-8"></div>
              </div>
            )}
            {/* Widget 1: Revenue Chart */}
            {widget.type === 1 && (
              <div className="w-28 h-28 bg-gradient-to-t from-slate-900 to-slate-800 border border-green-500/20 rounded-xl flex flex-col items-center justify-center shadow-xl backdrop-blur-sm rotate-6 p-2 gap-1">
                <BarChart className="text-green-400 w-8 h-8" />
                <span className="text-[10px] text-green-300 font-bold">+240% ROI</span>
              </div>
            )}
            {/* Widget 2: New Client Pill */}
            {widget.type === 2 && (
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/90 border border-blue-500/30 rounded-full shadow-lg">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-white font-medium tracking-wide">New Client Onboarded</span>
              </div>
            )}
            {/* Widget 3: Ad Creative / CTR */}
            {widget.type === 3 && (
              <div className="w-36 h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-2xl -rotate-3 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"><MousePointerClick size={16} className="text-white"/></div>
                  <div className="text-[10px] text-gray-400">CTR</div>
                </div>
                <div className="text-xl font-bold text-white">4.8%</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes codeFlow {
          0% { transform: translateX(-50px) scale(0.8); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.8; }
          100% { transform: translateX(50vw); opacity: 0; }
        }

        @keyframes uiFlow {
          0% { transform: translateX(0) scale(0.8) perspective(500px) rotateY(15deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(50vw) scale(1.1) perspective(500px) rotateY(0deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DigitalWorkflow;