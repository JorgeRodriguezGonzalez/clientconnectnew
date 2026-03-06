import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import CaseStudiesSection from "@/components/home/case-studies";
import Footer from "@/components/layout/Footer";
import { HowWeWork } from "@/components/home/HowWeWork";

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
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=500&fit=crop", alt: "Team collaboration", rotate: -6 },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=350&h=450&fit=crop", alt: "Strategy meeting", rotate: 3 },
  { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop", alt: "Digital marketing", rotate: -2 },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=380&h=480&fit=crop", alt: "Presentation", rotate: 5 },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=350&h=450&fit=crop", alt: "Workspace", rotate: -4 },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop", alt: "Planning", rotate: 3 },
];

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

export default function CaseStudies() {
  const [hCard, setHCard] = useState<number | null>(null);
  const [hImg, setHImg] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const anim = (d = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  const categories = ["All", ...Array.from(new Set(caseStudies.map(c => c.category)))];
  const filtered = activeFilter === "All" ? caseStudies : caseStudies.filter(c => c.category === activeFilter);

  return (
    <div style={{ fontFamily: FONT, background: BG, color: TEXT_DARK, minHeight: "100vh", overflowX: "hidden" }}>
      <Header />

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: "relative", overflow: "clip", background: TEXT_DARK, paddingBottom: "80px" }}>
        {/* Gradient orbs */}
        <div style={{ position: "absolute", top: "-200px", left: "-100px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-100px", right: "-150px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", paddingTop: "140px", position: "relative", zIndex: 2 }}>
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
          display: "flex", justifyContent: "center", alignItems: "center", gap: "16px",
          marginTop: "48px", padding: "20px 20px", overflow: "visible",
          position: "relative", zIndex: 2,
        }}>
          {heroImages.map((img, i) => (
            <div
              key={i}
              onMouseEnter={() => setHImg(i)}
              onMouseLeave={() => setHImg(null)}
              style={{
                flex: "0 0 auto",
                width: i === 2 ? "200px" : "160px",
                height: i === 2 ? "260px" : "220px",
                borderRadius: "20px", overflow: "hidden", position: "relative", cursor: "grab",
                transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.1 : 1}) rotateZ(${hImg === i ? (img.rotate < 0 ? -2 : 2) : 0}deg)`,
                transition: "all 0.15s ease-out",
                boxShadow: hImg === i
                  ? `0 20px 60px rgba(${PRIMARY_RGB},0.35), 0 0 0 1px ${PRIMARY}`
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
          ))}
        </div>
      </section>

      {/* ═══════════════ FILTER TABS ═══════════════ */}
      <section style={{ padding: "48px 20px 0", maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "8px 20px", borderRadius: "50px",
                  border: activeFilter === cat ? `1px solid ${PRIMARY}` : "1px solid hsl(0,0%,88%)",
                  background: activeFilter === cat ? `rgba(${PRIMARY_RGB},0.1)` : "transparent",
                  color: activeFilter === cat ? PRIMARY : TEXT_MEDIUM,
                  fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════ CASE STUDIES GRID ═══════════════ */}
      <section style={{ padding: "48px 20px 80px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {filtered.map((cs, i) => (
            <FadeIn key={cs.title} delay={i * 0.1}>
              <div
                onMouseEnter={() => setHCard(i)}
                onMouseLeave={() => setHCard(null)}
                style={{
                  borderRadius: "20px", overflow: "hidden", background: BG,
                  border: "1px solid hsl(0,0%,92%)", transition: "all 0.3s ease", cursor: "pointer",
                  transform: hCard === i ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hCard === i ? `0 16px 40px rgba(${PRIMARY_RGB},0.12)` : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ position: "relative", overflow: "hidden", height: "220px" }}>
                  <img src={cs.url} alt={cs.alt} style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transform: hCard === i ? "scale(1.05)" : "scale(1)", transition: "transform 0.4s ease",
                  }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
                  <div style={{
                    position: "absolute", bottom: "16px", left: "16px",
                    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "12px", padding: "10px 16px", display: "flex", alignItems: "baseline", gap: "6px",
                  }}>
                    <span style={{ fontSize: "24px", fontWeight: 800, color: PRIMARY, fontFamily: 'Inter, -apple-system, sans-serif' }}>{cs.metric}</span>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.7)", fontFamily: 'Inter, -apple-system, sans-serif' }}>{cs.metricLabel}</span>
                  </div>
                  <div style={{
                    position: "absolute", top: "16px", right: "16px",
                    background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                    borderRadius: "50px", padding: "5px 14px",
                    fontSize: "11px", fontWeight: 600, color: "#fff", fontFamily: 'Inter, -apple-system, sans-serif',
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>
                    {cs.category}
                  </div>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: TEXT_DARK, lineHeight: 1.35, margin: 0, fontFamily: 'Inter, -apple-system, sans-serif' }}>
                    {cs.title}
                  </h3>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "6px", marginTop: "16px",
                    fontSize: "13px", fontWeight: 600, color: PRIMARY, fontFamily: 'Inter, -apple-system, sans-serif',
                  }}>
                    Read Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{ padding: "0 20px 80px" }}>
        <FadeIn>
          <div style={{
            maxWidth: "900px", margin: "0 auto", padding: "56px 40px", borderRadius: "24px",
            background: TEXT_DARK, textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "-100px", left: "-80px", width: "300px", height: "300px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.15) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-80px", right: "-60px", width: "250px", height: "250px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.1) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
            <h2 style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em", position: "relative", zIndex: 1,
            }}>
              Want Results Like These?
            </h2>
            <p style={{
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: "15px", fontWeight: 400, color: "rgba(255,255,255,0.6)", marginTop: "12px", position: "relative", zIndex: 1,
            }}>
              Let's talk about how we can grow your business.
            </p>
            <button
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 30px rgba(${PRIMARY_RGB},0.5)`; e.currentTarget.style.background = `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = PRIMARY; }}
              style={{
                marginTop: "28px", height: "48px", padding: "0 32px", borderRadius: "50px",
                background: PRIMARY, border: "none",
                fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 700, fontSize: "15px", color: "#000",
                cursor: "pointer", transition: "all 0.2s ease",
                display: "inline-flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 1,
              }}
            >
              Book a Free Strategy Call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </FadeIn>
      </section>

      <CaseStudiesSection />
      <HowWeWork />
      <Footer />
    </div>
  );
}