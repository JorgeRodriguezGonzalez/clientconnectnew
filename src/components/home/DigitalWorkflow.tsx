import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, CheckCircle, Image as ImageIcon, Code as CodeIcon } from 'lucide-react';

// --- COMPONENTE 1: FLIGHT BOARDING PROGRESS ---
const FlightBoardingProgress = ({ className = "" }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const cycleSteps = () => {
      const timer1 = setTimeout(() => { setStep(2); }, 2000);
      const timer2 = setTimeout(() => { setStep(3); }, 4000);
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
    <div className={`w-full max-w-[500px] bg-[#1a1a1a]/90 backdrop-blur-md rounded-[32px] px-5 py-6 shadow-2xl border border-[#333333] ${className}`}>
      {/* Top indicator bar */}
      <div className="flex items-center justify-center mb-5">
        <div className="w-16 h-1 bg-[#404040] rounded-full" />
      </div>

      {/* Main content row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Plane icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white -rotate-45">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-black tracking-tight text-white">BUD</h2>
      </div>

      {/* Step indicators */}
      <div className="relative mb-6 px-1">
        <div className="h-1.5 bg-[#505050] rounded-full w-full" />
        <motion.div 
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-[#e879f9] to-[#f472b6] rounded-full" 
          initial={{ width: "16.67%" }} 
          animate={{ width: step === 3 ? "100%" : step === 2 ? "50%" : "16.67%" }} 
          transition={{ duration: 0.8, ease: "easeInOut" }} 
        />
        
        <div className="relative flex items-center justify-between mt-2 px-1">
          <div className="w-2 h-2 bg-[#e879f9] rounded-full shadow-[0_0_10px_#e879f9]" />
          <motion.div 
            className="w-2 h-2 rounded-full" 
            initial={{ backgroundColor: "#505050" }} 
            animate={{ backgroundColor: step >= 2 ? "#e879f9" : "#505050" }} 
            transition={{ duration: 0.5 }} 
          />
          <motion.div 
            className="w-2 h-2 rounded-full" 
            initial={{ backgroundColor: "#505050" }} 
            animate={{ backgroundColor: step === 3 ? "#e879f9" : "#505050" }} 
            transition={{ duration: 0.5 }} 
          />
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center h-10 flex items-center justify-center">
        <motion.p 
          className="text-[#999999] text-sm leading-snug font-medium" 
          key={step} 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          {step === 1 ? (
            <span>Processing boarding data...</span>
          ) : step === 2 ? (
            <span className="text-pink-400">Boarding in progress...</span>
          ) : (
            <span className="text-green-400">Arrived safely in Budapest.</span>
          )}
        </motion.p>
      </div>
    </div>
  );
};

// --- COMPONENTE 2: PHONE MOCKUP FRAME ---
const PhoneFrame = () => {
  return (
    <div className="relative w-[380px] h-[780px] bg-black rounded-[55px] shadow-2xl p-3 border-4 border-gray-800">
      {/* Inner bezel */}
      <div className="relative w-full h-full bg-black rounded-[45px] overflow-hidden border border-gray-800">
        {/* Screen with gradient wallpaper */}
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-black relative overflow-hidden flex flex-col">
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
          
          {/* Status Bar Fake */}
          <div className="w-full h-14 flex justify-between items-end px-6 pb-2 text-white text-xs font-medium z-20">
            <span>9:41</span>
            <div className="flex gap-1">
               <div className="w-4 h-2.5 border border-white rounded-[2px] relative"><div className="absolute inset-0.5 bg-white"></div></div>
            </div>
          </div>

          {/* Dynamic Island / Notch Area */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-30"></div>

          {/* App Container */}
          <div className="flex-1 flex items-center justify-center p-4 z-10">
            <FlightBoardingProgress className="" />
          </div>

          {/* Bottom Home Indicator */}
          <div className="w-full h-8 flex justify-center items-center z-20 pb-2">
            <div className="w-32 h-1.5 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="absolute left-[-4px] top-[150px] w-[4px] h-[35px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute left-[-4px] top-[200px] w-[4px] h-[60px] bg-gray-700 rounded-l-sm"></div>
      <div className="absolute right-[-4px] top-[180px] w-[4px] h-[80px] bg-gray-700 rounded-r-sm"></div>
    </div>
  );
};


// --- COMPONENTE 3 (PRINCIPAL): ESCENA COMPLETA ---
const DigitalWorkflow = () => {
  const [codeLines, setCodeLines] = useState([]);
  const [uiWidgets, setUiWidgets] = useState([]);

  useEffect(() => {
    // Generador de líneas de código
    const syntaxColors = ['text-blue-500', 'text-cyan-400', 'text-indigo-400', 'text-sky-300'];
    const snippets = [
      'import { Flight } from "@api/types"', 
      'const boarding = await checkIn()', 
      '<BoardingPass user={id} />', 
      'if (status === "DELAYED")', 
      'animate(progress, 100)', 
      'export default FlightWidget',
      'fetch("https://api.flights.com")'
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

    // Generador de widgets
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
    <div className="relative w-full h-[600px] bg-black overflow-hidden flex flex-col items-center justify-end font-sans selection:bg-pink-500 selection:text-white">
      
      {/* --- ZONA 1: TÚNEL IZQUIERDO (Entrada de Código) --- */}
      <div className="absolute left-0 w-1/2 h-full z-0 overflow-hidden">
        {/* Gradiente original oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-transparent"></div>
        {/* Código */}
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

      {/* --- ZONA 2: MOCKUP CENTRAL (MODIFICADO) --- */}
      {/* Ajustes: items-end en el padre (arriba), translate-y para bajarlo, scale aumentado */}
      <div className="relative z-20 flex flex-col items-center justify-end transform translate-y-[15%] scale-[0.7] md:scale-[0.85] lg:scale-[0.9] origin-bottom">
        {/* Glow effect detrás del teléfono */}
        <div className="absolute top-10 inset-0 bg-indigo-600/20 blur-[120px] rounded-full scale-110 animate-pulse"></div>
        
        {/* El Teléfono */}
        <PhoneFrame />
      </div>

      {/* --- ZONA 3: TÚNEL DERECHO (Salida de UI) (MODIFICADO) --- */}
      <div className="absolute right-0 w-1/2 h-full z-10 overflow-hidden pointer-events-none">
        
        {/* BACKGROUND MODIFICADO: Más claro y azulado a la derecha */}
        {/* 'from-slate-800' es mucho más claro que el negro original */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#1e293b] via-[#0f172a] to-transparent opacity-90"></div>

        {/* Grid tecnológico */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay" 
             style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Widgets flotantes */}
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
            {/* Widgets Types (mismo contenido) */}
            {widget.type === 0 && (
              <div className="w-40 h-16 bg-white/10 backdrop-blur-md border-l-4 border-pink-500 rounded-r-lg p-3 shadow-lg flex flex-col gap-2">
                <div className="flex justify-between items-center">
                   <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center"><CodeIcon size={14} className="text-pink-400"/></div>
                   <div className="w-16 h-2 bg-white/20 rounded"></div>
                </div>
              </div>
            )}
            {widget.type === 1 && (
              <div className="w-24 h-24 bg-gradient-to-t from-indigo-800 to-slate-700 border border-indigo-500/30 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-sm rotate-6">
                <BarChart className="text-indigo-300 w-8 h-8" />
              </div>
            )}
            {widget.type === 2 && (
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/80 border border-slate-500 rounded-full shadow-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-xs text-slate-100 font-medium tracking-wide">Boarding Complete</span>
              </div>
            )}
            {widget.type === 3 && (
              <div className="w-32 h-20 bg-slate-800 border border-slate-600 rounded-lg p-2 shadow-2xl -rotate-3 overflow-hidden">
                <div className="w-full h-full bg-slate-700/50 rounded flex items-center justify-center relative">
                   <ImageIcon className="text-slate-400 w-6 h-6" />
                   <div className="absolute bottom-1 left-2 w-10 h-1 bg-slate-500 rounded"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Estilos para keyframes */}
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