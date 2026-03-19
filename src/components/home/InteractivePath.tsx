import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { COLORS, BACKGROUNDS } from "@/lib/design-tokens";

const RECENT_WORKS = [
  { 
    id: "1", 
    videoSrc: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771820402/Testimonial_Vertical_1_agbhiv.mp4", 
    // Cloudinary permite obtener el primer frame simplemente cambiando la extensión a .jpg
    posterSrc: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771820402/Testimonial_Vertical_1_agbhiv.jpg",
    handle: "Alex Ross", 
    testimonial: "Nanotise" 
  },
  { 
    id: "2", 
    videoSrc: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.mp4", 
    posterSrc: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.jpg", 
    handle: "Kieren", 
    testimonial: "Lc Landscaping" 
  },
  { 
    id: "3", 
    videoSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.mp4", 
    posterSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.jpg",
    handle: "Pioneer", 
    testimonial: "150 Qualified Leads in one month" 
  },
  { 
    id: "4", 
    videoSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.mp4", 
    posterSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.jpg",
    handle: "Premier Bathrooms", 
    testimonial: "From cold traffic to loyal users" 
  },
  { 
    id: "5", 
    videoSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.mp4", 
    posterSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.jpg",
    handle: "Shaun", 
    testimonial: "Asset Plumbing Solutions" 
  },
  { 
    id: "6", 
    videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4", 
    posterSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.jpg",
    handle: "@beauty_brand", 
    testimonial: "Our best-performing campaign ever" 
  },
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

const VideoCard = ({ item, position, onClick, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pausar video si el usuario desliza a otra slide
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!isActive) {
      onClick();
      return;
    }
    
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Video play error:", err));
    }
  };

  const abs = Math.abs(position);
  // AJUSTES PROPORCIONALES PARA MOBILE (Más pequeñas para ver laterales)
  const scale = abs === 0 ? 1 : abs === 1 ? 0.80 : 0.65;
  const rotate = position * 6;
  const translateX = position * 190; // Distancia reducida para que las cartas se asomen más
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.70 : 0.30;
  const zIndex = 10 - abs * 3;
  const blur = abs === 0 ? 0 : abs === 1 ? 0.5 : 2;

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        width: "240px", // Ancho reducido para mobile
        height: "400px", // Alto proporcional
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
        poster={item.posterSrc} // ESTA ES LA IMAGEN POR DEFECTO DEL INICIO
        loop
        playsInline
        preload="metadata"
        style={{ 
          position: "absolute", 
          inset: 0, 
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          zIndex: 0
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
            width: 50, height: 50, borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {isPlaying
              ? <Pause fill="white" color="white" size={18} />
              : <Play fill="white" color="white" size={18} style={{ marginLeft: 3 }} />
            }
          </div>
        </div>
      )}

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "16px",
        display: "flex", flexDirection: "column", gap: "8px",
        zIndex: 4
      }}>
        <Stars />
        <div>
          <p style={{ color: "#fff", fontSize: "15px", fontWeight: 600, margin: 0, fontFamily: "'Satoshi', sans-serif" }}>
            {item.handle}
          </p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 400, margin: 0, fontFamily: "'Satoshi', sans-serif" }}>
            {item.testimonial}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + RECENT_WORKS.length) % RECENT_WORKS.length);
  const next = () => setActive(i => (i + 1) % RECENT_WORKS.length);

  return (
    <section style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: BACKGROUNDS.dark,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "96px",
      paddingBottom: "96px",
      gap: "56px",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "0 24px", textAlign: "center", maxWidth: "900px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", padding: "6px 12px",
          borderRadius: "8px", border: "1px solid #27272a",
          backgroundColor: "#18181b", width: "fit-content",
        }}>
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#a1a1aa", fontFamily: "'Satoshi', sans-serif" }}>
            Client Testimonials
          </span>
        </div>

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

      <div style={{ position: "relative", width: "100%", height: "450px", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
      `}</style>
    </section>
  );
}