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
  // IMPORTANTE: He puesto el video 1 temporalmente porque el enlace original (video 3) estaba roto/caducado.
  // Sube tus propios videos a la carpeta 'public' y cambia esto a: "/videos/tu-video-3.webm"
  videoSrc: "https://framerusercontent.com/assets/vYqmjipjjeLG5HeZvmQo9R9Y0Q.webm" 
}, {
  id: 4,
  title: "04. Launch Instantly",
  description: "Deploy your agents with a single click and start handling calls immediately with zero downtime. Monitor performance and iterate in real-time.",
  // IMPORTANTE: He puesto el video 2 temporalmente porque el enlace original (video 4) estaba roto/caducado.
  // Cambia esto a: "/videos/tu-video-4.webm"
  videoSrc: "https://framerusercontent.com/assets/9ZKSz7Ff4NGTGCYLeiZCgz9n1o0.webm"
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

  // 1. Control del Scroll con un offset ajustado para que sea más reactivo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Cálculo matemático preciso para dividir el scroll en 4 partes iguales
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest va de 0 a 1.
    // Multiplicamos por el número de pasos. Si latest es 0.99 * 4 = 3.96 -> Math.floor = 3 -> Index 3 es el paso 4 (id 4).
    const stepIndex = Math.floor(latest * steps.length);
    const newStepId = Math.min(Math.max(stepIndex + 1, 1), steps.length);
    
    if (newStepId !== activeStepId) {
      setActiveStepId(newStepId);
    }
  });

  // Preload videos (optimización)
  useEffect(() => {
    steps.forEach(step => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = step.videoSrc;
      document.head.appendChild(link);
    });
  }, []);

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    // Altura ajustada: 400vh da suficiente espacio para leer cada paso con calma
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      
      {/* Contenedor Sticky: Se mantiene fijo y centrado */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-10">
        
        {/* Header */}
        <div className="absolute top-8 md:top-14 w-full text-center z-20">
          <h2 className="text-4xl md:text-[56px] leading-tight font-medium tracking-tight text-white">
            <span style={GRADIENT_TEXT_STYLE} className="inline-block py-2">
              How Breez Works
            </span>
          </h2>
        </div>

        {/* Contenido Central */}
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mt-16 md:mt-0">
          
          {/* IZQUIERDA: Texto (Animado) */}
          <div className="w-full lg:w-[500px] flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
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

            {/* Barra de progreso visual */}
            <div className="flex gap-2 mt-8">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                    s.id === activeStepId ? "w-12 bg-white" : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DERECHA: Video (Animado) */}
          <div className="relative w-full lg:w-[636px] h-[300px] sm:h-[405px] rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 shadow-2xl">
            
            {/* Overlay sutil */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none mix-blend-overlay" style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
            }} />

            <AnimatePresence mode="popLayout">
              <motion.div 
                key={activeStep.id} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 1.05 }} 
                transition={{ duration: 0.5, ease: "circOut" }} 
                className="absolute inset-0 w-full h-full"
              >
                <div className="w-full h-full relative" style={{
                  WebkitMaskImage: 'radial-gradient(98% 98% at 50% 50%, black 0%, transparent 100%)',
                  maskImage: 'radial-gradient(98% 98% at 50% 50%, black 0%, transparent 100%)',
                }}>
                  <video 
                    // Key fuerza al navegador a recargar el elemento video si la src cambia
                    key={activeStep.videoSrc} 
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