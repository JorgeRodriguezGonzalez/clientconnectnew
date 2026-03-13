import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MousePointerClick, Target, DollarSign, BarChart, TrendingUp, Zap, Minus, Plus, MessageSquare } from "lucide-react";
import SubServicesSection from "@/components/home/SubServicesSection";
import CTASection from "@/components/home/CTASection";
import { googleAdsServices, googleAdsHeading, googleAdsHighlight, googleAdsSubtitle } from "@/data/services/googleads-services";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

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

const PRIMARY = "#34d399";
const PRIMARY_RGB = "52,211,153";
const SECONDARY = "#06b6d4";
const SECONDARY_RGB = "6,182,212";
const FONT = "'Satoshi', -apple-system, sans-serif";

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

const images = [
  { url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=500&fit=crop", alt: "Google Ads Dashboard", rotate: -6 },
  { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=350&h=450&fit=crop", alt: "Campaign Analytics", rotate: 3 },
  { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop", alt: "Performance Data", rotate: -2 },
  { url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=380&h=480&fit=crop", alt: "Ad Strategy", rotate: 5 },
  { url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=350&h=450&fit=crop", alt: "ROI Tracking", rotate: -4 },
  { url: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=500&fit=crop", alt: "Growth Results", rotate: 3 },
];
const mobileImages = [images[0], images[1], images[2], images[3]];

const processSteps = [
  { step: "Step 1", title: "Account Audit & Strategy", description: "We audit your existing account (or start from scratch), research your market and competitors, and build a data-driven campaign strategy aligned with your business goals.", badges: ["Account Audit", "Keyword Research", "Competitor Analysis", "Strategy Plan"] },
  { step: "Step 2", title: "Campaign Build & Ad Creation", description: "We structure your campaigns for maximum quality score, write compelling ad copy with strong CTAs, and set up all extensions and tracking to capture every conversion.", badges: ["Ad Copywriting", "Campaign Structure", "Ad Extensions", "Conversion Tracking"] },
  { step: "Step 3", title: "Launch & Optimise", description: "We launch your campaigns and continuously optimise bids, keywords, and ad placements based on real-time performance data. Negative keywords and A/B tests run constantly.", badges: ["Bid Management", "A/B Testing", "Negative Keywords", "Quality Score"] },
  { step: "Step 4", title: "Scale & Report", description: "We scale winning campaigns, expand to new keyword opportunities, and provide detailed monthly reports showing your ROAS, cost per lead, and growth trajectory.", badges: ["Performance Reports", "Budget Scaling", "New Opportunities", "ROAS Tracking"] },
];

const ProcessBadge = ({ label, isActive, delay }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "6px",
    padding: "6px 14px", borderRadius: "999px",
    fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
    fontFamily: "'Satoshi', sans-serif", whiteSpace: "nowrap",
    background: isActive ? C.cyanBg : "rgba(255,255,255,0.05)",
    border: isActive ? `1px solid rgba(${C.secondaryRGB},0.25)` : "1px solid rgba(255,255,255,0.08)",
    color: isActive ? C.cyan : "rgba(255,255,255,0.45)",
    opacity: isActive ? 1 : 0.6,
    transform: isActive ? "translateY(0)" : "translateY(4px)",
    transition: `all 0.5s ease ${delay}s`,
  }}>
    {isActive && (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )}
    {label}
  </span>
);

const OurProcess = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCount = processSteps.length;
  const stackOffset = 24;

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={{ background: "#000", padding: "80px 0 0" }}>
      <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", width: "fit-content", margin: "0 auto 16px" }}>
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#9ca3af", fontFamily: "'Satoshi', sans-serif" }}>How We Work</span>
          </div>
          <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-1.5px", color: "#fff", marginTop: "12px" }}>Our Google Ads Process</h2>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "16px auto 0", lineHeight: 1.65 }}>From audit to scale, we follow a proven 4-step process to deliver Google Ads campaigns that maximise your return on every dollar spent.</p>
        </motion.div>
      </div>
      <div ref={containerRef} style={{ position: "relative", height: `${cardCount * 60 + 40}vh`, maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {processSteps.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={i} ref={el => cardRefs.current[i] = el} style={{ position: "sticky", top: `calc(112px + ${i * stackOffset}px)`, marginBottom: `${60 / cardCount}vh`, zIndex: 10 + i }}>
              <div style={{
                background: `linear-gradient(135deg, rgba(255,255,255,${0.12 - i * 0.025}) 0%, rgba(255,255,255,${0.03 - i * 0.005}) 100%)`,
                borderRadius: "20px", padding: "56px 44px", position: "relative", overflow: "hidden",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", minHeight: "300px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                backgroundClip: isActive ? "padding-box" : undefined,
                boxShadow: isActive ? `0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(${C.secondaryRGB},0.15), 0 0 80px rgba(${C.primaryRGB},0.08)` : "0 20px 40px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.5s ease, border 0.5s ease, transform 0.5s ease",
                transform: isActive ? "scale(1)" : "scale(0.98)",
              }}>
                {isActive && (<div style={{ position: "absolute", inset: 0, borderRadius: "20px", padding: "1px", background: C.gradient, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", pointerEvents: "none", opacity: 0.7, transition: "opacity 0.5s ease" }} />)}
                <div style={{ position: "absolute", top: 0, left: "24px", right: "24px", height: "1px", background: isActive ? C.gradient : "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)", transition: "background 0.5s ease" }} />
                <span style={{ display: "inline-flex", alignItems: "center", fontFamily: "'Satoshi', sans-serif", fontSize: "12px", fontWeight: 600, color: isActive ? C.cyan : "rgba(255,255,255,0.4)", background: isActive ? C.cyanBg : "rgba(255,255,255,0.04)", border: isActive ? `1px solid rgba(${C.secondaryRGB},0.25)` : "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", padding: "5px 14px", marginBottom: "12px", transition: "all 0.5s ease", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.step}</span>
                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, letterSpacing: "-1px", textAlign: "center", margin: "0 0 16px 0", transition: "color 0.5s ease" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500, color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)", maxWidth: "560px", lineHeight: 1.7, textAlign: "center", margin: "0 0 24px 0", transition: "color 0.5s ease" }}>{item.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "4px" }}>
                  {item.badges.map((badge, bi) => <ProcessBadge key={bi} label={badge} isActive={isActive} delay={bi * 0.08} />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const googleAdsFaqs = [
  { id: 1, question: "How much should I spend on Google Ads?", answer: "We recommend a minimum of $1,500–$3,000 per month in ad spend to generate meaningful data and results. Your ideal budget depends on your industry, competition, and goals. We'll recommend a budget during our initial consultation and ensure every dollar is optimised for maximum return." },
  { id: 2, question: "How quickly will I see results?", answer: "Google Ads delivers traffic almost immediately after launch. However, the first 2 to 4 weeks are a learning and optimisation phase where we refine targeting, bids, and ad copy. Most campaigns reach peak performance by month 2 to 3 as we accumulate data and optimise aggressively." },
  { id: 3, question: "Do you manage Shopping and Display campaigns too?", answer: "Yes. We manage all Google Ads campaign types including Search, Shopping, Display, YouTube, and Performance Max. We'll recommend the best campaign mix based on your business type and goals. E-commerce businesses often benefit from a combination of Search and Shopping campaigns." },
  { id: 4, question: "What kind of return can I expect?", answer: "Our average client achieves a 3.8x return on ad spend (ROAS) with a 45% reduction in cost per acquisition. Results vary by industry and competition, but we focus relentlessly on your cost per lead and cost per sale to ensure profitability. Full transparency in monthly reports." },
  { id: 5, question: "Can I pause or adjust my budget at any time?", answer: "Absolutely. You have full control over your ad spend and can pause, increase, or decrease your budget at any time. We'll proactively recommend budget adjustments based on performance data — scaling up what works and cutting what doesn't." },
];

const BackgroundStripes = () => (
  <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert" style={{
    backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
    backgroundRepeat: 'repeat',
  }} />
);

const GoogleAdsFAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <section className="relative w-full bg-[#050505] py-24 sm:py-32 overflow-hidden">
      <div className="w-full h-[1px] bg-white/10 absolute top-0 z-20" />
      <BackgroundStripes />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-sm font-medium tracking-[2.2px] uppercase text-zinc-500">SUPPORT</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-[26px] md:text-[32px] lg:text-[48px] font-bold leading-[1.1] tracking-tight text-white">
            Frequently asked{' '}
            <motion.span initial={{ backgroundPosition: "400% 50%" }} animate={{ backgroundPosition: ["400% 50%", "0% 50%"] }} transition={{ duration: 12, ease: "linear", repeat: Infinity }} style={{ display: "inline-block", backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${C.green}, ${C.cyan}, rgba(255,255,255,0))`, backgroundSize: "400% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>questions</motion.span>
            <span className="text-white">.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-[16px] md:text-[18px] font-medium leading-relaxed text-zinc-400 tracking-tight">Everything you need to know about our Google Ads management, budgets, and what results to expect.</motion.p>
        </div>
        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/5 px-3 py-1 border border-white/5">Updated Today</span>
          </div>
          <Accordion.Root type="single" collapsible value={openItem || ""} onValueChange={(value) => setOpenItem(value)} className="space-y-4">
            {googleAdsFaqs.map((item, index) => (
              <Accordion.Item value={item.id.toString()} key={item.id} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-start gap-x-4 focus:outline-none group">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }}
                      className={cn(
                        "relative flex items-center justify-between w-full p-5 text-left transition-all duration-300 border",
                        openItem === item.id.toString()
                          ? "bg-[#0a0a0a] border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 rounded-xl"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 rounded-xl"
                      )}>
                      <div className="flex items-center gap-4">
                        <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300", openItem === item.id.toString() ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-500")}>
                          <MessageSquare size={14} />
                        </div>
                        <span className={cn("text-base md:text-lg font-semibold transition-colors duration-300", openItem === item.id.toString() ? "text-white" : "text-zinc-400")}>{item.question}</span>
                      </div>
                      <span className={cn("ml-4 transition-transform duration-300", openItem === item.id.toString() ? "text-emerald-500 rotate-180" : "text-zinc-600")}>
                        {openItem === item.id.toString() ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>
                      {openItem === item.id.toString() && (
                        <motion.div layoutId="googleads-faq-active-line" className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl" style={{ backgroundColor: C.green }} />
                      )}
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content asChild forceMount>
                  <AnimatePresence initial={false}>
                    {openItem === item.id.toString() && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="flex justify-end mt-2 ml-8 md:ml-16">
                          <div className={cn("relative max-w-2xl p-6 text-sm md:text-base leading-relaxed rounded-xl shadow-sm border", "bg-zinc-900 border-white/10 text-zinc-300")}>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500/20 rounded-bl-lg" />
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
};

const GoogleAds = () => {
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
    <div className="min-h-screen flex flex-col" style={{ fontFamily: FONT, overflowX: "clip" }}>
      <Header />
      <main style={{ flex: 1 }}>

        <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: isMobile ? "80px" : "130px" }}>
          <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ textAlign: "center", paddingTop: isMobile ? "100px" : "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>

            <div style={{ height: isMobile ? "38px" : "48px" }} />

            <h1 style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-2px", margin: 0, color: "#fff",
              ...anim(0.1),
            }}>
              <span>Instant Visibility.</span><br />
              <span>Qualified </span>
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
                Traffic.
              </motion.span>
            </h1>

            <p style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
              ...anim(0.3),
            }}>
              Our <span style={{ color: SECONDARY, fontWeight: 600 }}>Google Ads experts</span> create and manage high-performing campaigns that deliver measurable <span style={{ color: PRIMARY, fontWeight: 600 }}>ROI</span> for Sydney businesses.
            </p>

            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px", flexWrap: "wrap", padding: "0 20px",
              fontFamily: 'Inter, -apple-system, sans-serif', fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.5)",
              ...anim(0.4),
            }}>
              <span>Google Certified</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>Sydney Specialists</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
              <span>3.8x Avg. ROAS</span>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "32px", padding: "0 20px", ...anim(0.5) }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50px", padding: "5px 5px 5px 24px",
                maxWidth: "520px", width: "100%",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              }}>
                <input type="email" placeholder="Enter your email for a free ads audit" style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 500, fontSize: "14px", color: "#fff", minWidth: 0,
                }} />
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
                  Get Audit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: isMobile ? "10px" : "16px",
            marginTop: isMobile ? "36px" : "48px",
            padding: isMobile ? "10px 12px" : "20px 20px",
            overflow: "visible", position: "relative", zIndex: 2,
          }}>
            {galleryImages.map((img, i) => {
              const isCenter = isMobile ? (i === 1 || i === 2) : i === 2;
              const w = isMobile ? (isCenter ? "22vw" : "20vw") : (isCenter ? "200px" : "160px");
              const h = isMobile ? (isCenter ? "28vw" : "25vw") : (isCenter ? "260px" : "220px");
              return (
                <div key={i} onMouseEnter={() => setHImg(i)} onMouseLeave={() => setHImg(null)} style={{
                  flex: "0 0 auto", width: w, height: h,
                  maxWidth: isMobile ? "100px" : "200px", maxHeight: isMobile ? "130px" : "260px",
                  borderRadius: isMobile ? "14px" : "20px", overflow: "hidden", position: "relative", cursor: "grab",
                  transform: `rotate(${img.rotate}deg) scale(${hImg === i ? 1.1 : 1}) rotateZ(${hImg === i ? (img.rotate < 0 ? -2 : 2) : 0}deg)`,
                  transition: "all 0.15s ease-out",
                  boxShadow: hImg === i ? `0 20px 60px rgba(${PRIMARY_RGB},0.35)` : "0 10px 40px rgba(0,0,0,0.4)",
                  opacity: loaded ? 1 : 0, transitionDelay: hImg === i ? "0s" : `${0.3 + i * 0.08}s`, zIndex: hImg === i ? 10 : 1,
                }}>
                  <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: hImg === i ? "transparent" : "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)", transition: "all 0.4s ease" }} />
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 1, padding: "40px 24px 200px", maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-1.5px", color: "#fff", margin: "0 auto 24px", maxWidth: "1000px" }}>
                Why Google Ads for Your{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>Sydney Business</span>
                {" "}— And Why Most Campaigns Fail
              </p>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: "0 auto", maxWidth: "700px" }}>
                Google Ads puts your business at the top of search results instantly. The key is doing it right — many businesses waste thousands on poorly managed campaigns.{" "}
                <span style={{ color: C.green, fontWeight: 500 }}>Our certified experts ensure every dollar works hard</span>.
              </p>
            </motion.div>
          </div>
        </section>

        <SubServicesSection
          heading={googleAdsHeading}
          headingHighlight={googleAdsHighlight}
          subtitle={googleAdsSubtitle}
          services={googleAdsServices}
        />

        <OurProcess />

        <GoogleAdsFAQ />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default GoogleAds;