import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const fontStyles = `
  .font-inter {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  @keyframes gradientMove {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes borderSpin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes shimmer {
    0% { left: -50%; opacity: 0; }
    15% { opacity: 1; }
    50% { left: 120%; opacity: 1; }
    65% { opacity: 0; }
    100% { left: 120%; opacity: 0; }
  }

  .glowing-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 100px;
    overflow: hidden;
    isolation: isolate;
  }

  .glowing-input-wrap::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    aspect-ratio: 1;
    transform-origin: center;
    background: conic-gradient(
      rgba(6, 182, 212, 0.7),
      rgba(6, 182, 212, 0.25) 25%,
      rgba(6, 182, 212, 0.6) 50%,
      rgba(6, 182, 212, 0.25) 75%,
      rgba(6, 182, 212, 0.7)
    );
    animation: borderSpin 4s linear infinite;
    z-index: -2;
    transform: translate(-50%, -50%);
  }

  .glowing-input-wrap::after {
    content: '';
    position: absolute;
    inset: 1.5px;
    border-radius: 100px;
    background: rgba(5, 5, 5, 0.95);
    z-index: -1;
  }

  .glowing-input-shimmer {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 40%;
    height: 200%;
    background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.25), transparent 70%);
    animation: shimmer 3.5s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  .hero-section-py {
    padding-top: 4vh;
    padding-bottom: 4vh;
  }
  @media (min-width: 768px) {
    .hero-section-py {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  }

  .hero-text-mt {
    margin-top: -2vh;
  }
  @media (min-width: 768px) {
    .hero-text-mt {
      margin-top: 0;
    }
  }

  .tags-mobile-spacing {
    margin-top: 3vh;
    margin-bottom: 3vh;
  }
  @media (min-width: 768px) {
    .tags-mobile-spacing {
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }

  .cta-mt {
    margin-top: 2vh;
  }
  @media (min-width: 768px) {
    .cta-mt {
      margin-top: 1.5rem;
    }
  }

  .carousel-mb {
    margin-bottom: 3vh;
  }
  @media (min-width: 768px) {
    .carousel-mb {
      margin-bottom: 3rem;
    }
  }
`;

