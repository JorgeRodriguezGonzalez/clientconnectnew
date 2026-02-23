import React, { useRef, useState } from "react";
import { Play } from "lucide-react";

// --- Types ---
interface WorkItem {
  id: string;
  videoSrc: string;
  avatarSrc: string;
  handle: string;
  testimonial: string;
}

// --- Data ---
const RECENT_WORKS: WorkItem[] = [
  {
    id: "1",
    videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4",
    avatarSrc: "https://framerusercontent.com/images/dZTHdqycN3jTN1xqMld5nxZzEU.svg",
    handle: "@tech_startup",
    testimonial: "300% ROAS in just 30 days"
  },
  {
    id: "2",
    videoSrc: "https://framerusercontent.com/assets/k1qSt6h5RhCO3Zs5SwsO37iqjo.mp4",
    avatarSrc: "https://framerusercontent.com/images/sAiv8XpUWxb71XV3uCmVEzAMS0A.svg",
    handle: "@fitness_empire",
    testimonial: "CPA reduced by 40% with new creatives"
  },
  {
    id: "3",
    videoSrc: "https://framerusercontent.com/assets/f2fyZuzpw4LXDReDBa9x0RM74.mp4",
    avatarSrc: "https://framerusercontent.com/images/QYsfiTUurr8vxkRUjXw7KRx58Q.svg",
    handle: "@realestate_pro",
    testimonial: "150 Qualified Leads in one month"
  },
  {
    id: "4",
    videoSrc: "https://framerusercontent.com/assets/tdObAjmo5rYV9y0dSN1y6Fi8E.mp4",
    avatarSrc: "https://framerusercontent.com/images/dZTHdqycN3jTN1xqMld5nxZzEU.svg",
    handle: "@saas_growth",
    testimonial: "From cold traffic to loyal users"
  },
  {
    id: "5",
    videoSrc: "https://framerusercontent.com/assets/G76LWpCqcnDqr4JqhtkD3NlnRtU.mp4",
    avatarSrc: "https://framerusercontent.com/images/sAiv8XpUWxb71XV3uCmVEzAMS0A.svg",
    handle: "@ecom_brand",
    testimonial: "Best creative strategy we've tested"
  },
  {
    id: "6",
    videoSrc: "https://framerusercontent.com/assets/CDUMuSViiwfgUWtLCKDQ2HUa80.mp4",
    avatarSrc: "https://framerusercontent.com/images/QYsfiTUurr8vxkRUjXw7KRx58Q.svg",
    handle: "@beauty_brand",
    testimonial: "Our best-performing campaign ever"
  }
];

// --- WorkCard ---
const WorkCard = ({ item }: { item: WorkItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      onClick={togglePlay}
      style={{
        flexShrink: 0,
        width: "300px",
        height: "500px",
        borderRadius: "24px",
        overflow: "hidden",
        backgroundColor: "#18181b",
        position: "relative",
        cursor: "pointer",
        scrollSnapAlign: "center",
        userSelect: "none",
      }}
    >
      <video
        ref={videoRef}
        src={item.videoSrc}
        loop
        muted
        playsInline
        autoPlay
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: isPlaying ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Play fill="white" color="white" size={24} style={{ marginLeft: 4 }} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <img src={item.avatarSrc} alt={item.handle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ color: "#fff", fontSize: "22px", fontWeight: 600, lineHeight: 1.2, fontFamily: "'Inter', sans-serif", margin: 0 }}>
            {item.handle}
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: 300, lineHeight: "22px", fontFamily: "'Inter', sans-serif", margin: 0 }}>
            {item.testimonial}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Section ---
export default function TestimonialsSection() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#FAFAFA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "96px",
        paddingBottom: "96px",
        gap: "56px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* 1. Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "0 24px",
          textAlign: "center",
          maxWidth: "900px",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid #e4e4e7",
            backgroundColor: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#34d399" }} />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#6b7280",
              fontFamily: "'Satoshi', sans-serif",
            }}
          >
            Client Testimonials
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
            color: "#111827",
            margin: 0,
            fontFamily: "'Satoshi', sans-serif",
          }}
        >
          Real Results,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "normal",
              fontWeight: 700,
              animation: "gradientMove 3s linear infinite",
            }}
          >
            Real Clients
          </span>
        </h2>

        <p
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#6b7280",
            maxWidth: "384px",
            lineHeight: 1.6,
            fontFamily: "'Satoshi', sans-serif",
            margin: 0,
          }}
        >
          Don't take our word for it. Here's what <strong style={{ color: "#111827", fontWeight: 700 }}>brands worldwide</strong> have to say about working with us.
        </p>

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');
        `}</style>
      </div>

      {/* 2. Carousel */}
      <div style={{ width: "100%", position: "relative" }}>
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            display: "flex",
            gap: "12px",
            padding: "16px 48px 48px 48px",
            scrollSnapType: "x mandatory",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {RECENT_WORKS.map((work, index) => (
            <WorkCard key={`${work.id}-${index}`} item={work} />
          ))}
        </div>
      </div>

      {/* 3. Footer Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 28px",
          backgroundColor: "#18181b",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          transition: "all 0.3s",
          fontFamily: "'Inter', sans-serif",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = "#34d399";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(52,211,153,0.4)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = "#18181b";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase", color: "#fff" }}>
          See All Testimonials
        </span>
      </button>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}