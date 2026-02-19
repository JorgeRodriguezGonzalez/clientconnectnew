import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

const fontStyles = `
  .font-inter {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
`;

const Sparkles = ({ id, background, minSize, maxSize, speed, particleColor, density, className }) => {
  const [init, setInit] = useState(false);
  useEffect(() => { setInit(true); }, []);
  const controls = useAnimation();
  const particlesCount = density || 100;
  const generatedParticles = useRef([]);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

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

    let animationId;
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

export default function SuperHero({
  primaryButtonText = 'Start Scaling',
  secondaryButtonText = 'View Case Studies',
}) {
  const lampColor = "#06b6d4";
  const emeraldColor = "#34d399";
  const [isHovered, setIsHovered] = useState(false);

  const radialColorSequence = [
    "radial-gradient(circle at bottom center, #06b6d4, transparent 70%)",
    "radial-gradient(circle at bottom center, #22d3ee, transparent 70%)",
    "radial-gradient(circle at bottom center, #06b6d4, transparent 70%)"
  ];

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-start pt-8 px-0 overflow-hidden pb-0" style={{ background: '#050505' }}>
      <style>{fontStyles}</style>

      {/* BACKGROUND */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050505]">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.1) 5%, rgba(5,5,5,0.75) 50%, #050505 100%)'
          }}
        />
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-10"
          style={{ background: '#050505' }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* SPARKLES + LAMP GLOW */}
        <div className="absolute inset-x-0 bottom-0 h-[1000px] w-full overflow-hidden pointer-events-none z-[0]">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{ background: radialColorSequence }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          />
          <Sparkles
            density={800}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
            particleColor="#ffffff"
            minSize={0.5}
            maxSize={1.5}
          />
        </div>

        <div className="max-w-[1296px] w-full mx-auto relative z-[30] px-6">

          {/* LAMP EFFECT */}
          <div className="w-full relative flex items-center justify-center -mb-[32px] overflow-visible" style={{ transform: 'scale(0.85)' }}>
            <div className="w-full h-[80px] relative flex items-center justify-center pt-56 overflow-visible">

              <div className="absolute inset-auto z-30 h-56 w-full translate-y-[0rem] flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-[60rem] h-full relative"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                >
                  {/* Right Cone */}
                  <motion.div
                    initial={{ opacity: 0, width: "15rem" }}
                    animate={{ opacity: 0.5, width: "28rem" }}
                    transition={{ opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" }, width: { delay: 0.2, duration: 1.0, ease: "easeInOut" } }}
                    style={{
                      backgroundImage: `conic-gradient(from_70deg_at_center_top, ${lampColor} 0%, transparent 35%, transparent 100%)`,
                      backgroundImage: `conic-gradient(from 70deg at center top, ${lampColor} 0%, transparent 35%, transparent 100%)`,
                    }}
                    className="absolute top-0 right-1/2 h-56 overflow-visible w-[28rem] text-white [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"
                  />
                  {/* Left Cone */}
                  <motion.div
                    initial={{ opacity: 0, width: "15rem" }}
                    animate={{ opacity: 0.5, width: "28rem" }}
                    transition={{ opacity: { delay: 0.2, duration: 1.0, ease: "easeInOut" }, width: { delay: 0.2, duration: 1.0, ease: "easeInOut" } }}
                    style={{
                      backgroundImage: `conic-gradient(from 290deg at center top, transparent 0%, transparent 65%, ${lampColor} 100%)`,
                    }}
                    className="absolute top-0 left-1/2 h-56 w-[28rem] text-white [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"
                  />
                  {/* Glows */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 0.2, duration: 1.0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-36 w-[28rem] rounded-full blur-3xl"
                    style={{ backgroundColor: lampColor }}
                  />
                  <motion.div
                    initial={{ opacity: 0, width: "8rem" }}
                    animate={{ opacity: 0.8, width: "16rem" }}
                    transition={{ delay: 0.2, duration: 1.0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-36 rounded-full blur-2xl"
                    style={{ backgroundColor: lampColor }}
                  />
                </motion.div>
              </div>

              {/* Cyan line */}
              <motion.div
                initial={{ opacity: 0, width: "15rem" }}
                animate={{ opacity: 1, width: "28rem" }}
                transition={{ delay: 0.2, duration: 1.0 }}
                className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem]"
                style={{ backgroundColor: lampColor }}
              />
            </div>
          </div>

          {/* HERO TEXT */}
          <div className="relative z-10 text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.0, ease: "easeOut" }}
              className="font-inter font-semibold leading-[1.1] tracking-[-1.5px] text-white mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              We Bring Light to Your{' '}
              <span style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.7))' }}>
                Business Growth
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.0, ease: "easeOut" }}
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

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 1.0, ease: "easeOut" }}
              className="mt-8"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href="#contact"
                  className="flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto relative z-[100]"
                  style={{
                    height: 48,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 50,
                    padding: '12px 24px',
                    backdropFilter: 'blur(8px)',
                  }}
                  whileHover={{ boxShadow: '0 0 20px rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.2)' }}
                >
                  <p className="font-inter font-semibold text-white whitespace-nowrap" style={{ fontSize: 15 }}>{secondaryButtonText}</p>
                </motion.a>

                <motion.a
                  href="#contact"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto relative z-[100]"
                  style={{
                    height: 48,
                    background: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${isHovered ? emeraldColor : lampColor}`,
                    borderRadius: 50,
                    padding: '12px 24px',
                    backdropFilter: 'blur(8px)',
                  }}
                  whileHover={{ boxShadow: `0 0 20px rgba(52,211,153,0.5)`, background: 'rgba(255,255,255,0.2)' }}
                >
                  <Calendar style={{ width: 17, height: 14, color: isHovered ? emeraldColor : lampColor }} />
                  <p className="font-inter font-semibold whitespace-nowrap" style={{ fontSize: 15, color: isHovered ? emeraldColor : lampColor }}>{primaryButtonText}</p>
                </motion.a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}