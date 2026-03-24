import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import CaseStudiesHome from "@/components/home/case-studies";
import Footer from "@/components/layout/Footer";
import { HowWeWork } from "@/components/home/HowWeWork";
import CTASection from "@/components/home/CTASection";
import SEOHead from "@/components/seo/SEOHead";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

const PRIMARY = "#34d399";
const PRIMARY_RGB = "52,211,153";
const SECONDARY = "#06b6d4";
const SECONDARY_RGB = "6,182,212";
const TEXT_DARK = "hsl(0,0%,10%)";
const TEXT_MEDIUM = "hsl(0,0%,33%)";
const TEXT_LIGHT = "hsl(0,0%,46%)";
const BG = "hsl(0,0%,100%)";
const BG_LIGHT = "hsl(0,0%,98%)";
const FONT = "'Satoshi', -apple-system, sans-serif";

const caseStudies = [
  {
    url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    alt: "E-commerce growth",
    category: "E-Commerce",
    title: "300% Revenue Growth for Sydney Fashion Brand",
    metric: "+300%",
    metricLabel: "Revenue",
  },
  {
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop",
    alt: "Dental practice",
    category: "Healthcare",
    title: "Local Dental Practice Doubles Patient Bookings",
    metric: "2x",
    metricLabel: "Bookings",
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    alt: "Law firm office",
    category: "Legal",
    title: "Top 3 Google Rankings for Competitive Law Keywords",
    metric: "Top 3",
    metricLabel: "Google Rank",
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    alt: "Restaurant",
    category: "Hospitality",
    title: "From Empty Tables to 6-Month Waitlist",
    metric: "180%",
    metricLabel: "More Covers",
  },
  {
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    alt: "Real estate",
    category: "Real Estate",
    title: "Record-Breaking Lead Gen for Parramatta Agency",
    metric: "450+",
    metricLabel: "Leads/Month",
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    alt: "Fitness studio",
    category: "Fitness",
    title: "Boutique Gym Scales to 3 Locations in 12 Months",
    metric: "3x",
    metricLabel: "Locations",
  },
];

const heroImages = [
  { url: "/images/assetplumbing.jpg", alt: "Asset Plumbing", rotate: -6 },
  { url: "/images/driveways11.jpg", alt: "Driveways", rotate: 3 },
  { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop", alt: "Digital marketing", rotate: -2 },
  { url: "/images/landscaping11.jpg", alt: "Landscaping", rotate: 5 },
  { url: "/images/nanotise10.jpg", alt: "Nanotise", rotate: -4 },
  { url: "/images/premier.jpg", alt: "Premier", rotate: 3 },
];

const mobileImages = heroImages.slice(0, 4);

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

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
};

export default function CaseStudiesPage() {
  const [hCard, setHCard] = useState<number | null>(null);
  const [hImg, setHImg] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const isMobile = useIsMobile();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const anim = (d = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  const categories = ["All", ...Array.from(new Set(caseStudies.map(c => c.category)))];
  const filtered = activeFilter === "All" ? caseStudies : caseStudies.filter(c => c.category === activeFilter);

  const displayImages = isMobile ? mobileImages : heroImages;

  return (
    <div style={{ fontFamily: FONT, background: BG, color: TEXT_DARK, minHeight: "100vh", overflowX: "hidden" }}>
      <SEOHead
        title="Case Studies | Client Connect Australia - Real Results for Real Businesses"
        description="See how Client Connect Australia helps Sydney tradies and service businesses grow. Real case studies with measurable SEO, Google Ads and web design results."
        path="/case-studies"
      />
      <SchemaMarkup schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://clientconnectaustralia.com.au" },
          { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://clientconnectaustralia.com.au/case-studies" }
        ]
      }} />
      <Header />

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: isMobile ? "50px" : "80px" }}>
        {/* Gradient orbs */}
        <div style={{ position: "absolute", top: "180px", left: "50%", transform: "translateX(-70%)", width: "400px", height: "400px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "160px", left: "50%", transform: "translateX(-30%)", width: "400px", height: "400px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

        <div className="hero-title-spacing" style={{ textAlign: "center", paddingTop: "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
          {/* Title */}
          <h1 style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
            ...anim(0.1),
          }}>
            <span>Case </span>
            <span>Studies.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "520px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
            ...anim(0.3),
          }}>
            Real <span style={{ color: PRIMARY, fontWeight: 600 }}>results</span> for real businesses. See how we've helped Sydney brands achieve{" "}
            <span style={{ color: PRIMARY, fontWeight: 600 }}>measurable growth</span>.
          </p>

          {/* Tags */}
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap", padding: "0 20px",
            fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)",
            ...anim(0.4),
          }}>
            <span>150+ Clients</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
            <span>Avg. 2.5x ROI</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
            <span>Multiple Industries</span>
          </div>

          {/* Email CTA */}
          <div style={{
            display: "flex", justifyContent: "center", marginTop: "32px", padding: "0 20px",
            ...anim(0.5),
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50px",
              padding: "5px 5px 5px 24px",
              maxWidth: "520px",
              width: "100%",
              backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            }}>
              <input
                type="email"
                placeholder="Enter your email for a free audit"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 500, fontSize: "14px", color: "#fff", minWidth: 0,
                }}
              />
              <button
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
                Get Results
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          gap: isMobile ? "10px" : "16px",
          marginTop: "48px", padding: "20px 20px", overflow: "visible",
          position: "relative", zIndex: 2,
        }}>
          {displayImages.map((img, i) => (
            <div
              key={i}
              onMouseEnter={() => setHImg(i)}
              onMouseLeave={() => setHImg(null)}
              style={{
                flex: "0 0 auto",
                width: isMobile ? "20vw" : (i === 2 ? "200px" : "160px"),
                height: isMobile ? "26vw" : (i === 2 ? "260px" : "220px"),
                maxWidth: isMobile ? "100px" : undefined,
                maxHeight: isMobile ? "130px" : undefined,
                borderRadius: isMobile ? "14px" : "20px",
                overflow: "hidden", position: "relative", cursor: "grab",
                transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.1 : 1}) rotateZ(${hImg === i ? (img.rotate < 0 ? -2 : 2) : 0}deg)`,
                transition: "all 0.15s ease-out",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
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
          ))}
        </div>
      </section>

      <CaseStudiesHome />

      <HowWeWork />
      <CTASection />
      <Footer />
    </div>
  );
}