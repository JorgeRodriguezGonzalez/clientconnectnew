import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Asegúrate de tener framer-motion instalado
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

// --- DATOS DE CLIENTES ---
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

// --- SUB-COMPONENTE: CLIENT CARD ---
const ClientCard = ({ client, isMobile }) => (
  <div style={{
    position: 'relative',
    flexShrink: 0,
    width: isMobile ? '220px' : '260px',
    height: isMobile ? '290px' : '340px',
    borderRadius: '24px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
  }}
  onMouseEnter={e => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.transform = "scale(1.03)"; }}
  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = "scale(1)"; }}
  >
    <img src={client.image} alt={client.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)' }} />
    <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
      <p style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '13px' : '15px', lineHeight: 1.2, whiteSpace: 'pre-line', margin: 0 }}>{client.logo}</p>
    </div>
    <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? '11px' : '12px', fontWeight: 500, margin: 0, letterSpacing: '0.02em' }}>{client.tags.join(' · ')}</p>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL DEL CARRUSEL ---
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
  const gap = isMobile ? 16 : 24;
  const step = cardWidth + gap;
  const trackWidth = clients.length * step;
  const looped = [...clients, ...clients, ...clients];

  useEffect(() => {
    const tick = () => {
      if (!paused) {
        xRef.current -= 0.6;
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
    <section style={{ width: '100%', position: 'relative', padding: '120px 0', background: '#000', overflow: 'hidden' }}>
      {/* TÍTULO CON EFECTO SHIMMER GRADIENT */}
      <div style={{ textAlign: 'center', marginBottom: '64px', padding: '0 20px' }}>
        <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: PRIMARY, display: "block", marginBottom: "16px" }}>
          Success Stories
        </span>
        <h2 style={{ 
          fontFamily: "'Satoshi', sans-serif", 
          fontWeight: 700, 
          fontSize: "clamp(32px, 5vw, 48px)", 
          color: "#fff", 
          margin: 0, 
          letterSpacing: "-0.03em",
          lineHeight: 1.1
        }}>
          Some of our {" "}
          <motion.span
            initial={{ backgroundPosition: "400% 50%" }}
            animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${PRIMARY}, ${SECONDARY}, transparent)`,
              backgroundSize: "400% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            local clients
          </motion.span>
        </h2>
      </div>

      {/* Degradados laterales */}
      <div style={{
        position: 'absolute', left: 0, top: 0, height: '100%', width: isMobile ? '80px' : '200px',
        zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #000 15%, transparent 100%)'
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, height: '100%', width: isMobile ? '80px' : '200px',
        zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #000 15%, transparent 100%)'
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
    </section>
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
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
            ...anim(0.1),
          }}>
            About Us.
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "rgba(255,255,255,0.8)", maxWidth: "520px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
            ...anim(0.3),
          }}>
            Your dedicated <span style={{ color: PRIMARY, fontWeight: 600 }}>growth partner</span>, helping Sydney businesses thrive in the <span style={{ color: PRIMARY, fontWeight: 600 }}>digital age</span>.
          </p>

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

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "48px", position: "relative", zIndex: 2 }}>
          {images.map((img, i) => (
            <div key={i} onMouseEnter={() => setHImg(i)} onMouseLeave={() => setHImg(null)}
              style={{
                flex: "0 0 auto", width: i === 2 ? "200px" : "160px", height: i === 2 ? "260px" : "220px",
                borderRadius: "20px", overflow: "hidden", position: "relative", transition: "all 0.2s ease-out",
                transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.1 : 1})`,
                boxShadow: hImg === i ? `0 20px 60px rgba(${PRIMARY_RGB},0.4)` : "0 10px 40px rgba(0,0,0,0.5)",
                zIndex: hImg === i ? 10 : 1,
              }}>
              <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      <OurStepsVersion2 />

      {/* ═══════════════ CLIENT CAROUSEL (SHIMMER EFFECT) ═══════════════ */}
      <ClientCarousel />

      <CTASection />
      <Footer />
    </div>
  );
}