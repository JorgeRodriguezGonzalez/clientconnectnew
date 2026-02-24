import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const fontStyles = `
  .font-inter {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
`;

// --- CLIENTS DATA ---
const clients = [
  {
    name: 'Asset Plumbing Solutions',
    tags: ['Google Ads', 'Website', 'SEO'],
    image: '/images/asset.jpg',
    logo: 'Asset Plumbing\nSolutions',
  },
  {
    name: 'Nanotise',
    tags: ['Website', 'Rebrand', 'Social Media', 'Content Creation'],
    image: '/images/nanotise.jpg',
    logo: 'Nanotise',
  },
  {
    name: 'LC Landscaping',
    tags: ['Google Ads', 'Paid Social', 'Website'],
    image: '/images/landscaping.jpg',
    logo: 'LC\nLandscaping',
  },
  {
    name: 'Premier Bathrooms',
    tags: ['Website', 'SEO', 'Google Ads', 'Content Creation'],
    image: '/images/premier.jpg',
    logo: 'Premier\nBathrooms',
  },
  {
    name: 'Pioneer Shades',
    tags: ['Paid Social', 'Google Ads', 'Website'],
    image: '/images/pioneer.jpg',
    logo: 'Pioneer\nShades',
  },
  {
    name: 'Turnbull Pools',
    tags: ['Google Ads', 'SEO', 'Social Media', 'Website'],
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
    logo: 'Turnbull\nPools',
  },
  {
    name: 'Sydney Glass Pool Fencing',
    tags: ['Google Ads', 'Website', 'Content Creation'],
    image: '/images/sydneyglass.jpeg',
    logo: 'Sydney Glass\nPool Fencing',
  },
  {
    name: 'Prolex Bathroom Renovations',
    tags: ['SEO', 'Google Ads', 'Paid Social', 'Website'],
    image: '/images/prolex.jpg',
    logo: 'Prolex\nBathrooms',
  },
  {
    name: 'LC Driveways',
    tags: ['Google Ads', 'Paid Social', 'Website'],
    image: '/images/117.jpg',
    logo: 'LC\nDriveways',
  },
];

const ClientCard = ({ client }: { client: typeof clients[0] }) => (
  <div className="relative flex-shrink-0 w-[260px] h-[340px] rounded-3xl overflow-hidden cursor-pointer group border border-transparent hover:border-gray-500 transition-all duration-300">
    <img
      src={client.image}
      alt={client.name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
    <div className="absolute top-4 left-4">
      <p className="text-white font-bold text-[15px] leading-tight whitespace-pre-line drop-shadow-lg">
        {client.logo}
      </p>
    </div>
    <div className="absolute bottom-5 left-4 right-4">
      <p className="text-white/90 text-[12px] font-medium leading-relaxed">
        {client.tags.join(' · ')}
      </p>
    </div>
  </div>
);

const ClientCarousel = () => {
  const cardWidth = 260;
  const gap = 20;
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
        if (Math.abs(xRef.current) >= trackWidth) {
          xRef.current = 0;
        }
        setX(xRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [paused, trackWidth]);

  return (
    <div className="w-full relative">
      <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050505 0%, transparent 100%)' }} />
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
            <ClientCard key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface SuperHeroProps {
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const titleWords = [
  "Light", "Leads", "Clients", "Sales",
  "Light", "Leads", "Clients", "Sales",
  "Light", "Leads", "Clients", "Sales",
  "Light", "Leads", "Clients", "Sales",
  "Light", "Leads", "Clients", "Sales",
];

const wordWidths: Record<string, number> = {
  "Light": 110,
  "Leads": 135,
  "Clients": 150,
  "Sales": 120,
};

export const SuperHero = ({
  primaryButtonText = 'Start Scaling',
  secondaryButtonText = 'View Case Studies',
}: SuperHeroProps) => {
  const lampColor = '#06b6d4';
  const emeraldColor = '#34d399';
  const [isHovered, setIsHovered] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setTitleNumber((n) => (n + 1) % titleWords.length);
    }, 3000);
    return () => clearTimeout(interval);
  }, [titleNumber]);

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

      {/* HERO — min-h-screen + py-16 + justify-center */}
      <div         className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-16">

        <div
          className="max-w-[1296px] w-full mx-auto relative z-[30] px-6 mb-4"
          style={{ marginTop: '-10px' }}
        >

          {/* LAMP */}
          <div className="w-full relative flex items-center justify-center mt-4 -mb-[32px] overflow-visible" style={{ transform: 'scale(0.85)' }}>
            <div className="w-full h-[80px] relative flex items-center justify-center pt-56 overflow-visible">
              <div className="absolute inset-auto z-30 h-56 w-full flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-[60rem] h-full relative"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                >
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

          {/* HERO TEXT */}
          <div className="relative z-10 text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.0, ease: 'easeOut' }}
              className="font-inter font-semibold text-[42px] md:text-[56px] lg:text-[68px] leading-[1.1] tracking-[-2px] text-white mb-6 normal-case"
            >
              We Bring Light to Your
              <br />
              Business Growth
            </motion.h1>

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

            {/* TAGS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
              className="flex items-center justify-center gap-0 mt-6 mb-6"
            >
              {['Google Ads', 'Paid Social', 'SEO', 'Web Design', 'Content Creation', 'CRO'].map((tag, i, arr) => (
                <React.Fragment key={tag}>
                  <span className="text-white/50 text-[13px] font-inter font-medium px-3">
                    {tag}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-white/20 text-[13px]">·</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 1.0, ease: 'easeOut' }}
              className="mt-6"
            >
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
            </motion.div>
          </div>

        </div>

      </div>

      {/* CLIENT CAROUSEL — parte superior visible, cortado por overflow hidden */}
      <div className="relative z-10 w-full mb-24">
        <ClientCarousel />
      </div>

    </div>
  );
};