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
      {/* Video Background */}
      <video
        ref={videoRef}
        src={item.videoSrc}
        loop
        muted
        playsInline
        autoPlay
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark Overlay Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Play Button */}
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

      {/* Bottom Content */}
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
        {/* Avatar */}
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

        {/* Text Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p
            style={{
              color: "#fff",
              fontSize: "22px",
              fontWeight: 600,
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
              margin: 0,
            }}
          >
            {item.handle}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: "22px",
              fontFamily: "'Inter', sans-serif",
              margin: 0,
            }}
          >
            {item.testimonial}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Section ---
export default function VideosPhoneSection() {
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
        // Dot pattern background from InteractivePath

      }}
    >
      {/* 1. Header Section */}
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
        {/* Badge — style from InteractivePath */}
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
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#34d399",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#71717a",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Client Portfolio
          </span>
        </div>

        {/* Title — style from InteractivePath */}
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            color: "#18181b",
            margin: 0,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Campaigns &amp; Videos{" "}
          <span
            style={{
              background: "linear-gradient(to right, #34d399, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Worldwide
          </span>
        </h2>

        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "#71717a",
            maxWidth: "600px",
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
            margin: 0,
          }}
        >
          A selection of campaigns and videos I've produced for brands across Spain, Germany, Australia, and the US. From strategic ad campaigns to high-performance creatives, here's a glimpse of what I do.
        </p>
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

      {/* 3. Footer Button — style from InteractivePath */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
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
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#34d399";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(52,211,153,0.4)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#18181b";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          See All Work
        </span>
      </button>

      {/* Hide scrollbar for webkit */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}