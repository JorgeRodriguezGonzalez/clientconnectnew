import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { Send, Calendar } from 'lucide-react';
import { motion } from "framer-motion";

export function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0.4, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.4, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0.4, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.4, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.4, 0.8], [0, 1.2]);

  // Transformaciones para el gradiente: Azul espacial casi negro → Azul oscuro → Azul medio
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgb(10, 15, 35)",       // Azul espacial casi negro (inicio)
      "rgb(20, 35, 90)",       // Azul oscuro (medio)
      "rgb(35, 55, 140)"       // Azul medio oscuro (final)
    ]
  );

  // Transform para el overlay glassmorphism
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [0, 0.3, 0.6]
  );

  const overlayBlur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [0, 8, 16]
  );

  return (
    <motion.div
      ref={ref}
      style={{ 
        backgroundColor 
      }}
      className="h-[300vh] w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
    >
      {/* Contenido con texto y CTAs */}
      <div className="sticky top-0 h-screen flex items-start justify-center pt-32 md:pt-40">
        
        {/* Lamp Effect - posicionado en la parte superior */}
        <div className="absolute top-0 left-0 right-0 flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" style={{ backgroundColor: 'rgb(10, 15, 35)' }} />
            <div className="absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" style={{ backgroundColor: 'rgb(10, 15, 35)' }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" style={{ backgroundColor: 'rgb(10, 15, 35)' }} />
            <div className="absolute w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" style={{ backgroundColor: 'rgb(10, 15, 35)' }} />
          </motion.div>
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" style={{ backgroundColor: 'rgb(10, 15, 35)' }}></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "16rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
          ></motion.div>
          <motion.div
            initial={{ width: "15rem" }}
            whileInView={{ width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
          ></motion.div>

          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]" style={{ backgroundColor: 'rgb(10, 15, 35)' }}></div>
        </div>

        <div className="z-10 flex flex-col items-center justify-center gap-6 max-w-[976px] px-5">
          {/* Título principal */}
          <h1 
            className="text-4xl md:text-[64px] font-bold leading-tight md:leading-[70.4px] text-center text-white"
            style={{
              fontFamily: '"Inter Display", sans-serif',
              letterSpacing: '-1.8px',
            }}
          >
            Connecting Sydney Businesses with Their Ideal Clients
          </h1>
          
          {/* Subtítulo */}
          <p 
            className="text-base md:text-[18px] font-normal leading-relaxed md:leading-[27px] text-center text-white/80 max-w-[683px]"
            style={{
              fontFamily: '"Inter Display", sans-serif',
              letterSpacing: '0.2px'
            }}
          >
            We help businesses dominate Google, convert more customers, and scale through strategic SEO, high-converting web design, and targeted advertising.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            {/* CTA Secundario */}
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-[7px] h-[42px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-[50px] px-4 py-2 transition-all cursor-pointer w-full sm:w-auto" 
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <Send className="w-6 h-6 text-white" />
              </div>
              <p 
                className="text-[14px] font-medium leading-5 text-white whitespace-nowrap"
                style={{
                  fontFamily: '"Inter Display", sans-serif',
                  letterSpacing: '0.2px',
                }}
              >
                Message
              </p>
            </a>

            {/* CTA Principal */}
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-1.5 h-[42px] bg-[#F6941D] hover:bg-[#e58315] rounded-[50px] px-5 py-3 transition-all cursor-pointer shadow-lg w-full sm:w-auto" 
            >
              <div className="w-[18px] h-[14px] relative overflow-hidden">
                <Calendar className="w-[17px] h-[14px] text-white" />
              </div>
              <p 
                className="text-[14px] font-medium leading-5 text-white whitespace-nowrap z-[1]"
                style={{
                  fontFamily: '"Inter Display", sans-serif',
                  letterSpacing: '0.2px'
                }}
              >
                Book Free Consultation →
              </p>
            </a>
          </div>

          {/* Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="h-[23px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2px] px-3 flex items-center justify-center">
              <p className="text-[11px] font-medium leading-[16.6px] text-center text-white/80">
                Google Partner
              </p>
            </div>

            <div className="h-[23px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2px] px-3 flex items-center justify-center">
              <p className="text-[11px] font-medium leading-[16.6px] text-center text-white/80">
                5★ Rated Agency
              </p>
            </div>
          </div>

        </div>

        {/* Overlay glassmorphism que difumina el contenido del hero */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundColor: useTransform(
              overlayOpacity,
              (value) => `rgba(255, 255, 255, ${value * 0.1})`
            ),
            backdropFilter: useTransform(
              overlayBlur,
              (value) => `blur(${value}px)`
            ),
            WebkitBackdropFilter: useTransform(
              overlayBlur,
              (value) => `blur(${value}px)`
            ),
          }}
        />
      </div>

      {/* Efecto SVG de fondo */}
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        scrollYProgress={scrollYProgress}
      />
    </motion.div>
  );
}