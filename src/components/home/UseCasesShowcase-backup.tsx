import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion, useInView, useAnimationControls, useScroll, useTransform } from 'framer-motion';

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
};

export const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const {
    subText = 'our approach',
    heading = 'Marketing strategies that transform your business into',
    highlightText = 'market leaders',
    description = 'We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.',
    badge = 'Built for shopify',
    mainTitle = 'Turn Your Shoppers into',
    mainTitleHighlight = 'Subscribers',
    subtitle = 'From setup to scale: everything you need to grow subscriptions on autopilot.',
    ctaText = 'Book a Call',
    ctaHref = '#',
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Scroll animation para el color del arco
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"]
  });

  // Scroll animation para el border-radius (círculo a cuadrado) - LO PRIMERO QUE OCURRE
  const { scrollYProgress: scrollYProgressBorderRadius } = useScroll({
    target: ref,
    offset: ["start 130vh", "start 100vh"]
  });

  // Scroll animation para la expansión de la elipse (después del border-radius)
  const { scrollYProgress: scrollYProgressEllipse } = useScroll({
    target: ref,
    offset: ["start 120vh", "start 80vh"]
  });

  // Scroll animation para el color del borde - empieza antes
  const { scrollYProgress: scrollYProgressBorder } = useScroll({
    target: ref,
    offset: ["start 120vh", "start center"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    ["#000000", "rgb(20, 35, 90)", "#ffffff"]
  );

  // Color del borde - gris→negro MÁS RÁPIDO, luego azul→blanco
  const borderColor = useTransform(
    scrollYProgressBorder,
    [0, 0.15, 0.4, 0.6],
    ["#e5e7eb", "#000000", "rgb(20, 35, 90)", "#ffffff"]
  );

  // Animación del border-radius: de 100% (círculo) a 0% (cuadrado) - 30% MÁS LENTO
  const borderRadius = useTransform(
    scrollYProgressBorderRadius,
    [0, 0.2925],  // Era 0.225, ahora 0.225 * 1.3 = 0.2925 (30% más lento)
    ["100%", "0%"]
  );

  // Animación de expansión de la elipse - MÁS LENTO (tarda más en terminar)
  const ellipseWidth = useTransform(
    scrollYProgressEllipse,
    [0, 0.35],
    [40, 100]
  );

  // Transición del fade: cuando la elipse crece, el fade desaparece - MÁS LENTO
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

  // Controles individuales + animaciones hover perfectas (como antes)
  const ctrl1 = useAnimationControls();
  const ctrl2 = useAnimationControls();
  const ctrl3 = useAnimationControls();
  const ctrl4 = useAnimationControls();
  const ctrl5 = useAnimationControls();

  React.useEffect(() => {
    if (isInView) {
      ctrl1.start({ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.6 } });
      ctrl2.start({ opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.6 } });
      ctrl3.start({ opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.6 } });
      ctrl4.start({ opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.9, duration: 0.8 } });
      ctrl5.start({ opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.6 } });
    }
  }, [isInView]);

  const replayAnimation = (
    controls: ReturnType<typeof useAnimationControls>,
    from: any,
    to: any,
    duration = 0.6
  ) => {
    controls.set(from);
    controls.start({ ...to, transition: { duration, delay: 0 } });
  };

  return (
    <motion.div className="pt-16" style={{ backgroundColor }}>
      <section ref={ref} className="relative">
        {/* TU ARCO PERFECTO - SIN CAMBIOS, SOLO SIN SOMBRA (ya no tiene ninguna) */}
        
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

        {/* TÍTULO ESTILO SHOPIFY COMPLETO - DENTRO DEL CÍRCULO/CUADRADO */}
        <div className="absolute -top-[254px] left-0 right-0 z-50">
          <div className="max-w-[1225px] mx-auto px-4">
            <div className="flex flex-col items-center gap-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl shadow-[0_2px_5px_0_rgba(0,0,0,0.07),0_8px_8px_0_rgba(0,0,0,0.06)]"
              >
                <svg width="16" height="16" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 0L17.5 5L23 6L18.5 10.5L19.5 16L14.5 13L9.5 16L10.5 10.5L6 6L11.5 5L14.5 0Z" fill="#000000" />
                </svg>
                <span className="text-sm font-normal text-[#242424] tracking-[-0.3px] capitalize">
                  {badge}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
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
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full max-w-[500px]"
              >
                <p className="text-base md:text-lg font-medium leading-relaxed tracking-tight text-center text-gray-600">
                  {subtitle}
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
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
              </motion.div>
            </div>
          </div>
        </div>

        {/* CONTENIDO SUBIDO MÁS ARRIBA (más pegado al arco) */}
        <div className="relative pt-48 pb-32 px-4">
          <div className="max-w-[1225px] mx-auto">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-20">

              {/* IMÁGENES IZQUIERDA */}
              <div className="relative flex-1 max-w-[495px] translate-x-[80px]">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img src="/images/background.svg" alt="" className="w-full" />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={ctrl1}
                  onMouseEnter={() => replayAnimation(ctrl1, { opacity: 0, x: -50 }, { opacity: 1, x: 0 })}
                  className="absolute top-[106px] left-5 w-[406px] cursor-pointer"
                >
                  <img src="/images/top.svg" alt="" className="w-full" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={ctrl2}
                  onMouseEnter={() => replayAnimation(ctrl2, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })}
                  className="absolute top-[106px] -right-8 w-[69px] cursor-pointer"
                >
                  <img src="/images/client.svg" alt="" className="w-full" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={ctrl3}
                  onMouseEnter={() => replayAnimation(ctrl3, { opacity: 0, x: 50 }, { opacity: 1, x: 0 })}
                  className="absolute top-[238px] -right-24 w-[431px] cursor-pointer"
                >
                  <img src="/images/right.svg" alt="" className="w-full" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                  animate={ctrl4}
                  onMouseEnter={() => replayAnimation(ctrl4, { opacity: 0, scale: 0.8, rotate: -90 }, { opacity: 1, scale: 1, rotate: 0 }, 0.8)}
                  className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer"
                >
                  <div className="w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center p-5">
                    <img src="/images/client-connect-australia-logo.png" alt="" className="w-full h-full object-contain" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={ctrl5}
                  onMouseEnter={() => replayAnimation(ctrl5, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })}
                  className="absolute bottom-0 left-0 w-[406px] cursor-pointer"
                >
                  <img src="/images/down.svg" alt="" className="w-full" />
                </motion.div>
              </div>

              {/* TEXTO DERECHA - Actualizado con el estilo de ProductShowcase */}
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
                  className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight mb-8"
                >
                  {description}
                </motion.p>

                {/* Calendar Component */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-lg p-6 max-w-[420px]"
                >
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <h3 className="text-lg font-bold text-gray-900">November 2025</h3>
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Day Headers */}
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-sm font-medium text-gray-400 py-2">
                        {day}
                      </div>
                    ))}

                    {/* Previous Month Days */}
                    {[26, 27, 28, 29, 30, 31].map((day) => (
                      <div key={`prev-${day}`} className="text-center py-3 text-sm text-gray-300">
                        {day}
                      </div>
                    ))}

                    {/* Current Month Days */}
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">1</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">2</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">3</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">4</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">5</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">6</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">7</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">8</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">9</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">10</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">11</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">12</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">13</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">14</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">15</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">16</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">17</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">18</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">19</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">20</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">21</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">22</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">23</div>
                    
                    {/* Selected Day - 24 */}
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                        24
                      </div>
                    </div>
                    
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">25</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">26</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">27</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">28</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">29</div>
                    <div className="text-center py-3 text-sm font-semibold text-gray-900">30</div>

                    {/* Next Month Days */}
                    <div className="text-center py-3 text-sm text-gray-300 relative">
                      1
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                        <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                      </div>
                    </div>
                    {[2, 3, 4, 5, 6].map((day) => (
                      <div key={`next-${day}`} className="text-center py-3 text-sm text-gray-300">
                        {day}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
