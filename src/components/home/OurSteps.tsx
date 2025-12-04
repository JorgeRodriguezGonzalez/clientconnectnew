import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Asegúrate de que esta ruta coincida con tu proyecto (puede ser ../../lib/utils)
import { Image, CheckCircle2 } from 'lucide-react';

// --- INICIO CÓDIGO PROPORCIONADO (ImageDisplay) ---

interface ImageDisplayProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  overlay?: boolean;
}

export const ImageDisplay = ({
  src = 'https://framerusercontent.com/images/AVjlypFm7iktAS5ZmpuRclQ04Y.png',
  alt = 'Featured landscape',
  className,
  containerClassName,
  overlay = false,
  ...props
}: ImageDisplayProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragExit,
    onDragLeave,
    onDragOver,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
    ...restProps
  } = props;

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted flex items-center justify-center rounded-2xl border border-white/10 shadow-xl',
        'w-full max-w-[530px] aspect-[530/480]',
        containerClassName
      )}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse z-10">
          <Image className="w-12 h-12 text-muted-foreground opacity-20" />
        </div>
      )}

      {hasError ? (
        <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground z-10">
          <Image className="w-12 h-12 mb-2 opacity-50" />
          <span className="text-sm">Image unavailable</span>
        </div>
      ) : (
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.05,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          src={src}
          alt={alt}
          className={cn('block w-full h-full object-cover', className)}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          decoding="async"
          sizes="min(max((min(100vw, 1440px) - 68px) / 2, 1px), 530px)"
          {...restProps}
        />
      )}

      {overlay && <div className="absolute inset-0 bg-black/10 pointer-events-none" />}
    </div>
  );
};

// --- FIN CÓDIGO PROPORCIONADO ---

// --- COMPONENTE PRINCIPAL OUR STEPS ---

const stepsData = [
  {
    title: "Paso 1: Análisis",
    description: "Analizamos tu situación actual y definimos los objetivos clave para garantizar el éxito del proyecto desde el primer día.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    title: "Paso 2: Estrategia",
    description: "Diseñamos una hoja de ruta personalizada utilizando las mejores herramientas del mercado adaptadas a tus necesidades.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2370&auto=format&fit=crop"
  },
  {
    title: "Paso 3: Implementación",
    description: "Ejecutamos el plan con precisión, asegurando una integración fluida y resultados medibles en tiempo real.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
  }
];

const OurSteps = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        
        {/* Encabezado de la sección */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Nuestro Proceso
          </h2>
          <p className="text-xl text-muted-foreground">
            Una metodología simple y efectiva para llevar tus ideas a la realidad.
          </p>
        </div>

        {/* Lista de Pasos */}
        <div className="flex flex-col gap-20">
          {stepsData.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex flex-col md:items-center gap-10 md:gap-16",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* Contenido de Texto */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg mb-2">
                  {index + 1}
                </div>
                <h3 className="text-3xl font-semibold">{step.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Análisis detallado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Resultados garantizados</span>
                  </li>
                </ul>
              </div>

              {/* Componente de Imagen Proporcionado */}
              <div className="flex-1 flex justify-center w-full">
                <ImageDisplay 
                  src={step.image} 
                  alt={step.title}
                  containerClassName="shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSteps;