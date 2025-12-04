import React from 'react';
import { Sparkles, Clock, Zap, Mountain, Check } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Utilidad simple para cn si no existe en el proyecto
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

type UseCasesShowcaseProps = {
  subText?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  badge?: string;
  mainTitle?: string;
  mainTitleHighlight?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  // Props anteriores conservadas para compatibilidad
  cardTitle?: string;
  cardImages?: string[];
  cardStats?: Array<{ icon: React.ReactNode; label: string }>;
  cardDescription?: string;
  cardHref?: string;
};

// Componente ThreeDMarquee (Nuevo componente solicitado)
const ThreeDMarquee = ({ images, className }: { images: string[], className?: string }) => {
  // Para mobile: 3 columnas, para desktop: 4 columnas
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const numColumns = isMobile ? 3 : 4;
  
  const chunkSize = Math.ceil(images.length / numColumns);
  const chunks = Array.from({ length: numColumns }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div className={cn("mx-auto block h-[350px] sm:h-[450px] lg:h-[600px] overflow-hidden rounded-2xl", className)}>
      <div className="flex w-full h-full items-center justify-center">
        <div className="w-[1000px] sm:w-[1200px] lg:w-[1548px] h-[1000px] sm:h-[1200px] lg:h-[1548px] shrink-0 scale-[0.4] sm:scale-[0.5] lg:scale-90">
          <div style={{ transform: "rotateX(35deg) rotateY(0deg) rotateZ(-25deg)", transformStyle: "preserve-3d" }}
            className="relative top-32 sm:top-44 lg:top-80 right-[28%] sm:right-[35%] lg:right-[40%] grid w-full h-full origin-top-left grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{ duration: colIndex % 2 === 0 ? 10 : 15, repeat: Infinity, repeatType: "reverse" }}
                key={colIndex + "marquee"} className="flex flex-col items-start gap-8">
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <motion.img whileHover={{ y: -10 }} transition={{ duration: 0.3, ease: "easeInOut" }}
                      key={imageIndex + image} src={image} alt={`Image ${imageIndex + 1}`}
                      className="aspect-[5/4] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl" />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente FadeInText con glass blur
const FadeInText = ({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const directionOffset = {
    up: { y: 10, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        filter: "blur(10px)",
        ...directionOffset[direction]
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        filter: isInView ? "blur(0px)" : "blur(10px)",
        y: isInView ? 0 : directionOffset[direction].y,
        x: isInView ? 0 : directionOffset[direction].x
      }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut", 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const {
    subText = 'our approach',
    heading = 'Marketing strategies that transform your business into',
    highlightText = 'market leaders',
    description = 'We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.',
    badge = 'Digital Marketing Excellence',
    mainTitle = 'Elevate Your Brand with',
    mainTitleHighlight = 'Data-Driven Marketing',
    subtitle = 'Strategic marketing solutions that drive growth, build brands, and deliver measurable results for your business.',
    ctaText = 'Book a Call',
    ctaHref = '#',
    // Valores por defecto para el card
    cardTitle = 'Subject: Q4 Strategy Update',
    cardImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
    ],
    cardStats = [
      { icon: <Clock className="h-4 w-4" />, label: 'Next 30 Days' },
      { icon: <Mountain className="h-4 w-4" />, label: '3 Phases' },
      { icon: <Zap className="h-4 w-4" />, label: 'High Priority' },
    ],
    cardDescription = 'We\'re implementing your new SEO strategy starting next week. We\'ll optimize 15 key pages, enhance site speed, and launch targeted content campaigns. Timeline: 30 days. Let\'s drive measurable growth!',
    cardHref = '#',
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Scroll animation para el color del arco
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"]
  });

  // Scroll animation para el border-radius (círculo a cuadrado)
  const { scrollYProgress: scrollYProgressBorderRadius } = useScroll({
    target: ref,
    offset: ["start 130vh", "start 100vh"]
  });

  // Scroll animation para la expansión de la elipse
  const { scrollYProgress: scrollYProgressEllipse } = useScroll({
    target: ref,
    offset: ["start 120vh", "start 80vh"]
  });

  // Scroll animation para el color del borde
  const { scrollYProgress: scrollYProgressBorder } = useScroll({
    target: ref,
    offset: ["start 120vh", "start center"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.151],
    ["#000000", "#1a1a1a", "#ffffff"]
  );

  const borderColor = useTransform(
    scrollYProgressBorder,
    [0, 0.15, 0.15, 0.151],
    ["#e5e7eb", "#000000", "#1a1a1a", "#ffffff"]
  );

  // Color de texto para badge y título principal
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.151],
    ["#ffffff", "#ffffff", "#000000"]
  );

  // Color para el subtitle
  const subtitleColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.151],
    ["#d1d5db", "#d1d5db", "#6b7280"]
  );

  const borderRadius = useTransform(
    scrollYProgressBorderRadius,
    [0, 0.2925],
    ["100%", "0%"]
  );

  const ellipseWidth = useTransform(
    scrollYProgressEllipse,
    [0, 0.35],
    [40, 100]
  );

  const fadeStart = useTransform(
    scrollYProgressEllipse,
    [0, 0.35],
    [40, 100]
  );

  const fadeEnd = useTransform(
    scrollYProgressEllipse,
    [0, 0.35],
    [90, 100]
  );

  const maskImage = useTransform(
    [ellipseWidth, fadeStart, fadeEnd],
    ([width, start, end]) => 
      `radial-gradient(ellipse ${width}% 100% at center, black 0%, black ${start}%, transparent ${end}%, transparent 100%)`
  );

  return (
    <motion.div className="pt-16" style={{ backgroundColor }}>
      <section ref={ref} className="relative">
        {/* ARCO */}
        <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none">
          <motion.div
            className="w-full h-full border-t-[1px]"
            style={{
              transform: 'translateY(-65%)',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderRadius: borderRadius,
              borderTopColor: borderColor,
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
              backgroundColor: backgroundColor,
            }}
          />
        </div>

        {/* TÍTULO ESTILO SHOPIFY */}
        <div className="absolute -top-[254px] left-0 right-0 z-50">
          <div className="max-w-[1225px] mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              {/* Badge */}
              <FadeInText delay={1.2}>
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-[0_2px_5px_0_rgba(0,0,0,0.07),0_8px_8px_0_rgba(0,0,0,0.06)] mb-[6px]"
                  style={{ 
                    background: 'linear-gradient(135deg, #67bcb7 0%, #de8363 100%)'
                  }}
                >
                  <span 
                    className="text-[14px] font-normal tracking-[-0.3px] capitalize text-white"
                  >
                    {badge}
                  </span>
                </div>
              </FadeInText>

              {/* Main Title */}
              <FadeInText delay={0.3}>
                <div className="w-full max-w-[600px] mx-auto">
                  <motion.h1 
                    className="text-[32px] md:text-[38px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-center"
                    style={{ color: textColor }}
                  >
                    {mainTitle}{' '}
                    <motion.span style={{ color: textColor }}>
                      {mainTitleHighlight}
                    </motion.span>
                    <motion.span
                      style={{
                        display: "inline-block",
                        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(237,191,134,0.2) 15%, rgba(237,191,134,0.5) 25%, rgb(237,191,134) 35%, rgb(222,131,99) 50%, rgb(103,188,183) 65%, rgba(103,188,183,0.5) 75%, rgba(103,188,183,0.2) 85%, rgba(255,255,255,0) 100%)",
                        backgroundSize: "300% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                      animate={{
                        backgroundPosition: ["200% 50%", "-100% 50%"]
                      }}
                      transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity
                      }}
                    >
                      .
                    </motion.span>
                  </motion.h1>
                </div>
              </FadeInText>

              {/* Subtitle */}
              <FadeInText delay={0.4}>
                <div className="w-full max-w-[500px]">
                  <motion.p 
                    className="text-base md:text-lg font-medium leading-relaxed tracking-tight text-center"
                    style={{ color: subtitleColor }}
                  >
                    {subtitle}
                  </motion.p>
                </div>
              </FadeInText>

              {/* CTA Button */}
              <FadeInText delay={0.5}>
                <a 
                  href={ctaHref} 
                  onClick={e => e.preventDefault()} 
                  className="relative inline-flex items-center justify-center gap-2.5 px-5 py-[14px] bg-black rounded-xl shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)] overflow-hidden group hover:bg-gray-900 transition-colors"
                >
                  <span className="text-base font-medium leading-6 tracking-[-0.5px] text-white z-10">
                    {ctaText}
                  </span>
                  
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center z-10">
                    <Sparkles className="w-3 h-3 text-black" />
                  </div>
                </a>
              </FadeInText>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative pt-48 pb-32 px-4">
          <div className="max-w-[1225px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-20">

              {/* COLUMNA IZQUIERDA - ThreeDMarquee */}
              <div className="relative flex-1 w-full max-w-[495px] flex items-center justify-center">
                <ThreeDMarquee images={cardImages} />
              </div>

              {/* COLUMNA DERECHA - Texto */}
              <div className="flex-1 max-w-[520px]">
                <FadeInText delay={0.5} direction="up">
                  <div className="text-sm font-medium tracking-[2.2px] uppercase mb-2.5 text-gray-500">
                    {subText}
                  </div>
                </FadeInText>

                <FadeInText delay={0.6} direction="up">
                  <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6">
                    {heading}{' '}
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
                        backgroundImage: "linear-gradient(45deg, rgba(255, 255, 255, 0), rgb(237, 191, 134), rgb(222, 131, 99), rgb(103, 188, 183), rgba(255, 255, 255, 0))",
                        backgroundSize: "400% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent"
                      }}
                    >
                      {highlightText}
                    </motion.span>
                    <span className="text-gray-900">.</span>
                  </h2>
                </FadeInText>

                <FadeInText delay={0.7} direction="up">
                  <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
                    {description}
                  </p>
                </FadeInText>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export { UseCasesShowcase };
export default UseCasesShowcase;