import { useState, useEffect, useRef } from "react";
import Header from "@/components/layout/Header";
import OurStepsVersion2 from "@/components/home/OurStepsVersion2";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";

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

// --- DATOS DE CLIENTES ACTUALIZADOS ---
const clients = [
  { name: 'Prolex Bathroom Renovations', tags: ['SEO', 'Google Ads', 'Paid Social', 'Website'], image: '/images/prolex.jpg', logo: 'Prolex\nBathrooms' },
  { name: 'Nanotise', tags: ['Website', 'Rebrand', 'Social Media', 'Content Creation'], image: '/images/nanotise.jpg', logo: 'Nanotise' },
  { name: 'Asset Plumbing Solutions', tags: ['Google Ads', 'Website', 'SEO'], image: '/images/asset.jpg', logo: 'Asset Plumbing\nSolutions' },
  { name: 'LC Landscaping', tags: ['Google Ads', 'Paid Social', 'Website'], image: '/images/landscaping.jpg', logo: 'LC\nLandscaping' },
  { name: 'Pioneer Shades', tags: ['Paid Social', 'Google Ads', 'Website'], image: '/images/pioneer.jpg', logo: 'Pioneer\nShades' },
  { name: 'Sydney Glass Pool Fencing', tags: ['Google Ads', 'Website', 'Content Creation'], image: '/images/sydneyglass.jpeg', logo: 'Sydney Glass\nPool Fencing' },
  { name: 'LC Driveways', tags: ['Google Ads', 'Paid Social', 'Website'], image: '/images/117.jpg', logo: 'LC\nDriveways' },
];

const images = [
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=500&fit=crop", alt: "Team collaboration", rotate: -6 },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=350&h=450&fit=crop", alt: "Strategy meeting", rotate: 3 },
  { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop", alt: "Digital marketing", rotate: -2 },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=380&h=480&fit=crop", alt: "Presentation", rotate: 5 },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=350&h=450&fit=crop", alt: "Workspace", rotate: -4 },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop", alt: "Planning", rotate: 3 },
];

// --- COMPONENTE: CLIENT CARD ---
const ClientCard = ({ client, isMobile }) => (
  <div style={{
    position: 'relative',
    flexShrink: 0,
    width: isMobile ? '220px' : '260px',
    height: isMobile ? '290px' : '340px',
    borderRadius: '24px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'}
  onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
  >
    <img src={client.image} alt={client.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)' }} />
    <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
      <p style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '13px' : '15px', lineHeight: 1.2, whiteSpace: 'pre-line', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{client.logo}</p>
    </div>
    <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? '11px' : '12px', fontWeight: 500, margin: 0 }}>{client.tags.join(' · ')}</p>
    </div>
  </div>
);

