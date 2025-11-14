import React, { useEffect, useState, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Send, Calendar } from 'lucide-react';
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";

export function NewHero() {
  const ref = React.useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);

  const words = useMemo(
    () => ["Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales"],
    []
  );

  const wordWidths: { [key: string]: number } = {
    "Light": 110,
    "Leads": 135,
    "Clients": 150,
    "Sales": 120
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "rgb(5, 10, 25)",
      "rgb(30, 50, 120)"
    ]
  );

  // Transforms para el círculo y el texto
  const circleBackground = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "rgb(5, 10, 25)",
      "rgb(22, 34, 69)",
      "rgb(103, 130, 214)",
      "rgb(255, 255, 255)"
    ]
  );

  const belowArcTextColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgb(255, 255, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)"
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
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, words]);

  const currentWord = words[titleNumber];
  const currentWidth = wordWidths[currentWord] || 100;

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor }}
      className="h-[200vh] w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
    >
      <div className="top-[-40px] h-[150vh] flex justify-center pt-32">
        <div className="z-10 flex flex-col items-center justify-center gap-4 w-full px-5 relative">

          {/* LAMP + TÍTULO: superpuestos 30px */}
          <div className="flex flex-col items-center gap-[-30px]">
            {/* Lamp Effect */}
            <div className="w-full h-[80px] relative flex items-center justify-center pt-80 overflow-visible">
              <motion.div
                initial={{ opacity: 0, width: "15rem" }}
                animate={{ opacity: 1, width: "30rem" }}
                transition={{ delay: 0.8, duration: 1.0, ease: "easeInOut" }}
                style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
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
                initial={{ opacity: 0, width: "15rem" }}
                animate={{ opacity: 1, width: "30rem" }}
                transition={{ delay: 0.8, duration: 1.0, ease: "easeInOut" }}
                style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 0.8, duration: 1.0, ease: "easeInOut" }}
                className="absolute top-1/2 z-50 h-48 w-full bg-transparent backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 blur-3xl"
              />

              <motion.div
                initial={{ opacity: 0, width: "8rem" }}
                animate={{ opacity: 1, width: "16rem" }}
                transition={{ delay: 0.8, duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, width: "15rem" }}
                animate={{ opacity: 1, width: "30rem" }}
                transition={{ delay: 0.8, duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
              ></motion.div>

              <motion.div
                className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
                style={{ backgroundColor }}
              />
            </div>

            {/* Título principal (sin mt-0) */}
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-[50px] font-light leading-tight md:leading-[60px] text-center text-white relative z-50"
              style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '-1.5px' }}
            >
              We Bring{" "}
              <motion.span
                className="relative inline-flex items-center overflow-hidden"
                animate={{ width: currentWidth }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ minHeight: '1em' }}
              >
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    className="font-light"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50, opacity: { duration: 0.2 } }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1, position: "relative" }
                        : { y: titleNumber > index ? 20 : -50, opacity: 0, position: "absolute", top: 0, left: 0 }
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>{" "}
              to Your Business Growth
            </motion.h1>
          </div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
            className="text-base md:text-[18px] font-normal leading-relaxed md:leading-[20px] text-center text-white/80 max-w-[683px] relative z-50 mt-6 mb-6"
            style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '0.2px' }}
          >
            We help businesses dominate Google, convert more customers, and scale through strategic SEO, high-converting web design, and targeted advertising.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto relative z-[100]"
          >
            <a href="#contact" className="flex items-center justify-center gap-[7px] h-[42px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-[50px] px-4 py-2 transition-all duration-[650ms] cursor-pointer w-full sm:w-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-[100]">
              <p className="text-[14px] font-medium leading-5 text-white whitespace-nowrap" style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '0.2px' }}>
                How we do it
              </p>
            </a>
            <a href="#contact" className="flex items-center justify-center gap-1.5 h-[42px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-cyan-300/80 rounded-[50px] px-5 py-3 transition-all duration-[650ms] cursor-pointer w-full sm:w-auto hover:shadow-[0_0_20px_rgba(103,232,249,0.5)] relative z-[100]">
              <div className="w-[18px] h-[14px] relative overflow-hidden">
                <Calendar className="w-[17px] h-[14px] text-cyan-300" />
              </div>
              <p className="text-[14px] font-medium leading-5 text-cyan-300 whitespace-nowrap z-[1]" style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '0.2px' }}>
                Book Free Consultation
              </p>
            </a>
          </motion.div>

          {/* Trusted Brands */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 0.8, ease: "easeOut" }}
            className="w-full mt-16 relative z-50"
          >
            <div className="mx-auto w-full max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2, duration: 0.8, ease: "easeOut" }}
                className="text-center text-2xl md:text-[16px] leading-tight"
              >
                <span className="text-cyan-300">Trusted by experts.</span>
                <br />
                <span className="text-white">Used by the leaders.</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2, duration: 0.8, ease: "easeOut" }}
                className="mt-6 grid grid-cols-5 text-white"
              >
                <Retool />
                <Vercel />
                <Remote />
                <Arc />
                <Raycast />
              </motion.div>
            </div>

            {/* Sparkles Effect */}
            <div className="relative  -mt-[570px] h-[1300px] w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#06B6D4,transparent_70%)] before:opacity-40" />
              
              {/* Círculo completo con transición de color y título dentro */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.4, duration: 0.8, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 w-[2000vw] h-[2000vw] max-w-[2000px] max-h-[2000px] z-10 rounded-full border border-white/20 -translate-x-1/2 flex items-center justify-center" 
                style={{ backgroundColor: circleBackground }} 
              >
                {/* Título dentro del círculo */}
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.6, duration: 0.8, ease: "easeOut" }}
                  style={{ 
                    fontFamily: '"Inter Display", sans-serif', 
                    letterSpacing: '-1.2px',
                    color: belowArcTextColor
                  }}
                  className="text-2xl md:text-[40px] font-light leading-tight md:leading-[50px] text-center relative z-50 px-8"
                >
                  Your New Title Here
                </motion.h2>
              </motion.div>
              
              <Sparkles
                density={1200}
                className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                color="#ffffff"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Logos como texto
const Retool = () => (
  <div className="w-full flex items-center justify-center text-white text-lg font-medium">
    Retool
  </div>
);

const Vercel = () => (
  <div className="w-full flex items-center justify-center text-white text-lg font-medium">
    Vercel
  </div>
);

const Remote = () => (
  <div className="w-full flex items-center justify-center text-white text-lg font-medium">
    Remote
  </div>
);

const Arc = () => (
  <div className="w-full flex items-center justify-center text-white text-lg font-medium">
    Arc
  </div>
);

const Raycast = () => (
  <div className="w-full flex items-center justify-center text-white text-lg font-medium">
    Raycast
  </div>
);