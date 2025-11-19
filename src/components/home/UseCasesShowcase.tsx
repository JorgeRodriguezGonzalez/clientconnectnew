import React from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';

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
    <section ref={ref} className="relative overflow-hidden">

      {/* ARCO SUPERIOR PERFECTO Y PRONUNCIADO */}
      <div className="absolute inset-x-0 top-0 h-96 -translate-y-72 pointer-events-none">
        <div
          className="w-full h-full bg-white"
          style={{
            borderRadius: '50% 50% 0 0 / 380% 380% 0 0',
            transform: 'scaleY(0.9)',
            transformOrigin: 'bottom',
          }}
        />
      </div>

      {/* CONTENIDO CON FONDO BLANCO DESDE EL ARCO HACIA ABAJO */}
      <div className="relative z-10 bg-white pt-64 pb-28 px-4">
        <div className="max-w-[1225px] mx-auto">
          <div className="flex items-center justify-between gap-20 flex-col lg:flex-row">

            {/* IMÁGENES IZQUIERDA */}
            <div className="relative flex-1 max-w-[495px] z-10 w-full translate-x-[80px]">
              <div className="overflow-hidden rounded-[20px]">
                <img src="/images/background.svg" alt="Background" className="w-full h-auto object-cover" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={ctrl1}
                onMouseEnter={() => replayAnimation(ctrl1, { opacity: 0, x: -50 }, { opacity: 1, x: 0 })}
                className="absolute top-[106px] left-5 w-[406px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src="/images/top.svg" alt="" className="w-full h-auto" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={ctrl2}
                onMouseEnter={() => replayAnimation(ctrl2, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })}
                className="absolute top-[106px] right-[-30px] w-[69px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src="/images/client.svg" alt="" className="w-full h-auto" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={ctrl3}
                onMouseEnter={() => replayAnimation(ctrl3, { opacity: 0, x: 50 }, { opacity: 1, x: 0 })}
                className="absolute top-[238px] right-[-104px] w-[431px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src="/images/right.svg" alt="" className="w-full h-auto" />
              </motion.div>

              {/* Logo - rotación 90° */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={ctrl4}
                onMouseEnter={() => replayAnimation(ctrl4, { opacity: 0, scale: 0.8, rotate: -90 }, { opacity: 1, scale: 1, rotate: 0 }, 0.8)}
                className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center p-5">
                  <img src="/images/client-connect-australia-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={ctrl5}
                onMouseEnter={() => replayAnimation(ctrl5, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })}
                className="absolute bottom-0 left-0 w-[406px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src="/images/down.svg" alt="" className="w-full h-auto" />
              </motion.div>
            </div>

            {/* TEXTO DERECHA */}
            <div className="flex flex-col items-start gap-3 flex-1 max-w-[520px] w-full">
              <div>
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
      </div>
    </section>
  );
};