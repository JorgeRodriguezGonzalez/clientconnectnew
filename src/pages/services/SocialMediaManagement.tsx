import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Share2, Calendar, Users, BarChart, TrendingUp, MessageSquare } from "lucide-react";

// Añadir con los imports:
import SubServicesSection from "@/components/home/SubServicesSection";
import { socialMgmtServices, socialMgmtHeading, socialMgmtHighlight, socialMgmtSubtitle } from "@/data/services/socialmgmt-services";

const PRIMARY = "#34d399";
const PRIMARY_RGB = "52,211,153";
const SECONDARY = "#06b6d4";
const SECONDARY_RGB = "6,182,212";

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

const stats = [
  { value: "+250%", label: "Average engagement increase", color: SECONDARY },
  { value: "20-30", label: "Posts per month across platforms", color: PRIMARY },
  { value: "Daily", label: "Community engagement & monitoring", color: SECONDARY },
];

const images = [
  { url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=500&fit=crop", alt: "Social Media Content", rotate: -6 },
  { url: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=350&h=450&fit=crop", alt: "Community Engagement", rotate: 3 },
  { url: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=500&fit=crop", alt: "Content Creation", rotate: -2 },
  { url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=380&h=480&fit=crop", alt: "Brand Strategy", rotate: 5 },
  { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=350&h=450&fit=crop", alt: "Analytics Dashboard", rotate: -4 },
  { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop", alt: "Growth Metrics", rotate: 3 },
];
const mobileImages = [images[0], images[1], images[2], images[3]];

const features = [
  { icon: Calendar, title: "Content Planning", description: "Strategic content calendar aligned with your business goals." },
  { icon: MessageSquare, title: "Content Creation", description: "Engaging posts, graphics, and videos that resonate with your audience." },
  { icon: Users, title: "Community Management", description: "Active engagement with your followers and prompt responses." },
  { icon: BarChart, title: "Performance Analytics", description: "Monthly reports showing growth, engagement, and insights." },
];

const benefits = [
  "Build authentic relationships with your audience",
  "Increase brand awareness and recognition",
  "Drive website traffic and generate leads",
  "Establish thought leadership in your industry",
  "Stay top-of-mind with potential customers",
  "Gain valuable customer insights and feedback",
];

const SocialMediaManagement = () => {
  const [hImg, setHImg] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const anim = (d = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  const galleryImages = isMobile ? mobileImages : images;

  return (
    <div style={{ fontFamily: "'Satoshi', -apple-system, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <Header />
      <main style={{ flex: 1 }}>

        {/* ═══════════════ HERO ═══════════════ */}
        <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: isMobile ? "80px" : "130px" }}>
          <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ textAlign: "center", paddingTop: isMobile ? "100px" : "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
            {/* Badge */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", ...anim(0) }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "50px", padding: "6px 16px",
              }}>
                <Share2 size={14} color={SECONDARY} />
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#9ca3af" }}>
                  Social Media Management
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
              ...anim(0.1),
            }}>
              <span>Meaningful</span><br />
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
                Connections.
              </motion.span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
              ...anim(0.3),
            }}>
              We manage your <span style={{ color: SECONDARY, fontWeight: 600 }}>social media presence</span> so you can focus on running your business. Engage your audience, build your <span style={{ color: PRIMARY, fontWeight: 600 }}>brand</span>, and drive real results.
            </p>

            {/* Tags */}
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap", padding: "0 20px",
              fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)",
              ...anim(0.4),
            }}>
              <span>Content & Strategy</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>Community Management</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>+250% Engagement</span>
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
                maxWidth: "520px", width: "100%",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              }}>
                <input
                  type="email"
                  placeholder="Enter your email for a free social strategy"
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
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div style={{
              display: "flex", justifyContent: "center", gap: isMobile ? "24px" : "48px", marginTop: "40px", flexWrap: "wrap", padding: "0 20px",
              ...anim(0.6),
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, sans-serif', fontSize: isMobile ? "28px" : "36px", fontWeight: 700,
                    color: stat.color, letterSpacing: "-1px", lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "12px", fontWeight: 400,
                    color: "rgba(255,255,255,0.5)", marginTop: "6px", maxWidth: "140px",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
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
                  Why Social Media Matters
                </h2>
                <div className="space-y-4 text-lg text-text-medium">
                  <p>
                    Your customers are on social media every day. Whether it's Facebook, Instagram,
                    or LinkedIn, they're scrolling, engaging, and making purchasing decisions based
                    on what they see.
                  </p>
                  <p>
                    But managing social media effectively takes time, strategy, and consistency –
                    resources many Sydney business owners simply don't have. That's where we come in.
                  </p>
                  <p>
                    We create content that resonates with your Sydney audience, engage with your
                    followers authentically, and turn your social channels into powerful business tools.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Insertar entre "WHY SOCIAL MEDIA" y "FEATURES": */}
        <SubServicesSection
          heading={socialMgmtHeading}
          headingHighlight={socialMgmtHighlight}
          subtitle={socialMgmtSubtitle}
          services={socialMgmtServices}
        />

        {/* ═══════════════ FEATURES ═══════════════ */}
        <section className="section-padding bg-bg-light">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Social Media Services</h2>
              <p className="text-lg text-text-medium">
                Complete management of your social media presence.
              </p>
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
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-medium">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ BENEFITS ═══════════════ */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What You'll Achieve</h2>
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
                      <TrendingUp className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                      <span className="text-lg text-text-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary/90">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Grow Your Social Presence?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let us handle your social media while you focus on what you do best.
              </p>
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90" asChild>
                <Link to="/contact">Get Your Free Strategy</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SocialMediaManagement;