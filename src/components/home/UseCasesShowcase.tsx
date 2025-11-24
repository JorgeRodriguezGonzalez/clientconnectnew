import React from 'react';
import { Sparkles, Clock, Zap, Mountain, ArrowRight } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

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
  // Props para el AnimatedHikeCard
  cardTitle?: string;
  cardImages?: string[];
  cardStats?: Array<{ icon: React.ReactNode; label: string }>;
  cardDescription?: string;
  cardHref?: string;
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

// Componente AnimatedHikeCard integrado con glass blur
const AnimatedHikeCard = ({ 
  title, 
  images, 
  stats, 
  description, 
  href
}: {
  title: string;
  images: string[];
  stats: Array<{ icon: React.ReactNode; label: string }>;
  description: string;
  href: string;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.a
      ref={cardRef}
      href={href}
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ 
        opacity: 0, 
        x: -50,
        filter: "blur(10px)"
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        x: isInView ? 0 : -50,
        filter: isInView ? "blur(0px)" : "blur(10px)"
      }}
      transition={{ 
        duration: 0.8, 
        delay: 0.3, 
        ease: "easeOut" 
      }}
      className="group relative block w-full max-w-sm cursor-pointer rounded-2xl border bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:translate-y-0 hover:shadow-sm lg:max-w-md"
      style={{
        transform: isHovered ? 'translateY(0)' : 'translateY(-4px)'
      }}
    >
      <div className="flex flex-col">
        {/* Card Header: Title */}
        <div className="mb-3">
          <h2 className="text-[10px] md:text-[16px] lg:text-[26px] font-[500] leading-[1.1] tracking-tight text-gray-900">{title}</h2>
        </div>

        {/* Stats Section - Moved here */}
        <div className="mb-6 flex items-center space-x-4 text-sm text-gray-600">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-1.5">
              {stat.icon}
              <span className="font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
        
        {/* Stacked Images with Hover Animation */}
        <div className="relative mb-6 h-32">
          {images.map((src, index) => (
            <div
              key={index}
              className="absolute h-full w-[40%] overflow-hidden rounded-lg border-2 border-white shadow-md transition-all duration-300 ease-in-out"
              style={{
                transform: isHovered 
                  ? `translateX(${index * 32}px)`
                  : `translateX(${index * 80}px) rotate(${index * 5 - 5}deg)`,
                zIndex: images.length - index,
              }}
            >
              <img
                src={src}
                alt={`${title} view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Description */}
        <p className="text-[12px] md:text-[14px] font-normal leading-relaxed text-gray-600 tracking-tight">
          {description}
        </p>
      </div>
    </motion.a>
  );
};

export const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const {
    subText = 'our approach',
    heading = 'Marketing strategies that transform your business into',
    highlightText = 'market leaders',
    description = 'We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.',
    badge = 'Digital Marketing Excellence',
    mainTitle = 'Transform Your Business into',
    mainTitleHighlight = 'Market Leaders',
    subtitle = 'Strategic marketing solutions that drive growth, build brands, and deliver measurable results for your business.',
    ctaText = 'Book a Call',
    ctaHref = '#',
    // Valores por defecto para el card
    cardTitle = 'Q4 Strategy Update',
    cardImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
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
    [0, 0.2, 0.4],
    ["#000000", "rgb(20, 35, 90)", "#ffffff"]
  );

  const borderColor = useTransform(
    scrollYProgressBorder,
    [0, 0.15, 0.4, 0.6],
    ["#e5e7eb", "#000000", "rgb(20, 35, 90)", "#ffffff"]
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
              <FadeInText delay={0.2}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl shadow-[0_2px_5px_0_rgba(0,0,0,0.07),0_8px_8px_0_rgba(0,0,0,0.06)]">
                  <svg width="16" height="16" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 0L17.5 5L23 6L18.5 10.5L19.5 16L14.5 13L9.5 16L10.5 10.5L6 6L11.5 5L14.5 0Z" fill="#000000" />
                  </svg>
                  <span className="text-[16px] font-normal text-[#242424] tracking-[-0.3px] capitalize">
                    {badge}
                  </span>
                </div>
              </FadeInText>

              {/* Main Title */}
              <FadeInText delay={0.3}>
                <div className="w-full">
                  <h1 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-center text-black">
                    {mainTitle}{' '}
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
                      {mainTitleHighlight}
                    </motion.span>
                  </h1>
                </div>
              </FadeInText>

              {/* Subtitle */}
              <FadeInText delay={0.4}>
                <div className="w-full max-w-[500px]">
                  <p className="text-base md:text-lg font-medium leading-relaxed tracking-tight text-center text-gray-600">
                    {subtitle}
                  </p>
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
            <div className="flex flex-col lg:flex-row items-start justify-between gap-20">

              {/* COLUMNA IZQUIERDA - AnimatedHikeCard */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative flex-1 max-w-[495px] flex items-center justify-center"
              >
                <AnimatedHikeCard
                  title={cardTitle}
                  images={cardImages}
                  stats={cardStats}
                  description={cardDescription}
                  href={cardHref}
                />
              </motion.div>

              {/* COLUMNA DERECHA - Texto y Calendario */}
              <div className="flex-1 max-w-[520px]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-medium tracking-[2.2px] uppercase mb-2.5 text-gray-500"
                >
                  {subText}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6"
                >
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
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight"
                >
                  {description}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};