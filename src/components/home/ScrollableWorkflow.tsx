import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// Types
type Step = {
  id: number;
  title: string;
  description: string;
  videoSrc: string;
};

// Data
const steps: Step[] = [{
  id: 1,
  title: "01. Connect Your Providers",
  description: "Plug in LLMs (like GPT or Gemini), voice engines (like ElevenLabs), and speech-to-text tools (like Deepgram). Breez works with all of them.",
  videoSrc: "https://framerusercontent.com/assets/vYqmjipjjeLG5HeZvmQo9R9Y0Q.webm"
}, {
  id: 2,
  title: "02. Design Your Workflow",
  description: "Create custom flows for your agents to follow, ensuring they handle every conversation exactly how you want. Drag and drop nodes to build complex logic effortlessly.",
  videoSrc: "https://framerusercontent.com/assets/9ZKSz7Ff4NGTGCYLeiZCgz9n1o0.webm"
}, {
  id: 3,
  title: "03. Set Agent Roles & Logic",
  description: "Define specific roles, personalities, and rules for your agents to ensure they represent your brand perfectly and handle edge cases with grace.",
  videoSrc: "https://framerusercontent.com/assets/qNHosSqvIXrIaPw9rEqQZWzbW1I.webm"
}, {
  id: 4,
  title: "04. Launch Instantly",
  description: "Deploy your agents with a single click and start handling calls immediately with zero downtime. Monitor performance and iterate in real-time.",
  videoSrc: "https://framerusercontent.com/assets/uIwRT43wDj5VOWkR1J65FV9GnU.webm"
}];

// Constants
const GRADIENT_TEXT_STYLE = {
  background: 'linear-gradient(258deg, rgb(143, 51, 22) -94%, rgb(255, 255, 255) 95%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
};

// @component: ScrollableWorkflow
export const ScrollableWorkflow = () => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Control del Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Actualizar el paso activo según el porcentaje de scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Dividimos el scroll en 4 segmentos (0-0.25, 0.25-0.5, etc.)
    const stepIndex = Math.floor(latest * steps.length);
    // Aseguramos que el índice esté dentro de los límites (1 a 4)
    const newStepId = Math.min(Math.max(stepIndex + 1, 1), steps.length);
    
    if (newStepId !== activeStepId) {
      setActiveStepId(newStepId);
    }
  });

  // Preload videos
  useEffect(() => {
    steps.forEach(step => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = step.videoSrc;
      document.head.appendChild(link);
    });
  }, []);

  // Obtenemos el objeto del paso actual
  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    // CONTENEDOR PRINCIPAL: Muy alto (400vh) para permitir scroll
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      
      {/* CONTENEDOR STICKY: Se queda fijo en pantalla mientras scrolleas el contenedor principal */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-10">
        
        {/* Header Fijo */}
        <div className="absolute top-10 w-full text-center z-20">
          <h2 className="text-4xl md:text-[56px] leading-tight font-medium tracking-tight text-white">
            <span style={GRADIENT_TEXT_STYLE} className="inline-block py-2">
              How Breez Works
            </span>
          </h2>
        </div>

        {/* Área de Contenido Central */}
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mt-20">
          
          {/* IZQUIERDA: Texto Cambiante */}
          <div className="w-full lg:w-[500px] flex flex-col justify-center min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                <h3 className="text-3xl md:text-4xl font-medium leading-tight text-white">
                  {activeStep.title}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-white/70 font-medium">
                  {activeStep.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Indicadores de progreso (opcional, puntos visuales) */}
            <div className="flex gap-3 mt-8">
              {steps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                     // Nota: El scroll controla el estado, hacer click aquí requeriría 
                     // lógica compleja de scrollTo, así que lo dejamos solo visual o 
                     // como indicador pasivo.
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s.id === activeStepId ? "w-8 bg-white" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DERECHA: Video Cambiante */}
          <div className="relative w-full lg:w-[636px] h-[300px] sm:h-[405px] rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
            
            {/* Máscara de brillo radial */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)'
            }} />

            <AnimatePresence mode="popLayout">
              <motion.div 
                key={activeStep.id} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.5, ease: "easeOut" }} 
                className="absolute inset-0 w-full h-full"
              >
                <div className="w-full h-full relative" style={{
                  WebkitMaskImage: 'radial-gradient(50% 67% at 50% 50%, black 0%, transparent 100%)',
                  maskImage: 'radial-gradient(50% 67% at 50% 50%, black 0%, transparent 100%)',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat'
                }}>
                  <video 
                    src={activeStep.videoSrc} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover" 
                    style={{ borderRadius: '6px' }} 
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScrollableWorkflow;