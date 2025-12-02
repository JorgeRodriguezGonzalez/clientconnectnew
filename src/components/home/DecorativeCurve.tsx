import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';

// Definición de los pasos del workflow
const STEPS = [
  {
    id: 1,
    title: "Connect your providers",
    description: "Conecta tus servicios favoritos para empezar a sincronizar datos de forma segura e inmediata."
  },
  {
    id: 2,
    title: "Design your workflow",
    description: "Utiliza nuestro editor visual para arrastrar, soltar y diseñar el flujo de trabajo perfecto."
  },
  {
    id: 3,
    title: "Deploy & Scale",
    description: "Lanza tu automatización con un clic. Nuestra infraestructura escala automáticamente según tu demanda."
  }
];

interface DecorativeCurveProps extends React.ComponentProps<'div'> {
  strokeWidth?: number | string;
}

const DecorativeCurve = ({
  className,
  strokeWidth = 2,
  ...props
}: DecorativeCurveProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // 1. Detectar scroll en este contenedor específico
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Suavizar el dibujo de la línea (Spring animation)
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 90,
    restDelta: 0.001
  });

  // 3. Calcular qué paso está activo basado en el progreso del scroll (0 a 1)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.floor(latest * STEPS.length);
      // Aseguramos que el índice no supere el último elemento
      const clampedIndex = Math.min(stepIndex, STEPS.length - 1);
      setActiveStep(clampedIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Coordenadas originales de tu SVG
  const viewBox = "-450 -194 448 226";
  const pathD = "M-448.1300048828125,-191.6300048828125 C-448.1300048828125,-191.6300048828125 -276.1300048828125,-191.5 -251.6300048828125,-191.5 C-227.1300048828125,-191.5 -212.6060028076172,-182.41799926757812 -200.25,-170.6300048828125 C-189.375,-160.2550048828125 -11.4350004196167,22.75200080871582 -4.309999942779541,29.440000534057617";

  return (
    // Contenedor Alto (300vh) para permitir el scroll
    <div 
      ref={containerRef} 
      className={cn("relative h-[300vh] w-full bg-background", className)} 
      {...props}
    >
      {/* Contenedor Sticky: Se mantiene fijo mientras haces scroll */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
          
          {/* IZQUIERDA: Textos de los pasos */}
          <div className="space-y-12">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={false}
                animate={{
                  opacity: activeStep === index ? 1 : 0.2, // Activo vs Inactivo
                  x: activeStep === index ? 0 : -20,       // Pequeño desplazamiento
                  filter: activeStep === index ? "blur(0px)" : "blur(2px)" // Blur suave para inactivos
                }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-2"
              >
                <h3 className="text-3xl font-bold text-foreground">
                  <span className="text-primary mr-3 opacity-80">0{step.id}.</span>
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* DERECHA: SVG Animado */}
          <div className="relative flex items-center justify-center p-8">
             <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox={viewBox} 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-full h-auto text-primary" 
                strokeWidth={strokeWidth}
              >
                {/* 1. Línea base (camino gris transparente) */}
                <path 
                  d={pathD} 
                  className="opacity-10" 
                  strokeWidth={typeof strokeWidth === 'number' ? strokeWidth * 0.5 : strokeWidth}
                />

                {/* 2. Línea activa (se dibuja con scroll) */}
                <motion.path 
                  d={pathD}
                  style={{ pathLength }} 
                />
              </svg>
          </div>

        </div>
      </div>
    </div>
  );
};

// Exportación por defecto para facilitar la importación en Index.tsx
export default DecorativeCurve;