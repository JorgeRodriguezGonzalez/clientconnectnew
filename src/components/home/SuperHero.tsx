import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Calendar } from 'lucide-react';

// --- FONTS STYLES ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
`;

// --- SPARKLES COMPONENT ---
const Sparkles = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  density,
  className,
}: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  density?: number;
  className?: string;
}) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    setInit(true);
  }, []);
  const controls = useAnimation();

  // Settings
  const particlesCount = density || 100;
  const generatedParticles = useRef<any[]>([]); 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!init || !canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
            canvas.width = width;
            canvas.height = height;
        }
    });
    resizeObserver.observe(containerRef.current);

    // Init Particles
    generatedParticles.current = [];
    for (let i = 0; i < particlesCount; i++) {
        generatedParticles.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * ((maxSize || 1) - (minSize || 0.5)) + (minSize || 0.5),
            speedX: (Math.random() - 0.5) * (speed || 1),
            speedY: (Math.random() - 0.5) * (speed || 1),
            opacity: Math.random(),
        });
    }

    let animationId: number;
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        generatedParticles.current.forEach((p) => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = particleColor || "#FFFFFF";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
        cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
    };
  }, [init, maxSize, minSize, speed, particleColor, particlesCount]);

  return (
    <motion.div animate={controls} className={className} ref={containerRef}>
      <canvas ref={canvasRef} />
    </motion.div>
  );
};


// --- MAIN COMPONENT ---

type SuperHeroProps = {
  title?: string;
  highlightedText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  images?: string[];
};

const defaultImages = [
  'images/superheroylr.jpg',
  'images/superherolcdriveways.jpg',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629ab_hero-marquee-image-03-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a8_hero-marquee-image-04-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a9_hero-marquee-image-05-cinemaflow-webflow-template.avif'
];

// @component: SuperHero
export const SuperHero = ({
  primaryButtonText = 'Start Scaling',
  secondaryButtonText = 'View Case Studies',
  images = defaultImages
}: SuperHeroProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const bgColor = "#050505";
  // COLOR ACTUALIZADO: Cyan-500 (#06b6d4)
  const lampColor = "#06b6d4"; 

  // Colores para el radial cambiante (Actualizados a Cyan/Azul)
  const radialColorSequence = [
    "radial-gradient(circle at bottom center, #06b6d4, transparent 70%)", 
    "radial-gradient(circle at bottom center, #22d3ee, transparent 70%)", // Cyan-400
    "radial-gradient(circle at bottom center, #06b6d4, transparent 70%)"
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    
    let animationFrameId: number;
    let translateX = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        const marqueeWidth = marquee.scrollWidth / 3;
        translateX += speed;
        if (translateX >= 0) {
          translateX = -marqueeWidth;
        }
        marquee.style.transform = `translateX(${translateX}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [images, isPaused]);

  return (
    <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center py-16 px-6 overflow-hidden relative">
      <style>{fontStyles}</style>
      
      {/* BACKGROUND (Sparkles + Radial) */}
      <div className="absolute inset-x-0 -bottom-48 h-[600px] w-full overflow-hidden pointer-events-none z-[0]">
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: radialColorSequence
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity
          }}
        />
        <Sparkles
          density={800}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          particleColor="#ffffff" 
          minSize={0.5}
          maxSize={1.5}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1296px] w-full mx-auto relative z-[20]" style={{ marginTop: '-10px' }}>
        
        {/* LAMP EFFECT */}
        <div className="w-full relative flex items-center justify-center mt-4 -mb-[32px] overflow-visible z-0 transform scale-75 md:scale-100">
          <div className="w-full h-[80px] relative flex items-center justify-center pt-56 overflow-visible">
            <motion.div
              initial={{ opacity: 0, width: "15rem" }}
              animate={{ 
                opacity: 1, 
                width: "30rem",
                "--gradient-color": lampColor
              }}
              transition={{ 
                opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" },
                width: { delay: 0.2, duration: 1.0, ease: "easeInOut" }
              }}
              style={{ 
                backgroundImage: `conic-gradient(var(--conic-position), var(--gradient-color) 0%, transparent 50%, transparent 100%)`,
                "--gradient-color": lampColor
              } as any}
              className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white [--conic-position:from_70deg_at_center_top]"
            >
              <div className="absolute w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" style={{ backgroundColor: bgColor }} />
              <div className="absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" style={{ backgroundColor: bgColor }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, width: "15rem" }}
              animate={{ 
                opacity: 1, 
                width: "30rem",
                "--gradient-color": lampColor
              }}
              transition={{ 
                opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" },
                width: { delay: 0.2, duration: 1.0, ease: "easeInOut" }
              }}
              style={{ 
                backgroundImage: `conic-gradient(var(--conic-position), transparent 0%, transparent 50%, var(--gradient-color) 100%)`,
                "--gradient-color": lampColor
              } as any}
              className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" style={{ backgroundColor: bgColor }} />
              <div className="absolute w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" style={{ backgroundColor: bgColor }} />
            </motion.div>

            <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" style={{ backgroundColor: bgColor }} />
            <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.5,
                backgroundColor: lampColor
              }}
              transition={{ 
                opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" }
              }}
              className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, width: "8rem" }}
              animate={{ 
                opacity: 1, 
                width: "16rem",
                backgroundColor: lampColor
              }}
              transition={{ 
                opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" },
                width: { delay: 0.2, duration: 1.0, ease: "easeInOut" }
              }}
              className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, width: "15rem" }}
              animate={{ 
                opacity: 1, 
                width: "30rem",
                backgroundColor: lampColor
              }}
              transition={{ 
                opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" },
                width: { delay: 0.2, duration: 1.0, ease: "easeInOut" }
              }}
              className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
            />

            <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]" style={{ backgroundColor: bgColor }} />
          </div>
        </div>

        <div className="relative z-10">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              {/* Main Headline */}
              <motion.h1 
                key="hero-title"
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ 
                  delay: 0.7, 
                  duration: 1.0,
                  ease: "easeOut"
                }} 
                className="font-inter font-semibold text-[32px] md:text-[42px] lg:text-[56px] leading-[1.1] tracking-[-1.5px] text-white mb-6"
              >
                We Bring Light <br className="md:hidden" />
                to Your <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                  Business Growth
                </span>
              </motion.h1>

              {/* Subtexto - COLORES ACTUALIZADOS */}
              <motion.div 
                key="hero-subtitle"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ 
                  delay: 0.9, 
                  duration: 1.0,
                  ease: "easeOut"
                }} 
                className="flex flex-col items-center gap-2 font-inter font-light text-[16px] md:text-[18px] text-gray-400 max-w-3xl mx-auto"
              >
                <p>Stop relying on guesswork. We act as your entire growth engine.</p>
                <p className="text-gray-300">
                  Combining <span className="text-[#06b6d4] font-semibold">Paid Media</span>, <span className="text-[#06b6d4] font-semibold">Creative Strategy</span>, and <span className="text-[#06b6d4] font-semibold">CRO</span> to maximize ROI.
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              key="hero-buttons"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ 
                delay: 1.1, 
                duration: 1.0,
                ease: "easeOut"
              }} 
              className="mt-8"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Botón Blanco */}
                <motion.a 
                  href="#contact"
                  className="flex items-center justify-center gap-1.5 h-[48px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-[50px] px-6 py-3 transition-[background-color,box-shadow] duration-300 cursor-pointer w-full sm:w-auto relative z-[100] will-change-[background-color,box-shadow]"
                  whileHover={{
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                    transition: { duration: 0.2 }
                  }}
                  onClick={e => e.preventDefault()}
                >
                  <p className="font-inter font-semibold text-[15px] text-white whitespace-nowrap">
                    {secondaryButtonText}
                  </p>
                </motion.a>

                {/* Botón Azul (Antes Naranja) */}
                <motion.a 
                  href="#contact"
                  className="flex items-center justify-center gap-1.5 h-[48px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-[50px] px-6 py-3 transition-[background-color,box-shadow] duration-300 cursor-pointer w-full sm:w-auto relative z-[100] will-change-[background-color,box-shadow]"
                  style={{
                    border: `1px solid ${lampColor}`
                  }}
                  whileHover={{
                    // Shadow actualizada a Cyan (RGB: 6, 182, 212)
                    boxShadow: `0 0 20px rgba(6, 182, 212, 0.5)`,
                    transition: { duration: 0.2 }
                  }}
                  onClick={e => e.preventDefault()}
                >
                  <div className="w-[18px] h-[14px] relative overflow-hidden" style={{ color: lampColor }}>
                    <Calendar className="w-[17px] h-[14px]" />
                  </div>
                  <p 
                    className="font-inter font-semibold text-[15px] whitespace-nowrap z-[1]" 
                    style={{ color: lampColor }}
                  >
                    {primaryButtonText}
                  </p>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Marquee Images - GAP AUMENTADO A 12 (48px) */}
          <div 
            className="mt-16 flex items-center justify-center relative z-[30]" 
            style={{ transform: 'rotate(4.5deg)' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div ref={marqueeRef} className="flex gap-12 will-change-transform" style={{ paddingRight: '48px' }}>
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-12 flex-shrink-0">
                  {images.map((src, imgIndex) => (
                    <img 
                      key={`${setIndex}-${imgIndex}`} 
                      src={src} 
                      alt={`Hero Marquee Image ${imgIndex + 1}`} 
                      className="w-[320px] h-[370px] object-cover rounded-3xl opacity-[0.85] hover:opacity-100 transition-opacity duration-300" 
                      style={{
                        transform: 'skewY(-12deg)', 
                        flexShrink: 0
                      }} 
                      loading="eager" 
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes reverse-slow-spin {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
        .animate-reverse-slow-spin {
          animation: reverse-slow-spin 25s linear infinite;
        }
      `}</style>
    </div>
  );
};