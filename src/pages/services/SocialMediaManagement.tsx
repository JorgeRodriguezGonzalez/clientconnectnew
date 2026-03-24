import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Share2, Calendar, Users, BarChart, TrendingUp, MessageSquare, Minus, Plus } from "lucide-react";
import SubServicesSection from "@/components/home/SubServicesSection";
import CTASection from "@/components/home/CTASection";
import { socialMgmtServices, socialMgmtHeading, socialMgmtHighlight, socialMgmtSubtitle } from "@/data/services/socialmgmt-services";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { useIsTablet } from "@/hooks/useIsTablet";

const C = {
  cyan: "#06b6d4",
  green: "#34d399",
  cyanBg: "rgba(6,182,212,0.15)",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
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
  { url: "/images/socialmedia.jpg", alt: "Social Media Content", rotate: -6 },
  { url: "/images/socialmedia2.jpg", alt: "Community Engagement", rotate: 3 },
  { url: "/images/socialmedia3.jpg", alt: "Content Creation", rotate: -2 },
  { url: "/images/socialmedia4.jpg", alt: "Brand Strategy", rotate: 5 },
  { url: "/images/socialmedia5.jpg", alt: "Analytics Dashboard", rotate: -4 },
  { url: "/images/socialmedia6.png", alt: "Growth Metrics", rotate: 3 },
];
const mobileImages = [images[0], images[1], images[2], images[3]];

// --- OUR PROCESS STEPS (Social Media Management) ---
const processSteps = [
  {
    step: "Step 1",
    title: "We Learn Your Brand",
    description: "Before anything goes live, we dig into your business. Your voice, your audience, what your competitors are doing. We build a strategy around where you actually want to go, not a cookie-cutter template.",
    icon: null,
    badges: ["Brand Deep-Dive", "Audience Research", "Competitor Audit", "Custom Strategy"],
  },
  {
    step: "Step 2",
    title: "We Create the Content",
    description: "Captions, graphics, Reels, Stories. We handle the lot. You get a monthly content calendar to review before anything goes out. Don't like something? We change it. Simple.",
    icon: null,
    badges: ["Copywriting", "Design", "Reels & Stories", "Your Approval"],
  },
  {
    step: "Step 3",
    title: "We Post & Engage",
    description: "Content goes live at the right times, on the right platforms. We reply to comments, answer DMs and keep your community active so your audience feels looked after, every day.",
    icon: null,
    badges: ["Scheduled Posts", "DM Responses", "Community Chat", "Daily Activity"],
  },
  {
    step: "Step 4",
    title: "We Report Back",
    description: "Every month you get a clear breakdown of what worked, what didn't, and what we're changing. No jargon, no fluff. Just the numbers that matter and our plan to improve them.",
    icon: null,
    badges: ["Monthly Report", "Real Metrics", "Clear Insights", "Next Steps"],
  },
];

