import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// Types updated to match the split title structure
type Step = {
  id: number;
  title: string;
  highlightText: string;
  description: string;
  videoSrc: string;
};

// Data: Steps 2, 3, 4, and 5 from ProductShowcase
const steps: Step[] = [
  {
    id: 1,
    title: "Start receiving qualified ",
    highlightText: "leads daily.",
    description: "Our targeted campaigns connect you with customers actively searching for your services. Watch your inbox fill with genuine opportunities ready to convert.",
    videoSrc: "https://framerusercontent.com/assets/vYqmjipjjeLG5HeZvmQo9R9Y0Q.webm"
  },
  {
    id: 2,
    title: "Expand across all ",
    highlightText: "digital channels.",
    description: "From Google to social media, we create cohesive strategies that maximize your visibility. Your brand deserves to be seen everywhere your customers are.",
    videoSrc: "https://framerusercontent.com/assets/9ZKSz7Ff4NGTGCYLeiZCgz9n1o0.webm"
  },
  {
    id: 3,
    title: "Get a customized audit with ",
    highlightText: "actionable improvements.",
    description: "We analyze your current digital presence and provide a clear roadmap. Every recommendation comes with our commitment to implement the changes for you.",
    // Video temporal (el original estaba roto)
    videoSrc: "https://framerusercontent.com/assets/vYqmjipjjeLG5HeZvmQo9R9Y0Q.webm" 
  },
  {
    id: 4,
    title: "Close more deals with ",
    highlightText: "high-intent prospects.",
    description: "Our lead generation strategies target customers ready to buy. We optimize every touchpoint to turn interest into revenue for your business.",
    // Video temporal (el original estaba roto)
    videoSrc: "https://framerusercontent.com/assets/9ZKSz7Ff4NGTGCYLeiZCgz9n1o0.webm"
  }
];

// Header Gradient (Manteniendo el estilo original del header principal)
const HEADER_GRADIENT_STYLE = {
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

  // 2. Cálculo matemático
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepIndex = Math.floor(latest * steps.length);
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

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      
      {/* Contenedor Sticky */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-10">
        
        {/* Header Principal */}
        <div className="absolute top-8 md:top-14 w-full text-center z-20">
          <h2 className="text-4xl md:text-[56px] leading-tight font-medium tracking-tight text-white">
            <span style={HEADER_GRADIENT_STYLE} className="inline-block py-2">
              How We Work
            </span>
          </h2>
        </div>

        {/* Contenido Central */}
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mt-16 md:mt-0">
          
          {/* IZQUIERDA: Texto (Animado con nuevos estilos) */}
          <div className="w-full lg:w-[500px] flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Título con estilo importado de ProductShowcase */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white">{activeStep.title}</span>
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
                      backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, 0), rgb(237, 191, 134), rgb(222, 131, 99), rgb(103, 188, 183), rgba(0, 0, 0, 0))",
                      backgroundSize: "400% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent" // Fallback
                    }}
                  >
                    {activeStep.highlightText}
                  </motion.span>
                </h3>

                {/* Descripción con estilo importado de ProductShowcase */}
                <p className="mt-6 text-base md:text-lg text-neutral-400 leading-relaxed max-w-md">
                  {activeStep.description}
                </p>

              </motion.div>
            </AnimatePresence>

            {/* Barra de progreso visual */}
            <div className="flex gap-2 mt-10">
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