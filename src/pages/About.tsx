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

// --- DATOS DE CLIENTES ---
const clients = [
  { name: 'Asset Plumbing Solutions', tags: ['Google Ads', 'Website', 'SEO'], image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958?w=400&h=500&fit=crop', logo: 'Asset Plumbing\nSolutions' },
  { name: 'Nanotise', tags: ['Website', 'Rebrand', 'Social Media'], image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=400&h=500&fit=crop', logo: 'Nanotise' },
  { name: 'LC Landscaping', tags: ['Google Ads', 'Paid Social', 'Website'], image: 'https://images.unsplash.com/photo-1558905619-17153c246bcb?w=400&h=500&fit=crop', logo: 'LC\nLandscaping' },
  { name: 'Premier Bathrooms', tags: ['Website', 'SEO', 'Google Ads'], image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=500&fit=crop', logo: 'Premier\nBathrooms' },
  { name: 'Pioneer Shades', tags: ['Paid Social', 'Google Ads', 'Website'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=500&fit=crop', logo: 'Pioneer\nShades' },
  { name: 'Turnbull Pools', tags: ['Google Ads', 'SEO', 'Website'], image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=500&fit=crop', logo: 'Turnbull\nPools' },
  { name: 'Sydney Glass Pool Fencing', tags: ['Google Ads', 'Website'], image: 'https://images.unsplash.com/photo-1562663474-6cbb3fee4c52?w=400&h=500&fit=crop', logo: 'Sydney Glass\nPool Fencing' },
];

const images = [
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=500&fit=crop", alt: "Team collaboration", rotate: -6 },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=350&h=450&fit=crop", alt: "Strategy meeting", rotate: 3 },
  { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop", alt: "Digital marketing", rotate: -2 },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=380&h=480&fit=crop", alt: "Presentation", rotate: 5 },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=350&h=450&fit=crop", alt: "Workspace", rotate: -4 },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop", alt: "Planning", rotate: 3 },
];

const values = [
  { icon: "🎯", title: "Results-Driven", desc: "We're obsessed with delivering measurable results that impact your bottom line." },
  { icon: "❤️", title: "Client-First", desc: "Your success is our success. We treat your business like our own." },
  { icon: "🤝", title: "Collaboration", desc: "We work as an extension of your team, not just another vendor." },
  { icon: "🏆", title: "Excellence", desc: "We constantly learn and adapt to stay ahead in the ever-changing digital landscape." },
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
      <p style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '13px' : '15px', lineHeight: 1.2, whiteSpace: 'pre-line', margin: 0 }}>{client.logo}</p>
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
    <div style={{ width: '100%', position: 'relative', padding: '60px 0', background: '#fff', overflow: 'hidden' }}>
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

      {/* ═══════════════ OUR STORY ═══════════════ */}
      <section style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: PRIMARY }}>Our Story</span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginTop: "12px", color: TEXT_DARK }}>
            From two people to<br /><span style={{ color: TEXT_LIGHT }}>Sydney's trusted agency</span>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "40px" }}>
          {[
            "Founded in 2018 with a simple mission: help Sydney businesses connect with their ideal clients.",
            "What started as a two-person operation has grown into a full-service agency serving over 150 businesses.",
            "From local cafes to law firms — they all wanted real results and a partner who genuinely cared.",
          ].map((t, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ padding: "28px", borderRadius: "16px", background: BG_LIGHT, border: "1px solid hsl(0,0%,92%)" }}>
                <span style={{ fontSize: "32px", fontWeight: 700, color: `rgba(${PRIMARY_RGB},0.15)`, display: "block" }}>0{i + 1}</span>
                <p style={{ color: TEXT_MEDIUM, lineHeight: 1.7, margin: 0 }}>{t}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════ CLIENT CAROUSEL (NEW) ═══════════════ */}
      <ClientCarousel />

      {/* ═══════════════ VALUES ═══════════════ */}
      <section style={{ padding: "80px 20px", background: BG_LIGHT }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", color: SECONDARY }}>What Drives Us</span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginTop: "12px", color: TEXT_DARK }}>Our Values</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: "32px 24px", borderRadius: "20px", background: BG, border: "1px solid hsl(0,0%,92%)", textAlign: "center" }}>
                  <div style={{ fontSize: "36px", marginBottom: "16px" }}>{v.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: TEXT_DARK }}>{v.title}</h3>
                  <p style={{ color: TEXT_LIGHT, fontSize: "14px", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}