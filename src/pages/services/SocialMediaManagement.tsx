import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Share2, Calendar, Users, BarChart, TrendingUp, MessageSquare, Minus, Plus } from "lucide-react";
import SubServicesSection from "@/components/home/SubServicesSection";
import CTASection from "@/components/home/CTASection";
import { socialMgmtServices, socialMgmtHeading, socialMgmtHighlight, socialMgmtSubtitle } from "@/data/services/socialmgmt-services";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const C = {
  cyan: "#06b6d4",
  green: "#34d399",
  cyanBg: "rgba(6,182,212,0.15)",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
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
  { url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=500&fit=crop", alt: "Social Media Content", rotate: -6 },
  { url: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=350&h=450&fit=crop", alt: "Community Engagement", rotate: 3 },
  { url: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=500&fit=crop", alt: "Content Creation", rotate: -2 },
  { url: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=380&h=480&fit=crop", alt: "Brand Strategy", rotate: 5 },
  { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=350&h=450&fit=crop", alt: "Analytics Dashboard", rotate: -4 },
  { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop", alt: "Growth Metrics", rotate: 3 },
];
const mobileImages = [images[0], images[1], images[2], images[3]];

// --- OUR PROCESS STEPS (Social Media Management) ---
const processSteps = [
  {
    step: "Step 1",
    title: "Brand Audit & Strategy",
    description: "We analyse your current social presence, audience, and competitors to build a tailored content strategy aligned with your brand voice and business goals.",
    icon: null,
    badges: ["Brand Audit", "Audience Analysis", "Competitor Research", "Content Strategy"],
  },
  {
    step: "Step 2",
    title: "Content Creation & Planning",
    description: "We craft engaging posts, graphics, reels, and stories for each platform. A monthly content calendar is shared for your approval before anything goes live.",
    icon: null,
    badges: ["Copywriting", "Graphic Design", "Reels & Stories", "Content Calendar"],
  },
  {
    step: "Step 3",
    title: "Publishing & Engagement",
    description: "We publish content at optimal times, respond to comments and messages, and actively engage with your community to build authentic relationships daily.",
    icon: null,
    badges: ["Scheduled Posting", "Community Management", "DM Responses", "Hashtag Strategy"],
  },
  {
    step: "Step 4",
    title: "Report & Optimise",
    description: "We track engagement, follower growth, and content performance with detailed monthly reports. Insights drive continuous refinement of your strategy.",
    icon: null,
    badges: ["Monthly Reports", "Growth Tracking", "Content Insights", "Strategy Refinement"],
  },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center",
            padding: "6px 12px", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)",
            width: "fit-content", margin: "0 auto 16px",
          }}>
            <span style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "2px",
              textTransform: "uppercase", color: "#9ca3af",
              fontFamily: "'Satoshi', sans-serif",
            }}>
              How We Work
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-1.5px", color: "#fff", marginTop: "12px",
          }}>
            Our Management Process
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500,
            color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "16px auto 0", lineHeight: 1.65,
          }}>
            From strategy to reporting, we follow a proven 4-step process to grow your social media presence consistently and authentically.
          </p>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: `${cardCount * 60 + 40}vh`,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {processSteps.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              style={{
                position: "sticky",
                top: `calc(112px + ${i * stackOffset}px)`,
                marginBottom: `${60 / cardCount}vh`,
                zIndex: 10 + i,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,${0.12 - i * 0.025}) 0%, rgba(255,255,255,${0.03 - i * 0.005}) 100%)`,
                  borderRadius: "20px",
                  padding: "56px 44px",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  minHeight: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                  backgroundClip: isActive ? "padding-box" : undefined,
                  boxShadow: isActive
                    ? `0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(${C.secondaryRGB},0.15), 0 0 80px rgba(${C.primaryRGB},0.08)`
                    : "0 20px 40px rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.5s ease, border 0.5s ease, transform 0.5s ease",
                  transform: isActive ? "scale(1)" : "scale(0.98)",
                }}
              >
                {isActive && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px", padding: "1px",
                    background: C.gradient,
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                    opacity: 0.7,
                    transition: "opacity 0.5s ease",
                  }} />
                )}

                <div style={{
                  position: "absolute", top: 0, left: "24px", right: "24px", height: "1px",
                  background: isActive
                    ? C.gradient
                    : "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                  transition: "background 0.5s ease",
                }} />

                <span style={{
                  display: "inline-flex", alignItems: "center",
                  fontFamily: "'Satoshi', sans-serif", fontSize: "12px", fontWeight: 600,
                  color: isActive ? C.cyan : "rgba(255,255,255,0.4)",
                  background: isActive ? C.cyanBg : "rgba(255,255,255,0.04)",
                  border: isActive ? `1px solid rgba(${C.secondaryRGB},0.25)` : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "999px", padding: "5px 14px",
                  marginBottom: "12px",
                  transition: "all 0.5s ease",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {item.step}
                </span>

                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700,
                  color: "#fff", lineHeight: 1.2, letterSpacing: "-1px",
                  textAlign: "center", margin: "0 0 16px 0",
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500,
                  color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)",
                  maxWidth: "560px", lineHeight: 1.7, textAlign: "center", margin: "0 0 24px 0",
                  transition: "color 0.5s ease",
                }}>
                  {item.description}
                </p>

                <div style={{
                  display: "flex", flexWrap: "wrap", gap: "8px",
                  justifyContent: "center", marginTop: "4px",
                }}>
                  {item.badges.map((badge, bi) => (
                    <ProcessBadge key={bi} label={badge} isActive={isActive} delay={bi * 0.08} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// --- FAQ DATA (Social Media Management) ---
const socialMgmtFaqs = [
  {
    id: 1,
    question: "Which social media platforms do you manage?",
    answer: "We manage Facebook, Instagram, LinkedIn, and TikTok. We'll recommend the best platform mix based on where your target audience is most active. Most Sydney businesses see the best results focusing on 2 to 3 platforms rather than spreading thin across all of them.",
  },
  {
    id: 2,
    question: "How many posts will you publish per month?",
    answer: "Our standard plans include 20 to 30 posts per month across your chosen platforms. This includes a mix of feed posts, stories, reels, and carousels. We create a monthly content calendar for your approval so you always know what's going out and when.",
  },
  {
    id: 3,
    question: "Do I need to provide content or photos?",
    answer: "Not necessarily. We handle content creation including copywriting, graphic design, and video editing. However, we love incorporating your own photos and behind-the-scenes content as it adds authenticity. We'll guide you on what to capture for maximum impact.",
  },
  {
    id: 4,
    question: "How do you measure success?",
    answer: "We track engagement rate, follower growth, reach, impressions, website clicks, and leads generated from social media. You'll receive a detailed monthly report with insights and recommendations. We focus on metrics that actually matter for your business, not just vanity numbers.",
  },
  {
    id: 5,
    question: "Can I approve content before it goes live?",
    answer: "Absolutely. We share a monthly content calendar with all posts, captions, and visuals for your review and approval. You can request changes or additions at any time. We use a simple approval workflow that makes the process quick and painless.",
  },
];

const BackgroundStripes = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.05] invert"
    style={{
      backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

const SocialMgmtFAQ = () => {
  const [openItem, setOpenItem] = useState(null);

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
                backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0), ${C.green}, ${C.cyan}, rgba(255,255,255,0))`,
                backgroundSize: "400% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
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
            Everything you need to know about our social media management services, content creation, and how we grow your online presence.
          </motion.p>
        </div>

        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 bg-white/5 px-3 py-1 border border-white/5">
              Updated Today
            </span>
          </div>

          <Accordion.Root
            type="single"
            collapsible
            value={openItem || ""}
            onValueChange={(value) => setOpenItem(value)}
            className="space-y-4"
          >
            {socialMgmtFaqs.map((item, index) => (
              <Accordion.Item value={item.id.toString()} key={item.id} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-start gap-x-4 focus:outline-none group">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={cn(
                        "relative flex items-center justify-between w-full p-5 text-left transition-all duration-300 border rounded-none",
                        openItem === item.id.toString()
                          ? "bg-[#0a0a0a] border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-none transition-colors duration-300",
                          openItem === item.id.toString() ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-500"
                        )}>
                          <MessageSquare size={14} />
                        </div>
                        <span className={cn(
                          "text-base md:text-lg font-semibold transition-colors duration-300",
                          openItem === item.id.toString() ? "text-white" : "text-zinc-400"
                        )}>
                          {item.question}
                        </span>
                      </div>

                      <span className={cn(
                        "ml-4 transition-transform duration-300",
                        openItem === item.id.toString() ? "text-emerald-500 rotate-180" : "text-zinc-600"
                      )}>
                        {openItem === item.id.toString() ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>

                      {openItem === item.id.toString() && (
                        <motion.div
                          layoutId="socialmgmt-faq-active-line"
                          className="absolute left-0 top-0 bottom-0 w-[3px]"
                          style={{ backgroundColor: C.green }}
                        />
                      )}
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content asChild forceMount>
                  <AnimatePresence initial={false}>
                    {openItem === item.id.toString() && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-end mt-2 ml-8 md:ml-16">
                          <div className={cn(
                            "relative max-w-2xl p-6 text-sm md:text-base leading-relaxed rounded-none shadow-sm border",
                            "bg-zinc-900 border-white/10 text-zinc-300"
                          )}>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500/20" />
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
    <div className="min-h-screen flex flex-col" style={{ fontFamily: FONT, overflowX: "clip" }}>
      <Header />
      <main style={{ flex: 1 }}>

        {/* ═══════════════ HERO ═══════════════ */}
        <section style={{ position: "relative", overflow: "clip", background: "#000", paddingBottom: isMobile ? "80px" : "130px" }}>
          <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${PRIMARY_RGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${SECONDARY_RGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ textAlign: "center", paddingTop: isMobile ? "100px" : "140px", paddingBottom: "16px", position: "relative", zIndex: 2 }}>
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

            <p style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 300, color: "#fff", maxWidth: "560px", margin: "24px auto 0", lineHeight: 1.65, padding: "0 20px",
              ...anim(0.3),
            }}>
              We manage your <span style={{ color: SECONDARY, fontWeight: 600 }}>social media presence</span> so you can focus on running your business. Engage your audience, build your <span style={{ color: PRIMARY, fontWeight: 600 }}>brand</span>, and drive real results.
            </p>

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
          </div>

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
        <section style={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 1, padding: "40px 24px 200px", maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center" }}
            >
              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(28px, 5vw, 56px)",
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
                color: "#fff",
                margin: "0 auto 24px",
                maxWidth: "1000px",
              }}>
                Why Social Media{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>Matters</span>
                {" "}— And Why Consistency Is Everything
              </p>

              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.6)",
                margin: "0 auto",
                maxWidth: "700px",
              }}>
                Your customers are on social media every day, making purchasing decisions based on what they see. Managing it effectively takes time, strategy, and consistency —{" "}
                <span style={{ color: C.green, fontWeight: 500 }}>that's where we come in</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ SERVICES GRID ═══════════════ */}
        <SubServicesSection
          heading={socialMgmtHeading}
          headingHighlight={socialMgmtHighlight}
          subtitle={socialMgmtSubtitle}
          services={socialMgmtServices}
        />

        {/* ═══════════════ OUR PROCESS ═══════════════ */}
        <OurProcess />

        {/* ═══════════════ FAQ ═══════════════ */}
        <SocialMgmtFAQ />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default SocialMediaManagement;