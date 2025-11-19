import React from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';

export const UseCasesShowcase = (props: UseCasesShowcaseProps) => {
  const { subText = 'our approach', heading = 'Marketing strategies that transform your business into', highlightText = 'market leaders', description = '...', useCases = defaultUseCases } = props;

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Controles para cada overlay
  const ctrl1 = useAnimationControls();
  const ctrl2 = useAnimationControls();
  const ctrl3 = useAnimationControls();
  const ctrl4 = useAnimationControls();
  const ctrl5 = useAnimationControls();

  // Animación inicial al entrar en vista
  React.useEffect(() => {
    if (isInView) {
      ctrl1.start({ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.6 } });
      ctrl2.start({ opacity: 1, scale: 1, transition: { delay: 0.7, duration: 0.6 } });
      ctrl3.start({ opacity: 1, x: 0, transition: { delay: 0.8, duration: 0.6 } });
      ctrl4.start({ opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.9, duration: 0.8 } });
      ctrl5.start({ opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.6 } });
    }
  }, [isInView]);

  const replay = (ctrl: any, from: any, to: any, duration = 0.6) => {
    ctrl.set(from);           // ← Vuelve al estado inicial instantáneamente
    ctrl.start(to, { duration, delay: 0 }); // ← Anima al estado final
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-28 px-4 w-full bg-white mb-[50px]">
      <div className="max-w-[1225px] mx-auto">
        <div className="flex items-center justify-between gap-20 relative flex-col lg:flex-row">

          <div className="relative flex-1 max-w-[495px] z-10 w-full">
            <div className="overflow-hidden rounded-[20px]">
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c444_kloudera-home-one-cases-image.svg" alt="Main" className="w-full h-auto object-cover" />
            </div>

            {/* 1. Izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={ctrl1}
              onMouseEnter={() => replay(ctrl1, { opacity: 0, x: -50 }, { opacity: 1, x: 0 })}
              className="absolute top-[106px] left-5 w-[406px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c445_kloudera-home-one-cases-image.svg" alt="" className="w-full" />
            </motion.div>

            {/* 2. Pequeña */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ctrl2}
              onMouseEnter={() => replay(ctrl2, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })}
              className="absolute top-[106px] right-[-30px] w-[69px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c446_kloudera-home-one-cases-image.svg" alt="" className="w-full" />
            </motion.div>

            {/* 3. Derecha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={ctrl3}
              onMouseEnter={() => replay(ctrl3, { opacity: 0, x: 50 }, { opacity: 1, x: 0 })}
              className="absolute top-[238px] right-[-104px] w-[431px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c447_kloudera-home-one-cases-image.svg" alt="" className="w-full" />
            </motion.div>

            {/* 4. Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={ctrl4}
              onMouseEnter={() => replay(ctrl4, { opacity: 0, scale: 0.8, rotate: -180 }, { opacity: 1, scale: 1, rotate: 0 }, 0.8)}
              className="absolute top-[323px] left-[45px] w-[109px] h-[109px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center p-5">
                <img src="/images/client-connect-australia-logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </motion.div>

            {/* 5. Inferior */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={ctrl5}
              onMouseEnter={() => replay(ctrl5, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })}
              className="absolute bottom-0 left-0 w-[406px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="https://cdn.prod.website-files.com/6814558f14d25d33c9781a2f/68c94d509d1ce6056423c449_kloudera-home-one-cases-image.svg" alt="" className="w-full" />
            </motion.div>
          </div>

          {/* DERECHA - sin tocar */}
          {/* ... todo tu contenido original ... */}
        </div>
      </div>
    </section>
  );
};