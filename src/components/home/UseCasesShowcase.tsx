import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Clock, Zap, Mountain, Check, Send } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Utilidad cn
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- CONSTANTES E IMAGENES DEL MARQUEE ---
const slantedMarqueeImages = [
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a7_hero-marquee-image-01-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629aa_hero-marquee-image-02-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629ab_hero-marquee-image-03-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a8_hero-marquee-image-04-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a9_hero-marquee-image-05-cinemaflow-webflow-template.avif'
];

// --- COMPONENTE BottomSlantedMarquee MODIFICADO ---
const BottomSlantedMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const images = slantedMarqueeImages;
  const isPausedRef = useRef(false);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    let animationFrameId: number;
    let translateX = 0;
    const speed = 0.5;
    
    const animate = () => {
      if (!isPausedRef.current) {
        const marqueeWidth = marquee.scrollWidth / 3;
        translateX += speed;
        if (translateX >= 0) {
          translateX = -marqueeWidth;
        }
        marquee.style.transform = `translateX(${translateX}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [images]);

  return (
    <div className="w-full overflow-hidden py-52 relative z-[9999] -mt-20 pointer-events-none">
      <div className="flex items-center justify-center" style={{ transform: 'rotate(9deg)' }}>
        <div 
          ref={marqueeRef} 
          className="flex gap-6 will-change-transform pointer-events-auto"
          style={{ paddingRight: '24px' }}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 flex-shrink-0">
              {images.map((src, imgIndex) => (
                <img 
                  key={`${setIndex}-${imgIndex}`} 
                  src={src} 
                  alt={`Marquee Image ${imgIndex + 1}`} 
                  className="w-[320px] h-[370px] object-cover rounded-3xl opacity-80 hover:opacity-100 hover:scale-105 hover:saturate-110 hover:z-[9999] transition-all duration-300 cursor-pointer"
                  style={{
                    transform: 'skewY(-20deg)',
                    flexShrink: 0,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }} 
                  loading="eager" 
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE CONTACT FORM ---
const ContactForm = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 p-8 relative z-20"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h3>
        <p className="text-gray-500 text-sm">Fill out the form below and we'll start your transformation journey.</p>
      </div>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none transition-all text-sm" 
              placeholder="Jane" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none transition-all text-sm" 
              placeholder="Doe" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
          <input 
            type="email" 
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none transition-all text-sm" 
            placeholder="jane@company.com" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
          <textarea 
            rows={4} 
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-gray-400 outline-none transition-all text-sm resize-none" 
            placeholder="Tell us about your goals..." 
          />
        </div>
        
        <button className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-2">
          Send Message <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
};

// Componente FadeInText
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

type UseCasesShowcaseProps = {
  subText?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  badge?: string;
  mainTitle?: string;
  mainTitleHighlight?: string;
  subtitle?: string; // Mantenido en props pero no usado
  ctaText?: string;  // Mantenido en props pero no usado
  ctaHref?: string;  // Mantenido en props pero no usado
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
    // subtitle y cta eliminados de la desestructuración por uso, o mantenidos sin renderizar
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  
  // Scroll animation hooks
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"]
  });

  const { scrollYProgress: scrollYProgressBorderRadius } = useScroll({
    target: ref,
    offset: ["start 130vh", "start 100vh"]
  });

  const { scrollYProgress: scrollYProgressEllipse } = useScroll({
    target: ref,
    offset: ["start 120vh", "start 80vh"]
  });

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

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.151],
    ["#ffffff", "#ffffff", "#000000"]
  );

  // subtitleColor ya no se usa, pero lo dejamos por si se necesita en el futuro o se elimina
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
      <section ref={ref} className="relative pb-10">
        {/* ARCO DE FONDO */}
        <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none z-0">
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

        {/* HEADER / TITULO */}
        <div className="absolute -top-[254px] left-0 right-0 z-50">
          <div className="max-w-[1225px] mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              <FadeInText delay={1.2}>
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-[0_2px_5px_0_rgba(0,0,0,0.07),0_8px_8px_0_rgba(0,0,0,0.06)] mb-[6px]"
                  style={{ 
                    background: 'linear-gradient(135deg, #67bcb7 0%, #de8363 100%)'
                  }}
                >
                  <span className="text-[14px] font-normal tracking-[-0.3px] capitalize text-white">
                    {badge}
                  </span>
                </div>
              </FadeInText>

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

              {/* AQUÍ ELIMINAMOS EL SUBTITULO Y EL BOTÓN CTA */}
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL (Texto + Formulario) */}
        <div className="relative pt-48 pb-0 px-4 z-10">
          <div className="max-w-[1225px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">

              {/* COLUMNA IZQUIERDA - Texto */}
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

              {/* COLUMNA DERECHA - Contact Form */}
              <div className="relative w-full lg:flex-1 max-w-full lg:max-w-[495px] flex items-center justify-center min-h-[400px]">
                 <ContactForm />
              </div>

            </div>
          </div>
        </div>

        {/* --- BOTTOM MARQUEE --- */}
        <BottomSlantedMarquee />

      </section>
    </motion.div>
  );
};

export { UseCasesShowcase };
export default UseCasesShowcase;