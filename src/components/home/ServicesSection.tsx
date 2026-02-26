import { useState, useRef } from "react";
import { ArrowRight, Compass, Palette, Code2, Search, MousePointerClick, TrendingUp } from "lucide-react";

const services = [
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    description: "We map out a clear path to grow your business online. From market research to channel selection and KPI setting, we build a custom roadmap that aligns your marketing with your business goals.",
    videoSrc: "/videos/digital.mp4",
    icon: Compass,
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description: "Your brand is more than a logo. We craft a cohesive visual and verbal identity — from color palettes and typography to tone of voice — that makes your business instantly recognizable and memorable.",
    videoSrc: "/videos/brand.mp4",
    icon: Palette,
  },
  {
    id: "website-development",
    title: "Website Development",
    description: "Beautiful, fast, and conversion-focused websites built to represent your brand perfectly. Every page is designed to guide visitors toward action and deliver an unforgettable user experience.",
    videoSrc: "/videos/websitedevelopment.mp4",
    icon: Code2,
  },
  {
    id: "seo",
    title: "SEO",
    description: "Rank higher on Google and drive organic traffic that converts into customers. We build long-term visibility through technical excellence, content strategy, and authoritative link building.",
    videoSrc: "/videos/seo.mp4",
    icon: Search,
  },
  {
    id: "google-ads",
    title: "Google Ads",
    description: "Get instant visibility with targeted campaigns that maximize your ROI. Smart bidding, compelling ad copy, and continuous optimization to turn every dollar into measurable growth.",
    videoSrc: "https://videos.pexels.com/video-files/4514642/4514642-hd_1080_1920_24fps.mp4",
    icon: MousePointerClick,
  },
  {
    id: "paid-social-ads",
    title: "Paid Social Ads",
    description: "Reach your ideal customers on Facebook, Instagram, TikTok, and LinkedIn with precision. Creative-led campaigns with sharp targeting that generate leads and scale profitably across platforms.",
    videoSrc: "https://videos.pexels.com/video-files/7966582/7966582-hd_1080_1920_25fps.mp4",
    icon: TrendingUp,
  },
];

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "30px",
        overflow: "hidden",
        cursor: "pointer",
        height: "320px",
        background: "radial-gradient(50% 50% at 0% 0%, #1a1a1a 2.21%, #050505 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        opacity: 0,
        transform: "translateY(20px)",
        animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`,
      }}
    >
      {/* Text content */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px 36px",
        paddingRight: "52%",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ padding: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", display: "flex" }}>
              <service.icon style={{ width: "18px", height: "18px", color: "#06b6d4" }} />
            </div>
            <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "22px", lineHeight: 1.2, color: "#fff", margin: 0 }}>
              {service.title}
            </h3>
          </div>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: "22px", color: "rgba(255,255,255,0.6)", margin: 0 }}>
            {service.description}
          </p>
        </div>

        <div style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "27px",
          paddingLeft: "16px",
          paddingRight: "4px",
          paddingTop: "5px",
          paddingBottom: "5px",
          alignItems: "center",
          gap: "8px",
          transition: "transform 0.3s",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transformOrigin: "left",
        }}>
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 300, fontSize: "10px", textTransform: "uppercase", color: "#fff", letterSpacing: "0.08em" }}>
            Learn More
          </span>
          <div style={{ width: "28px", height: "28px", background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowRight style={{ width: "12px", height: "12px", color: "rgba(255,255,255,0.9)", transform: isHovered ? "rotate(0deg)" : "rotate(-45deg)", transition: "transform 0.3s" }} />
          </div>
        </div>
      </div>

      {/* Video */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "48%",
        transition: "transform 0.7s ease",
        transform: isHovered ? "translateX(0) translateY(0)" : "translateX(12px) translateY(-8px)",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "0 30px 30px 0",
          overflow: "hidden",
          transform: isHovered ? "rotate(0deg)" : "rotate(3deg)",
          transition: "transform 0.7s ease",
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 10,
            mixBlendMode: "multiply",
            opacity: isHovered ? 0 : 1,
            transition: "opacity 0.5s",
            pointerEvents: "none",
          }} />
          <video
            ref={videoRef}
            src={service.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "all 0.7s",
              filter: isHovered ? "grayscale(0)" : "grayscale(0.5)",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section style={{ padding: "80px 20px", backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,300&display=swap');
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
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
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "60px" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", width: "100%" }}>
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;