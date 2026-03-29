import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTASection from "@/components/home/CTASection";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { FileText, Minus, Plus, MessageSquare, ArrowRight } from "lucide-react";
import { useIsTablet } from "@/hooks/useIsTablet";
import { useNavigate } from "react-router-dom";

const C = {
  cyan: "#06b6d4",
  green: "#34d399",
  cyanLight: "#67e8f9",
  greenLight: "#6ee7b7",
  cyanBg: "rgba(6,182,212,0.15)",
  greenBg: "rgba(52,211,153,0.15)",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
  text: "#a1a1aa",
  cardBorder: "rgba(255,255,255,0.06)",
  primaryRGB: "52,211,153",
  secondaryRGB: "6,182,212",
};

const PRIMARY = "#34d399";
const PRIMARY_RGB = "52,211,153";
const SECONDARY = "#06b6d4";
const SECONDARY_RGB = "6,182,212";
const FONT = "'Satoshi', -apple-system, sans-serif";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const images = [
  { url: "/images/driveways.jpg", alt: "Content Creation", rotate: -6 },
  { url: "/images/driveways11.jpg", alt: "Creative Content", rotate: 3 },
  { url: "/images/nanotise-vertical.jpg", alt: "Content Strategy", rotate: -2 },
  { url: "/images/assetplumbing-vertical.png", alt: "Brand Content", rotate: 5 },
  { url: "/images/premier.jpg", alt: "Marketing Content", rotate: -4 },
  { url: "/images/YLRimage.jpg", alt: "Visual Content", rotate: 3 },
];
const mobileImages = [images[0], images[1], images[2], images[3]];

// ─── Inline Services Data & Components ──────────────────────

interface ContentServiceItem {
  id: string;
  title: string;
  description: string;
  badges: string[];
  videoSrc: string | null;
  imageSrc?: string | null;
}

const contentServices: ContentServiceItem[] = [
  {
    id: "video-content",
    title: "Video Content",
    description: "Scripts, storyboards, and video production support for social, ads, and website content that engages.",
    badges: ["Scripts", "Storyboards", "Short-Form", "Tutorials"],
    videoSrc: "/videos/contentcreation.mp4",
  },
  {
    id: "website-copywriting",
    title: "Website Copywriting",
    description: "Compelling, conversion-focused copy for landing pages, homepages, service pages, and location pages that turns visitors into customers.",
    badges: ["Landing Pages", "Location Pages", "Service Pages", "CTAs"],
    videoSrc: null,
  },
  {
    id: "infographics",
    title: "Infographics & Visual Content",
    description: "Data-driven infographics and visual assets that simplify complex ideas and boost shareability.",
    badges: ["Data Viz", "Branded", "Downloadable", "Social"],
    videoSrc: null,
  },
  {
    id: "social-media-content",
    title: "Social Media Content",
    description: "Scroll-stopping captions, carousels, and stories designed for engagement and brand consistency.",
    badges: ["Captions", "Carousels", "Stories", "Reels"],
    videoSrc: "/videos/contentcreation2.mp4",
  },
  {
    id: "photography",
    title: "Photography & Visuals",
    description: "Professional photography and curated visuals that bring your brand story to life across all channels.",
    badges: ["Product Shots", "Lifestyle", "Stock Curation", "Editing"],
    videoSrc: null,
    imageSrc: "/images/driveways3.jpg",
  },
];

const InlineBadge = ({ label }: { label: string }) => (
  <span style={{
    display: "inline-flex", alignItems: "center",
    padding: "5px 12px", borderRadius: "999px",
    fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.85)", fontFamily: "'Satoshi', sans-serif", whiteSpace: "nowrap",
  }}>
    {label}
  </span>
);

