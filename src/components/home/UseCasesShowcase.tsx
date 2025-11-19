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

  const controls = [
    useAnimationControls(),
    useAnimationControls(),
    useAnimationControls(),
    useAnimationControls(),
    useAnimationControls(),
  ];

  React.useEffect(() => {
    if (isInView) {
      controls[0].start({ opacity: 1, x: 0, transition: { delay: 0.6 } });
      controls[1].start({ opacity: 1, scale: 1, transition: { delay: 0.7 } });
      controls[2].start({ opacity: 1, x: 0, transition: { delay: 0.8 } });
      controls[3].start({ opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.9 } });
      controls[4].start({ opacity: 1, y: 0, transition: { delay: 1.0 } });
    }
  }, [isInView]);

  const replay = (ctrl: any, from: any, to: any) => {
    ctrl.set(from);
    ctrl.start(to);
  };

  return (
    <section ref={ref} className="relative">
      {/* ARCO QUE OCUPA TODO EL ANCHO DE LA PANTALLA (100vw) */}
      <div className="fixed inset-x-0 top-0 h-96 pointer-events-none z-40">
        <div
          className="absolute inset-x-0 -bottom-48 h-96 bg-white"
          style={{
            borderRadius: '50%',
            transform: 'translateY(-65%)',
          }}
        />
      </div>

      {/* CONTENIDO CON FONDO BLANCO */}
      <div className="relative z-50 bg-white pt-56 pb-32">
        <div className="max-w-[1225px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-20">

            {/* IMÁGENES */}
            <div className="relative flex-1 max-w-[495px] translate-x-[80px]">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img src="/images/background.svg" alt="" className="w-full" />
              </div>

              <motion.div initial={{ opacity: 0, x: -50 }} animate={controls[0]} onMouseEnter={() => replay(controls[0], { opacity: 0, x: -50 }, { opacity: 1, x: 0 })} className="absolute top-[106px] left-5 w-[406px] cursor-pointer">
                <img src="/images/top.svg" alt="" className="w-full" />
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={controls[1]} onMouseEnter={() => replay(controls[1], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })} className="absolute top-[106px] -right-8 w-[69px] cursor-pointer">
                <img src="/images/client.svg" alt="" className="w-full" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={controls[2]} onMouseEnter={() => replay(controls[2], { opacity: 0, x: 50 }, { opacity: 1, x: 0 })} className="absolute top-[238px] -right-24 w-[431px] cursor-pointer">
                <img src="/images/right.svg" alt="" className="w-full" />
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -90 }} animate={controls[3]} onMouseEnter={() => replay(controls[3], { opacity: 0, scale: 0.8, rotate: -90 }, { opacity: 1, scale: 1, rotate: 0 })} className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer">
                <div className="w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center p-5">
                  <img src="/images/client-connect-australia-logo.png" alt="" className="w-full h-full object-contain" />
                </div>
              </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} animate={controls[4]} onMouseEnter={() => replay(controls[4], { opacity: 0, y: 50 }, { opacity: 1, y: 0 })} className="absolute bottom-0 left-0 w-[406px] cursor-pointer">
                <img src="/images/down.svg" alt="" className="w-full" />
              </motion.div>
            </div>

            {/* TEXTO */}
            <div className="flex-1 max-w-[520px]">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#F6941D] text-sm font-medium uppercase tracking-widest mb-3">
                {subText}
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-medium text-[#071332] leading-tight -tracking-tight mb-6">
                {heading}{' '}
                <span className="bg-gradient-to-r from-[#0F4C81] via-[#0066CC] to-[#00D4FF] bg-clip-text text-transparent">
                  {highlightText}
                </span>
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#4B497E] text-lg leading-relaxed">
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};