const ProcessBadge = ({ label, isActive, delay }) => (
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
  const cardRefs = useRef([]);
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center",
            padding: "6px 12px", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)",
            width: "fit-content", margin: "0 auto 16px",
          }}>
            <span style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "2px",
              textTransform: "uppercase", color: "#9ca3af",
              fontFamily: "'Satoshi', sans-serif",
            }}>
              How We Work
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-1.5px", color: "#fff", marginTop: "12px",
          }}>
            Our Management Process
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500,
            color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "16px auto 0", lineHeight: 1.65,
          }}>
            From strategy to reporting, we follow a proven 4-step process to grow your social media presence consistently and authentically.
          </p>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: `${cardCount * 60 + 40}vh`,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {processSteps.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{
                position: "sticky",
                top: `calc(112px + ${i * stackOffset}px)`,
                marginBottom: `${60 / cardCount}vh`,
                zIndex: 10 + i,
              }}
            >
              <div
                style={{
                  ...(isTablet
                    ? { background: `linear-gradient(135deg, rgba(255,255,255,${0.16 - i * 0.025}) 0%, rgba(255,255,255,${0.07 - i * 0.005}) 100%)` }
                    : {
                        background: `linear-gradient(135deg, rgba(255,255,255,${0.12 - i * 0.025}) 0%, rgba(255,255,255,${0.03 - i * 0.005}) 100%)`,
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                      }),
                  borderRadius: "20px",
                  padding: "56px 44px",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                  backgroundClip: isActive ? "padding-box" : undefined,
                  boxShadow: isActive
                    ? `0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(${C.secondaryRGB},0.15), 0 0 80px rgba(${C.primaryRGB},0.08)`
                    : "0 20px 40px rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.5s ease, border 0.5s ease, transform 0.5s ease",
                  transform: isActive ? "scale(1)" : "scale(0.98)",
                }}
              >
                {isActive && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px", padding: "1px",
                    background: C.gradient,
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                    opacity: 0.7,
                    transition: "opacity 0.5s ease",
                  }} />
                )}

                <div style={{
                  position: "absolute", top: 0, left: "24px", right: "24px", height: "1px",
                  background: isActive
                    ? C.gradient
                    : "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                  transition: "background 0.5s ease",
                }} />

                <span style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "'Satoshi', sans-serif", fontSize: "12px", fontWeight: 600,
                  color: isActive ? C.cyan : "rgba(255,255,255,0.4)",
                  background: isActive ? C.cyanBg : "rgba(255,255,255,0.04)",
                  border: isActive ? `1px solid rgba(${C.secondaryRGB},0.25)` : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px", padding: "5px 14px",
                  marginBottom: "12px",
                  transition: "all 0.5s ease",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {item.step}
                </span>

                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700,
                  color: "#fff", lineHeight: 1.2, letterSpacing: "-1px",
                  textAlign: "center", margin: "0 0 16px 0",
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500,
                  color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)",
                  maxWidth: "560px", lineHeight: 1.7, textAlign: "center", margin: "0 0 24px 0",
                  transition: "color 0.5s ease",
                }}>
                  {item.description}
                </p>

                <div style={{
                  display: "flex", flexWrap: "wrap", gap: "8px",
                  justifyContent: "center", marginTop: "4px",
                }}>
                  {item.badges.map((badge, bi) => (
                    <ProcessBadge key={bi} label={badge} isActive={isActive} delay={bi * 0.08} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// --- OUR WORK ---
const workItems: { src: string; type: "image" | "video" }[] = [
  { src: "/images/driveways.jpg", type: "image" },
  { src: "/videos/contentcreation.mp4", type: "video" },
  { src: "/images/nanotise-vertical.jpg", type: "image" },
  { src: "/videos/contentcreation2.mp4", type: "video" },
  { src: "/images/YLRimage.jpg", type: "image" },
  { src: "/images/assetplumbing-vertical.png", type: "image" },
  { src: "/images/driveways11.jpg", type: "image" },
  { src: "/images/premier.jpg", type: "image" },
];

const WorkCard = ({ item }: { item: { src: string; type: "image" | "video" } }) => {
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
        cursor: item.type === "video" ? "pointer" : "default",
        aspectRatio: "4 / 5",
        background: "#111",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {item.type === "image" && (
        <img
          src={item.src}
          alt=""
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.7s ease",
            transform: isHovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      )}
      {item.type === "video" && (
        <>
          <video
            ref={videoRef}
            src={item.src}
            muted loop playsInline preload="metadata"
            onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0.5; }}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transition: "transform 0.7s ease",
              transform: isHovered ? "scale(1.04)" : "scale(1)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: isPlaying ? "transparent" : "rgba(0,0,0,0.25)",
            transition: "all 0.3s ease",
            pointerEvents: "none",
          }}>
            {!isPlaying && (
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
            )}
          </div>
        </>
      )}
    </div>
  );
};

