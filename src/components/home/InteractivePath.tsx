import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { COLORS, BACKGROUNDS } from "@/lib/design-tokens";

const RECENT_WORKS = [
  { id: "1", videoSrc: "/videos/nanotisetestimonial.mp4", posterSrc: "/images/nanotise-poster.jpg", handle: "Alex Ross", testimonial: "Nanotise" },
  { id: "2", videoSrc: "/videos/alphafencing.mp4", posterSrc: "/images/alphafencing-poster.jpg", handle: "Alpha Fencing", testimonial: "Alpha Fencing" },
  { id: "3", videoSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.mp4", posterSrc: "/images/117.png", handle: "Pioneer", testimonial: "150 Qualified Leads in one month" },
  { id: "4", videoSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.mp4", posterSrc: "/images/image2.jpg", handle: "Premier Bathrooms", testimonial: "From cold traffic to loyal users" },
  { id: "5", videoSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.mp4", posterSrc: "/images/assetplumbing-vertical.png", handle: "Shaun", testimonial: "Asset Plumbing Solutions" },
  { id: "6", videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4", posterSrc: "/images/assetplumbing-vertical.png", handle: "@beauty_brand", testimonial: "Our best-performing campaign ever" },
];

const Stars = () => (
  <div style={{ display: "flex", gap: "4px" }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#06b6d4">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
};

const VideoCard = ({ item, position, onClick, isActive, isMobile }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const abs = Math.abs(position);

  useEffect(() => {
    if (!isActive) {
      if (videoRef.current) {
        videoRef.current.pause();
        if (isMobile) {
          videoRef.current.currentTime = 0;
        }
      }
      setIsPlaying(false);
    }
  }, [isActive, isMobile]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!isActive) { onClick(); return; }

    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
    }
  };

  const scale = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.68;
  const rotate = position * 7;
  const translateX = position * 220;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.65 : 0.35;
  const zIndex = 10 - abs * 3;
  const blur = abs === 0 ? 0 : abs === 1 ? 1 : 3;

  return (
    <div
      onClick={onClick}
      className={`video-card pos-${position}`}
      style={{
        position: "absolute",
        width: "280px",
        height: "460px",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "#18181b",
        cursor: isActive ? "default" : "pointer",
        transform: `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
        opacity,
        zIndex,
        filter: `blur(${blur}px)`,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isActive ? "0 32px 64px rgba(0,0,0,0.6)" : "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <video
        ref={videoRef}
        src={item.videoSrc}
        loop
        playsInline
        muted
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.95) 100%)",
        pointerEvents: "none",
        zIndex: 2
      }} />

      {isActive && (
        <div
          onClick={togglePlay}
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: isPlaying ? 0 : 1,
            transition: "opacity 0.3s",
            cursor: "pointer",
            zIndex: 3
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {isPlaying
              ? <Pause fill="white" color="white" size={20} />
              : <Play fill="white" color="white" size={20} style={{ marginLeft: 3 }} />
            }
          </div>
        </div>
      )}

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px",
        display: "flex", flexDirection: "column", gap: "10px",
        zIndex: 4
      }}>
        <Stars />
        <div>
          <p style={{ color: "#fff", fontSize: "17px", fontWeight: 600, margin: 0, fontFamily: "'Satoshi', sans-serif" }}>
            {item.handle}
          </p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", fontWeight: 400, margin: 0, fontFamily: "'Satoshi', sans-serif" }}>
            {item.testimonial}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = useCallback((e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  }, [isMobile]);

  const handleTouchMove = useCallback((e) => {
    if (!isMobile) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy && dx > 10) {
      isSwiping.current = true;
    }
  }, [isMobile]);

  const handleTouchEnd = useCallback((e) => {
    if (!isMobile || !isSwiping.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        setActive(i => (i + 1) % RECENT_WORKS.length);
      } else {
        setActive(i => (i - 1 + RECENT_WORKS.length) % RECENT_WORKS.length);
      }
    }
  }, [isMobile]);

  const prev = () => setActive(i => (i - 1 + RECENT_WORKS.length) % RECENT_WORKS.length);
  const next = () => setActive(i => (i + 1) % RECENT_WORKS.length);

  return (
    <section className="testimonials-section" style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: BACKGROUNDS.dark,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "1px",
      paddingBottom: "96px",
      gap: "56px",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "0 24px", textAlign: "center", maxWidth: "900px" }}>
        <motion.span
          className="w-fit mx-auto px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 text-[10px] font-semibold uppercase tracking-[2px]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Client Testimonials
        </motion.span>

        <h2 className="section-title text-zinc-100">
          Real Results,{" "}
          <span style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.emerald}, ${COLORS.cyan}, transparent)`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            fontWeight: 700,
            animation: "gradientMove 3s linear infinite",
          }}>
            Real Clients
          </span>
        </h2>

        <p className="section-text-dark max-w-[384px]">
          Don't take our word for it. Here's what <strong className="text-zinc-200">brands worldwide</strong> have to say about working with us.
        </p>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          height: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          touchAction: isMobile ? "pan-y" : "auto",
        }}
      >
        {RECENT_WORKS.map((item, i) => {
          const position = i - active;
          const wrapped =
            position > RECENT_WORKS.length / 2 ? position - RECENT_WORKS.length :
            position < -RECENT_WORKS.length / 2 ? position + RECENT_WORKS.length :
            position;
          
          if (Math.abs(wrapped) > 2) return null;

          return (
            <VideoCard
              key={item.id}
              item={item}
              position={wrapped}
              isActive={wrapped === 0}
              isMobile={isMobile}
              onClick={() => setActive(i)}
            />
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button onClick={prev} style={{ background: "none", border: "1px solid #27272a", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#a1a1aa", fontSize: "16px" }}>‹</button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {RECENT_WORKS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: "9999px",
                backgroundColor: i === active ? "#06b6d4" : "#27272a",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button onClick={next} style={{ background: "none", border: "1px solid #27272a", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#a1a1aa", fontSize: "16px" }}>›</button>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');

        @media (max-width: 767px) {
          .testimonials-section {
            padding-bottom: 48px !important;
          }

          .video-card {
            width: 240px !important;
            height: 400px !important;
          }
          
          .video-card.pos-0 { transform: translateX(0px) rotate(0deg) scale(1) !important; }
          .video-card.pos-1 { transform: translateX(190px) rotate(7deg) scale(0.80) !important; }
          .video-card.pos--1 { transform: translateX(-190px) rotate(-7deg) scale(0.80) !important; }
          .video-card.pos-2 { transform: translateX(380px) rotate(14deg) scale(0.65) !important; }
          .video-card.pos--2 { transform: translateX(-380px) rotate(-14deg) scale(0.65) !important; }
        }
      `}</style>
    </section>
  );
}