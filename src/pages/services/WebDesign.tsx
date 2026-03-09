import { useState, useEffect, useRef } from "react";

const Globe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

const Smartphone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);

const Rocket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);

const Palette = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
);

const Code = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

const TrendingUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

// Theme colors
const C = {
  cyan: "#06b6d4",
  green: "#34d399",
  cyanLight: "#67e8f9",
  greenLight: "#6ee7b7",
  cyanBg: "rgba(6,182,212,0.15)",
  greenBg: "rgba(52,211,153,0.15)",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
  gradientHover: "linear-gradient(135deg, #22d3ee 0%, #6ee7b7 100%)",
  text: "#a1a1aa",
  cardBorder: "rgba(255,255,255,0.06)",
};

const carouselImages = {
  row1: [
    { id: 1, gradient: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)", label: "E-commerce" },
    { id: 2, gradient: "linear-gradient(135deg, #34d399 0%, #059669 100%)", label: "Portfolio" },
    { id: 3, gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)", label: "SaaS Landing" },
    { id: 4, gradient: "linear-gradient(135deg, #0891b2 0%, #2dd4bf 100%)", label: "Restaurant" },
    { id: 5, gradient: "linear-gradient(135deg, #22d3ee 0%, #a7f3d0 100%)", label: "Fitness" },
    { id: 6, gradient: "linear-gradient(135deg, #155e75 0%, #065f46 100%)", label: "Blog" },
    { id: 7, gradient: "linear-gradient(135deg, #67e8f9 0%, #6ee7b7 100%)", label: "Agency" },
  ],
  row2: [
    { id: 8, gradient: "linear-gradient(135deg, #0e7490 0%, #047857 100%)", label: "Medical" },
    { id: 9, gradient: "linear-gradient(135deg, #a5f3fc 0%, #d1fae5 100%)", label: "Real Estate" },
    { id: 10, gradient: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)", label: "Education" },
    { id: 11, gradient: "linear-gradient(135deg, #164e63 0%, #34d399 100%)", label: "Tech Startup" },
    { id: 12, gradient: "linear-gradient(135deg, #22d3ee 0%, #059669 100%)", label: "Travel" },
    { id: 13, gradient: "linear-gradient(135deg, #0891b2 0%, #6ee7b7 100%)", label: "Wellness" },
    { id: 14, gradient: "linear-gradient(135deg, #155e75 0%, #34d399 100%)", label: "Finance" },
  ],
};

const ImageCard = ({ item }) => (
  <div style={{
    background: item.gradient, width: 180, height: 140, borderRadius: 16, flexShrink: 0,
    display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 12,
    position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  }}>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
    <span style={{
      position: "relative", color: "#fff", fontSize: 13, fontWeight: 600,
      letterSpacing: 0.5, textShadow: "0 1px 4px rgba(0,0,0,0.4)",
    }}>{item.label}</span>
  </div>
);