const OurWork = () => {
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();
  const perPage = isMobile ? 2 : 4;
  const totalPages = Math.ceil(workItems.length / perPage);
  const currentItems = workItems.slice(page * perPage, page * perPage + perPage);
  const goNext = () => setPage((p) => (p + 1) % totalPages);
  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  return (
    <section style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,300&display=swap');
        .smm-gradient-text {
          background: linear-gradient(90deg, transparent, #34d399, #06b6d4, transparent);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: smm-shimmer 3s linear infinite;
        }
        @keyframes smm-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .smm-work-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: 100%; }
        @media (max-width: 767px) {
          .smm-work-grid { grid-template-columns: repeat(2, 1fr); }
          .smm-work-wrapper { padding: 48px 16px; }
        }
        @media (min-width: 768px) {
          .smm-work-wrapper { padding: 80px 80px; }
        }
      `}</style>

      <div className="smm-work-wrapper" style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "8px",
            border: "1px solid #e4e4e7", backgroundColor: "#fafafa", width: "fit-content", marginBottom: "16px",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6b7280", fontFamily: "'Satoshi', sans-serif" }}>Portfolio</span>
          </div>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.1,
            color: "#111827", marginBottom: "16px",
          }}>
            Our{" "}<span className="smm-gradient-text">Work</span>
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 500,
            fontSize: "15px", lineHeight: 1.6, color: "#6b7280",
            maxWidth: "400px", margin: "0 auto",
          }}>
            A selection of projects we've delivered for Sydney businesses.
          </p>
        </div>

        <div style={{ position: "relative", width: "100%" }}>
          <button onClick={goPrev} style={{
            position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: "44px", height: "44px", borderRadius: "50%",
            background: "#111", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button onClick={goNext} style={{
            position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: "44px", height: "44px", borderRadius: "50%",
            background: "#111", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="smm-work-grid">
            {currentItems.map((item, i) => (
              <WorkCard key={`${page}-${i}`} item={item} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{
              width: page === i ? "24px" : "8px", height: "8px", borderRadius: "999px",
              background: page === i ? C.green : "#d1d5db",
              border: "none", cursor: "pointer", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FAQ DATA (Social Media Management) ---
const socialMgmtFaqs = [
  {
    id: 1,
    question: "Which platforms do you actually manage?",
    answer: "Instagram, Facebook, LinkedIn and TikTok. We'll tell you which ones make sense for your business. Most of our Sydney clients get the best results focusing on 2 or 3 platforms instead of trying to be everywhere at once.",
  },
  {
    id: 2,
    question: "How many posts are we talking?",
    answer: "Typically 8 to 12 posts per month across your platforms, plus Stories and Reels. We build a content calendar each month and send it to you for sign-off before anything goes out. You'll always know what's coming.",
  },
  {
    id: 3,
    question: "Do I need to give you photos and content?",
    answer: "Nope. We handle copywriting, design and video editing. That said, if you've got behind-the-scenes shots or team photos, send them through. Real content always performs better than stock. We'll tell you exactly what to capture.",
  },
  {
    id: 4,
    question: "How do I know it's actually working?",
    answer: "You get a monthly report with the numbers that matter. Engagement, reach, follower growth, website clicks. No vanity metrics. We break down what performed, what didn't, and what we're tweaking next month.",
  },
  {
    id: 5,
    question: "Can I see everything before it goes live?",
    answer: "Always. We share the full content calendar with captions, visuals and scheduling for your review. Want something changed? Done. Nothing gets posted without your green light.",
  },
];

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

const SocialMgmtFAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <section className="relative w-full bg-[#050505] py-24 sm:py-32 overflow-hidden">
      <div className="w-full h-[1px] bg-white/10 absolute top-0 z-20" />
      <BackgroundStripes />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center",
              padding: "6px 12px", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)",
              width: "fit-content",
            }}>
              <span style={{
                fontSize: "10px", fontWeight: 600, letterSpacing: "2px",
                textTransform: "uppercase", color: "#9ca3af",
                fontFamily: "'Satoshi', sans-serif",
              }}>
                Support
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-white"
          >
            Frequently asked{' '}
            <motion.span
              initial={{ backgroundPosition: "400% 50%" }}
              animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
              style={{
                display: "inline-block",
                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${C.green}, ${C.cyan}, rgba(255,255,255,0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              questions
            </motion.span>
            <span className="text-white">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] font-medium leading-relaxed text-zinc-400 tracking-tight"
          >
            Everything you need to know about our social media management services, content creation, and how we grow your online presence.
          </motion.p>
        </div>

        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/5 px-3 py-1 border border-white/5">
              Updated Today
            </span>
          </div>

          <Accordion.Root
            type="single"
            collapsible
            value={openItem || ""}
            onValueChange={(value) => setOpenItem(value)}
            className="space-y-4"
          >
            {socialMgmtFaqs.map((item, index) => (
              <Accordion.Item value={item.id.toString()} key={item.id} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-start gap-x-4 focus:outline-none group">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={cn(
                        "relative flex items-center justify-between w-full p-5 text-left transition-all duration-300 border",
                        openItem === item.id.toString()
                          ? "bg-[#0a0a0a] border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 rounded-xl"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 rounded-xl"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300",
                          openItem === item.id.toString() ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-500"
                        )}>
                          <MessageSquare size={14} />
                        </div>
                        <span className={cn(
                          "text-base md:text-lg font-semibold transition-colors duration-300",
                          openItem === item.id.toString() ? "text-white" : "text-zinc-400"
                        )}>
                          {item.question}
                        </span>
                      </div>

                      <span className={cn(
                        "ml-4 transition-transform duration-300",
                        openItem === item.id.toString() ? "text-emerald-500 rotate-180" : "text-zinc-600"
                      )}>
                        {openItem === item.id.toString() ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>

                      {openItem === item.id.toString() && (
                        <motion.div
                          layoutId="socialmgmt-faq-active-line"
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                          style={{ backgroundColor: C.green }}
                        />
                      )}
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content asChild forceMount>
                  <AnimatePresence initial={false}>
                    {openItem === item.id.toString() && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-end mt-2 ml-8 md:ml-16">
                          <div className={cn(
                            "relative max-w-2xl p-6 text-sm md:text-base leading-relaxed rounded-xl shadow-sm border",
                            "bg-zinc-900 border-white/10 text-zinc-300"
                          )}>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500/20 rounded-bl-lg" />
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

const SocialMediaManagement = () => {
  const [hImg, setHImg] = useState(null);
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
        title="Social Media Management Sydney | Client Connect Australia"
        description="Professional social media management for Sydney businesses. We handle your content, engagement and growth across all platforms so you can focus on your trade."
        path="/services/social-media-management"
      />
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Social Media Management",
          "description": "Professional social media management for Sydney businesses. Content, engagement and growth across all platforms.",
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
            { "@type": "ListItem", "position": 2, "name": "Social Media Management", "item": "https://clientconnectaustralia.com.au/services/social-media-management" }
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

            <h1 style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
              ...anim(0.1),
            }}>
              <span>Your Socials,</span><br />
              <motion.span
                initial={{ backgroundPosition: "400% 50%" }}
                animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${PRIMARY}, ${SECONDARY}, transparent)`,
                  backgroundSize: "400% 100%",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                Sorted.
              </motion.span>
            </h1>

            <p style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
              ...anim(0.3),
            }}>
              We take <span style={{ color: SECONDARY, fontWeight: 600 }}>social media</span> off your plate. Strategy, content, posting, engagement. So you can get back to actually running your <span style={{ color: PRIMARY, fontWeight: 600 }}>business</span>.
            </p>

            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap", padding: "0 20px",
              fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)",
              ...anim(0.4),
            }}>
              <span>Strategy & Content</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>Posted & Managed</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>Sydney Based</span>
            </div>

            <div style={{
              display: "flex", justifyContent: "center", marginTop: "32px", padding: "0 20px",
              ...anim(0.5),
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50px",
                padding: "5px 5px 5px 24px",
                maxWidth: "520px", width: "100%",
                ...(isTablet
                  ? { background: "rgba(255,255,255,0.08)" }
                  : { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }),
              }}>
                <input
                  type="email"
                  placeholder="Drop your email — we'll send a free strategy"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      navigate(heroEmail.trim() ? `/contact?email=${encodeURIComponent(heroEmail.trim())}` : '/contact');
                    }
                  }}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 500, fontSize: "14px", color: "#fff", minWidth: 0,
                  }}
                />
                <button
                  onClick={() => {
                    navigate(heroEmail.trim() ? `/contact?email=${encodeURIComponent(heroEmail.trim())}` : '/contact');
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(52,211,153,0.5)"; e.currentTarget.style.background = "linear-gradient(135deg, #34d399, #06b6d4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#06b6d4"; }}
                  style={{
                    height: "40px", padding: "0 20px", borderRadius: "50px",
                    background: "#06b6d4", border: "none",
                    fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 600, fontSize: "14px", color: "#000",
                    cursor: "pointer", transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: "8px",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}
                >
                  Let's Talk
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: isMobile ? "10px" : "16px",
            marginTop: isMobile ? "36px" : "48px",
            padding: isMobile ? "10px 12px" : "20px 20px",
            overflow: "visible",
            position: "relative", zIndex: 2,
          }}>
            {galleryImages.map((img, i) => {
              const isCenter = isMobile ? (i === 1 || i === 2) : i === 2;
              const w = isMobile ? (isCenter ? "22vw" : "20vw") : (isCenter ? "200px" : "160px");
              const h = isMobile ? (isCenter ? "28vw" : "25vw") : (isCenter ? "260px" : "220px");

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHImg(i)}
                  onMouseLeave={() => setHImg(null)}
                  style={{
                    flex: "0 0 auto",
                    width: w, height: h,
                    maxWidth: isMobile ? "100px" : "200px",
                    maxHeight: isMobile ? "130px" : "260px",
                    borderRadius: isMobile ? "14px" : "20px",
                    overflow: "hidden", position: "relative", cursor: "grab",
                    transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.1 : 1}) rotateZ(${hImg === i ? (img.rotate < 0 ? -2 : 2) : 0}deg)`,
                    transition: "all 0.15s ease-out",
                    boxShadow: hImg === i
                      ? `0 20px 60px rgba(${PRIMARY_RGB},0.35)`
                      : "0 10px 40px rgba(0,0,0,0.4)",
                    opacity: loaded ? 1 : 0,
                    transitionDelay: hImg === i ? "0s" : `${0.3 + i * 0.08}s`,
                    zIndex: hImg === i ? 10 : 1,
                  }}
                >
                  <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: hImg === i ? "transparent" : "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)",
                    transition: "all 0.4s ease",
                  }} />
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════ WHY SOCIAL MEDIA ═══════════════ */}
        <section style={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 1, padding: "40px 24px 200px", maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center" }}
            >
              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(28px, 5vw, 56px)",
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                color: "#fff",
                margin: "0 auto 24px",
                maxWidth: "1000px",
              }}>
                Why Social Media{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>Matters</span>
                {" "} And Why Consistency Is Everything
              </p>

              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.6)",
                margin: "0 auto",
                maxWidth: "700px",
              }}>
                Your customers are on social media every day, making purchasing decisions based on what they see. Managing it effectively takes time, strategy, and consistency.{" "}
                <span style={{ color: C.green, fontWeight: 500 }}>That's where we come in</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ SERVICES GRID ═══════════════ */}
        <SubServicesSection
          heading={socialMgmtHeading}
          headingHighlight={socialMgmtHighlight}
          subtitle={socialMgmtSubtitle}
          services={socialMgmtServices}
        />

        {/* ═══════════════ OUR PROCESS ═══════════════ */}
        <OurProcess />

        {/* ═══════════════ OUR WORK ═══════════════ */}
        <OurWork />

        {/* ═══════════════ FAQ ═══════════════ */}
        <SocialMgmtFAQ />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default SocialMediaManagement;