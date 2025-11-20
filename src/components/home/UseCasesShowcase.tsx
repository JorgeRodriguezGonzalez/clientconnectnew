import React from 'react';
import { motion, useInView, useAnimationControls, useScroll, useTransform } from 'framer-motion';

type UseCasesShowcaseProps = {
  subText?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
};

export const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const {
    subText = 'our approach',
    heading = 'Marketing strategies that transform your business into',
    highlightText = 'market leaders',
    description = 'We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.',
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Scroll animation para el color del arco
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"]
  });

  // Scroll animation para la expansión de la elipse (empieza ANTES)
  const { scrollYProgress: scrollYProgressEllipse } = useScroll({
    target: ref,
    offset: ["start 120vh", "start 80vh"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    ["#000000", "rgb(20, 35, 90)", "#ffffff"]
  );

  // Animación de expansión de la elipse - usa scrollYProgressEllipse
  const ellipseWidth = useTransform(
    scrollYProgressEllipse,
    [0, 0.15],
    [40, 100]
  );

  // Transición del fade: cuando la elipse crece, el fade desaparece
  const fadeStart = useTransform(
    scrollYProgressEllipse,
    [0, 0.15],
    [40, 100]
  );

  const fadeEnd = useTransform(
    scrollYProgressEllipse,
    [0, 0.15],
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
            className="w-full h-full rounded-[100%] border-t-[1px] border-gray-200"
            style={{
              transform: 'translateY(-65%)',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
              backgroundColor: backgroundColor,
            }}
          />
        </div>

        {/* CONTENIDO SUBIDO MÁS ARRIBA (más pegado al arco) */}
        <div className="relative pt-48 pb-32 px-4"> {/* ← pt-48 en vez de pt-64 */}
          <div className="max-w-[1225px] mx-auto">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-20"> {/* ← items-start */}

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

              {/* TEXTO DERECHA - 100% COMO ANTES (tamaños, fuentes, tracking, etc.) */}
              <div className="flex-1 max-w-[520px]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-['Inter_Tight',sans-serif] text-[#F6941D] text-sm font-medium tracking-[2.2px] uppercase mb-2.5"
                >
                  {subText}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="m-0 mb-5 font-medium text-[40px] leading-[50px] font-['Inter_Tight',sans-serif] text-[#071332] tracking-[-0.8px]"
                >
                  {heading}{' '}
                  <span className="bg-gradient-to-r from-[#0F4C81] via-[#0066CC] to-[#00D4FF] bg-clip-text text-transparent">
                    {highlightText}
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="m-0 font-['DM_Sans',sans-serif] text-[#4B497E] text-base leading-[25px] font-medium tracking-[-0.2px]"
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