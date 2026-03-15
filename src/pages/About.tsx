import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import OurStepsVersion2 from "@/components/home/OurStepsVersion2";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import InteractivePath from "@/components/home/InteractivePath";
import { HowWeWork } from "@/components/home/HowWeWork";
import { Minus, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY = "#34d399";
const PRIMARY_RGB = "52,211,153";
const SECONDARY = "#06b6d4";
const SECONDARY_RGB = "6,182,212";
const TEXT_DARK = "hsl(0,0%,10%)";
const BG = "hsl(0,0%,100%)";
const FONT = "'Satoshi', -apple-system, sans-serif";

// --- CLIENT DATA ---
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

const mobileImages = [images[0], images[1], images[2], images[3]];

// --- FAQ DATA ---
const faqData = [
  {
    id: 1,
    question: "How quickly will we start seeing results from our campaigns?",
    answer: "Digital marketing is a momentum game. While paid channels (like Google Ads or Meta) can generate traffic almost immediately, a sustainable ROI typically stabilizes within the first 3 months. For organic strategies like SEO, we generally see significant traction and compound growth between months 4 and 6. We focus on building a long-term engine, not just a short-term spike.",
  },
  {
    id: 2,
    question: "Do you work with specific industries or niches?",
    answer: "We are strategy-first, which allows us to be industry-agnostic. However, we specialize in partnering with service-based businesses, e-commerce brands, and SaaS companies looking to scale. Our data-driven framework adapts to your specific market dynamics, whether you are targeting B2B decision-makers or B2C consumers.",
  },
  {
    id: 3,
    question: "What makes Client Connect different from other agencies?",
    answer: "We don't just report on 'vanity metrics' like impressions or likes. We integrate directly with your sales data to track revenue and actual ROI. While other agencies might celebrate a low cost-per-click, we only celebrate when you see more qualified leads and closed deals. We act as a strategic growth partner, not just a service provider executing tasks.",
  },
  {
    id: 4,
    question: "What does the onboarding process look like?",
    answer: "We believe in rapid deployment without sacrificing quality. Once we kick off, we conduct a deep-dive audit of your current digital ecosystem within the first 5 days. You will get access to a dedicated Slack channel for instant communication and a real-time performance dashboard, ensuring you are never left wondering about the status of your campaigns.",
  },
  {
    id: 5,
    question: "Are we locked into a long-term contract?",
    answer: "We believe our results should keep you with us, not a piece of paper. While we recommend a 3-month initial runway to allow for proper testing and optimization, our agreements are designed to be flexible. We offer clear, transparent terms because we are confident in our ability to deliver value month over month.",
  },
];

// --- CLIENT CARD ---
const ClientCard = ({ client, isMobile }) => (
  <div style={{
    position: 'relative', flexShrink: 0,
    width: isMobile ? '220px' : '260px', height: isMobile ? '290px' : '340px',
    borderRadius: '24px', overflow: 'hidden', cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
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

// --- CLIENT CAROUSEL ---
const ClientCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const [x, setX] = useState(0);
  const xRef = useRef(0);
  const rafRef = useRef();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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
        if (Math.abs(xRef.current) >= trackWidth) xRef.current = 0;
        setX(xRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, trackWidth]);

  return (
    <section style={{ width: '100%', position: 'relative', padding: '120px 0', background: '#000', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "10px",
            textTransform: "uppercase", letterSpacing: "2px", padding: "6px 16px",
            borderRadius: "50px", width: "fit-content",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)",
            color: "#9ca3af", marginBottom: "24px",
          }}
        >
          Success Stories
        </motion.div>
        <h2 style={{
          fontFamily: "'Satoshi', sans-serif", fontWeight: 700,
          fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", margin: 0,
          letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>
          Some of our{" "}
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
            local clients
          </motion.span>
        </h2>
      </div>

      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: isMobile ? '80px' : '200px', zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #000 15%, transparent 100%)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: isMobile ? '80px' : '200px', zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #000 15%, transparent 100%)' }} />

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

// --- FAQ SECTION ---
const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#050505] py-24 sm:py-32 overflow-hidden">
      <div className="w-full h-[1px] bg-white/10 absolute top-0 z-20" />
      <BackgroundStripes />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-500"
          >
            SUPPORT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-white"
          >
            Frequently asked{' '}
            <motion.span
              initial={{ backgroundPosition: "400% 50%" }}
              animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
              style={{
                display: "inline-block",
                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${PRIMARY}, ${SECONDARY}, rgba(255,255,255,0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", color: "transparent",
              }}
            >
              questions
            </motion.span>
            <span className="text-white">.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] font-medium leading-relaxed text-zinc-400 tracking-tight"
          >
            Everything you need to know about how we work, our methodology, and how we help businesses scale.
          </motion.p>
        </div>

        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              Updated Today
            </span>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openItem === item.id.toString();
              return (
                <div key={item.id} className="group">
                  <button
                    onClick={() => setOpenItem(isOpen ? null : item.id.toString())}
                    className="flex w-full items-start gap-x-4 focus:outline-none"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={cn(
                        "relative flex items-center justify-between w-full p-5 text-left transition-all duration-300 border rounded-2xl",
                        isOpen
                          ? "bg-[#0a0a0a] border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-xl transition-colors duration-300",
                          isOpen ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-500"
                        )}>
                          <MessageSquare size={14} />
                        </div>
                        <span className={cn(
                          "text-base md:text-lg font-semibold transition-colors duration-300",
                          isOpen ? "text-white" : "text-zinc-400"
                        )}>
                          {item.question}
                        </span>
                      </div>
                      <span className={cn(
                        "ml-4 transition-transform duration-300",
                        isOpen ? "text-emerald-500 rotate-180" : "text-zinc-600"
                      )}>
                        {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>
                      {isOpen && (
                        <motion.div
                          layoutId="active-line"
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                          style={{ backgroundColor: PRIMARY }}
                        />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-end mt-2 ml-8 md:ml-16">
                          <div className="relative max-w-2xl p-6 text-sm md:text-base leading-relaxed rounded-2xl shadow-sm border bg-zinc-900 border-white/10 text-zinc-300">
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500/20 rounded-bl-lg rounded-tr-2xl" />
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- HOOKS ---
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

// --- MAIN COMPONENT ---
export default function About() {
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
    <div style={{ fontFamily: FONT, background: BG, color: TEXT_DARK, minHeight: "100vh", overflowX: "hidden" }}>
      <Header />

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: isMobile ? "80px" : "130px" }}>
        <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", paddingTop: isMobile ? "100px" : "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
            textTransform: "none",
            ...anim(0.1),
          }}>
            <span>About </span>
            <span style={{ color: "#fff" }}>Us.</span>
          </h1>
          <p style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "520px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
            ...anim(0.3),
          }}>
            Your dedicated <span style={{ color: "#34d399", fontWeight: 600 }}>growth partner</span>, helping Sydney businesses thrive in the <span style={{ color: "#34d399", fontWeight: 600 }}>digital age</span>.
          </p>

          {/* Tags */}
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap", padding: "0 20px",
            fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)",
            ...anim(0.4),
          }}>
            <span>Sydney Based</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
            <span>Est. 2018</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
            <span>150+ Clients</span>
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
                Start Scaling
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
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

      <OurStepsVersion2 />
      <ClientCarousel />
      <FAQSection />
      <InteractivePath />
      <CTASection />
      <Footer />
    </div>
  );
}