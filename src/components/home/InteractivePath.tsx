import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { COLORS, BACKGROUNDS } from "@/lib/design-tokens";

const RECENT_WORKS = [
  { 
    id: "1", 
    videoSrc: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771820402/Testimonial_Vertical_1_agbhiv.mp4", 
    // He añadido una imagen de placeholder. AQUÍ DEBERÍAS PONER LA URL DEL PRIMER FRAME.
    // Cloudinary suele permitirlo cambiando la extensión .mp4 por .jpg
    posterSrc: "https://res.cloudinary.com/dsdnvhpmr/video/upload/v1771820402/Testimonial_Vertical_1_agbhiv.jpg",
    handle: "Alex Ross", 
    testimonial: "Nanotise" 
  },
  { id: "2", videoSrc: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.mp4", posterSrc: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.jpg", handle: "Kieren", testimonial: "Lc Landscaping" },
  { id: "3", videoSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.mp4", posterSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.jpg", handle: "Pioneer", testimonial: "150 Qualified Leads in one month" },
  { id: "4", videoSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.mp4", posterSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.jpg", handle: "Premier Bathrooms", testimonial: "From cold traffic to loyal users" },
  { id: "5", videoSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.mp4", posterSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.jpg", handle: "Shaun", testimonial: "Asset Plumbing Solutions" },
  { id: "6", videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4", posterSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.jpg", handle: "@beauty_brand", testimonial: "Our best-performing campaign ever" },
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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Detener el video si la card deja de estar activa
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
      // Intentamos reproducir
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error intentando reproducir:", error);
          setIsPlaying(false);
        });
      }
    }
  };

  const abs = Math.abs(position);
  const scale = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.7;
  const rotate = position * 5;
  const translateX = position * 240; 
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.6 : 0.2;
  const zIndex = 10 - abs;

  return (
    <div
      onClick={togglePlay}
      style={{
        position: "absolute",
        width: "280px",
        height: "480px",
        borderRadius: "24px",
        overflow: "hidden",
        backgroundColor: "#111",
        transform: `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
        opacity,
        zIndex,
        transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        boxShadow: isActive ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
        cursor: 'pointer'
      }}
    >
      {/* SOLUCIÓN PARA EL CUADRO NEGRO:
        Mostramos una imagen estática (poster) que se oculta SOLO cuando 
        el video empieza a reproducirse.
      */}
      {item.posterSrc && !isPlaying && (
        <img 
          src={item.posterSrc} 
          alt={`Poster for ${item.handle}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1, // Por encima del video, por debajo de los controles y texto
          }}
        />
      )}

      <video
        ref={videoRef}
        src={item.videoSrc}
        loop
        playsInline
        preload="metadata" // Intenta cargar metadatos, aunque el poster es más fiable
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ 
          position: "absolute", 
          inset: 0, 
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          display: "block",
          zIndex: 0 // Capa base
        }}
      />

      {/* Overlay Gradiente - Z-Index 2 para estar sobre la imagen/video */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)",
        pointerEvents: "none",
        zIndex: 2,
      }} />

      {/* Botón Play - Z-Index 3 */}
      {isActive && !isPlaying && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 3,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            backgroundColor: "rgba(6, 182, 212, 0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)"
          }}>
            <Play fill="white" color="white" size={24} style={{ marginLeft: 4 }} />
          </div>
        </div>
      )}

      {/* Botón Pause - Z-Index 3 */}
      {isActive && isPlaying && (
        <div style={{
          position: "absolute", top: 20, right: 20,
          width: 32, height: 32, borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 3,
        }}>
          <Pause color="white" size={16} />
        </div>
      )}

      {/* Text Info - Z-Index 2 */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px",
        display: "flex", flexDirection: "column", gap: "8px",
        zIndex: 2,
      }}>
        <Stars />
        <div>
          <p style={{ color: "#fff", fontSize: "18px", fontWeight: 600, margin: 0, fontFamily: "'Satoshi', sans-serif" }}>
            {item.handle}
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: 0, fontFamily: "'Satoshi', sans-serif" }}>
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
      justifyContent: "center",
      padding: "40px 0",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "0 32px", textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
          Real Results, <br/>
          <span style={{ color: COLORS.cyan }}>Real Clients</span>
        </h2>
      </div>

      {/* Carousel Container */}
      <div style={{ 
        position: "relative", 
        width: "100%", 
        height: "500px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        touchAction: "pan-y"
      }}>
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

      {/* Controls */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", marginTop: "40px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {RECENT_WORKS.map((_, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: "4px",
                backgroundColor: i === active ? COLORS.cyan : "#27272a",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        
        <div style={{ display: "flex", gap: "16px" }}>
          <button onClick={prev} style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "50%", width: 48, height: 48, color: "#fff", fontSize: "20px" }}>‹</button>
          <button onClick={next} style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "50%", width: 48, height: 48, color: "#fff", fontSize: "20px" }}>›</button>
        </div>
      </div>

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');
      `}</style>
    </section>
  );
}