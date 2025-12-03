import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveCardStack } from '@/components/home/InteractiveCardStack';

// @component: BoxCards
const BoxCards = () => {
  return (
    <section id="box-cards" className="grow relative w-full overflow-visible bg-white flex flex-col">
      {/* Top Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute top-0 z-10" />

      <div className="relative z-[1] w-full max-w-[1280px] ml-0 mr-auto">
        <div className="relative flex flex-col lg:flex-row items-stretch">
          
          {/* Left Column: Content (Ahora a la izquierda) */}
          {/* Note: Cambiado lg:pl-16 por lg:pr-16 y paddingLeft por paddingRight para mantener el espacio contra el borde central */}
          <div className="py-16 lg:py-32 flex flex-col justify-center gap-4 w-full lg:w-1/2 shrink-0 lg:pr-16 relative z-10 px-6 lg:px-0" style={{ paddingRight: 'calc(4rem + 20px)' }}>
            <div className="flex flex-col gap-6 max-w-[520px] ml-auto"> 
              {/* ml-auto añadido arriba para alinear el contenido cerca del centro si se desea, 
                  o puedes quitarlo para alineación estándar a la izquierda. 
                  Basado en el original, el texto estaba "pegado" al divider. */}
              
              {/* OUR APPROACH */}
              <div className="text-sm font-medium tracking-[2.2px] uppercase text-gray-500">
                OUR APPROACH
              </div>

              {/* Main Heading with gradient highlight */}
              <h2 className="text-[26px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] tracking-tight text-gray-900">
                Marketing strategies that transform your business into{' '}
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
                  market leaders
                </motion.span>
                <span className="text-gray-900">.</span>
              </h2>

              {/* Description */}
              <p className="text-[14px] md:text-[16px] font-medium leading-relaxed text-gray-600 tracking-tight">
                We combine data-driven insights, creative excellence, and proven strategies to deliver marketing solutions that drive growth and exceed expectations.
              </p>
            </div>
          </div>

          {/* Vertical Divider (Desktop only) */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200 z-10" />

          {/* Horizontal Divider (Mobile only) */}
          <div className="lg:hidden w-screen h-[1px] bg-zinc-200 mb-0 -ml-6" />

          {/* Right Column: InteractiveCardStack (Ahora a la derecha) */}
          <div className="relative w-full lg:w-1/2 min-h-[480px] md:min-h-[640px] lg:min-h-auto flex items-center justify-start overflow-visible self-stretch m-0 p-0">
            <div className="w-full h-full flex items-center justify-start m-0 p-0">
              <InteractiveCardStack />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Border */}
      <div className="w-full h-[1px] bg-zinc-200 absolute bottom-0 z-10" />
    </section>
  );
};

export default BoxCards;