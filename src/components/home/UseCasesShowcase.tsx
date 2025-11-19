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

  const ctrl1 = useAnimationControls(); // top.svg
  const ctrl2 = useAnimationControls(); // client.svg (pequeña)
  const ctrl3 = useAnimationControls(); // right.svg
  const ctrl4 = useAnimationControls(); // logo (se mantiene)
  const ctrl5 = useAnimationControls(); // down.svg

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
    <section ref={ref} className="relative overflow-hidden py-28 px-4 w-full bg-white mb-[50px]">
      <div className="max-w-[1225px] mx-auto">
        <div className="flex items-center justify-between gap-20 relative flex-col lg:flex-row">

          {/* LEFT PART - IMÁGENES */}
          <div className="relative flex-1 max-w-[495px] z-10 w-full">
            {/* Imagen principal */}
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="/images/background.svg"
                alt="Main background"
                className="w-full h-auto object-cover"
                width={495}
                height={660}
              />
            </div>

            {/* 1. Izquierda → top.svg */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={ctrl1}
              onMouseEnter={() => replayAnimation(ctrl1, { opacity: 0, x: -50 }, { opacity: 1, x: 0 })}
              className="absolute top-[106px] left-5 w-[406px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="/images/top.svg" alt="Top overlay" className="w-full h-auto object-cover" />
            </motion.div>

            {/* 2. Pequeña → client.svg */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ctrl2}
              onMouseEnter={() => replayAnimation(ctrl2, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })}
              className="absolute top-[106px] right-[-30px] w-[69px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="/images/client.svg" alt="Client icon" className="w-full h-auto object-cover" />
            </motion.div>

            {/* 3. Derecha → right.svg */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={ctrl3}
              onMouseEnter={() => replayAnimation(ctrl3, { opacity: 0, x: 50 }, { opacity: 1, x: 0 })}
              className="absolute top-[238px] right-[-104px] w-[431px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="/images/right.svg" alt="Right overlay" className="w-full h-auto object-cover" />
            </motion.div>

            {/* 4. Logo (se mantiene tu logo original) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={ctrl4}
              onMouseEnter={() => replayAnimation(ctrl4, { opacity: 0, scale: 0.8, rotate: -180 }, { opacity: 1, scale: 1, rotate: 0 }, 0.8)}
              className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center p-5">
                <img src="/images/client-connect-australia-logo.png" alt="Client Connect Australia" className="w-full h-full object-contain" />
              </div>
            </motion.div>

            {/* 5. Inferior → down.svg */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={ctrl5}
              onMouseEnter={() => replayAnimation(ctrl5, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })}
              className="absolute bottom-0 left-0 w-[406px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="/images/down.svg" alt="Bottom overlay" className="w-full h-auto object-cover" />
            </motion.div>
          </div>

          {/* RIGHT PART - Texto */}
          <div className="flex flex-col items-start gap-3 flex-1 max-w-[520px] w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-['Inter_Tight',sans-serif] text-[#5200EE] text-sm font-medium tracking-[2.2px] uppercase mb-2.5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {subText}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="m-0 mb-5 font-medium text-[40px] leading-[50px] font-['Inter_Tight',sans-serif] text-[#071332] tracking-[-0.8px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {heading}{' '}
                <span
                  className="bg-gradient-to-r from-[#0F4C81] via-[#0066CC] to-[#00D4FF] bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  {highlightText}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="m-0 font-['DM_Sans',sans-serif] text-[#4B497E] text-base leading-[25px] font-medium tracking-[-0.2px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};