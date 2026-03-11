import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubServicesSection from "@/components/home/SubServicesSection";
import CTASection from "@/components/home/CTASection";
import { webdesignServices, webdesignHeading, webdesignHighlight, webdesignSubtitle } from "@/data/services/webdesign-services";

const C = {
  cyan: "#06b6d4",
  green: "#34d399",
  cyanBg: "rgba(6,182,212,0.15)",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
  primaryRGB: "52,211,153",
  secondaryRGB: "6,182,212",
};

const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const carouselImages = {
  row1: [
    { id: 1, src: "/images/brisbane.png" },
    { id: 2, src: "/images/premierwebsite.png" },
    { id: 3, src: "/images/assetwebsite.png" },
    { id: 4, src: "/images/turnbullwebsite.png" },
    { id: 5, src: "/images/nanotisewebsite.png" },
    { id: 6, src: "/images/prolexwebsite.png" },
  ],
  row2: [
    { id: 7, src: "/images/commercialstratawebsite.png" },
    { id: 8, src: "/images/pioneerwebsite.png" },
    { id: 9, src: "/images/LCLwebsite.png" },
    { id: 10, src: "/images/YLRwebsite.png" },
    { id: 11, src: "/images/LCDwebsite.png" },
  ],
};

const ImageCard = ({ item }) => (
  <div style={{ width: 280, height: 150, borderRadius: 16, flexShrink: 0, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", background: "#111" }}>
    <img src={item.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>
);

const InfiniteRow = ({ items, direction = "left", speed = 30 }) => {
  const [offset, setOffset] = useState(0);
  const animRef = useRef(null);
  const lastTime = useRef(null);
  const gap = 16;
  const cardW = 280 + gap;
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
      <div style={{ display: "flex", gap, transform: `translateX(${translateX}px)`, willChange: "transform" }}>
        {tripled.map((item, i) => <ImageCard key={`${item.id}-${i}`} item={item} />)}
      </div>
    </div>
  );
};

const WebDesign = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const anim = (d = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* HERO */}
        <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: "80px" }}>
          <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${C.primaryRGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${C.secondaryRGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ textAlign: "center", paddingTop: "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
            <h1 style={{ fontFamily: FONT, fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff", ...anim(0.1) }}>
              Websites That Turn{" "}
              <span style={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Visitors</span>
              <br />Into Customers.
            </h1>
            <p style={{ fontFamily: FONT, fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px", ...anim(0.3) }}>
              We create beautiful, <span style={{ color: C.green, fontWeight: 600 }}>high-converting websites</span> that represent your Sydney business perfectly and drive <span style={{ color: C.green, fontWeight: 600 }}>real results</span>.
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap", padding: "0 20px", fontFamily: FONT, fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)", ...anim(0.4) }}>
              <span>Custom Design</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span>Mobile-First</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span>SEO Optimised</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span>2-4 Weeks</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "32px", padding: "0 20px", ...anim(0.5) }}>
              <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50px", padding: "5px 5px 5px 24px", maxWidth: "520px", width: "100%", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
                <input type="email" placeholder="Enter your email for a free quote" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: FONT, fontWeight: 500, fontSize: "14px", color: "#fff", minWidth: 0 }} />
                <button
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px rgba(${C.primaryRGB},0.5)`; e.currentTarget.style.background = C.gradient; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = C.cyan; }}
                  style={{ height: "40px", padding: "0 20px", borderRadius: "50px", background: C.cyan, border: "none", fontFamily: FONT, fontWeight: 600, fontSize: "14px", color: "#000", cursor: "pointer", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  Start Your Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "56px", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 16, maxWidth: "1200px", margin: "56px auto 0", maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", ...anim(0.6) }}>
            <InfiniteRow items={carouselImages.row1} direction="left" speed={25} />
            <InfiniteRow items={carouselImages.row2} direction="right" speed={20} />
          </div>
        </section>

        {/* QUOTE */}
        <section style={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-96px", left: "-96px", width: "384px", height: "384px", borderRadius: "50%", background: `rgba(${C.secondaryRGB},0.1)`, filter: "blur(48px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-96px", right: "-96px", width: "384px", height: "384px", borderRadius: "50%", background: `rgba(${C.primaryRGB},0.1)`, filter: "blur(48px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center" }}>
              <div style={{ opacity: 0.1, color: "#fff", marginBottom: "32px", display: "flex", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M7 7h3v10H5V9a2 2 0 0 1 2-2Zm9 0h3v10h-5V9a2 2 0 0 1 2-2Z" /></svg>
              </div>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-1.5px", color: "#fff", margin: "0 auto", maxWidth: "1000px" }}>
                Your website is your{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>most powerful salesperson</span>
                . It works 24/7, never takes a day off, and is often the first thing potential customers see —{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>make it count</span>.
              </p>
              <div style={{ marginTop: "48px" }}>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500 }}>
                  <span style={{ color: "rgba(255,255,255,0.85)" }}>Custom built </span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>for Sydney businesses that want to grow online</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <SubServicesSection heading={webdesignHeading} headingHighlight={webdesignHighlight} subtitle={webdesignSubtitle} services={webdesignServices} />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default WebDesign;