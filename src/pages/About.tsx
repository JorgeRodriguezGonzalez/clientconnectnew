import { useState, useEffect, useRef } from "react";

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
    <div style={{ fontFamily: FONT, background: BG, color: TEXT_DARK, minHeight: "100vh" }}>

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: TEXT_DARK, paddingBottom: "60px" }}>
        {/* Gradient orbs */}
        <div style={{ position: "absolute", top: "-200px", left: "-100px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-100px", right: "-150px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

        {/* Title */}
        <div style={{ textAlign: "center", paddingTop: "80px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
            textTransform: "none",
            ...anim(0.1),
          }}>
            <span>About </span>
            <span style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Us.</span>
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
            ...anim(0.3),
          }}>
            Your dedicated growth partner, helping Sydney businesses thrive in the digital age.
          </p>

          {/* Badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px", flexWrap: "wrap", padding: "0 20px", ...anim(0.45) }}>
            {[
              { label: "Sydney Based", c: PRIMARY_RGB },
              { label: "Est. 2018", c: SECONDARY_RGB },
              { label: "150+ Clients", c: PRIMARY_RGB },
            ].map((b, i) => (
              <span key={i} style={{
                padding: "8px 18px", borderRadius: "50px", fontSize: "13px", fontWeight: 600,
                background: `rgba(${b.c},0.12)`,
                color: i === 1 ? SECONDARY : PRIMARY,
                border: `1px solid rgba(${b.c},0.25)`,
              }}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center", gap: "16px",
          marginTop: "48px", padding: "0 20px", overflowX: "auto", overflowY: "visible",
          position: "relative", zIndex: 2,
        }}>
          {images.map((img, i) => (
            <div
              key={i}
              onMouseEnter={() => setHImg(i)}
              onMouseLeave={() => setHImg(null)}
              style={{
                flex: "0 0 auto",
                width: i === 2 ? "200px" : "160px",
                height: i === 2 ? "260px" : "220px",
                borderRadius: "20px", overflow: "hidden", position: "relative", cursor: "pointer",
                transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.08 : 1})`,
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: hImg === i
                  ? `0 20px 60px rgba(${PRIMARY_RGB},0.35), 0 0 0 2px ${PRIMARY}`
                  : "0 10px 40px rgba(0,0,0,0.4)",
                opacity: loaded ? 1 : 0,
                transitionDelay: `${0.3 + i * 0.08}s`,
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

        {/* Bottom fade to white */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", background: `linear-gradient(transparent, ${BG})`, pointerEvents: "none", zIndex: 3 }} />
      </section>

      {/* ═══════════════ OUR STORY ═══════════════ */}
      <section style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: PRIMARY }}>Our Story</span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginTop: "12px", lineHeight: 1.15, letterSpacing: "-0.02em", color: TEXT_DARK }}>
            From two people to<br />
            <span style={{ color: TEXT_LIGHT }}>Sydney's trusted agency</span>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "40px" }}>
          {[
            "Founded in 2018 with a simple mission: help Sydney businesses connect with their ideal clients through strategic digital marketing.",
            "What started as a two-person operation has grown into a full-service digital marketing agency serving over 150 businesses across Sydney and NSW.",
            "From local cafes to law firms, dental practices to e-commerce stores — they all wanted real results, transparent communication, and a partner who genuinely cared.",
          ].map((t, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{
                padding: "28px", borderRadius: "16px",
                background: BG_LIGHT,
                border: "1px solid hsl(0,0%,92%)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 30px rgba(${PRIMARY_RGB},0.1)`; e.currentTarget.style.borderColor = `rgba(${PRIMARY_RGB},0.2)`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "hsl(0,0%,92%)"; }}
              >
                <span style={{ fontSize: "32px", fontWeight: 700, color: `rgba(${PRIMARY_RGB},0.15)`, display: "block", marginBottom: "12px" }}>0{i + 1}</span>
                <p style={{ color: TEXT_MEDIUM, lineHeight: 1.7, margin: 0, fontSize: "15px" }}>{t}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════ VALUES ═══════════════ */}
      <section style={{ padding: "80px 20px", background: BG_LIGHT }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SECONDARY }}>What Drives Us</span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginTop: "12px", letterSpacing: "-0.02em", color: TEXT_DARK }}>Our Values</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: "32px 24px", borderRadius: "20px", background: BG, border: "1px solid hsl(0,0%,92%)",
                  textAlign: "center", transition: "all 0.3s ease", cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 35px rgba(${PRIMARY_RGB},0.12)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "16px" }}>{v.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: TEXT_DARK }}>{v.title}</h3>
                  <p style={{ color: TEXT_LIGHT, fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY SYDNEY ═══════════════ */}
      <section style={{ padding: "80px 20px" }}>
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
              background: `linear-gradient(135deg, rgba(${PRIMARY_RGB},0.05), rgba(${SECONDARY_RGB},0.05))`,
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
    </div>
  );
}