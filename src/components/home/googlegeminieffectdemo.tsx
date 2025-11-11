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

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  // Transformaciones para el gradiente basadas en el scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      "rgb(50, 85, 210)",      // #3255D2 (azul inicial)
      "rgb(80, 40, 250)",      // #5028fa (morado medio)
      "rgb(120, 60, 240)",     // intermedio morado-blanco
      "rgb(255, 255, 255)"     // blanco final
    ]
  );

  return (
    <motion.div
      ref={ref}
      style={{ 
        backgroundColor 
      }}
      className="h-[400vh] w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
    >
      {/* Contenido con texto y CTAs */}
      <div className="sticky top-0 h-screen flex items-start justify-center pt-32 md:pt-40">
        <div className="z-10 flex flex-col items-center justify-center gap-6 max-w-[976px] px-5">
          {/* Badge superior */}
          <div className="flex items-center justify-center gap-1.5 h-[21px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2px] px-3 py-0.5">
            <div className="flex-shrink-0 w-4 h-4 rounded-[2px] overflow-hidden p-0.5">
              <div className="w-full h-full bg-green-500 rounded-full" />
            </div>
            <p className="text-[11px] font-medium leading-[16.6px] text-center whitespace-nowrap text-white/80">
              Sydney's Premier Marketing Agency • 100+ Happy Clients
            </p>
          </div>

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
      />
    </motion.div>
  );
}