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

  const controls = Array(5).fill(null).map(() => useAnimationControls());

  React.useEffect(() => {
    if (isInView) {
      controls.forEach((ctrl, i) => {
        setTimeout(() => {
          ctrl.start({ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 });
        }, 600 + i * 100);
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative bg-white -mt-16">
      {/* ARCO BLANCO PERFECTO - ESTE SÍ SE VE */}
      <div className="absolute inset-x-0 top-0 h-80 pointer-events-none">
        <div
          className="w-full h-full bg-white rounded-[100%]"
          style={{
            transform: 'translateY(-65%)',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
      </div>

      {/* CONTENIDO PEGADITO AL ARCO */}
      <div className="relative pt-64 pb-32 px-4">
        <div className="max-w-[1225px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-20">

            {/* IMÁGENES IZQUIERDA */}
            <div className="relative flex-1 max-w-[495px] translate-x-[80px]">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img src="/images/background.svg" alt="" className="w-full" />
              </div>

              {['top', 'client', 'right', null, 'down'].map((img, i) => {
                if (!img && i === 3) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                      animate={controls[i]}
                      className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer"
                    >
                      <div className="w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center p-5">
                        <img src="/images/client-connect-australia-logo.png" alt="" className="w-full h-full object-contain" />
                      </div>
                    </motion.div>
                  );
                }
                if (!img) return null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i === 0 ? -50 : i === 2 ? 50 : 0, y: i === 4 ? 50 : 0, scale: i === 1 ? 0.8 : 1 }}
                    animate={controls[i]}
                    className={`absolute ${i === 0 ? 'top-[106px] left-5 w-[406px]' : i === 1 ? 'top-[106px] -right-8 w-[69px]' : i === 2 ? 'top-[238px] -right-24 w-[431px]' : 'bottom-0 left-0 w-[406px]'} cursor-pointer`}
                  >
                    <img src={`/images/${img}.svg`} alt="" className="w-full" />
                  </motion.div>
                );
              })}
            </div>

            {/* TEXTO DERECHA */}
            <div className="flex-1 max-w-[520px]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#F6941D] text-sm font-medium uppercase tracking-widest mb-3">
                {subText}
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl lg:text-5xl font-medium text-[#071332] leading-tight mb-6">
                {heading}{' '}
                <span className="bg-gradient-to-r from-[#0F4C81] via-[#0066CC] to-[#00D4FF] bg-clip-text text-transparent">
                  {highlightText}
                </span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#4B497E] text-lg leading-relaxed">
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};