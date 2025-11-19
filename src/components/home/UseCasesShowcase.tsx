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
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  const replay = (ctrl: any, from: any, to: any) => {
    ctrl.set(from);
    ctrl.start(to);
  };

  return (
    <section ref={ref} className="relative bg-white -mt-64 overflow-hidden">
      {/* ARCO BLANCO GRANDE Y PERFECTO - AHORA SÍ SE VE */}
      <div className="absolute inset-x-0 top-0 h-96">
        <div
          className="w-full h-full bg-white"
          style={{
            borderRadius: '50%',
            transform: 'translateY(-70%)',
            boxShadow: '0 20px 30px -10px rgba(0,0,0,0.08)',
          }}
        />
      </div>

      {/* CONTENIDO PEGADITO AL ARCO */}
      <div className="relative z-10 pt-48 pb-32 px-4">
        <div className="max-w-[1225px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-20">

            {/* IMÁGENES IZQUIERDA */}
            <div className="relative flex-1 max-w-[495px] translate-x-[80px]">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img src="/images/background.svg" alt="Background" className="w-full" />
              </div>

              <motion.div initial={{ opacity: 0, x: -50 }} animate={ctrl1} onMouseEnter={() => replay(ctrl1, { opacity: 0, x: -50 }, { opacity: 1, x: 0 })} className="absolute top-[106px] left-5 w-[406px] cursor-pointer">
                <img src="/images/top.svg" alt="" className="w-full" />
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={ctrl2} onMouseEnter={() => replay(ctrl2, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })} className="absolute top-[106px] -right-8 w-[69px] cursor-pointer">
                <img src="/images/client.svg" alt="" className="w-full" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={ctrl3} onMouseEnter={() => replay(ctrl3, { opacity: 0, x: 50 }, { opacity: 1, x: 0 })} className="absolute top-[238px] -right-24 w-[431px] cursor-pointer">
                <img src="/images/right.svg" alt="" className="w-full" />
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -90 }} animate={ctrl4} onMouseEnter={() => replay(ctrl4, { opacity: 0, scale: 0.8, rotate: -90 }, { opacity: 1, scale: 1, rotate: 0 })} className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer">
                <div className="w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center p-5">
                  <img src="/images/client-connect-australia-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} animate={ctrl5} onMouseEnter={() => replay(ctrl5, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })} className="absolute bottom-0 left-0 w-[406px] cursor-pointer">
                <img src="/images/down.svg" alt="" className="w-full" />
              </motion.div>
            </div>

            {/* TEXTO DERECHA */}
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