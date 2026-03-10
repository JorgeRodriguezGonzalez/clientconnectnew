import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubServicesSection from "@/components/home/SubServicesSection";
import CTASection from "@/components/home/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Smartphone, Rocket, Palette, TrendingUp, Code, Minus, Plus, MessageSquare } from "lucide-react";
import { webdesignServices, webdesignHeading, webdesignHighlight, webdesignSubtitle } from "@/data/services/webdesign-services";
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

const processSteps = [
  {
    step: "Step 1",
    title: "Discovery & Strategy",
    description: "We learn about your business, goals, target audience, and competitors. Together we define the sitemap, content strategy, and conversion goals.",
  },
  {
    step: "Step 2",
    title: "Design & Prototype",
    description: "We create high-fidelity designs tailored to your brand. You'll see interactive prototypes before any code is written, so we get it right.",
  },
  {
    step: "Step 3",
    title: "Development & Testing",
    description: "Clean, fast code built with SEO best practices. We test across all devices and browsers to ensure a flawless experience everywhere.",
  },
  {
    step: "Step 4",
    title: "Launch & Growth",
    description: "Your new website goes live. We provide training, ongoing support, and performance monitoring to keep driving results.",
  },
];

const OurProcess = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCount = processSteps.length;
  const stackOffset = 20;

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
          <span style={{
            fontFamily: FONT, fontSize: "13px", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.15em", color: C.cyan,
          }}>How We Work</span>
          <h2 style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-1.5px", color: "#fff", marginTop: "12px",
          }}>
            Our Process
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500,
            color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "16px auto 0", lineHeight: 1.65,
          }}>
            From discovery to launch, we follow a proven 4-step process to deliver websites that look stunning and drive real business results.
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
                  padding: "48px 40px",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  minHeight: "260px",
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
                  fontFamily: "'Satoshi', sans-serif", fontSize: "13px", fontWeight: 600,
                  color: isActive ? C.cyan : "rgba(255,255,255,0.5)",
                  background: isActive ? C.cyanBg : "rgba(255,255,255,0.05)",
                  border: isActive ? `1px solid rgba(${C.secondaryRGB},0.3)` : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "999px", padding: "6px 14px",
                  marginBottom: "20px",
                  transition: "all 0.5s ease",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}>
                  {item.step}
                </span>

                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700,
                  color: "#fff", lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-1px",
                  transition: "color 0.5s ease",
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontFamily: "'Satoshi', sans-serif", fontSize: "15px", fontWeight: 500,
                  color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)",
                  maxWidth: "600px", lineHeight: 1.65,
                  transition: "color 0.5s ease",
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const webDesignFaqs = [
  {
    id: 1,
    question: "How long does it take to build a website?",
    answer: "Most projects are completed within 2 to 4 weeks, depending on complexity. A simple landing page or brochure site can be ready in as little as 10 days, while larger e-commerce or multi-page sites may take up to 6 weeks. We'll give you a clear timeline during our initial consultation so there are no surprises.",
  },
  {
    id: 2,
    question: "How much does a website cost?",
    answer: "Our websites start from $2,500 for a professional 5-page site. Pricing depends on the number of pages, custom features, and integrations required. Every project includes custom design, mobile responsiveness, SEO setup, and a content management system. We provide a detailed quote after understanding your specific needs.",
  },
  {
    id: 3,
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely. Every website we build is designed mobile-first, meaning we prioritise the mobile experience from the start. With over 60% of web traffic coming from mobile devices in Australia, this approach ensures your site looks and performs perfectly on phones, tablets, and desktops.",
  },
  {
    id: 4,
    question: "Can I update the website content myself?",
    answer: "Yes. We build all our sites on easy-to-use content management systems so you can update text, images, and pages without any technical knowledge. We also provide a training session after launch and documentation to make sure you feel confident managing your site independently.",
  },
  {
    id: 5,
    question: "Do you offer ongoing support after launch?",
    answer: "We do. We offer flexible maintenance plans that include security updates, performance monitoring, regular backups, and priority support. Whether you need minor content changes or want us to manage the site entirely, we have a plan that fits. Your website is an investment and we help you protect it.",
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

const WebDesignFAQ = () => {
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
            Everything you need to know about our web design process, pricing, and ongoing support.
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
            {webDesignFaqs.map((item, index) => (
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
                          layoutId="webdesign-faq-active-line"
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
          <div style={{ position: "absolute", top: "180px", left: "50%", marginLeft: "-250px", width: "500px", height: "500px", background: `radial-gradient(circle, rgba(${C.primaryRGB},0.2) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "200px", left: "50%", marginLeft: "-50px", width: "600px", height: "600px", background: `radial-gradient(circle, rgba(${C.secondaryRGB},0.12) 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

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
              </span>
              <br />
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

          <div style={{
            marginTop: "56px", position: "relative", zIndex: 2,
            display: "flex", flexDirection: "column", gap: 16,
            maxWidth: "1200px", margin: "56px auto 0",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            ...anim(0.6),
          }}>
            <InfiniteRow items={carouselImages.row1} direction="left" speed={25} />
            <InfiniteRow items={carouselImages.row2} direction="right" speed={20} />
          </div>
        </section>

        {/* ═══════════════ TESTIMONIAL QUOTE ═══════════════ */}
        <section style={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "-96px", left: "-96px", width: "384px", height: "384px",
            borderRadius: "50%", background: `rgba(${C.secondaryRGB},0.1)`, filter: "blur(48px)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-96px", right: "-96px", width: "384px", height: "384px",
            borderRadius: "50%", background: `rgba(${C.primaryRGB},0.1)`, filter: "blur(48px)", pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center" }}
            >
              <h2 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(32px, 6vw, 64px)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-2px",
                color: "#fff",
                margin: "0 auto 40px",
                maxWidth: "900px",
              }}>
                Your website is your{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>best salesperson</span>
                .
              </h2>

              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 300,
                lineHeight: 1.45,
                letterSpacing: "-0.5px",
                color: "rgba(255,255,255,0.45)",
                margin: "0 auto",
                maxWidth: "800px",
              }}>
                In today's digital world, first impressions happen online. A{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>strategically designed website</span>
                {" "}doesn't just look great — it builds trust, drives conversions, and works for your business{" "}
                <span style={{ color: C.cyan, fontWeight: 300 }}>24 hours a day</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ SERVICES GRID ═══════════════ */}
        <SubServicesSection
          heading={webdesignHeading}
          headingHighlight={webdesignHighlight}
          subtitle={webdesignSubtitle}
          services={webdesignServices}
        />

        {/* ═══════════════ OUR PROCESS ═══════════════ */}
        <OurProcess />

        {/* ═══════════════ FAQ ═══════════════ */}
        <WebDesignFAQ />

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default WebDesign;