import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '@/lib/utils'; // Asegúrate de que esta ruta sea correcta en tu proyecto

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

// Sub-component to handle InView logic per step
const StepItem = ({ 
  step, 
  isActive, 
  setActiveStepId 
}: { 
  step: Step; 
  isActive: boolean; 
  setActiveStepId: (id: number) => void 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Detects when the element is in the center of the viewport
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveStepId(step.id);
    }
  }, [isInView, step.id, setActiveStepId]);

  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col gap-4 transition-opacity duration-300 ease-in-out py-24", // py-24 adds scroll space
        isActive ? "opacity-100" : "opacity-30"
      )}
    >
      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-medium leading-normal tracking-tight text-white cursor-pointer"
          onClick={() => setActiveStepId(step.id)}>
        {step.title}
      </h3>

      {/* Description */}
      <motion.div 
        initial={false} 
        animate={{
          height: isActive ? 'auto' : 'auto', // Keep auto to allow natural flow, opacity handles focus
          opacity: isActive ? 1 : 0.5
        }} 
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-lg md:text-xl leading-relaxed text-white/70 font-medium max-w-[500px]">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
};

// @component: ScrollableWorkflow
export const ScrollableWorkflow = () => {
  const [activeStepId, setActiveStepId] = useState<number>(1);

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

  return (
    <div className="w-full bg-black text-white font-sans flex flex-col items-center py-20 px-4 md:px-10 overflow-hidden">
      
      {/* Header */}
      <div className="mb-20 max-w-[600px] w-full text-center z-10">
        <h2 className="text-4xl md:text-[56px] leading-tight font-medium tracking-tight">
          <span style={GRADIENT_TEXT_STYLE} className="inline-block py-2">
            How Breez Works
          </span>
        </h2>
      </div>

      {/* Main Content Area - Changed items-center to items-start for sticky behavior */}
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20 relative">
        
        {/* Left Column: Steps (Scrollable) */}
        <div className="w-full lg:w-[500px] flex flex-col">
          {steps.map(step => (
            <StepItem 
              key={step.id} 
              step={step} 
              isActive={activeStepId === step.id} 
              setActiveStepId={setActiveStepId} 
            />
          ))}
          {/* Spacer to allow the last item to scroll up comfortably */}
          <div className="h-[20vh]" />
        </div>

        {/* Right Column: Video Visuals (Sticky) */}
        <div className="hidden lg:block sticky top-[25vh] w-full lg:w-[636px] h-[300px] sm:h-[405px] rounded-lg overflow-hidden flex-shrink-0">
          
          {/* Mask container */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)'
          }} />

          <AnimatePresence mode="popLayout">
            {steps.map(step => step.id === activeStepId && (
              <motion.div 
                key={step.id} 
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
                    src={step.videoSrc} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover" 
                    style={{ borderRadius: '6px' }} 
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile View Video (Optional Fallback if you want video between texts on mobile) */}
        {/* Currently kept minimal for layout consistency, logic relies on desktop sticky view */}
      </div>
    </div>
  );
};

export default ScrollableWorkflow;