const InfiniteRow = ({ items, direction = "left", speed = 30 }) => {
  const [offset, setOffset] = useState(0);
  const animRef = useRef(null);
  const lastTime = useRef(null);
  const gap = 16;
  const cardW = 180 + gap;
  const totalW = items.length * cardW;

  useEffect(() => {
    const animate = (ts) => {
      if (!lastTime.current) lastTime.current = ts;
      const dt = (ts - lastTime.current) / 1000;
      lastTime.current = ts;
      setOffset((prev) => {
        const next = prev + speed * dt;
        return next >= totalW ? next - totalW : next;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed, totalW]);

  const translateX = direction === "left" ? -offset : offset - totalW;
  const tripled = [...items, ...items, ...items];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={{
        display: "flex", gap, transform: `translateX(${translateX}px)`, willChange: "transform",
      }}>
        {tripled.map((item, i) => (
          <ImageCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
};

const features = [
  { icon: Palette, title: "Custom Design", description: "Unique designs that reflect your brand and stand out from competitors." },
  { icon: Smartphone, title: "Mobile-First", description: "Perfectly optimized for mobile devices where most traffic comes from." },
  { icon: Rocket, title: "Conversion Focused", description: "Every element designed to turn visitors into customers." },
  { icon: Code, title: "Clean Code", description: "Fast-loading, SEO-friendly, and easy to maintain." },
];

const benefits = [
  "Professional design that builds trust and credibility",
  "Fast loading times for better user experience and SEO",
  "Mobile-responsive design that works on all devices",
  "Strategic layout that guides visitors to take action",
  "Easy-to-use content management system (CMS)",
  "Ongoing support and maintenance available",
];

export default function WebDesign() {
  const [visible, setVisible] = useState({});
  const observe = (id) => (node) => {
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible((v) => ({ ...v, [id]: true })); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(node);
  };

  const fadeIn = (id, delay = 0) => ({
    ref: observe(id),
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    },
  });

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", background: "#000", color: "#fff" }}>

      {/* HERO */}
      <section style={{ padding: "80px 0 60px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            {/* Left */}
            <div {...fadeIn("hero-left")}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: C.cyanBg, padding: "8px 16px", borderRadius: 999, marginBottom: 24,
              }}>
                <span style={{ color: C.cyan }}><Globe /></span>
                <span style={{ fontSize: 14, fontWeight: 500, color: C.cyan }}>Web Design & Development</span>
              </div>
              <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
                Websites That Turn{" "}
                <span style={{
                  background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Visitors</span>{" "}
                Into Customers
              </h1>
              <p style={{ fontSize: 18, color: C.text, lineHeight: 1.6, marginBottom: 32 }}>
                We create beautiful, high-converting websites that represent your Sydney business
                perfectly and drive real results.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <button style={{
                  padding: "14px 28px", background: C.gradient, color: "#fff", border: "none",
                  borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 24px rgba(6,182,212,0.35)",
                }}
                  onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(6,182,212,0.45)"; }}
                  onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(6,182,212,0.35)"; }}
                >
                  Start Your Project <ChevronRight />
                </button>
                <button style={{
                  padding: "14px 28px", background: "transparent", color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, fontSize: 16,
                  fontWeight: 600, cursor: "pointer", transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = C.cyan; e.target.style.color = C.cyanLight; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "#fff"; }}
                >
                  See Our Work
                </button>
              </div>
            </div>

            {/* Right - Carousel */}
            <div {...fadeIn("hero-right", 0.2)} style={{
              ...fadeIn("hero-right", 0.2).style,
              display: "flex", flexDirection: "column", gap: 16,
              borderRadius: 24, overflow: "hidden", padding: "24px 0",
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}>
              <InfiniteRow items={carouselImages.row1} direction="left" speed={25} />
              <InfiniteRow items={carouselImages.row2} direction="right" speed={20} />
            </div>
          </div>
        </div>
      </section>

      {/* YOUR WEBSITE IS YOUR BEST SALESPERSON */}
      <section style={{ padding: "80px 0", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div {...fadeIn("salesperson")}>
            <h2 style={{ fontSize: 38, fontWeight: 800, marginBottom: 24, letterSpacing: -0.5 }}>
              Your Website is Your{" "}
              <span style={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Best Salesperson
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "In today's digital world, your website is often the first impression potential customers have of your business. A poorly designed website can cost you thousands in lost revenue.",
                "We build websites that not only look great but are strategically designed to convert visitors into customers. Every element – from the color scheme to the call-to-action buttons – is carefully planned based on proven conversion principles.",
                "Plus, all our websites are built with SEO in mind, giving you a head start in ranking on Google.",
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 18, color: C.text, lineHeight: 1.7 }}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section style={{ padding: "80px 0", background: "#111" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div {...fadeIn("deliver-title")} style={{ ...fadeIn("deliver-title").style, textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 38, fontWeight: 800, marginBottom: 12 }}>What We Deliver</h2>
            <p style={{ fontSize: 18, color: C.text }}>Premium websites built for performance and results.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} {...fadeIn(`feat-${i}`, i * 0.1)} style={{
                  ...fadeIn(`feat-${i}`, i * 0.1).style,
                  background: "#1a1a1a", borderRadius: 16, padding: 24,
                  border: `1px solid ${C.cardBorder}`,
                  transition: "border-color 0.3s, opacity 0.6s, transform 0.6s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.cardBorder}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: C.cyanBg, display: "flex",
                    alignItems: "center", justifyContent: "center", marginBottom: 16, color: C.cyan,
                  }}>
                    <Icon />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: C.text, lineHeight: 1.6 }}>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKAGE INCLUDES */}
      <section style={{ padding: "80px 0", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <div {...fadeIn("pkg-title")} style={{ ...fadeIn("pkg-title").style, textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 38, fontWeight: 800 }}>Website Package Includes</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {benefits.map((b, i) => (
              <div key={i} {...fadeIn(`ben-${i}`, i * 0.08)} style={{
                ...fadeIn(`ben-${i}`, i * 0.08).style,
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
                <div style={{ color: C.green, flexShrink: 0, marginTop: 2 }}><TrendingUp /></div>
                <span style={{ fontSize: 17, color: C.text, lineHeight: 1.5 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div {...fadeIn("cta")}>
            <h2 style={{ fontSize: 38, fontWeight: 800, marginBottom: 16, color: "#fff" }}>
              Ready for a Website That Works?
            </h2>
            <p style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", marginBottom: 32 }}>
              Let's discuss your project and create a website that drives real business results.
            </p>
            <button style={{
              padding: "16px 32px", background: "#fff", color: "#0e7490",
              border: "none", borderRadius: 12, fontSize: 17, fontWeight: 700,
              cursor: "pointer", boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              Get Your Free Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}