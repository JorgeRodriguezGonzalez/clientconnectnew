import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

// --- FONTS STYLES & ANIMATIONS ---
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
  
  .font-syne {
    font-family: 'Syne', sans-serif;
  }
  .font-inter {
    font-family: 'Inter', sans-serif;
  }

  /* Animación para el Marquee Inverso */
  @keyframes marquee-reverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }

  .animate-marquee-reverse {
    animation: marquee-reverse 40s linear infinite;
  }
`;

type HeroVideoSectionProps = {
  title?: string;
  highlightedText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  images?: string[];
};

const defaultImages = [
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a7_hero-marquee-image-01-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629aa_hero-marquee-image-02-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629ab_hero-marquee-image-03-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a8_hero-marquee-image-04-cinemaflow-webflow-template.avif',
  'https://cdn.prod.website-files.com/68dc2b00a1bc8daf62f624b7/68dc2b00a1bc8daf62f629a9_hero-marquee-image-05-cinemaflow-webflow-template.avif'
];

export const SuperHero = ({
  title = 'From Raw Footage to High-Converting Leads in One Workflow',
  highlightedText = '',
  primaryButtonText = 'Book a Strategy Call',
  secondaryButtonText = 'View portfolio',
  images = defaultImages
}: HeroVideoSectionProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const bgColor = "#050505";
  const lampColor = "#D84315"; // Naranja rojizo

  // Duplicamos las imágenes para asegurar un loop infinito fluido
  const marqueeImages = [...images, ...images, ...images];

  return (
    <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center py-16 px-6 overflow-hidden relative">
      <style>{fontStyles}</style>
      
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[400px] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] opacity-30">
          <div className="absolute top-[400px] left-[600px] w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] bg-[conic-gradient(from_0deg_at_50%_50%,#AD2624_0deg,#BA4226_55deg,transparent_106deg,transparent_162deg,transparent_252deg,#EE9C21_306deg,#AD2624_360deg)] animate-slow-spin opacity-80" />
          <div className="absolute top-[400px] left-[600px] w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[32px] bg-[conic-gradient(from_0deg_at_50%_50%,#EE9C21_0deg,transparent_180deg,#C96928_360deg)] animate-reverse-slow-spin" />
        </div>
      </div>

      <div className="max-w-[1296px] w-full mx-auto relative z-10" style={{ marginTop: '-10px' }}>
        
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
                  delay: 2.1,
                  duration: 1.5,
                  ease: "easeOut"
                }} 
                className="font-syne font-semibold text-[32px] md:text-[42px] lg:text-[56px] leading-[1.1] tracking-[-1.5px] text-white mb-6"
              >
                From Raw Footage to <br className="md:hidden" />
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                  High-Converting Leads
                </span>
                <br />
                in One Workflow
              </motion.h1>

              {/* Subtexto */}
              <motion.div 
                key="hero-subtitle"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ 
                  delay: 2.2,
                  duration: 1.5,
                  ease: "easeOut"
                }} 
                className="flex flex-col items-center gap-2 font-inter font-light text-[16px] md:text-[18px] text-gray-400 max-w-3xl mx-auto"
              >
                <p>Stop hiring separate teams. I handle the entire ecosystem.</p>
                <p className="text-gray-300">
                  From <span className="text-[#D84315] font-normal">on-site recording</span> and <span className="text-[#D84315] font-normal">premium editing</span> to managing profitable <span className="text-[#D84315] font-normal">Video Ads</span>.
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              key="hero-buttons"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ 
                delay: 2.4,
                duration: 1.4,
                ease: "easeOut"
              }} 
              className="mt-8"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Botón Blanco */}
                <motion.a 
                  href="#contact"
                  className="flex items-center justify-center gap-1.5 h-[48px] bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-[50px] px-6 py-3 transition-[background-color,box-shadow] duration-[500ms] cursor-pointer w-full sm:w-auto relative z-[100] will-change-[background-color,box-shadow]"
                  whileHover={{
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                  }}
                  onClick={e => e.preventDefault()}
                >
                  <p className="font-syne font-bold text-[15px] text-white whitespace-nowrap">
                    {secondaryButtonText}
                  </p>
                </motion.a>

                {/* Botón Naranja Rojizo */}
                <motion.a 
                  href="#contact"
                  className="flex items-center justify-center gap-1.5 h-[48px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-[50px] px-6 py-3 transition-[background-color,box-shadow] duration-[500ms] cursor-pointer w-full sm:w-auto relative z-[100] will-change-[background-color,box-shadow]"
                  style={{
                    border: `1px solid ${lampColor}`
                  }}
                  whileHover={{
                    boxShadow: `0 0 20px rgba(216, 67, 21, 0.5)`
                  }}
                  onClick={e => e.preventDefault()}
                >
                  <div className="w-[18px] h-[14px] relative overflow-hidden" style={{ color: lampColor }}>
                    <Calendar className="w-[17px] h-[14px]" />
                  </div>
                  <p 
                    className="font-syne font-bold text-[15px] whitespace-nowrap z-[1]" 
                    style={{ color: lampColor }}
                  >
                    {primaryButtonText}
                  </p>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Marquee Interactivo (Estilo Cine) */}
          <div className="mt-24 relative w-full overflow-hidden pointer-events-auto select-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
            <div className="flex -rotate-[6deg] scale-110">
              <div className="flex gap-8 animate-marquee-reverse hover:[animation-play-state:paused]">
                {marqueeImages.map((src, imgIndex) => (
                  <div key={imgIndex} className="relative group/item transition-all duration-500 hover:z-20">
                     <img 
                      src={src} 
                      alt={`Hero Work ${imgIndex}`} 
                      className="w-[350px] h-[260px] object-cover rounded-2xl opacity-50 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-500 ease-out shadow-2xl" 
                      loading="eager" 
                    />
                  </div>
                ))}
              </div>
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