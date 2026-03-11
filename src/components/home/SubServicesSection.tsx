import { useState, useRef } from "react";
import { Check } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badges: string[];
  videoSrc: string | null;
  link: string;
  area: "top-left" | "bottom-left" | "top-center" | "bottom-center" | "right" | "bottom-wide" | "bottom-right";
}

export interface SubServicesSectionProps {
  heading?: string;
  headingHighlight?: string;
  subtitle?: string;
  services?: ServiceItem[];
}

// ─── Default data (used on home page) ───────────────────────

const defaultServices: ServiceItem[] = [
  {
    id: "website-development",
    title: "Website Development",
    description: "Beautiful, fast websites built to convert visitors into customers.",
    badges: ["UI/UX Design", "CMS Integration", "Performance", "SEO Ready"],
    videoSrc: "/videos/websitedevelopment.mp4",
    link: "/services/website-development",
    area: "top-left",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description: "Craft a cohesive visual identity that makes your business instantly recognizable.",
    badges: ["Logo Design", "Visual Guidelines", "Tone of Voice", "Brand Assets"],
    videoSrc: null,
    link: "/services/brand-identity",
    area: "bottom-left",
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "Build a roadmap for growth with data-driven market analysis and competitive positioning.",
    badges: ["Market Analysis", "Competitor Research", "KPI Definition", "Growth Roadmap"],
    videoSrc: null,
    link: "/services/digital-strategy",
    area: "top-center",
  },
  {
    id: "seo",
    title: "SEO",
    description: "Dominate search results and drive organic traffic with technical optimization.",
    badges: ["Technical Audit", "Keyword Strategy", "Link Building", "Local SEO"],
    videoSrc: "/videos/seo.mp4",
    link: "/services/seo",
    area: "bottom-center",
  },
  {
    id: "paid-social-ads",
    title: "Paid Social Ads",
    description: "Reach your ideal customers on Meta, TikTok and LinkedIn with precision targeting.",
    badges: ["Meta Ads", "TikTok Ads", "LinkedIn Ads", "Retargeting"],
    videoSrc: "/videos/brand.mp4",
    link: "/services/paid-social-ads",
    area: "right",
  },
  {
    id: "google-ads",
    title: "Google Ads",
    description: "Get instant visibility with targeted campaigns that maximize your ROI. Smart bidding, compelling ad copy, and continuous optimization to turn every dollar into measurable growth.",
    badges: ["Search Ads", "Display Network", "Shopping Ads", "Remarketing"],
    videoSrc: "/videos/googleads.mp4",
    link: "/services/google-ads",
    area: "bottom-wide",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    description: "Compelling content that tells your brand story and drives engagement across every channel.",
    badges: ["Copywriting", "Video Scripts", "Social Content", "Blog Posts"],
    videoSrc: null,
    link: "/services/content-creation",
    area: "bottom-right",
  },
];

// ─── Sub-components ─────────────────────────────────────────

const Badge = ({ label }: { label: string }) => (
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

const ServiceCard = ({ service, style = {} }: { service: ServiceItem; style?: React.CSSProperties }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!service.videoSrc;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasVideo && videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      if (videoRef.current.duration) videoRef.current.currentTime = videoRef.current.duration * 0.8;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) videoRef.current.currentTime = videoRef.current.duration * 0.8;
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
        boxShadow: !hasVideo && isHovered ? "0 20px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.2)",
        ...style,
      }}
    >
      {hasVideo && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.8) 100%)",
          }} />
          <video
            ref={videoRef}
            src={service.videoSrc!}
            muted loop playsInline preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.7s ease, filter 0.7s ease",
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              filter: isHovered ? "grayscale(0) brightness(0.85)" : "grayscale(0.25) brightness(0.65)",
            }}
          />
        </div>
      )}

      {!hasVideo && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <svg width="100%" height="100%" style={{ opacity: 0.05 }}>
            <defs>
              <pattern id={`grid-${service.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${service.id})`} />
          </svg>
        </div>
      )}

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "28px", height: "100%", boxSizing: "border-box",
      }}>
        <div>
          <div>
            <h3 style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
              fontSize: "22px", lineHeight: 1.15, color: "#ffffff", margin: "0 0 10px 0",
            }}>
              {service.title}
            </h3>
            <p style={{
              fontFamily: "'Satoshi', sans-serif", fontWeight: 400,
              fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.6)",
              margin: 0, maxWidth: "260px",
            }}>
              {service.description}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {service.badges.map((b, i) => <Badge key={i} label={b} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────

const SubServicesSection = ({
  heading = "Comprehensive Digital",
  headingHighlight = "Marketing Services",
  subtitle = "Everything you need to grow your business online, all under one roof.",
  services,
}: SubServicesSectionProps) => {
  const items = services || defaultServices;
  const byArea = Object.fromEntries(items.map(s => [s.area, s]));

  return (
    <section style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
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

        /* ── Desktop grid (≥768px) ── */
        .services-desktop-grid {
          display: none;
        }
        @media (min-width: 768px) {
          .services-desktop-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 16px;
            width: 100%;
          }
          .services-mobile-grid {
            display: none !important;
          }
          .services-section-wrapper {
            padding: 80px 80px;
          }
        }

        /* ── Mobile grid (<768px) ── */
        .services-mobile-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        @media (max-width: 767px) {
          .services-section-wrapper {
            padding: 48px 16px;
          }
        }
      `}</style>

      <div className="services-section-wrapper" style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 16px" }}>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.1,
            color: "#111827", marginBottom: "16px",
          }}>
            {heading}{" "}
            <span className="gradient-text">{headingHighlight}</span>
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 500,
            fontSize: "15px", lineHeight: 1.6, color: "#6b7280",
            maxWidth: "400px", margin: "0 auto",
          }}>
            {subtitle}
          </p>
        </div>

        {/* ── Desktop layout (unchanged) ── */}
        <div className="services-desktop-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <ServiceCard service={byArea["top-left"]} style={{ height: "480px" }} />
            <ServiceCard service={byArea["bottom-left"]} style={{ height: "260px" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <ServiceCard service={byArea["top-center"]} style={{ height: "300px" }} />
            <ServiceCard service={byArea["bottom-center"]} style={{ height: "440px" }} />
          </div>
          <div style={{ height: "756px" }}>
            <ServiceCard service={byArea["right"]} style={{ height: "100%" }} />
          </div>
          <div style={{ gridColumn: "1 / 3", height: "280px" }}>
            <ServiceCard service={byArea["bottom-wide"]} style={{ height: "100%" }} />
          </div>
          <div style={{ gridColumn: "3", height: "280px" }}>
            <ServiceCard service={byArea["bottom-right"]} style={{ height: "100%" }} />
          </div>
        </div>

        {/* ── Mobile layout (single column, all cards) ── */}
        <div className="services-mobile-grid">
          {items.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              style={{ height: "240px", minHeight: "240px" }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SubServicesSection;