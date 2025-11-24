import React, { useEffect, useState, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Send, Calendar } from 'lucide-react';
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";

export function FinalHero() {
  const ref = React.useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const words = useMemo(
    () => ["Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales", "Light", "Leads", "Clients", "Sales"],
    []
  );

  const wordWidths = {
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
      "rgb(0, 0, 0)",
      "rgb(25, 25, 25)"
    ]
  );

  // Fade out para el contenido
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [1, 1, 0]
  );

  const contentBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [0, 0, 10]
  );

  // Transform para el color del arco (igual que tenía el círculo)
  const arcBackground = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgb(5, 10, 25)",
      "rgb(5, 10, 25)",
      "rgb(255, 255, 255)"
    ]
  );

  // Transform para el color del borde del arco
  const arcBorderColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(255, 255, 255, 0.2)",
      "rgba(255, 255, 255, 0.2)",
      "rgba(255, 255, 255, 1)"
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
      className="h-[130vh] w-full dark:border dark:border-white/[0.1] relative overflow-clip"
    >
      <div className="top-[-20px] h-[100vh] flex justify-center pt-12">
        <motion.div 
          className="z-10 flex flex-col items-center justify-center gap-2 w-full px-5 relative"
          style={{
            opacity: contentOpacity,
            filter: useTransform(contentBlur, (value) => `blur(${value}px)`)
          }}
        >

          {/* LAMP + TÍTULO */}
          <div className="flex flex-col items-center gap-[-20px]">
            {/* Lamp Effect */}
            <div className="w-full h-[80px] relative flex items-center justify-center pt-80 overflow-visible">
              <motion.div
                initial={{ opacity: 0, width: "15rem" }}
                animate={{ 
                  opacity: 1, 
                  width: "30rem",
                  "--gradient-color": ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  width: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  "--gradient-color": { duration: 8, ease: "linear", repeat: Infinity }
                }}
                style={{ 
                  backgroundImage: `conic-gradient(var(--conic-position), var(--gradient-color) 0%, transparent 50%, transparent 100%)`,
                  "--gradient-color": "#edbf86"
                } as any}
                className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white [--conic-position:from_70deg_at_center_top]"
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
                animate={{ 
                  opacity: 1, 
                  width: "30rem",
                  "--gradient-color": ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  width: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  "--gradient-color": { duration: 8, ease: "linear", repeat: Infinity }
                }}
                style={{ 
                  backgroundImage: `conic-gradient(var(--conic-position), transparent 0%, transparent 50%, var(--gradient-color) 100%)`,
                  "--gradient-color": "#edbf86"
                } as any}
                className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white [--conic-position:from_290deg_at_center_top]"
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
                animate={{ 
                  opacity: 0.5,
                  backgroundColor: ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  backgroundColor: { duration: 8, ease: "linear", repeat: Infinity }
                }}
                className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full blur-3xl"
              />

              <motion.div
                initial={{ opacity: 0, width: "8rem" }}
                animate={{ 
                  opacity: 1, 
                  width: "16rem",
                  backgroundColor: ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  width: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  backgroundColor: { duration: 8, ease: "linear", repeat: Infinity }
                }}
                className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, width: "15rem" }}
                animate={{ 
                  opacity: 1, 
                  width: "30rem",
                  backgroundColor: ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  width: { delay: 0.8, duration: 1.0, ease: "easeInOut" },
                  backgroundColor: { duration: 8, ease: "linear", repeat: Infinity }
                }}
                className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
              ></motion.div>

              <motion.div
                className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
                style={{ backgroundColor }}
              />
            </div>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[38px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-center text-white relative z-50"
              style={{ fontFamily: '"Inter Display", sans-serif' }}
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
                    className="font-bold"
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
            initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
            className="text-base md:text-[18px] font-normal leading-relaxed md:leading-[26px] text-center text-white/80 max-w-[683px] relative z-50 mt-5 mb-5"
            style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '0.2px' }}
          >
            We help businesses dominate Google, convert more customers, and scale through strategic SEO, high-converting web design, and targeted advertising.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto relative z-[100]"
          >
            <a href="#contact" className="flex items-center justify-center gap-[7px] h-[42px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-[50px] px-4 py-2 transition-[background-color,box-shadow] duration-[500ms] cursor-pointer w-full sm:w-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-[100] will-change-[background-color,box-shadow]">
              <p className="text-[14px] font-medium leading-5 text-white whitespace-nowrap" style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '0.2px' }}>
                How we do it
              </p>
            </a>
            <motion.a 
              href="#contact"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{
                borderColor: ["#edbf86", "#de8363", "#67bcb7", "#edbf86"],
                backgroundColor: isHovered 
                  ? ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                  : "rgba(255, 255, 255, 0)"
              }}
              transition={{
                borderColor: { duration: 8, ease: "linear", repeat: Infinity },
                backgroundColor: { duration: 8, ease: "linear", repeat: Infinity }
              }}
              className="flex items-center justify-center gap-1.5 h-[42px] backdrop-blur-sm border rounded-[50px] px-5 py-3 transition-shadow duration-[500ms] cursor-pointer w-full sm:w-auto hover:shadow-[0_0_20px_rgba(103,232,249,0.5)] relative z-[100] will-change-[background-color,box-shadow]"
            >
              <motion.div 
                className="w-[18px] h-[14px] relative overflow-hidden"
                animate={{
                  color: isHovered 
                    ? "#000000"
                    : ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                }}
                transition={{
                  color: isHovered 
                    ? { duration: 0.3 }
                    : { duration: 8, ease: "linear", repeat: Infinity }
                }}
              >
                <Calendar className="w-[17px] h-[14px]" />
              </motion.div>
              <motion.p 
                className="text-[14px] font-medium leading-5 whitespace-nowrap z-[1]" 
                style={{ fontFamily: '"Inter Display", sans-serif', letterSpacing: '0.2px' }}
                animate={{
                  color: isHovered 
                    ? "#000000"
                    : ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                }}
                transition={{
                  color: isHovered 
                    ? { duration: 0.3 }
                    : { duration: 8, ease: "linear", repeat: Infinity }
                }}
              >
                Book Free Consultation
              </motion.p>
            </motion.a>
          </motion.div>

          {/* Trusted Brands */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
            className="w-full mt-12 relative z-50"
          >
            <div className="mx-auto w-full max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 3.4, duration: 0.8, ease: "easeOut" }}
                className="text-center text-2xl md:text-[16px] leading-tight"
              >
                <motion.span 
                  animate={{
                    color: ["#edbf86", "#de8363", "#67bcb7", "#edbf86"]
                  }}
                  transition={{
                    duration: 8,
                    ease: "linear",
                    repeat: Infinity
                  }}
                >
                  Trusted by experts.
                </motion.span>
                <br />
                <span className="text-white">Used by the leaders.</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 4.2, duration: 0.8, ease: "easeOut" }}
                className="mt-6 grid grid-cols-5 text-white"
              >
                <div className="w-full flex items-center justify-center text-white text-lg font-medium">Retool</div>
                <div className="w-full flex items-center justify-center text-white text-lg font-medium">Vercel</div>
                <div className="w-full flex items-center justify-center text-white text-lg font-medium">Remote</div>
                <div className="w-full flex items-center justify-center text-white text-lg font-medium">Arc</div>
                <div className="w-full flex items-center justify-center text-white text-lg font-medium">Raycast</div>
              </motion.div>
            </div>

            {/* Contenedor Sparkles - Arco y Sparkles */}
            <div className="relative -mt-20 -mb-24 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
              <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#06B6D4,transparent_70%)] before:opacity-40" />
              <Sparkles
                density={1200}
                className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                color="#ffffff"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}