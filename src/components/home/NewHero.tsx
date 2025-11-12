import React, { useEffect, useState, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Send, Calendar } from 'lucide-react';
import { motion } from "framer-motion";

export function NewHero() {
  const ref = React.useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  
  const words = useMemo(
    () => ["Light", "Leads", "Clients", "Sales"],
    []
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Transformación suave del color de fondo basada en el scroll dentro del componente
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "rgb(10, 15, 35)",   // Azul espacial casi negro (inicio)
      "rgb(20, 35, 90)"    // Azul más claro (final)
    ]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === words.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, words]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        backgroundColor 
      }}
      className="h-[200vh] w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
    >
      {/* Contenido con texto y CTAs */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        <div className="z-10 flex flex-col items-center justify-center gap-4 max-w-[976px] px-5 relative">
          
          {/* Lamp Effect */}
          <div className="w-full h-[80px] relative flex items-center justify-center">
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
              <motion.div 
                className="absolute w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" 
                style={{ backgroundColor }} 
              />
              <motion.div 
                className="absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" 
                style={{ backgroundColor }} 
              />
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
              <motion.div 
                className="absolute w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" 
                style={{ backgroundColor }} 
              />
              <motion.div 
                className="absolute w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" 
                style={{ backgroundColor }} 
              />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" 
              style={{ backgroundColor }}
            />
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
              whileInView={{ opacity: 1, width: "30rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
            ></motion.div>

            <motion.div 
              className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]" 
              style={{ backgroundColor }}
            />
          </div>

          {/* Título principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-3xl md:text-[52px] font-light leading-tight md:leading-[60px] text-center text-white relative z-50 -mt-8"
            style={{
              fontFamily: '"Inter Display", sans-serif',
              letterSpacing: '-1.5px',
            }}
          >
            We Bring{" "}
            <span className="relative inline-block" style={{ minWidth: '160px' }}>
              <span className="invisible font-semibold">Light</span>
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="absolute inset-0 font-semibold flex items-center justify-center"
                  initial={{ opacity: 0, y: -100 }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? 100 : -50,
                          opacity: 0,
                        }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </span>{" "}
            to Your Business Growth
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-base md:text-[18px] font-normal leading-relaxed md:leading-[27px] text-center text-white/80 max-w-[683px] relative z-50 mt-6 mb-6"
            style={{
              fontFamily: '"Inter Display", sans-serif',
              letterSpacing: '0.2px'
            }}
          >
            We help businesses dominate Google, convert more customers, and scale through strategic SEO, high-converting web design, and targeted advertising.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.9,
                duration: 0.8,
                ease: "easeOut",
            }}
            className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto relative z-50">
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
              className="flex items-center justify-center gap-1.5 h-[42px] bg-[#06B6D4] hover:bg-[#0891B2] rounded-[50px] px-5 py-3 transition-all cursor-pointer shadow-lg w-full sm:w-auto" 
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
          </motion.div>

          {/* Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.1,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="flex items-center justify-center gap-2 flex-wrap relative z-50 mt-5">
            <div className="h-[23px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 flex items-center justify-center">
              <p className="text-[11px] font-medium leading-[16.6px] text-center text-white/80">
                Google Partner
              </p>
            </div>

            <div className="h-[23px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 flex items-center justify-center">
              <p className="text-[11px] font-medium leading-[16.6px] text-center text-white/80">
                5★ Rated Agency
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}