// --- CLIENTS DATA ---
const clients = [
  { name: 'Asset Plumbing Solutions', tags: ['Google Ads', 'Website', 'SEO'], image: '/images/asset.jpg', logo: 'Asset Plumbing\nSolutions' },
  { name: 'Nanotise', tags: ['Website', 'Rebrand', 'Social Media', 'Content Creation'], image: '/images/nanotise.jpg', logo: 'Nanotise' },
  { name: 'LC Landscaping', tags: ['Google Ads', 'Paid Social', 'Website'], image: '/images/landscaping.jpg', logo: 'LC\nLandscaping' },
  { name: 'Premier Bathrooms', tags: ['Website', 'SEO', 'Google Ads', 'Content Creation'], image: '/images/premier.jpg', logo: 'Premier\nBathrooms' },
  { name: 'Pioneer Shades', tags: ['Paid Social', 'Google Ads', 'Website'], image: '/images/pioneer.jpg', logo: 'Pioneer\nShades' },
  { name: 'Turnbull Pools', tags: ['Google Ads', 'SEO', 'Social Media', 'Website'], image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80', logo: 'Turnbull\nPools' },
  { name: 'Sydney Glass Pool Fencing', tags: ['Google Ads', 'Website', 'Content Creation'], image: '/images/sydneyglass.jpeg', logo: 'Sydney Glass\nPool Fencing' },
  { name: 'Prolex Bathroom Renovations', tags: ['SEO', 'Google Ads', 'Paid Social', 'Website'], image: '/images/prolex.jpg', logo: 'Prolex\nBathrooms' },
  { name: 'LC Driveways', tags: ['Google Ads', 'Paid Social', 'Website'], image: '/images/117.jpg', logo: 'LC\nDriveways' },
];

const ClientCard = ({ client, isMobile }: { client: typeof clients[0]; isMobile?: boolean }) => (
  <div className={`relative flex-shrink-0 ${isMobile ? 'w-[220px] h-[290px]' : 'w-[260px] h-[340px]'} rounded-3xl overflow-hidden cursor-pointer group border border-transparent hover:border-gray-500 transition-all duration-300`}>
    <img src={client.image} alt={client.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
    <div className="absolute top-4 left-4">
      <p className={`text-white font-bold ${isMobile ? 'text-[13px]' : 'text-[15px]'} leading-tight whitespace-pre-line drop-shadow-lg`}>{client.logo}</p>
    </div>
    <div className="absolute bottom-5 left-4 right-4">
      <p className={`text-white/90 ${isMobile ? 'text-[11px]' : 'text-[12px]'} font-medium leading-relaxed`}>{client.tags.join(' · ')}</p>
    </div>
  </div>
);

const ClientCarousel = ({ isMobile }: { isMobile?: boolean }) => {
  const cardWidth = isMobile ? 220 : 260;
  const gap = isMobile ? 16 : 20;
  const step = cardWidth + gap;
  const total = clients.length;
  const looped = [...Array(3)].flatMap(() => clients);
  const trackWidth = total * step;

  const xRef = useRef(0);
  const [x, setX] = useState(0);
  const rafRef = useRef<number>();
  const [paused, setPaused] = useState(false);
  const speed = 0.5;

  useEffect(() => {
    const tick = () => {
      if (!paused) {
        xRef.current -= speed;
        if (Math.abs(xRef.current) >= trackWidth) xRef.current = 0;
        setX(xRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [paused, trackWidth]);

  return (
    <div className="w-full relative">
      <div
        className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none flex items-center justify-start"
        style={{ background: 'linear-gradient(to right, #050505 60%, transparent 100%)' }}
      >
        <p
          className="text-white/30 text-[10px] font-inter font-semibold uppercase tracking-[4px] ml-8"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Our Local Clients
        </p>
      </div>
      <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050505 0%, transparent 100%)' }} />
      <div className="overflow-hidden w-full">
        <div
          className="flex"
          style={{ gap: `${gap}px`, transform: `translateX(${x}px)`, willChange: 'transform' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {looped.map((client, i) => (
            <ClientCard key={`${client.name}-${i}`} client={client} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ROTATING WORDS CONFIG ---
const rotatingWords = ["Light", "Leads", "Clients", "Sales"];
const wordWidths: Record<string, number> = {
  "Light": 145,
  "Leads": 175,
  "Clients": 200,
  "Sales": 155,
};

const mobileWordWidths: Record<string, number> = {
  "Light": 90,
  "Leads": 108,
  "Clients": 125,
  "Sales": 96,
};

const wordsLoop = [...Array(5)].flatMap(() => rotatingWords);

// --- MOBILE DETECTION HOOK ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth < 768;
    return false;
  });
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

interface SuperHeroProps {
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export const SuperHero = ({
  primaryButtonText = 'Start Scaling',
  secondaryButtonText = 'View Case Studies',
}: SuperHeroProps) => {
  const lampColor = '#06b6d4';
  const emeraldColor = '#34d399';
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  // --- Rotating title state (desktop only) ---
  const [titleNumber, setTitleNumber] = useState(0);
  const [nextWidth, setNextWidth] = useState(wordWidths[wordsLoop[0]] || 100);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nextIndex = titleNumber === wordsLoop.length - 1 ? 0 : titleNumber + 1;
      const nextWord = wordsLoop[nextIndex];
      setNextWidth(wordWidths[nextWord] || 100);
      const wordTimeout = setTimeout(() => {
        setTitleNumber(nextIndex);
      }, 150);
      return () => clearTimeout(wordTimeout);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  const currentWord = wordsLoop[titleNumber];
  const currentWidth = isMobile
    ? (mobileWordWidths[currentWord] || 80)
    : nextWidth;

  return (
    <div
      className="w-full relative flex flex-col items-center justify-start px-0 overflow-hidden pb-0 font-inter"
      style={{ background: '#050505' }}
    >
      <style>{fontStyles}</style>

      {/* BACKGROUND */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050505]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.1) 5%, rgba(5,5,5,0.75) 50%, #050505 100%)' }} />
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-10"
          style={{ background: '#050505' }}
        />
      </div>

      {/* HERO */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center hero-section-py">
        <div className="max-w-[1296px] w-full mx-auto relative z-[30] px-6 mb-4" style={{ marginTop: '-10px' }}>

          {/* LAMP — DESKTOP */}
          {!isMobile && (
            <div className="w-full relative flex items-center justify-center mt-4 -mb-[32px] overflow-visible" style={{ transform: 'scale(0.85)' }}>
              <div className="w-full h-[80px] relative flex items-center justify-center pt-56 overflow-visible">
                <div className="absolute inset-auto z-30 h-56 w-full flex items-center justify-center pointer-events-none">
                  <motion.div className="w-[60rem] h-full relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
                    <motion.div
                      initial={{ opacity: 0, width: '15rem' }}
                      animate={{ opacity: 0.5, width: '28rem' }}
                      transition={{ opacity: { delay: 0.2, duration: 1.0 }, width: { delay: 0.2, duration: 1.0 } }}
                      style={{ backgroundImage: `conic-gradient(from 70deg at center top, ${lampColor} 0%, transparent 35%, transparent 100%)` }}
                      className="absolute top-0 right-1/2 h-56 overflow-visible w-[28rem] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"
                    />
                    <motion.div
                      initial={{ opacity: 0, width: '15rem' }}
                      animate={{ opacity: 0.5, width: '28rem' }}
                      transition={{ opacity: { delay: 0.2, duration: 1.0 }, width: { delay: 0.2, duration: 1.0 } }}
                      style={{ backgroundImage: `conic-gradient(from 290deg at center top, transparent 0%, transparent 65%, ${lampColor} 100%)` }}
                      className="absolute top-0 left-1/2 h-56 w-[28rem] [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      transition={{ delay: 0.2, duration: 1.0 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-36 w-[28rem] rounded-full blur-3xl"
                      style={{ backgroundColor: lampColor }}
                    />
                    <motion.div
                      initial={{ opacity: 0, width: '8rem' }}
                      animate={{ opacity: 0.8, width: '16rem' }}
                      transition={{ delay: 0.2, duration: 1.0 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-36 rounded-full blur-2xl"
                      style={{ backgroundColor: lampColor }}
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, width: '15rem' }}
                  animate={{ opacity: 1, width: '28rem' }}
                  transition={{ delay: 0.2, duration: 1.0 }}
                  className="absolute inset-auto z-50 h-[3px] -translate-y-[7rem]"
                  style={{ backgroundColor: lampColor }}
                />
              </div>
            </div>
          )}

          {/* LAMP — MOBILE */}
          {isMobile && (
            <div className="w-full relative flex items-center justify-center mt-10 -mb-[60px] overflow-visible" style={{ zIndex: 1 }}>
              <div className="w-full h-[80px] relative flex items-center justify-center pt-56 overflow-visible">
                <div className="absolute inset-auto z-30 h-56 w-full flex items-center justify-center pointer-events-none">
                  <motion.div className="w-[30rem] h-full relative">
                    <motion.div
                      initial={{ opacity: 0, width: '6rem' }}
                      animate={{ opacity: 0.5, width: '13rem' }}
                      transition={{ opacity: { delay: 0.2, duration: 1.0 }, width: { delay: 0.2, duration: 1.0 } }}
                      style={{ backgroundImage: `conic-gradient(from 70deg at center top, ${lampColor} 0%, transparent 35%, transparent 100%)` }}
                      className="absolute top-0 right-1/2 h-56 overflow-visible w-[15rem] [mask-image:linear-gradient(to_bottom,transparent_0%,white_15%,white_30%,transparent_70%)]"
                    />
                    <motion.div
                      initial={{ opacity: 0, width: '7rem' }}
                      animate={{ opacity: 0.5, width: '15rem' }}
                      transition={{ opacity: { delay: 0.2, duration: 1.0 }, width: { delay: 0.2, duration: 1.0 } }}
                      style={{ backgroundImage: `conic-gradient(from 290deg at center top, transparent 0%, transparent 65%, ${lampColor} 100%)` }}
                      className="absolute top-0 left-1/2 h-56 w-[13rem] [mask-image:linear-gradient(to_bottom,transparent_0%,white_15%,white_30%,transparent_70%)]"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.45 }}
                      transition={{ delay: 0.2, duration: 1.0 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-44 w-[13rem] rounded-full blur-3xl"
                      style={{ backgroundColor: lampColor }}
                    />
                    <motion.div
                      initial={{ opacity: 0, width: '5rem' }}
                      animate={{ opacity: 0.8, width: '10rem' }}
                      transition={{ delay: 0.2, duration: 1.0 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 h-44 rounded-full blur-2xl"
                      style={{ backgroundColor: lampColor }}
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, width: '6rem' }}
                  animate={{ opacity: 1, width: '13rem' }}
                  transition={{ delay: 0.2, duration: 1.0 }}
                  className="absolute inset-auto z-50 h-[3px] -translate-y-[7rem]"
                  style={{ backgroundColor: lampColor }}
                />
              </div>
            </div>
          )}

          {/* HERO TEXT */}
          <div className={`relative text-center mb-8 hero-text-mt ${isMobile ? 'z-20' : 'z-10'}`}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.0, ease: 'easeOut' }}
              className="font-inter font-semibold text-[42px] md:text-[56px] lg:text-[68px] leading-[1.1] tracking-[-2px] text-white mb-6 normal-case"
            >
              We Bring{' '}
              {isMobile ? (
                <motion.span
                  className="relative inline-flex items-center overflow-hidden"
                  animate={{ width: currentWidth }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{ minHeight: '1em' }}
                >
                  {wordsLoop.map((word, index) => (
                    <motion.span
                      key={index}
                      className="font-semibold"
                      initial={{ opacity: 0, y: -100 }}
                      transition={{ type: 'spring', stiffness: 50, opacity: { duration: 0.2 } }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1, position: 'relative' as const }
                          : {
                              y: titleNumber > index ? 20 : -50,
                              opacity: 0,
                              position: 'absolute' as const,
                              top: 0,
                              left: 0,
                            }
                      }
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              ) : (
                <motion.span
                  className="relative inline-flex items-center overflow-hidden"
                  animate={{ width: currentWidth }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{ minHeight: '1em' }}
                >
                  {wordsLoop.map((word, index) => (
                    <motion.span
                      key={index}
                      className="font-semibold"
                      initial={{ opacity: 0, y: -100 }}
                      transition={{ type: 'spring', stiffness: 50, opacity: { duration: 0.2 } }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1, position: 'relative' as const }
                          : {
                              y: titleNumber > index ? 20 : -50,
                              opacity: 0,
                              position: 'absolute' as const,
                              top: 0,
                              left: 0,
                            }
                      }
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              )}{' '}
              {isMobile ? (
                <>to<br />Your Business Growth</>
              ) : (
                <>to Your<br />Business Growth</>
              )}
            </motion.h1>

            {/* SUBTITLE — DESKTOP */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1.0, ease: 'easeOut' }}
                className="flex flex-col items-center gap-2 font-inter font-light text-white max-w-3xl mx-auto"
                style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
              >
                <p>Stop relying on guesswork. We act as your entire growth engine.</p>
                <p>
                  Combining{' '}
                  <span style={{ color: emeraldColor, fontWeight: 600 }}>Paid Media</span>,{' '}
                  <span style={{ color: emeraldColor, fontWeight: 600 }}>Creative Strategy</span>, and{' '}
                  <span style={{ color: emeraldColor, fontWeight: 600 }}>CRO</span>{' '}
                  to maximize ROI.
                </p>
              </motion.div>
            )}

            {/* TAGS — DESKTOP */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
                className="flex items-center justify-center gap-0 mt-6 mb-6"
              >
                {['Google Ads', 'Paid Social', 'SEO', 'Web Design', 'Content Creation', 'CRO'].map((tag, i, arr) => (
                  <React.Fragment key={tag}>
                    <span className="text-white/50 text-[13px] font-inter font-medium px-3">{tag}</span>
                    {i < arr.length - 1 && <span className="text-white/20 text-[13px]">·</span>}
                  </React.Fragment>
                ))}
              </motion.div>
            )}

            {/* TAGS — MOBILE */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                className="flex items-center justify-center gap-0 tags-mobile-spacing"
              >
                {['SEO', 'Paid Ads', 'Websites', 'Social Media'].map((tag, i, arr) => (
                  <React.Fragment key={tag}>
                    <span className="text-[13px] font-inter font-medium px-3" style={{ color: emeraldColor }}>{tag}</span>
                    {i < arr.length - 1 && <span className="text-white/20 text-[13.5px] font-bold">·</span>}
                  </React.Fragment>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 1.0, ease: 'easeOut' }}
              className={isMobile ? "cta-mt" : "mt-6"}
            >
              {isMobile ? (
                <div className="flex flex-col items-center gap-3 w-full px-2">
                  <div className="glowing-input-wrap w-full h-[48px]">
                    <div className="glowing-input-shimmer" />
                    <input
                      type="email"
                      placeholder="Enter your email for a free audit"
                      className="relative w-full h-full bg-transparent rounded-[50px] px-6 pr-14 text-white text-[14px] font-inter font-medium placeholder-white/40 outline-none z-10"
                    />
                    <button
                      className="absolute right-[5px] top-1/2 -translate-y-1/2 w-[48px] h-[36px] rounded-[50px] flex items-center justify-center transition-all duration-300 z-10"
                      style={{ background: lampColor }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <motion.a
                    href="#contact"
                    className="flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto relative z-[100]"
                    style={{ height: 48, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '12px 24px', backdropFilter: 'blur(8px)' }}
                    whileHover={{ boxShadow: '0 0 20px rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.2)' }}
                  >
                    <p className="font-inter font-semibold text-white whitespace-nowrap" style={{ fontSize: 15 }}>{secondaryButtonText}</p>
                  </motion.a>

                  <motion.a
                    href="#contact"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto relative z-[100]"
                    style={{ height: 48, background: 'rgba(255,255,255,0.1)', border: `1px solid ${isHovered ? emeraldColor : lampColor}`, borderRadius: 50, padding: '12px 24px', backdropFilter: 'blur(8px)' }}
                    whileHover={{ boxShadow: '0 0 20px rgba(52,211,153,0.5)', background: 'rgba(255,255,255,0.2)' }}
                  >
                    <Calendar style={{ width: 17, height: 14, color: isHovered ? emeraldColor : lampColor }} />
                    <p className="font-inter font-semibold whitespace-nowrap" style={{ fontSize: 15, color: isHovered ? emeraldColor : lampColor }}>
                      {primaryButtonText}
                    </p>
                  </motion.a>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>

      {/* CLIENT CAROUSEL */}
      <div className={`relative z-10 w-full carousel-mb`}>
        <ClientCarousel isMobile={isMobile} />
      </div>

    </div>
  );
};