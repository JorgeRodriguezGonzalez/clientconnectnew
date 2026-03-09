import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Rocket, Palette, TrendingUp, Code } from "lucide-react";

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
  <div style={{
    width: 280, height: 150, borderRadius: 16, flexShrink: 0,
    overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    background: "#111",
  }}>
    <img
      src={item.src}
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
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

        {/* ═══════════════ HERO ═══════════════ */}
        <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: "80px" }}>
          {/* Gradient orbs */}
          <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${C.primaryRGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${C.secondaryRGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

          {/* Content */}
          <div style={{ textAlign: "center", paddingTop: "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
            <h1 style={{
              fontFamily: FONT,
              fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px",
              margin: 0, color: "#fff", textTransform: "none",
              ...anim(0.1),
            }}>
              Websites That Turn{" "}
              <span style={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Visitors
              </span>{" "}
              Into Customers.
            </h1>

            <p style={{
              fontFamily: FONT,
              fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff",
              maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
              ...anim(0.3),
            }}>
              We create beautiful, <span style={{ color: C.green, fontWeight: 600 }}>high-converting websites</span> that represent your Sydney business perfectly and drive <span style={{ color: C.green, fontWeight: 600 }}>real results</span>.
            </p>

            {/* Tags */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: "8px",
              marginTop: "24px", flexWrap: "wrap", padding: "0 20px",
              fontFamily: FONT, fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)",
              ...anim(0.4),
            }}>
              <span>Custom Design</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>Mobile-First</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>SEO Optimised</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>2-4 Weeks</span>
            </div>

            {/* CTA Button */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "12px", marginTop: "32px", padding: "0 20px",
              ...anim(0.5),
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50px",
                padding: "5px 5px 5px 24px",
                maxWidth: "520px", width: "100%",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              }}>
                <input
                  type="email"
                  placeholder="Enter your email for a free quote"
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    fontFamily: FONT, fontWeight: 500, fontSize: "14px", color: "#fff", minWidth: 0,
                  }}
                />
                <button
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px rgba(${C.primaryRGB},0.5)`; e.currentTarget.style.background = C.gradient; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = C.cyan; }}
                  style={{
                    height: "40px", padding: "0 20px", borderRadius: "50px",
                    background: C.cyan, border: "none",
                    fontFamily: FONT, fontWeight: 600, fontSize: "14px", color: "#000",
                    cursor: "pointer", transition: "all 0.2s ease",
                    display: "flex", alignItems: "center", gap: "8px",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}
                >
                  Start Your Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div style={{
            marginTop: "56px", position: "relative", zIndex: 2,
            display: "flex", flexDirection: "column", gap: 16,
            maxWidth: "900px", margin: "56px auto 0",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            ...anim(0.6),
          }}>
            <InfiniteRow items={carouselImages.row1} direction="left" speed={25} />
            <InfiniteRow items={carouselImages.row2} direction="right" speed={20} />
          </div>
        </section>

        {/* ═══════════════ BEST SALESPERSON ═══════════════ */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Your Website is Your{" "}
                  <span style={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Best Salesperson
                  </span>
                </h2>
                <div className="space-y-4 text-lg text-text-medium">
                  <p>
                    In today's digital world, your website is often the first impression potential
                    customers have of your business. A poorly designed website can cost you thousands
                    in lost revenue.
                  </p>
                  <p>
                    We build websites that not only look great but are strategically designed to convert
                    visitors into customers. Every element – from the color scheme to the call-to-action
                    buttons – is carefully planned based on proven conversion principles.
                  </p>
                  <p>
                    Plus, all our websites are built with SEO in mind, giving you a head start in
                    ranking on Google.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ WHAT WE DELIVER ═══════════════ */}
        <section className="section-padding bg-bg-light">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Deliver</h2>
              <p className="text-lg text-text-medium">Premium websites built for performance and results.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6"
                  >
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: C.cyanBg }}>
                      <Icon className="h-6 w-6" style={{ color: C.cyan }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-medium">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ PACKAGE INCLUDES ═══════════════ */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Website Package Includes
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <TrendingUp className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: C.green }} />
                      <span className="text-lg text-text-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="section-padding" style={{ background: C.gradient }}>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready for a Website That Works?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let's discuss your project and create a website that drives real business results.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Get Your Free Quote</Link>
              </Button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default WebDesign;