const InlineServiceCard = ({ service, style = {} }: { service: ContentServiceItem; style?: React.CSSProperties }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!service.videoSrc;
  const hasImage = !!service.imageSrc;
  const hasMedia = hasVideo || hasImage;

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
        position: "relative", borderRadius: "24px", overflow: "hidden", cursor: "pointer",
        background: "radial-gradient(50% 50% at 0% 0%, #1e1e1e 2%, #080808 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: !hasMedia && isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: !hasMedia && isHovered ? "0 20px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.2)",
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
            ref={videoRef} src={service.videoSrc!}
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
      {hasImage && !hasVideo && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.8) 100%)",
          }} />
          <img
            src={service.imageSrc!}
            alt={service.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.7s ease, filter 0.7s ease",
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              filter: isHovered ? "grayscale(0) brightness(0.85)" : "grayscale(0.25) brightness(0.65)",
            }}
          />
        </div>
      )}
      {!hasMedia && (
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
          <h3 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
            fontSize: "22px", lineHeight: 1.15, color: "#ffffff", margin: "0 0 10px 0",
          }}>{service.title}</h3>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 400,
            fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.6)",
            margin: 0, maxWidth: "260px",
          }}>{service.description}</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {service.badges.map((b, i) => <InlineBadge key={i} label={b} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentServicesGrid = () => {
  const s = contentServices;
  return (
    <section style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,300&display=swap');
        .cc-gradient-text {
          background: linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cc-shimmer 3s linear infinite;
        }
        @keyframes cc-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .cc-desktop-grid { display: none; }
        @media (min-width: 768px) {
          .cc-desktop-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; width: 100%; }
          .cc-mobile-grid { display: none !important; }
          .cc-section-wrapper { padding: 80px 80px; }
        }
        .cc-mobile-grid { display: flex; flex-direction: column; gap: 12px; width: 100%; }
        @media (max-width: 767px) {
          .cc-section-wrapper { padding: 48px 16px; }
        }
      `}</style>

      <div className="cc-section-wrapper" style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "8px",
            border: "1px solid #e4e4e7", backgroundColor: "#fafafa", width: "fit-content", marginBottom: "16px",
          }}>
            <span style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase",
              color: "#6b7280", fontFamily: "'Satoshi', sans-serif",
            }}>What We Do</span>
          </div>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.1,
            color: "#111827", marginBottom: "16px",
          }}>
            What's Included in Our{" "}
            <span className="cc-gradient-text">Content Creation</span>
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 500,
            fontSize: "15px", lineHeight: 1.6, color: "#6b7280",
            maxWidth: "400px", margin: "0 auto",
          }}>
            Strategic content that drives engagement, builds authority, and converts.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="cc-desktop-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <InlineServiceCard service={s[0]} style={{ height: "480px" }} />
            <InlineServiceCard service={s[1]} style={{ height: "260px" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <InlineServiceCard service={s[2]} style={{ height: "300px" }} />
            <InlineServiceCard service={s[3]} style={{ height: "440px" }} />
          </div>
          <div style={{ height: "756px" }}>
            <InlineServiceCard service={s[4]} style={{ height: "100%" }} />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="cc-mobile-grid">
          {s.map((service) => (
            <InlineServiceCard key={service.id} service={service} style={{ height: "320px", minHeight: "320px" }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Our Work ───────────────────────────────────────────────

interface WorkItem {
  src: string;
  type: "image" | "video";
  category: string;
  title: string;
}

const workItems: WorkItem[] = [
  { src: "/images/driveways.jpg", type: "image", category: "Trades · Residential", title: "Driveways Co" },
  { src: "/videos/contentcreation.mp4", type: "video", category: "Video · Social", title: "Brand Spotlight" },
  { src: "/images/nanotise-vertical.jpg", type: "image", category: "SaaS · Tech", title: "Nanotise" },
  { src: "/videos/contentcreation2.mp4", type: "video", category: "Content · Strategy", title: "Social Campaign" },
  { src: "/images/YLRimage.jpg", type: "image", category: "Real Estate · Lifestyle", title: "YLR Group" },
  { src: "/images/assetplumbing-vertical.png", type: "image", category: "Trades · Service", title: "Asset Plumbing" },
  { src: "/images/driveways11.jpg", type: "image", category: "Trades · Portfolio", title: "Driveways Gallery" },
  { src: "/images/premier.jpg", type: "image", category: "Business · Corporate", title: "Premier Services" },
];

const OurWork = () => {
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();
  const perPage = isMobile ? 2 : 3;
  const totalPages = Math.ceil(workItems.length / perPage);
  const currentItems = workItems.slice(page * perPage, page * perPage + perPage);

  const goNext = () => setPage((p) => (p + 1) % totalPages);
  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  return (
    <section style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
      <style>{`
        .work-grid-new {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }
        @media (max-width: 767px) {
          .work-grid-new {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .work-section-wrapper { padding: 48px 16px; }
        }
        @media (min-width: 768px) {
          .work-section-wrapper { padding: 80px 80px; }
        }
      `}</style>

      <div className="work-section-wrapper" style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "8px",
            border: "1px solid #e4e4e7", backgroundColor: "#fafafa", width: "fit-content", marginBottom: "16px",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6b7280", fontFamily: "'Satoshi', sans-serif" }}>
              Portfolio
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.1,
            color: "#111827", marginBottom: "16px",
          }}>
            Our{" "}
            <span className="cc-gradient-text">Work</span>
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 500,
            fontSize: "15px", lineHeight: 1.6, color: "#6b7280",
            maxWidth: "400px", margin: "0 auto",
          }}>
            A selection of content projects we've delivered for Sydney businesses.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ position: "relative", width: "100%" }}>

          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            style={{
              position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
              width: "44px", height: "44px", borderRadius: "50%",
              background: "#111", border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <button
            onClick={goNext}
            style={{
              position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
              width: "44px", height: "44px", borderRadius: "50%",
              background: "#111", border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <div className="work-grid-new">
            {currentItems.map((item, i) => (
              <WorkCard key={`${page}-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: page === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: page === i ? C.green : "#d1d5db",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkCard = ({ item }: { item: WorkItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (item.type !== "video" || !videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "4 / 3.2",
        background: "#f3f4f6",
        transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 24px 48px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)"
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Media */}
      {item.type === "image" && (
        <img
          src={item.src}
          alt={item.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      )}
      {item.type === "video" && (
        <video
          ref={videoRef}
          src={item.src}
          muted loop playsInline preload="metadata"
          onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0.5; }}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      )}

      {/* Bottom gradient overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "55%",
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        pointerEvents: "none",
        transition: "opacity 0.4s ease",
        opacity: 1,
      }} />

      {/* Content overlay at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px 24px",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        zIndex: 2,
      }}>
        <div>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            margin: 0,
            letterSpacing: "0.02em",
          }}>
            {item.category}
          </p>
        </div>


      </div>

      {/* Play icon for video */}
      {item.type === "video" && !isPlaying && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.15)",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#111" stroke="none">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Process ────────────────────────────────────────────────

const processSteps = [
  {
    step: "Step 1",
    title: "Content Strategy & Research",
    description: "We define your content goals, audience personas, and content pillars. We research topics, keywords, and competitors so every piece of content has a clear purpose and fits your strategy.",
    badges: ["Audience Research", "Content Pillars", "Keyword Research", "Editorial Calendar"],
  },
  {
    step: "Step 2",
    title: "Creation & Production",
    description: "Our writers and creatives produce blog posts, videos, graphics, and social content that match your brand voice. We work in batches so you get consistent quality without the bottleneck.",
    badges: ["Copywriting", "Video Scripts", "Design", "Editing"],
  },
  {
    step: "Step 3",
    title: "Publishing & Distribution",
    description: "We publish content to your blog, social channels, and email lists. We optimise for each platform and schedule for the best engagement so your content reaches the right people at the right time.",
    badges: ["CMS Publishing", "Social Scheduling", "Email", "SEO"],
  },
  {
    step: "Step 4",
    title: "Measure & Optimise",
    description: "We track engagement, traffic, and conversions tied to your content. Using data, we refine topics, formats, and distribution so your content strategy keeps improving and delivering results.",
    badges: ["Analytics", "Engagement", "A/B Testing", "Iteration"],
  },
];

const ProcessBadge = ({ label, isActive, delay }: { label: string; isActive: boolean; delay: number }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "6px 14px", borderRadius: "999px",
    fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
    fontFamily: "'Satoshi', sans-serif", whiteSpace: "nowrap",
    background: isActive ? C.cyanBg : "rgba(255,255,255,0.05)",
    border: isActive ? `1px solid rgba(${C.secondaryRGB},0.25)` : "1px solid rgba(255,255,255,0.08)",
    color: isActive ? C.cyan : "rgba(255,255,255,0.45)",
    opacity: isActive ? 1 : 0.6,
    transform: isActive ? "translateY(0)" : "translateY(4px)",
    transition: `all 0.5s ease ${delay}s`,
  }}>
    {isActive && (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )}
    {label}
  </span>
);

const OurProcess = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCount = processSteps.length;
  const stackOffset = 24;
  const isTablet = useIsTablet();

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={{ background: "#000", padding: "80px 0 0" }}>
      <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)",
            width: "fit-content", margin: "0 auto 16px",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", fontFamily: "'Satoshi', sans-serif" }}>How We Work</span>
          </div>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1.5px", color: "#fff", marginTop: "12px" }}>
            Our Content Creation Process
          </h2>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "16px auto 0", lineHeight: 1.65 }}>
            From strategy to distribution, we follow a proven 4-step process to create content that engages your audience and drives measurable results.
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} style={{ position: "relative", height: `${cardCount * 60 + 40}vh`, maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {processSteps.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={i} ref={el => cardRefs.current[i] = el} style={{ position: "sticky", top: `calc(112px + ${i * stackOffset}px)`, marginBottom: `${60 / cardCount}vh`, zIndex: 10 + i }}>
              <div style={{
                ...(isTablet
                  ? { background: `linear-gradient(135deg, rgba(255,255,255,${0.16 - i * 0.025}) 0%, rgba(255,255,255,${0.07 - i * 0.005}) 100%)` }
                  : {
                      background: `linear-gradient(135deg, rgba(255,255,255,${0.12 - i * 0.025}) 0%, rgba(255,255,255,${0.03 - i * 0.005}) 100%)`,
                      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                    }),
                borderRadius: "20px", padding: "56px 44px", position: "relative", overflow: "hidden",
                minHeight: "300px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                backgroundClip: isActive ? "padding-box" : undefined,
                boxShadow: isActive ? `0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(${C.secondaryRGB},0.15), 0 0 80px rgba(${C.primaryRGB},0.08)` : "0 20px 40px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.5s ease, border 0.5s ease, transform 0.5s ease",
                transform: isActive ? "scale(1)" : "scale(0.98)",
              }}>
                {isActive && (
                  <div style={{ position: "absolute", inset: 0, borderRadius: "20px", padding: "1px", background: C.gradient, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", pointerEvents: "none", opacity: 0.7, transition: "opacity 0.5s ease" }} />
                )}
                <div style={{ position: "absolute", top: 0, left: "24px", right: "24px", height: "1px", background: isActive ? C.gradient : "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)", transition: "background 0.5s ease" }} />
                <span style={{
                  display: "inline-flex", alignItems: "center", fontFamily: "'Satoshi', sans-serif", fontSize: "12px", fontWeight: 600,
                  color: isActive ? C.cyan : "rgba(255,255,255,0.4)",
                  background: isActive ? C.cyanBg : "rgba(255,255,255,0.04)",
                  border: isActive ? `1px solid rgba(${C.secondaryRGB},0.25)` : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px", padding: "5px 14px", marginBottom: "12px", transition: "all 0.5s ease", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{item.step}</span>
                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, letterSpacing: "-1px", textAlign: "center", margin: "0 0 16px 0", transition: "color 0.5s ease" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500, color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)", maxWidth: "560px", lineHeight: 1.7, textAlign: "center", margin: "0 0 24px 0", transition: "color 0.5s ease" }}>{item.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "4px" }}>
                  {item.badges.map((badge, bi) => <ProcessBadge key={bi} label={badge} isActive={isActive} delay={bi * 0.08} />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ─── FAQ ─────────────────────────────────────────────────────

const contentCreationFaqs = [
  { id: 1, question: "What types of content do you create?", answer: "We create blog posts and articles, video scripts and storyboards, social media content (captions, carousels, stories), email newsletters, infographics, and photography-led content. We tailor the mix to your goals, audience, and channels." },
  { id: 2, question: "How often will I get new content?", answer: "Frequency is agreed in your content plan — typically from a few posts per month to multiple pieces per week. We work in batches so you get a steady flow without last-minute rushes, and we can scale up or down as needed." },
  { id: 3, question: "Is the content optimised for SEO?", answer: "Yes. Where relevant (e.g. blog and website content), we research keywords, optimise structure and meta, and align content with search intent so it supports both engagement and organic visibility." },
  { id: 4, question: "What's the approval process?", answer: "We share drafts or concepts for your review. You get a set number of revision rounds per piece. We incorporate feedback and finalise for publishing. Clear timelines and feedback loops keep everything on track." },
  { id: 5, question: "How do you measure content success?", answer: "We track engagement (likes, shares, comments), traffic to content, time on page, and conversions tied to content (e.g. form fills, sign-ups). You'll get regular reports so you can see how content is performing and where to optimise." },
];

const BackgroundStripes = () => (
  <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert" style={{
    backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
    backgroundRepeat: 'repeat',
  }} />
);

const ContentCreationFAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#050505] py-24 sm:py-32 overflow-hidden">
      <div className="w-full h-[1px] bg-white/10 absolute top-0 z-20" />
      <BackgroundStripes />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-500">SUPPORT</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-white">
            Frequently asked{' '}
            <motion.span initial={{ backgroundPosition: "400% 50%" }} animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }} transition={{ duration: 12, ease: "linear", repeat: Infinity }} style={{ display: "inline-block", backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${C.green}, ${C.cyan}, rgba(255,255,255,0))`, backgroundSize: "400% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>questions</motion.span>
            <span className="text-white">.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-[16px] md:text-[18px] font-medium leading-relaxed text-zinc-400 tracking-tight">
            Everything you need to know about our content creation services, process, and how we deliver results.
          </motion.p>
        </div>

        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/5 px-3 py-1 border border-white/5">Updated Today</span>
          </div>
          <Accordion.Root type="single" collapsible value={openItem || ""} onValueChange={(value) => setOpenItem(value)} className="space-y-4">
            {contentCreationFaqs.map((item, index) => (
              <Accordion.Item value={item.id.toString()} key={item.id} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-start gap-x-4 focus:outline-none group">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }}
                      className={cn("relative flex items-center justify-between w-full p-5 text-left transition-all duration-300 border rounded-none",
                        openItem === item.id.toString() ? "bg-[#0a0a0a] border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 rounded-xl" : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 rounded-xl"
                      )}>
                      <div className="flex items-center gap-4">
                        <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300", openItem === item.id.toString() ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-500")}>
                          <MessageSquare size={14} />
                        </div>
                        <span className={cn("text-base md:text-lg font-semibold transition-colors duration-300", openItem === item.id.toString() ? "text-white" : "text-zinc-400")}>{item.question}</span>
                      </div>
                      <span className={cn("ml-4 transition-transform duration-300", openItem === item.id.toString() ? "text-emerald-500 rotate-180" : "text-zinc-600")}>
                        {openItem === item.id.toString() ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>
                      {openItem === item.id.toString() && (
                        <motion.div layoutId="contentcreation-faq-active-line" className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: C.green }} />
                      )}
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content asChild forceMount>
                  <AnimatePresence initial={false}>
                    {openItem === item.id.toString() && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="flex justify-end mt-2 ml-8 md:ml-16">
                          <div className={cn("relative max-w-2xl p-6 text-sm md:text-base leading-relaxed rounded-xl shadow-sm border", "bg-zinc-900 border-white/10 text-zinc-300")}>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500/20" />
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
};

// ─── Main Page ──────────────────────────────────────────────

const ContentCreationService = () => {
  const [hImg, setHImg] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const navigate = useNavigate();
  const [heroEmail, setHeroEmail] = useState('');

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const anim = (d = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  const galleryImages = isMobile ? mobileImages : images;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: FONT, overflowX: "clip" }}>
      <SEOHead
        title="Content Creation Sydney | Client Connect Australia"
        description="Professional content creation for Sydney businesses. Blog posts, social media content, photography and video that engages your audience and drives results."
        path="/services/content-creation"
      />
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Content Creation",
          "description": "Professional content creation for Sydney businesses. Blog posts, social media content, photography and video that drives results.",
          "provider": {
            "@type": "ProfessionalService",
            "name": "Client Connect Australia",
            "telephone": "+61272071038",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sydney",
              "addressRegion": "NSW",
              "addressCountry": "AU"
            }
          },
          "areaServed": { "@type": "City", "name": "Sydney" }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://clientconnectaustralia.com.au" },
            { "@type": "ListItem", "position": 2, "name": "Content Creation", "item": "https://clientconnectaustralia.com.au/services/content-creation" }
          ]
        }
      ]} />
      <Header />
      <main style={{ flex: 1 }}>

        {/* ═══════════════ HERO ═══════════════ */}
        <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: isMobile ? "80px" : "130px" }}>
          <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ textAlign: "center", paddingTop: isMobile ? "100px" : "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>

            <div style={{ height: isMobile ? "38px" : "48px" }} />

            <h1 style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff", ...anim(0.1) }}>
              <span>Content That</span><br />
              <motion.span initial={{ backgroundPosition: "400% 50%" }} animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY}, ${SECONDARY}, transparent)`, backgroundSize: "400% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>Converts.</motion.span>
            </h1>

            <p style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px", ...anim(0.3) }}>
              Strategic <span style={{ color: PRIMARY, fontWeight: 600 }}>content creation</span> for Sydney businesses — from blog and video to social and email — that builds authority, drives <span style={{ color: PRIMARY, fontWeight: 600 }}>engagement</span>, and converts.
            </p>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap", padding: "0 20px", fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)", ...anim(0.4) }}>
              <span>Blog & Articles</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>Video Content</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>3x Avg. Engagement</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "32px", padding: "0 20px", ...anim(0.5) }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50px", padding: "5px 5px 5px 24px", maxWidth: "520px", width: "100%",
                ...(isTablet
                  ? { background: "rgba(255,255,255,0.08)" }
                  : { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }),
              }}>
                <input type="email" placeholder="Enter your email for a free content audit" value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      navigate(heroEmail.trim() ? `/contact?email=${encodeURIComponent(heroEmail.trim())}` : '/contact');
                    }
                  }}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 500, fontSize: "14px", color: "#fff", minWidth: 0 }} />
                <button
                  onClick={() => {
                    navigate(heroEmail.trim() ? `/contact?email=${encodeURIComponent(heroEmail.trim())}` : '/contact');
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(52,211,153,0.5)"; e.currentTarget.style.background = "linear-gradient(135deg, #34d399, #06b6d4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#06b6d4"; }}
                  style={{ height: "40px", padding: "0 20px", borderRadius: "50px", background: "#06b6d4", border: "none", fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 600, fontSize: "14px", color: "#000", cursor: "pointer", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  Get Audit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: isMobile ? "10px" : "16px", marginTop: isMobile ? "36px" : "48px", padding: isMobile ? "10px 12px" : "20px 20px", overflow: "visible", position: "relative", zIndex: 2 }}>
            {galleryImages.map((img, i) => {
              const isCenter = isMobile ? (i === 1 || i === 2) : i === 2;
              const w = isMobile ? (isCenter ? "22vw" : "20vw") : (isCenter ? "200px" : "160px");
              const h = isMobile ? (isCenter ? "28vw" : "25vw") : (isCenter ? "260px" : "220px");
              return (
                <div key={i} onMouseEnter={() => setHImg(i)} onMouseLeave={() => setHImg(null)} style={{
                  flex: "0 0 auto", width: w, height: h,
                  maxWidth: isMobile ? "100px" : "200px", maxHeight: isMobile ? "130px" : "260px",
                  borderRadius: isMobile ? "14px" : "20px", overflow: "hidden", position: "relative", cursor: "grab",
                  transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.1 : 1}) rotateZ(${hImg === i ? (img.rotate < 0 ? -2 : 2) : 0}deg)`,
                  transition: "all 0.15s ease-out",
                  boxShadow: hImg === i ? "0 20px 60px rgba(0,0,0,0.5)" : "0 10px 40px rgba(0,0,0,0.4)",
                  opacity: loaded ? 1 : 0, transitionDelay: hImg === i ? "0s" : `${0.3 + i * 0.08}s`, zIndex: hImg === i ? 10 : 1,
                }}>
                  <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: hImg === i ? "transparent" : "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)", transition: "all 0.4s ease" }} />
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════ QUOTE BLOCK ═══════════════ */}
        <section style={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 1, padding: "40px 24px 200px", maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-1.5px", color: "#fff", margin: "0 auto 24px", maxWidth: "1000px" }}>
                Why Great Content Is the{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>Foundation of Digital Growth</span>
                {" "}— And Why Most Businesses Get It Wrong
              </p>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: "0 auto", maxWidth: "700px" }}>
                Quality content drives <span style={{ color: C.green, fontWeight: 500 }}>SEO</span>, builds trust, and keeps your audience engaged. Most businesses publish random posts without a strategy — we create content that supports your goals and <span style={{ color: C.green, fontWeight: 500 }}>converts</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ SERVICES GRID (INLINE) ═══════════════ */}
        <ContentServicesGrid />

        {/* ═══════════════ OUR PROCESS ═══════════════ */}
        <OurProcess />

        {/* ═══════════════ OUR WORK ═══════════════ */}
        <OurWork />

        {/* ═══════════════ FAQ ═══════════════ */}
        <ContentCreationFAQ />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ContentCreationService;