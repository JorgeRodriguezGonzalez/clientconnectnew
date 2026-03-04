import { useState, useRef } from "react";
import { Check } from "lucide-react";

const services = [
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "Build a roadmap for growth with data-driven market analysis and competitive positioning.",
    badges: ["Market Analysis", "Competitor Research", "KPI Definition", "Growth Roadmap"],
    videoSrc: "/videos/digital.mp4",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description: "Craft a cohesive visual identity that makes your business instantly recognizable.",
    badges: ["Logo Design", "Visual Guidelines", "Tone of Voice", "Brand Assets"],
    videoSrc: "/videos/brand.mp4",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "website-development",
    title: "Website Development",
    description: "Beautiful, fast websites built to convert visitors into customers.",
    badges: ["UI/UX Design", "CMS Integration", "Performance", "SEO Ready"],
    videoSrc: "/videos/websitedevelopment.mp4",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "seo",
    title: "SEO",
    description: "Dominate search results and drive organic traffic with technical and on-page optimization.",
    badges: ["Technical Audit", "Keyword Strategy", "Link Building", "Local SEO"],
    videoSrc: "/videos/seo.mp4",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "paid-social-ads",
    title: "Paid Social Ads",
    description: "Reach your ideal customers on Meta, TikTok and LinkedIn with precision targeting.",
    badges: ["Meta Ads", "TikTok Ads", "LinkedIn Ads", "Retargeting"],
    videoSrc: null,
    colSpan: 1,
    rowSpan: 1,
  },
];

const Badge = ({ label }) => (
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 12px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.85)",
    fontFamily: "'Satoshi', sans-serif",
    whiteSpace: "nowrap",
  }}>
    {label}
  </span>
);

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const hasVideo = !!service.videoSrc;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasVideo && videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = videoRef.current.duration * 0.8;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration * 0.8;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        background: "radial-gradient(50% 50% at 0% 0%, #1e1e1e 2%, #080808 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: !hasVideo && isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: !hasVideo && isHovered ? "0 20px 40px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)",
        height: "100%",
        minHeight: "280px",
      }}
    >
      {/* Video background */}
      {hasVideo && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.75) 100%)",
            zIndex: 1,
          }} />
          <video
            ref={videoRef}
            src={service.videoSrc}
            muted loop playsInline preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.7s ease, filter 0.7s ease",
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              filter: isHovered ? "grayscale(0) brightness(0.85)" : "grayscale(0.3) brightness(0.7)",
            }}
          />
        </div>
      )}

      {/* No-video background pattern */}
      {!hasVideo && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <svg width="100%" height="100%" style={{ opacity: 0.06 }}>
            <defs>
              <pattern id={`grid-${service.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${service.id})`} />
          </svg>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
            background: "linear-gradient(to top, rgba(6,182,212,0.06), transparent)",
          }} />
        </div>
      )}

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "28px", height: "100%", boxSizing: "border-box",
      }}>
        {/* Top: title + description */}
        <div>
          <h3 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            lineHeight: 1.15,
            color: "#ffffff",
            margin: "0 0 10px 0",
          }}>
            {service.title}
          </h3>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
            margin: 0,
            maxWidth: "280px",
          }}>
            {service.description}
          </p>
        </div>

        {/* Bottom: badges */}
        <div style={{ marginTop: "24px" }}>
          <div style={{
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
            fontFamily: "'Satoshi', sans-serif", marginBottom: "10px",
          }}>
            Includes {service.badges.length} capabilities
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Check style={{ width: "12px", height: "12px", color: "#06b6d4" }} strokeWidth={2.5} />
            </div>
            {service.badges.map((badge, i) => <Badge key={i} label={badge} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section style={{ padding: "80px 20px", backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,300&display=swap');
        .gradient-text {
          background: linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto;
          gap: 16px;
          width: 100%;
        }
        .card-0 { grid-column: span 1; grid-row: span 2; min-height: 560px; }
        .card-1 { grid-column: span 1; grid-row: span 1; min-height: 270px; }
        .card-2 { grid-column: span 1; grid-row: span 1; min-height: 270px; }
        .card-3 { grid-column: span 1; grid-row: span 1; min-height: 270px; }
        .card-4 { grid-column: span 1; grid-row: span 1; min-height: 270px; }
        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr; }
          .card-0, .card-1, .card-2, .card-3, .card-4 { grid-column: span 1; grid-row: span 1; min-height: 300px; }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "60px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px" }}>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.1,
            color: "#111827",
            marginBottom: "16px",
          }}>
            Comprehensive Digital{" "}
            <span className="gradient-text">Marketing Services</span>
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#6b7280",
            maxWidth: "400px",
            margin: "0 auto",
          }}>
            Everything you need to grow your business online, all under one roof.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {services.map((service, index) => (
            <div key={service.id} className={`card-${index}`}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;