// --- COMPONENTE: CLIENT CAROUSEL ---
const ClientCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [x, setX] = useState(0);
  const xRef = useRef(0);
  const rafRef = useRef();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardWidth = isMobile ? 220 : 260;
  const gap = isMobile ? 16 : 20;
  const step = cardWidth + gap;
  const trackWidth = clients.length * step;
  const looped = [...clients, ...clients, ...clients];

  useEffect(() => {
    const tick = () => {
      if (!paused) {
        xRef.current -= 0.5;
        if (Math.abs(xRef.current) >= trackWidth) {
          xRef.current = 0;
        }
        setX(xRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, trackWidth]);

  return (
    <div style={{ width: '100%', position: 'relative', padding: '100px 0', background: '#fff', overflow: 'hidden' }}>
      {/* Label Lateral */}
      <div style={{
        position: 'absolute', left: 0, top: 0, height: '100%', width: isMobile ? '60px' : '100px',
        zIndex: 10, pointerEvents: 'none', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(to right, #fff 40%, transparent 100%)'
      }}>
        <p style={{
          color: 'rgba(0,0,0,0.2)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '4px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginLeft: isMobile ? '15px' : '30px'
        }}>
          Our Local Clients
        </p>
      </div>

      {/* Fade Derecho */}
      <div style={{
        position: 'absolute', right: 0, top: 0, height: '100%', width: '120px',
        zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #fff 0%, transparent 100%)'
      }} />

      <div 
        style={{ display: 'flex', gap: `${gap}px`, transform: `translateX(${x}px)`, willChange: 'transform' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {looped.map((client, i) => (
          <ClientCard key={i} client={client} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef();
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

export default function About() {
  const [hImg, setHImg] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const anim = (d = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <div style={{ fontFamily: FONT, background: BG, color: TEXT_DARK, minHeight: "100vh", overflowX: "hidden" }}>
      <Header />

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: "130px" }}>
        <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", paddingTop: "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
            ...anim(0.1),
          }}>
            About Us.
          </h1>
          <p style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "520px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
            ...anim(0.3),
          }}>
            Your dedicated <span style={{ color: "#34d399", fontWeight: 600 }}>growth partner</span>, helping Sydney businesses thrive in the <span style={{ color: "#34d399", fontWeight: 600 }}>digital age</span>.
          </p>

          {/* Email CTA */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "32px", padding: "0 20px", ...anim(0.5) }}>
            <div style={{
              display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50px", padding: "5px 5px 5px 24px",
              maxWidth: "520px", width: "100%", backdropFilter: "blur(8px)",
            }}>
              <input type="email" placeholder="Enter your email for a free audit" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "14px" }} />
              <button style={{ height: "40px", padding: "0 20px", borderRadius: "50px", background: "#06b6d4", border: "none", fontWeight: 600, fontSize: "14px", color: "#000", cursor: "pointer" }}>
                Start Scaling
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "48px", position: "relative", zIndex: 2 }}>
          {images.map((img, i) => (
            <div key={i} onMouseEnter={() => setHImg(i)} onMouseLeave={() => setHImg(null)}
              style={{
                flex: "0 0 auto", width: i === 2 ? "200px" : "160px", height: i === 2 ? "260px" : "220px",
                borderRadius: "20px", overflow: "hidden", position: "relative", transition: "all 0.15s ease-out",
                transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.1 : 1})`,
                boxShadow: hImg === i ? `0 20px 60px rgba(${PRIMARY_RGB},0.35)` : "0 10px 40px rgba(0,0,0,0.4)",
                zIndex: hImg === i ? 10 : 1,
              }}>
              <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      <OurStepsVersion2 />

      {/* ═══════════════ CLIENT CAROUSEL ═══════════════ */}
      <ClientCarousel />

      {/* ═══════════════ LOCAL EXPERTISE ═══════════════ */}
      <section style={{ padding: "80px 20px", background: BG_LIGHT }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: PRIMARY }}>Local Expertise</span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginTop: "12px", letterSpacing: "-0.02em", color: TEXT_DARK }}>
                Why We Focus on<br />Sydney Businesses
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{
              padding: "40px", borderRadius: "24px",
              background: "#fff",
              border: `1px solid rgba(${PRIMARY_RGB},0.1)`,
            }}>
              <p style={{ color: TEXT_MEDIUM, lineHeight: 1.8, margin: 0, fontSize: "16px" }}>
                Sydney is one of the most competitive business environments in Australia — and that's exactly why we specialize here. We understand local market dynamics, seasonal trends, and what makes Sydney customers tick. Whether you're in Bondi, Parramatta, or anywhere in between, we speak your customers' language.
              </p>
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn delay={0.3}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "32px" }}>
              {[
                { emoji: "🎖️", label: "Google Partner", c: PRIMARY_RGB },
                { emoji: "📱", label: "Meta Business Partner", c: SECONDARY_RGB },
                { emoji: "🏆", label: "Best Agency 2023", c: PRIMARY_RGB },
              ].map((c, i) => (
                <div key={i} style={{
                  padding: "24px 16px", borderRadius: "16px", textAlign: "center",
                  background: `rgba(${c.c},0.05)`,
                  border: `1px solid rgba(${c.c},0.1)`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 25px rgba(${c.c},0.12)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{c.emoji}</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: TEXT_MEDIUM }}>{c.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}